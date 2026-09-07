'use server';

import { revalidatePath } from 'next/cache';
import { Product } from './products';
import { getDb } from './mongo';

export interface Lead {
  id: string;
  email: string;
  name: string;
  source: 'Wholesale Inquiry' | 'Newsletter' | 'Contact Form';
  status: 'New' | 'Contacted' | 'Converted' | 'Lost';
  date: string;
}

export interface CRMConfig {
  geminiApiKey: string;
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const db = await getDb();
    const leads = await db.collection('leads').find({}).toArray();
    return leads.map(l => {
      const { _id, ...rest } = l;
      return rest as Lead;
    });
  } catch (error) {
    return [];
  }
}

export async function saveLead(lead: Lead): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('leads').updateOne({ id: lead.id }, { $set: lead }, { upsert: true });
    revalidatePath('/admin/marketing');
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('leads').updateOne({ id }, { $set: { status } });
    revalidatePath('/admin/marketing');
    return true;
  } catch (error) {
    return false;
  }
}

export async function getCRMConfig(): Promise<CRMConfig> {
  try {
    const db = await getDb();
    const config = await db.collection('crm_config').findOne({});
    if (!config) return { geminiApiKey: '' };
    return { geminiApiKey: config.geminiApiKey };
  } catch (error) {
    return { geminiApiKey: '' };
  }
}

export async function saveCRMConfig(config: CRMConfig): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('crm_config').updateOne({}, { $set: config }, { upsert: true });
    revalidatePath('/admin/marketing');
    return true;
  } catch (error) {
    return false;
  }
}

export async function generateCampaign(product: Product, goal: string): Promise<{ subject: string; body: string; caption: string }> {
  const config = await getCRMConfig();
  
  const prompt = `
You are an expert luxury marketing copywriter for a high-end Canadian architectural window treatment company called "STITCH CANADA".
I need you to generate a marketing campaign for the following product:
Product Name: ${product.name}
Description: ${product.description}
Base Price: $${product.basePrice}
Category: ${product.category}

Goal of this campaign: ${goal}

Please respond ONLY with a valid JSON object matching this exact schema, with no markdown formatting or backticks:
{
  "subject": "The email subject line",
  "body": "The main email body copy (can include HTML like <br/> or <strong> for formatting)",
  "caption": "The Instagram/Social Media caption, including emojis and 3-5 hashtags"
}`;

  if (!config.geminiApiKey) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      subject: `Elevate Your Space with ${product.name}`,
      body: `Hi there,<br/><br/>Discover the perfect blend of architectural precision and luxury with our <strong>${product.name}</strong>.<br/><br/>${product.description}<br/><br/>Starting at just $${product.basePrice}.<br/><br/>Best,<br/>The STITCH CANADA Team`,
      caption: `Transform your windows into architectural statements. Introducing the ${product.name}. 🏛️✨\n\nStarting at $${product.basePrice}, this ${product.category.toLowerCase()} is designed for the modern Canadian home.\n\n#InteriorDesign #Architecture #StitchCanada #WindowTreatments`
    };
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanedText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("AI Generation Failed:", error);
    return {
      subject: "Error generating campaign",
      body: "There was an error communicating with the Gemini API. Please check your API key.",
      caption: "Error generating caption."
    };
  }
}

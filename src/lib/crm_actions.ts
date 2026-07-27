'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Product } from './products';

const LEADS_PATH = path.join(process.cwd(), 'src/data/leads.json');
const CONFIG_PATH = path.join(process.cwd(), 'src/data/crm_config.json');

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

async function ensureDir() {
  const dir = path.join(process.cwd(), 'src/data');
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

export async function getLeads(): Promise<Lead[]> {
  try {
    await ensureDir();
    const data = await fs.readFile(LEADS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveLead(lead: Lead): Promise<boolean> {
  try {
    const leads = await getLeads();
    const index = leads.findIndex(l => l.id === lead.id);
    if (index >= 0) {
      leads[index] = lead;
    } else {
      leads.push(lead);
    }
    await fs.writeFile(LEADS_PATH, JSON.stringify(leads, null, 2));
    revalidatePath('/admin/marketing');
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<boolean> {
  try {
    const leads = await getLeads();
    const lead = leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      await fs.writeFile(LEADS_PATH, JSON.stringify(leads, null, 2));
      revalidatePath('/admin/marketing');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function getCRMConfig(): Promise<CRMConfig> {
  try {
    await ensureDir();
    const data = await fs.readFile(CONFIG_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { geminiApiKey: '' };
  }
}

export async function saveCRMConfig(config: CRMConfig): Promise<boolean> {
  try {
    await ensureDir();
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
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
    // Simulated Mockup
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate latency
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
    
    // Clean up markdown block if present
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

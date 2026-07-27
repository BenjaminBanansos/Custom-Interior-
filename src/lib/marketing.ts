import fs from 'fs/promises';
import path from 'path';

export interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  leadsGenerated: number;
}

export interface Lead {
  id: string;
  name: string;
  contactName: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

export interface CRMData {
  campaigns: Campaign[];
  leads: Lead[];
  customers: any[];
}

const DATA_PATH = path.join(process.cwd(), 'src/data/crm.json');
let cache: CRMData | null = null;

export async function getCRMData(): Promise<CRMData> {
  try {
    if (cache) return cache;
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    cache = JSON.parse(data);
    return cache || { campaigns: [], leads: [], customers: [] };
  } catch (error) {
    console.error('Error reading CRM data:', error);
    return { campaigns: [], leads: [], customers: [] };
  }
}

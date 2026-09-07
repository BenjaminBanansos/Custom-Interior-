import { getDb } from './mongo';

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

export async function getCRMData(): Promise<CRMData> {
  try {
    const db = await getDb();
    const data = await db.collection('crm').findOne({});
    if (!data) return { campaigns: [], leads: [], customers: [] };
    const { _id, ...rest } = data;
    return rest as unknown as CRMData;
  } catch (error) {
    return { campaigns: [], leads: [], customers: [] };
  }
}

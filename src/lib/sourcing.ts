import fs from 'fs/promises';
import path from 'path';

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  leadTimeDays: number;
  categories: string[];
}

export interface SourcingData {
  suppliers: Supplier[];
  purchaseOrders: any[];
}

const DATA_PATH = path.join(process.cwd(), 'src/data/suppliers.json');
let cache: SourcingData | null = null;

export async function getSourcingData(): Promise<SourcingData> {
  try {
    if (cache) return cache;
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    cache = JSON.parse(data);
    return cache || { suppliers: [], purchaseOrders: [] };
  } catch (error) {
    console.error('Error reading sourcing data:', error);
    return { suppliers: [], purchaseOrders: [] };
  }
}

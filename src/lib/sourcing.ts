import { getDb } from './mongo';

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

export async function getSourcingData(): Promise<SourcingData> {
  try {
    const db = await getDb();
    const data = await db.collection('suppliers').findOne({});
    if (!data) return { suppliers: [], purchaseOrders: [] };
    const { _id, ...rest } = data;
    return rest as unknown as SourcingData;
  } catch (error) {
    return { suppliers: [], purchaseOrders: [] };
  }
}

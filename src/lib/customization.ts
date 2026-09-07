import { getDb } from './mongo';

export interface LocalizedSetting {
  id: string;
  region: string;
  taxRate: number;
  currency: string;
}

export interface CustomizationSettings {
  globalPricingMultiplier: number;
  localizedSettings: LocalizedSetting[];
  branding: {
    primaryColor: string;
    logoUrl: string;
  };
  defaultFabricId: string;
}

let cache: CustomizationSettings | null = null;

export async function getCustomization(): Promise<CustomizationSettings | null> {
  try {
    const db = await getDb();
    const data = await db.collection('customization').findOne({});
    if (!data) return null;
    const { _id, ...rest } = data;
    return rest as unknown as CustomizationSettings;
  } catch (error) {
    return null;
  }
}

export async function saveCustomization(settings: CustomizationSettings): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('customization').updateOne({}, { $set: settings }, { upsert: true });
    return true;
  } catch (error) {
    return false;
  }
}

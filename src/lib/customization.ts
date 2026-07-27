import fs from 'fs/promises';
import path from 'path';

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

const DATA_PATH = path.join(process.cwd(), 'src/data/customization.json');

let cache: CustomizationSettings | null = null;

export async function getCustomization(): Promise<CustomizationSettings | null> {
  try {
    if (cache) return cache;
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    cache = JSON.parse(data);
    return cache;
  } catch (error) {
    console.error('Error reading customization:', error);
    return null;
  }
}

export async function saveCustomization(settings: CustomizationSettings): Promise<boolean> {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(settings, null, 2));
    cache = settings;
    return true;
  } catch (error) {
    console.error('Error saving customization:', error);
    return false;
  }
}

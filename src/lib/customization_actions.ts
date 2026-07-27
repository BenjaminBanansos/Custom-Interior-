'use server';

import { getCustomization as getRaw, saveCustomization as saveRaw, CustomizationSettings } from './customization';
import { revalidatePath } from 'next/cache';

export async function getCustomizationSettings() {
  return await getRaw();
}

export async function saveCustomizationSettings(settings: CustomizationSettings) {
  const success = await saveRaw(settings);
  if (success) {
    revalidatePath('/', 'layout'); // Revalidate all pages since branding/pricing affects globally
  }
  return success;
}

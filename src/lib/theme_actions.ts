'use server';

import { revalidatePath } from 'next/cache';
import { getDb } from './mongo';

export interface ThemeConfig {
  catalogGridCols: number;
  catalogImageRatio: 'square' | 'portrait' | 'landscape';
  productImageSize: number;
  containerWidth: string;
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  sectionOrder: string[];
  productOrder: string[];
  curatedLists: {
    popular: string[];
    budget: string[];
    lightFiltering: string[];
  };
}

const defaultTheme: ThemeConfig = {
  catalogGridCols: 3,
  catalogImageRatio: 'portrait',
  productImageSize: 500,
  containerWidth: '1200px',
  colors: {
    primary: '#000000',
    background: '#ffffff',
    text: '#111111'
  },
  typography: {
    heading: 'Outfit, sans-serif',
    body: 'Inter, sans-serif'
  },
  sectionOrder: ['hero', 'categories', 'curated', 'catalog'],
  productOrder: [],
  curatedLists: {
    popular: [],
    budget: [],
    lightFiltering: []
  }
};

export async function getTheme(): Promise<ThemeConfig> {
  try {
    const db = await getDb();
    const parsed = await db.collection('theme').findOne({});
    if (!parsed) return defaultTheme;
    return {
      ...defaultTheme,
      ...parsed,
      colors: { ...defaultTheme.colors, ...(parsed.colors || {}) },
      typography: { ...defaultTheme.typography, ...(parsed.typography || {}) },
      sectionOrder: parsed.sectionOrder || defaultTheme.sectionOrder,
      productOrder: parsed.productOrder || defaultTheme.productOrder,
      curatedLists: {
        popular: parsed.curatedLists?.popular || [],
        budget: parsed.curatedLists?.budget || [],
        lightFiltering: parsed.curatedLists?.lightFiltering || []
      }
    };
  } catch (error) {
    return defaultTheme;
  }
}

export async function saveTheme(theme: ThemeConfig): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('theme').updateOne({}, { $set: theme }, { upsert: true });
    revalidatePath('/');
    revalidatePath('/product/[id]', 'page');
    revalidatePath('/admin/design');
    return true;
  } catch (error) {
    return false;
  }
}

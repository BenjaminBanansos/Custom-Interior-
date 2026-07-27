'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const THEME_PATH = path.join(process.cwd(), 'src/data/theme.json');

export interface ThemeConfig {
  catalogGridCols: number; // 2, 3, or 4
  catalogImageRatio: 'square' | 'portrait' | 'landscape';
  productImageSize: number; // 300, 400, 500, etc.
  containerWidth: string; // '1200px', '1400px', '100%'
  
  // Extensive Design Settings
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  
  // Drag & Drop Sorting
  sectionOrder: string[]; // e.g. ['hero', 'catalog', 'features']
  productOrder: string[]; // array of product IDs in order
  
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

async function ensureDir() {
  const dir = path.join(process.cwd(), 'src/data');
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

export async function getTheme(): Promise<ThemeConfig> {
  try {
    await ensureDir();
    const data = await fs.readFile(THEME_PATH, 'utf-8');
    const parsed = JSON.parse(data);
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
    // If it doesn't exist, create it with defaults
    await saveTheme(defaultTheme);
    return defaultTheme;
  }
}

export async function saveTheme(theme: ThemeConfig): Promise<boolean> {
  try {
    await ensureDir();
    await fs.writeFile(THEME_PATH, JSON.stringify(theme, null, 2));
    revalidatePath('/'); // Revalidate storefront
    revalidatePath('/product/[id]', 'page'); // Revalidate all product pages
    revalidatePath('/admin/design'); // Revalidate admin
    return true;
  } catch (error) {
    console.error('Error saving theme:', error);
    return false;
  }
}

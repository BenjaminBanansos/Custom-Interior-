export interface FabricColor {
  colorId: string;
  name: string;
  hex: string;
  mediaUrl?: string;
  status: 'active' | 'out-of-stock';
}

export interface FabricFamily {
  fabricId: string;
  name: string;
  description?: string;
  priceModifier: number;
  colors: FabricColor[];
}

export interface DimensionConstraints {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

export interface CustomizationRule {
  id: string;
  name: string;
  condition: string; // e.g., "width > 2500"
  action: string;    // e.g., "markup 15%"
  status: 'active' | 'draft';
}

export interface SubAttributeChoice {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface SubAttribute {
  id: string;
  name: string;
  choices: SubAttributeChoice[];
}

export interface ModifierOption {
  id: string;
  name: string;
  priceAdjustment: number;
  mediaUrl?: string; // Optional icon or GIF for the option
  subAttributes?: SubAttribute[]; // Nested choices specific to this option
}

export interface ModifierGroup {
  id: string;
  name: string; // e.g., "Lift Style", "Mount Type"
  isRequired: boolean;
  options: ModifierOption[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number; // For sqft mode, this is Price Per Sqft
  basePriceMode: 'fixed' | 'perSqFt';
  description: string;
  fabricFamilies: FabricFamily[];
  constraints?: DimensionConstraints;
  logic?: CustomizationRule[];
  mediaAssets?: string[];
  imageUrl?: string;
  modifiers?: ModifierGroup[];
  status: 'published' | 'draft';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  productCount: number;
  viewCount: number;
}

// Mock data for initial seeding
export const categories: Category[] = [
  { id: 'zebra', name: 'Zebra Shades', description: 'Dual layered fabric for precision light control.', productCount: 43, viewCount: 15200 },
  { id: 'roller', name: 'Roller Shades', description: 'Minimalist design meets functional simplicity.', productCount: 128, viewCount: 6300 },
  { id: 'roman', name: 'Roman Shades', description: 'Timeless elegance with soft fabric folds.', productCount: 65, viewCount: 11500 }
];

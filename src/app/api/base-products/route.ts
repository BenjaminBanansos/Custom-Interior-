import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/mongo';

const DEFAULT_PRODUCTS = [
  { id: 'duo-stripes', name: 'Duo stripes', description: 'Modern dual-layered shades.', imageUrl: '', variantCount: 0 },
  { id: 'roller-shades', name: 'Rollder shades', description: 'Classic roller shades.', imageUrl: '', variantCount: 0 },
  { id: 'honeycomb-blinds', name: 'Honeycomb blinds', description: 'Energy efficient cellular shades.', imageUrl: '', variantCount: 0 },
  { id: 'roman-shades', name: 'Roman Shades', description: 'Elegant fabric folds.', imageUrl: '', variantCount: 0 },
  { id: 'vertical-drapery-shades', name: 'Vertical Drapery shades', description: 'Perfect for large windows.', imageUrl: '', variantCount: 0 },
  { id: 'shangrila', name: 'Shangrila', description: 'Soft sheer horizontal shades.', imageUrl: '', variantCount: 0 },
  { id: 'butter-fly-roller-shade', name: 'Butter Fly roller shade', description: 'Unique butterfly style.', imageUrl: '', variantCount: 0 }
];

export async function GET() {
  try {
    const db = await getDb();
    let products = await db.collection('base_products').find({}).toArray();
    
    // Auto-seed if empty
    if (products.length === 0) {
      await db.collection('base_products').insertMany(DEFAULT_PRODUCTS);
      products = DEFAULT_PRODUCTS as any;
    }
    
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = await getDb();
    await db.collection('base_products').updateOne({ id: data.id }, { $set: data }, { upsert: true });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const db = await getDb();
    await db.collection('base_products').deleteOne({ id });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}

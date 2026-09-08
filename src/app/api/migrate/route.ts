
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = 'mongodb+srv://benjamin_banansos:UFUHUIkv5EmP4RNW@cluster0.msl4dcy.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('market_intel');
    const currentProducts = await db.collection('products').find({}).toArray();
    const zebraProducts = currentProducts.filter(p => ['zebra-translucent', 'zebra-room-darkening', 'zebra-blackout'].includes(p.id));
    
    if (zebraProducts.length === 0) {
      return NextResponse.json({ message: 'No zebra products found or already merged.' });
    }
    
    const baseProduct = zebraProducts[0];
    const master = {
      id: 'zebra-blinds-master',
      name: 'Zebra Blinds',
      category: 'zebra-blinds',
      basePrice: baseProduct.basePrice || 129.99,
      basePriceMode: 'fixed',
      description: 'Premium Zebra Blinds with customizable hardware.',
      imageUrl: baseProduct.imageUrl,
      status: 'published',
      modifiers: baseProduct.modifiers, 
      fabricFamilies: []
    };
    
    for (const p of zebraProducts) {
      const opacityCat = p.id.replace('zebra-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (p.fabricFamilies) {
        for (const fam of p.fabricFamilies) {
          fam.category = opacityCat;
          master.fabricFamilies.push(fam);
        }
      }
    }
    
    await db.collection('products').deleteMany({ id: { $in: zebraProducts.map(p => p.id) } });
    await db.collection('products').deleteMany({ id: 'zebra-blinds-master' });
    await db.collection('products').insertOne(master);
    
    return NextResponse.json({ message: 'Merged into 1 Zebra Blinds product!', count: master.fabricFamilies.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

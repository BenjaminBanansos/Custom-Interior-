
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = 'mongodb+srv://benjamin_banansos:UFUHUIkv5EmP4RNW@cluster0.msl4dcy.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('market_intel');
    
    // We want to restore the 3 original products from the backup collection!
    const backupProducts = await db.collection('products_backup').find({}).toArray();
    const zebraProducts = backupProducts.filter(p => ['zebra-translucent', 'zebra-room-darkening', 'zebra-blackout'].includes(p.id));
    
    if (zebraProducts.length === 0) return NextResponse.json({ message: 'No backups found' });
    
    await db.collection('products').deleteMany({ id: 'zebra-blinds-master' });
    
    for (const p of zebraProducts) {
      // Upsert the original product
      await db.collection('products').updateOne({ id: p.id }, { $set: p }, { upsert: true });
    }
    
    return NextResponse.json({ message: 'Restored the 3 Zebra products!', count: zebraProducts.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

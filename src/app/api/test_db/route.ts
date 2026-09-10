import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI || "mongodb+srv://benjamin_banansos:UFUHUIkv5EmP4RNW@cluster0.msl4dcy.mongodb.net/?retryWrites=true&w=majority";
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('market_intel');
    const count = await db.collection('products').countDocuments();
    await client.close();
    return NextResponse.json({ success: true, count, uriPrefix: uri.substring(0, 20) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, stack: error.stack });
  }
}


import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/storage';

export async function POST(req: Request) {
  try {
    const { category, modifiers } = await req.json();
    if (!category || !modifiers) return NextResponse.json({ error: 'Missing category or modifiers' }, { status: 400 });
    
    const client = await connectToDatabase();
    const db = client.db('market_intel');
    
    // Update all products in this category with these exact modifiers
    const result = await db.collection('products').updateMany(
      { category },
      { $set: { modifiers } }
    );
    
    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { getProducts } from '../../../lib/storage_actions';

export async function GET() {
  try {
    const products = await getProducts();
    const product = products.find(p => p.id === 'pdf-dl22032---translucent-1');
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

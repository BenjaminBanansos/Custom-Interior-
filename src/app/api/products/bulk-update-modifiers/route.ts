
import { NextResponse } from 'next/server';
import { bulkUpdateCategoryModifiers } from '../../../../lib/storage';

export async function POST(req: Request) {
  try {
    const { category, modifiers } = await req.json();
    if (!category || !modifiers) return NextResponse.json({ error: 'Missing category or modifiers' }, { status: 400 });
    
    const count = await bulkUpdateCategoryModifiers(category, modifiers);
    return NextResponse.json({ success: true, modifiedCount: count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

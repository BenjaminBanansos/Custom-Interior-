import { NextResponse } from 'next/server';
import { bulkUpdateComplexModifiers } from '../../../../lib/storage';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filter, modifiers } = body;
    if (!filter || !modifiers) return NextResponse.json({ error: 'Missing filter or modifiers' }, { status: 400 });
    
    const count = await bulkUpdateComplexModifiers(filter, modifiers);
    return NextResponse.json({ success: true, modifiedCount: count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

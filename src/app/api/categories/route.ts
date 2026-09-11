404: Not Found
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { getDb } = require('../../../lib/mongo');
    const db = await getDb();
    await db.collection('categories').deleteOne({ id });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}

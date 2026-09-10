import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

export default async function DbTestPage() {
  const uri = process.env.MONGODB_URI || "mongodb+srv://benjamin_banansos:UFUHUIkv5EmP4RNW@cluster0.msl4dcy.mongodb.net/?retryWrites=true&w=majority";
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db('market_intel');
    const count = await db.collection('products').countDocuments();
    await client.close();
    return <div style={{padding:'20px', color:'green', fontSize:'20px'}}>SUCCESS! COUNT: {count}</div>;
  } catch (err: any) {
    return <div style={{padding:'20px', color:'red', fontSize:'20px'}}>
      FAILED: {err.name} - {err.message}
    </div>;
  }
}

import { MongoClient } from 'mongodb';
import { Product, Category } from './products';

const uri = "mongodb+srv://benjamin_banansos:UFUHUIkv5EmP4RNW@cluster0.msl4dcy.mongodb.net/?retryWrites=true&w=majority";
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db('market_intel');
}

export async function getProducts(): Promise<Product[]> {
  try {
    const db = await getDb();
    const products = await db.collection('products').find({}).toArray();
    return products.map(p => {
      const { _id, ...rest } = p;
      return rest as Product;
    });
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function saveProduct(product: Product): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('products').updateOne(
      { id: product.id },
      { $set: product },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error('Error saving product:', error);
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('products').deleteOne({ id });
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const db = await getDb();
    const categories = await db.collection('categories').find({}).toArray();
    return categories.map(c => {
      const { _id, ...rest } = c;
      return rest as Category;
    });
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

export async function saveCategory(category: Category): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('categories').updateOne(
      { id: category.id },
      { $set: category },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error('Error saving category:', error);
    return false;
  }
}

export async function bulkUpdateCategoryModifiers(category: string, modifiers: any[]): Promise<number> {
  try {
    const db = await getDb();
    const result = await db.collection('products').updateMany(
      { category },
      { $set: { modifiers } }
    );
    return result.modifiedCount;
  } catch(e) {
    console.error(e);
    return 0;
  }
}

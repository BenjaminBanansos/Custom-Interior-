import { Product, Category } from './products';
import rawProducts from '../data/products.json';
import rawCategories from '../data/categories.json';

// Simple in-memory cache for dev speed. 
// Note: In a true serverless environment, this resets when the function cold-starts.
let productsCache: Product[] = [...(rawProducts as any)];
let categoriesCache: Category[] = [...(rawCategories as any)];

export async function getProducts(): Promise<Product[]> {
  return productsCache || [];
}

export async function saveProduct(product: Product): Promise<boolean> {
  try {
    const index = productsCache.findIndex(p => p.id === product.id);
    if (index !== -1) {
      productsCache[index] = product;
    } else {
      productsCache.push(product);
    }
    return true;
  } catch (error) {
    console.error('Error saving product:', error);
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    productsCache = productsCache.filter(p => p.id !== id);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

export async function getCategories(): Promise<Category[]> {
  return categoriesCache || [];
}

export async function saveCategory(category: Category): Promise<boolean> {
  try {
    const index = categoriesCache.findIndex(c => c.id === category.id);
    if (index !== -1) {
      categoriesCache[index] = category;
    } else {
      categoriesCache.push(category);
    }
    return true;
  } catch (error) {
    console.error('Error saving category:', error);
    return false;
  }
}

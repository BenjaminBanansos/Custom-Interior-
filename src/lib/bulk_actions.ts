'use server';

import { getDb } from './mongo';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function bulkAppendModifier(
  category: string,
  modifierName: string,
  options: any[]
) {
  const db = await getDb();
  
  // Find all products matching the category
  const query = category === 'all' ? {} : { base_product_id: category };
  const products = await db.collection('products').find(query).toArray();
  
  let updatedCount = 0;
  
  for (const product of products) {
    let modifiers = product.modifiers || [];
    
    // Find if the modifier group (e.g. "Cassette") already exists
    const modIndex = modifiers.findIndex((m: any) => m.name === modifierName);
    
    // Assign IDs to new options
    const newOptionsWithIds = options.map(o => ({
      ...o,
      id: slugify(o.name)
    }));

    if (modIndex >= 0) {
      // Append options to the existing modifier group to AVOID entire hardware overwrite
      const existingOptions = modifiers[modIndex].options || [];
      const existingNames = new Set(existingOptions.map((o: any) => o.name));
      
      const newOptions = newOptionsWithIds.filter(o => !existingNames.has(o.name));
      modifiers[modIndex].options = [...existingOptions, ...newOptions];
    } else {
      // Create new modifier group
      modifiers.push({
        id: slugify(modifierName),
        name: modifierName,
        options: newOptionsWithIds
      });
    }
    
    await db.collection('products').updateOne(
      { _id: product._id },
      { $set: { modifiers } }
    );
    updatedCount++;
  }
  
  return { success: true, updatedCount };
}

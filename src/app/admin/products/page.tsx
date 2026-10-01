'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products?t=' + Date.now()),
        fetch('/api/categories?t=' + Date.now())
      ]);
      const prods = await prodRes.json();
      const cats = await catRes.json();
      setProducts(prods || []);
      setCategories(cats || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this product permanently?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadData();
  }

  // Group products by category
  // If categories array is empty, we derive them from the products array to be safe
  const allCategoryNames = categories.map(c => c.name);
  products.forEach(p => {
    if (p.category && !allCategoryNames.includes(p.category)) {
      allCategoryNames.push(p.category);
    }
  });

  const grouped = allCategoryNames.map(catName => ({
    categoryName: catName,
    products: products.filter(p => p.category === catName || (!p.category && catName === 'Uncategorized'))
  }));
  
  const uncategorizedProducts = products.filter(p => !p.category || !allCategoryNames.includes(p.category));
  if (uncategorizedProducts.length > 0) {
    grouped.push({
      categoryName: 'Uncategorized / Drafts',
      products: uncategorizedProducts
    });
  }

  return (
    <div>
      <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>INVENTORY CONTROL</span>
          <h1 style={{ fontSize: '2.5rem' }}>Product Collections</h1>
          <p style={{ color: '#888', marginTop: '10px' }}>Manage industrial specifications and retail availability grouped by Collections/Categories.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={loadData} style={{ backgroundColor: '#fff', color: '#000', padding: '12px 24px', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
            ↻ REFRESH DATA
          </button>
          <Link href="/admin/products/new" style={{ backgroundColor: '#071F45', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
            + NEW PRODUCT
          </Link>
          <Link href="/admin/categories/new" style={{ backgroundColor: '#D4AF37', color: '#071F45', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
            + NEW COLLECTION
          </Link>
        </div>
      </header>

      {isLoading ? (
        <div style={{ color: '#888' }}>Loading product collections...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {grouped.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
              No products found in the database.
            </div>
          ) : (
            grouped.map(group => (
              <div key={group.categoryName} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '20px 30px', backgroundColor: '#F5F7F9', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ margin: 0, color: '#071F45', fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>{group.categoryName}</h2>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>{group.products.length} Products</span>
                </div>
                
                {group.products.length === 0 ? (
                  <div style={{ padding: '30px', textAlign: 'center', color: '#888' }}>No products mapped to this collection yet.</div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                        <th style={{ padding: '15px 30px', fontSize: '0.7rem', color: '#888', fontWeight: 700 }}>PRODUCT NAME</th>
                        <th style={{ padding: '15px 30px', fontSize: '0.7rem', color: '#888', fontWeight: 700 }}>BASE PRICE</th>
                        <th style={{ padding: '15px 30px', fontSize: '0.7rem', color: '#888', fontWeight: 700 }}>STATUS</th>
                        <th style={{ padding: '15px 30px', fontSize: '0.7rem', color: '#888', fontWeight: 700, textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.products.map(product => (
                        <tr key={product.id || product._id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '15px 30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div style={{ 
                                width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '4px',
                                backgroundImage: (product.images && product.images[0]) ? `url(${product.images[0].url})` : (product.imageUrl ? `url(${product.imageUrl})` : 'none'),
                                backgroundSize: 'cover', backgroundPosition: 'center'
                              }}></div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1D20' }}>{product.name || 'Unnamed Product'}</div>
                                <div style={{ fontSize: '0.75rem', color: '#8D99AE' }}>ID: {product.id || product._id}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '15px 30px', fontSize: '0.9rem', fontWeight: 600, color: '#1A1D20' }}>
                            ${product.basePrice || 0}
                          </td>
                          <td style={{ padding: '15px 30px' }}>
                            <span style={{ 
                              padding: '4px 10px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em',
                              backgroundColor: product.status === 'published' ? '#ecfdf5' : '#fef2f2',
                              color: product.status === 'published' ? '#10b981' : '#ef4444'
                            }}>{(product.status || 'draft').toUpperCase()}</span>
                          </td>
                          <td style={{ padding: '15px 30px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                              <Link href={`/product/${product.id || product._id}`} style={{ fontSize: '0.75rem', color: '#8D99AE', textDecoration: 'none', fontWeight: 600 }}>VIEW</Link>
                              <Link href={`/admin/products/${product.id || product._id}/edit`} style={{ fontSize: '0.75rem', color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}>EDIT</Link>
                              <button onClick={() => handleDelete(product.id || product._id)} style={{ border: 'none', background: 'none', fontSize: '0.75rem', color: '#ef4444', cursor: 'pointer', padding: 0, fontWeight: 600 }}>DELETE</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

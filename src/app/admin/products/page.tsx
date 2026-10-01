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
    if (!confirm('Delete this item permanently?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadData();
  }

  // 1. Top Level Grouping: The "Product Umbrella" (what used to be called Categories)
  const allUmbrellas = categories.map(c => c.name);
  products.forEach(p => {
    if (p.category && !allUmbrellas.includes(p.category)) {
      allUmbrellas.push(p.category);
    }
  });

  const groupedByUmbrella = allUmbrellas.map(umbrellaName => {
    const umbrellaProducts = products.filter(p => p.category === umbrellaName || (!p.category && umbrellaName === 'Unassigned'));
    
    // 2. Secondary Grouping: Transparency (Translucent, Room Darkening, Blackout)
    const transparencies = ['Translucent', 'Room Darkening', 'Blackout'];
    
    // Catch any custom or missing transparencies
    umbrellaProducts.forEach(p => {
      const trans = p.transparency || 'Uncategorized Opacity';
      if (!transparencies.includes(trans)) {
        transparencies.push(trans);
      }
    });

    const nestedGroups = transparencies.map(trans => ({
      transparencyName: trans,
      items: umbrellaProducts.filter(p => (p.transparency === trans) || (!p.transparency && trans === 'Uncategorized Opacity'))
    })).filter(group => group.items.length > 0);

    return {
      umbrellaName,
      totalCount: umbrellaProducts.length,
      nestedGroups
    };
  }).filter(group => group.totalCount > 0);
  
  const uncategorizedProducts = products.filter(p => !p.category || !allUmbrellas.includes(p.category));
  if (uncategorizedProducts.length > 0) {
    groupedByUmbrella.push({
      umbrellaName: 'Unassigned / Drafts',
      totalCount: uncategorizedProducts.length,
      nestedGroups: [{ transparencyName: 'All Items', items: uncategorizedProducts }]
    });
  }

  return (
    <div>
      <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>INVENTORY CONTROL</span>
          <h1 style={{ fontSize: '2.5rem' }}>Products</h1>
          <p style={{ color: '#888', marginTop: '10px' }}>Manage items grouped by Product (e.g. Duo Stripes) and Transparency (e.g. Blackout).</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={loadData} style={{ backgroundColor: '#fff', color: '#000', padding: '12px 24px', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
            ↻ REFRESH DATA
          </button>
          <Link href="/admin/products/new" style={{ backgroundColor: '#071F45', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
            + NEW ITEM
          </Link>
          <Link href="/admin/categories/new" style={{ backgroundColor: '#D4AF37', color: '#071F45', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
            + NEW PRODUCT UMBRELLA
          </Link>
        </div>
      </header>

      {isLoading ? (
        <div style={{ color: '#888' }}>Loading product hierarchy...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {groupedByUmbrella.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
              No products found in the database.
            </div>
          ) : (
            groupedByUmbrella.map(group => (
              <div key={group.umbrellaName} style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                {/* Umbrella Header */}
                <div style={{ padding: '24px 30px', backgroundColor: '#071F45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ margin: 0, color: '#fff', fontSize: '1.75rem', fontFamily: 'Outfit, sans-serif' }}>{group.umbrellaName}</h2>
                  <span style={{ fontSize: '0.85rem', color: '#D4AF37', fontWeight: 700, letterSpacing: '0.05em' }}>{group.totalCount} ITEMS TOTAL</span>
                </div>
                
                {/* Nested Transparency Groups */}
                <div style={{ padding: '0' }}>
                  {group.nestedGroups.map((subGroup, index) => (
                    <div key={subGroup.transparencyName} style={{ borderBottom: index === group.nestedGroups.length - 1 ? 'none' : '4px solid #F5F7F9' }}>
                      <div style={{ padding: '16px 30px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: subGroup.transparencyName.toLowerCase().includes('blackout') ? '#111' : subGroup.transparencyName.toLowerCase().includes('darkening') ? '#666' : '#D4AF37' }}></span>
                        <h3 style={{ margin: 0, color: '#374151', fontSize: '1.1rem', fontWeight: 600 }}>{subGroup.transparencyName}</h3>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500, marginLeft: 'auto' }}>{subGroup.items.length} options</span>
                      </div>
                      
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          {subGroup.items.map(item => (
                            <tr key={item.id || item._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                              <td style={{ padding: '16px 30px', width: '40%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                  <div style={{ 
                                    width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '6px',
                                    backgroundImage: (item.images && item.images[0]) ? `url(${item.images[0].url})` : (item.imageUrl ? `url(${item.imageUrl})` : 'none'),
                                    backgroundSize: 'cover', backgroundPosition: 'center'
                                  }}></div>
                                  <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827' }}>{item.name || 'Unnamed'}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>ID: {item.id || item._id}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '16px 30px', width: '20%', fontSize: '0.9rem', fontWeight: 600, color: '#374151' }}>
                                ${item.basePrice || 0}
                              </td>
                              <td style={{ padding: '16px 30px', width: '20%' }}>
                                <span style={{ 
                                  padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em',
                                  backgroundColor: item.status === 'published' ? '#D1FAE5' : '#FEE2E2',
                                  color: item.status === 'published' ? '#065F46' : '#991B1B'
                                }}>{(item.status || 'draft').toUpperCase()}</span>
                              </td>
                              <td style={{ padding: '16px 30px', width: '20%', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                                  <Link href={`/product/${item.id || item._id}`} style={{ fontSize: '0.75rem', color: '#6B7280', textDecoration: 'none', fontWeight: 600 }}>VIEW</Link>
                                  <Link href={`/admin/products/${item.id || item._id}/edit`} style={{ fontSize: '0.75rem', color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}>EDIT</Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

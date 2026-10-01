'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function UmbrellaManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const params = useParams();
  const rawUmbrella = params?.umbrella || '';
  const umbrellaName = typeof rawUmbrella === 'string' ? decodeURIComponent(rawUmbrella) : 'Unknown';

  async function loadData() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products?t=' + Date.now());
      const allProds = await res.json();
      
      const filtered = (allProds || []).filter((p: any) => 
        (umbrellaName === 'Unassigned Items' ? !p.category : p.category === umbrellaName)
      );
      setProducts(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [umbrellaName]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this item permanently?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadData();
  }

  const transparencies = ['Translucent', 'Room Darkening', 'Blackout'];
  products.forEach(p => {
    let trans = p.transparency || p.category || 'Other';
    let matchedName = transparencies.find(t => typeof trans === 'string' && trans.toLowerCase().includes(t.toLowerCase())) || 'Other';
    p._displayGroup = matchedName;
  });

  const grouped = products.reduce((acc: any, p: any) => {
    const g = p._displayGroup;
    if (!acc[g]) acc[g] = [];
    acc[g].push(p);
    return acc;
  }, {});

  const nestedGroups = Object.keys(grouped).map(k => ({
    transparencyName: k,
    items: grouped[k]
  })).sort((a, b) => {
    if (a.transparencyName === 'Other') return 1;
    if (b.transparencyName === 'Other') return -1;
    return transparencies.indexOf(a.transparencyName) - transparencies.indexOf(b.transparencyName);
  });

  if (isLoading) return <div style={{ padding: '40px' }}>Loading...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/admin/products" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>&larr; Back to Categories</Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', color: '#111827', fontWeight: 800 }}>{umbrellaName}</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '1rem' }}>Manage products under this category.</p>
        </div>
        <Link href={`/admin/products/new?category=${encodeURIComponent(umbrellaName)}`} style={{ backgroundColor: '#071F45', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          + Add Item to {umbrellaName}
        </Link>
      </div>

      {nestedGroups.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px', border: '1px dashed #E5E7EB' }}>
          No items found in this category.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {nestedGroups.map(group => (
            <div key={group.transparencyName} style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '20px 30px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: group.transparencyName.toLowerCase().includes('blackout') ? '#111' : group.transparencyName.toLowerCase().includes('darkening') ? '#666' : '#D4AF37' }}></span>
                <h3 style={{ margin: 0, color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>{group.transparencyName}</h3>
                <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600, marginLeft: 'auto', backgroundColor: '#F3F4F6', padding: '4px 12px', borderRadius: '20px' }}>
                  {group.items.length} Options
                </span>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '15px 30px', fontSize: '0.75rem', color: '#888', fontWeight: 700 }}>FABRIC / ITEM</th>
                    <th style={{ padding: '15px 30px', fontSize: '0.75rem', color: '#888', fontWeight: 700 }}>PRICE</th>
                    <th style={{ padding: '15px 30px', fontSize: '0.75rem', color: '#888', fontWeight: 700 }}>STATUS</th>
                    <th style={{ padding: '15px 30px', fontSize: '0.75rem', color: '#888', fontWeight: 700, textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map(item => (
                    <tr key={item.id || item._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '16px 30px', width: '40%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{ 
                            width: '45px', height: '45px', backgroundColor: '#f5f5f5', borderRadius: '6px',
                            backgroundImage: (item.images && item.images[0]) ? `url(${item.images[0].url})` : (item.imageUrl ? `url(${item.imageUrl})` : 'none'),
                            backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #eee'
                          }}></div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827' }}>{item.name || 'Unnamed'}</div>
                            <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>ID: {item.id || item._id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 30px', width: '20%', fontSize: '0.95rem', fontWeight: 700, color: '#374151' }}>
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
                          <Link href={`/product/${item.id || item._id}`} style={{ fontSize: '0.75rem', color: '#6B7280', textDecoration: 'none', fontWeight: 700 }}>VIEW</Link>
                          <Link href={`/admin/products/${item.id || item._id}/edit`} style={{ fontSize: '0.75rem', color: '#071F45', textDecoration: 'none', fontWeight: 700 }}>EDIT</Link>
                          <button onClick={() => handleDelete(item.id || item._id)} style={{ border: 'none', background: 'none', fontSize: '0.75rem', color: '#ef4444', cursor: 'pointer', padding: 0, fontWeight: 700 }}>DELETE</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

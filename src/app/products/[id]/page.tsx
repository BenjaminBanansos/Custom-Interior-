'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?category=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>Loading collection...</div>;

  const decodedName = decodeURIComponent(params.id);

  // Group by Transparency
  const transparencies = ['Translucent', 'Room Darkening', 'Blackout'];
  products.forEach(p => {
    const trans = p.transparency || 'Uncategorized';
    if (!transparencies.includes(trans)) {
      transparencies.push(trans);
    }
  });

  const grouped = transparencies.map(trans => ({
    name: trans,
    items: products.filter(p => p.transparency === trans || (!p.transparency && trans === 'Uncategorized'))
  })).filter(g => g.items.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F5F7F9', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: '0 10%', height: '90px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img src="/smart_decor_logo.jpg" alt="Smart Decor Logo" style={{ height: '60px', borderRadius: '8px', objectFit: 'contain' }} />
            <span style={{ fontWeight: 700, fontSize: '1.4rem', color: '#071F45', letterSpacing: '-0.5px', fontFamily: 'Outfit, sans-serif' }}>SMART DECOR</span>
          </Link>
          <nav style={{ display: 'flex', gap: '24px', marginLeft: '2rem' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#071F45', fontWeight: 500 }}>Home</Link>
            <Link href="/products/all" style={{ textDecoration: 'none', color: '#D4AF37', fontWeight: 700 }}>Shop</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div style={{ backgroundColor: '#071F45', padding: '60px 10%', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '3.5rem', fontFamily: 'Outfit, sans-serif', margin: 0 }}>{decodedName}</h1>
        <p style={{ color: '#D4AF37', fontSize: '1.2rem', marginTop: '10px', fontWeight: 600, letterSpacing: '0.05em' }}>PREMIUM COLLECTION</p>
      </div>

      {/* Main Content: Grouped by Transparency */}
      <div style={{ padding: '60px 10%', flex: 1 }}>
        {grouped.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6B7280', fontSize: '1.2rem', padding: '40px' }}>No items found for this collection yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {grouped.map(group => (
              <section key={group.name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', borderBottom: '2px solid #E5E7EB', paddingBottom: '15px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: group.name.toLowerCase().includes('blackout') ? '#111' : group.name.toLowerCase().includes('darkening') ? '#666' : '#D4AF37' }}></span>
                  <h2 style={{ fontSize: '2rem', color: '#071F45', fontFamily: 'Outfit, sans-serif', margin: 0 }}>{group.name} Options</h2>
                  <span style={{ marginLeft: 'auto', backgroundColor: '#EEF4FB', color: '#071F45', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>{group.items.length} Designs</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                  {group.items.map(item => (
                    <Link href={`/product/${item.id || item._id}`} key={item.id || item._id} style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', transition: 'transform 0.3s' }}>
                      <div style={{ height: '240px', backgroundColor: '#F9FAFB', backgroundImage: (item.images && item.images[0]) ? `url(${item.images[0].url})` : (item.imageUrl ? `url(${item.imageUrl})` : 'none'), backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {!(item.images && item.images[0]) && !item.imageUrl && <span style={{ color: '#9CA3AF' }}>No Image</span>}
                      </div>
                      <div style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '1.3rem', color: '#071F45', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>{item.name}</h3>
                        <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '16px' }}>{item.material || 'Premium Fabric'}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111827' }}>${item.basePrice || 0}</span>
                          <span style={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.85rem' }}>View Details &rarr;</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

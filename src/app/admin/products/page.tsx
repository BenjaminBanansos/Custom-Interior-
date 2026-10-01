'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [baseProducts, setBaseProducts] = useState<any[]>([]);
  const [umbrellas, setUmbrellas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get base products first, then regular products
  async function loadData() {
    setIsLoading(true);
    try {
      const bRes = await fetch('/api/base-products?t=' + Date.now());
      const allBase = await bRes.json();
      
      const pRes = await fetch('/api/products?t=' + Date.now());
      const allProds = await pRes.json();
      
      // Group products into umbrellas (categories)
      const uMap = new Map();
      
      // Seed with base products
      allBase.forEach((b: any) => {
        if (!uMap.has(b.name)) {
          uMap.set(b.name, {
            name: b.name,
            image: b.imageUrl,
            itemsCount: 0
          });
        }
      });
      
      // Count actual products
      (allProds || []).forEach((p: any) => {
        const u = p.category || 'Unassigned Items';
        if (!uMap.has(u)) {
          uMap.set(u, {
            name: u,
            image: p.images?.[0]?.url || p.imageUrl || null,
            itemsCount: 0
          });
        }
        const uObj = uMap.get(u);
        uObj.itemsCount++;
        if (!uObj.image && (p.images?.[0]?.url || p.imageUrl)) {
          uObj.image = p.images?.[0]?.url || p.imageUrl;
        }
      });
      
      setBaseProducts(allBase);
      setUmbrellas(Array.from(uMap.values()));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) return <div style={{ padding: '40px' }}>Loading catalog...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', color: '#111827', fontWeight: 800 }}>Product Categories</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '1rem' }}>Select a category to view opacities and items.</p>
        </div>
        <Link href="/admin/products/new" style={{ backgroundColor: '#071F45', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          + Create Product
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {umbrellas.map((umb: any) => (
          <Link key={umb.name} href={`/admin/products/${encodeURIComponent(umb.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <div style={{ 
                height: '160px', 
                backgroundColor: '#F3F4F6', 
                backgroundImage: umb.image ? `url(${umb.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {!umb.image && <span style={{ color: '#9CA3AF' }}>No Image</span>}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#111827', fontWeight: 700 }}>{umb.name}</h3>
                <span style={{ fontSize: '0.8rem', color: '#6B7280', backgroundColor: '#F3F4F6', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>
                  {umb.itemsCount} Items
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

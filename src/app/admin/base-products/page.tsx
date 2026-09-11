'use client';
import React, { useState, useEffect } from 'react';

export default function BaseProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<any>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch('/api/base-products');
    const data = await res.json();
    setProducts(data);
  }

  const handleModalSave = async () => {
    if (!modal.name) return;
    setIsSubmitting(true);
    
    const target = {
      id: modal.isNew ? modal.name.toLowerCase().replace(/ /g, '-') : modal.id,
      name: modal.name,
      description: modal.description,
      imageUrl: modal.imageUrl || '',
      categories: typeof modal.categories === 'string' 
        ? modal.categories.split(',').map((s:string) => s.trim()).filter(Boolean)
        : (modal.categories || []),
      variantCount: modal.variantCount || 0
    };
    
    await fetch('/api/base-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(target)
    });
    
    await loadProducts();
    setModal(null);
    setIsSubmitting(false);
  };

  return (
    <div>
      <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>DIGITAL ATELIER CMS</span>
          <h1 style={{ fontSize: '2.5rem' }}>Products & Categories</h1>
          <p style={{ color: '#888', maxWidth: '600px', marginTop: '10px' }}>
            Manage the primary product families (e.g. Roller Shades, Honeycomb Blinds).
          </p>
        </div>
        <button 
          onClick={() => setModal({ isNew: true, name: '', description: '', imageUrl: '', categories: '' })}
          disabled={isSubmitting}
          style={{ backgroundColor: '#000', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', opacity: isSubmitting ? 0.5 : 1 }}
        >+ NEW PRODUCT</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {products.map(p => (
          <div key={p.id} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ height: '200px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {!p.imageUrl && <div style={{ width: '120px', height: '140px', backgroundColor: '#fff', border: '1px solid #eee', position: 'relative' }}></div>}
            </div>
            <div style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{p.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '25px', minHeight: '40px' }}>{p.description}</p>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: '#aaa', marginBottom: '4px' }}>VARIANTS</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.variantCount || 0}</div>
                </div>
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ fontSize: '0.6rem', color: '#aaa', marginBottom: '6px' }}>CATEGORIES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(p.categories || []).map((cat: string) => (
                    <span key={cat} style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>{cat}</span>
                  ))}
                  {(!p.categories || p.categories.length === 0) && <span style={{ fontSize: '0.75rem', color: '#ccc' }}>None</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setModal({ isNew: false, id: p.id, name: p.name, description: p.description, imageUrl: p.imageUrl, categories: (p.categories||[]).join(', '), variantCount: p.variantCount })} style={{ flex: 1, padding: '10px', backgroundColor: '#f5f5f5', border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>EDIT</button>
                <button onClick={async () => {
                  if(confirm('Are you sure you want to delete this product?')) {
                    await fetch('/api/base-products?id=' + p.id, { method: 'DELETE' });
                    loadProducts();
                  }
                }} style={{ padding: '10px', backgroundColor: '#ffefef', color: '#ff4d4f', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{modal.isNew ? 'Add Product' : 'Edit Product'}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Product Name</label>
              <input type="text" value={modal.name} onChange={e => setModal({...modal, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Image URL</label>
              <input type="text" value={modal.imageUrl} onChange={e => setModal({...modal, imageUrl: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Categories (comma-separated, e.g. Translucent, Blackout)</label>
              <input type="text" value={modal.categories} onChange={e => setModal({...modal, categories: e.target.value})} placeholder="Translucent, Blackout..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Description</label>
              <textarea value={modal.description} onChange={e => setModal({...modal, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px', fontFamily: 'inherit' }} />
            </div>
            
            <button onClick={handleModalSave} disabled={isSubmitting} style={{ width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', opacity: isSubmitting ? 0.5 : 1 }}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
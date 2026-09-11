'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '../../../lib/products';
import { getCategories, saveCategory } from '../../../lib/storage_actions';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [catModal, setCatModal] = useState<any>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  const handleAddCategory = () => {
    setCatModal({ isNew: true, name: '', description: 'Professional architectural window treatments.', imageUrl: '' });
  };

  const handleEditCategory = (cat: Category) => {
    setCatModal({ isNew: false, id: cat.id, name: cat.name, description: cat.description || '', imageUrl: cat.imageUrl || '', productCount: cat.productCount, viewCount: cat.viewCount });
  };

  const handleModalSave = async () => {
    if (!catModal.name) return;
    setIsSubmitting(true);
    
    let targetCat: Category;
    if (catModal.isNew) {
      targetCat = {
        id: catModal.name.toLowerCase().replace(/ /g, '-'),
        name: catModal.name,
        description: catModal.description,
        imageUrl: catModal.imageUrl,
        productCount: 0,
        viewCount: 0
      };
    } else {
      targetCat = {
        id: catModal.id,
        name: catModal.name,
        description: catModal.description,
        imageUrl: catModal.imageUrl,
        productCount: catModal.productCount,
        viewCount: catModal.viewCount
      };
    }
    
    await saveCategory(targetCat);
    await loadCategories();
    setCatModal(null);
    setIsSubmitting(false);
  };

  return (
    <div>
      <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>DIGITAL ATELIER CMS</span>
          <h1 style={{ fontSize: '2.5rem' }}>Category Manager</h1>
          <p style={{ color: '#888', maxWidth: '600px', marginTop: '10px' }}>
            Curate the architectural structure of your product catalog. Drag to reorder the user's discovery journey.
          </p>
        </div>
        <button 
          onClick={handleAddCategory}
          disabled={isSubmitting}
          style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            padding: '12px 24px', 
            border: 'none', 
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: isSubmitting ? 0.5 : 1
          }}>+ NEW CATEGORY</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {categories.map(cat => (
          <div key={cat.id} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ 
            height: '200px', 
            backgroundColor: '#f9f9f9', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundImage: cat.imageUrl ? `url(${cat.imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {!cat.imageUrl && (
              <div style={{ width: '120px', height: '140px', backgroundColor: '#fff', border: '1px solid #eee', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', backgroundColor: '#eee' }}></div>
              </div>
            )}
          </div>
            
            <div style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.2rem' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.6rem', padding: '4px 8px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontWeight: 700 }}>PREMIUM</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '25px', minHeight: '40px' }}>{cat.description}</p>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: '#aaa', marginBottom: '4px' }}>PRODUCTS</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cat.productCount}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', color: '#aaa', marginBottom: '4px' }}>VIEWS</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{(cat.viewCount / 1000).toFixed(1)}k</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEditCategory(cat)} style={{ flex: 1, padding: '10px', backgroundColor: '#f5f5f5', border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>EDIT</button>
                <button onClick={async () => {
                  if(confirm('Are you sure you want to delete this category?')) {
                    await fetch('/api/categories?id=' + cat.id, { method: 'DELETE' });
                    loadCategories();
                  }
                }} style={{ padding: '10px', backgroundColor: '#ffefef', color: '#ff4d4f', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {catModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{catModal.isNew ? 'Add Category' : 'Edit Category'}</h3>
              <button onClick={() => setCatModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Category Name</label>
              <input type="text" value={catModal.name} onChange={e => setCatModal({...catModal, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Image URL</label>
              <input type="text" value={catModal.imageUrl} onChange={e => setCatModal({...catModal, imageUrl: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Description</label>
              <textarea value={catModal.description} onChange={e => setCatModal({...catModal, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px', fontFamily: 'inherit' }} />
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

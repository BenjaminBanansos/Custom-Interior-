'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getTheme, saveTheme, ThemeConfig } from '../../../lib/theme_actions';
import { getProducts } from '../../../lib/storage_actions';
import { Product } from '../../../lib/products';

export default function ThemeDesignPage() {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout' | 'sorting'>('colors');

  useEffect(() => {
    getTheme().then(setTheme);
    getProducts().then(setProducts);
  }, []);

  // Sync theme changes to the iframe preview instantly
  useEffect(() => {
    if (theme && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_THEME', theme }, '*');
    }
  }, [theme]);

  const handleSave = async () => {
    if (!theme) return;
    setIsSaving(true);
    const success = await saveTheme(theme);
    setIsSaving(false);
    if (success) alert('Theme updated successfully! The storefront is now live with these changes.');
    else alert('Failed to update theme.');
  };

  const moveProduct = (fromIndex: number, toIndex: number) => {
    if (!theme) return;
    // Initialize productOrder if empty
    let currentOrder = [...(theme.productOrder || [])];
    if (currentOrder.length === 0) {
      currentOrder = products.map(p => p.id);
    }
    
    const [movedId] = currentOrder.splice(fromIndex, 1);
    currentOrder.splice(toIndex, 0, movedId);
    setTheme({ ...theme, productOrder: currentOrder });
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    if (!theme) return;
    const currentOrder = [...theme.sectionOrder];
    const [moved] = currentOrder.splice(fromIndex, 1);
    currentOrder.splice(toIndex, 0, moved);
    setTheme({ ...theme, sectionOrder: currentOrder });
  };

  const addToCuratedList = (listName: 'popular' | 'budget' | 'lightFiltering', productId: string) => {
    if (!theme) return;
    const currentList = [...theme.curatedLists[listName]];
    if (!currentList.includes(productId)) {
      currentList.push(productId);
      setTheme({ ...theme, curatedLists: { ...theme.curatedLists, [listName]: currentList } });
    }
  };

  const removeFromCuratedList = (listName: 'popular' | 'budget' | 'lightFiltering', productId: string) => {
    if (!theme) return;
    const currentList = theme.curatedLists[listName].filter(id => id !== productId);
    setTheme({ ...theme, curatedLists: { ...theme.curatedLists, [listName]: currentList } });
  };

  if (!theme) return <div style={{ padding: '40px', color: '#888' }}>Loading theme configuration...</div>;

  const currentProductOrder = theme.productOrder?.length > 0 ? theme.productOrder : products.map(p => p.id);
  const orderedProducts = currentProductOrder.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];

  return (
    <div style={{ display: 'flex', height: '100vh', margin: '-40px' /* Offset admin padding */ }}>
      {/* Left Sidebar (Controls) */}
      <div style={{ width: '400px', backgroundColor: '#fff', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <header style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Visual Theme Editor</h1>
            <span style={{ fontSize: '0.7rem', color: '#888' }}>LIVE PREVIEW ACTIVE</span>
          </div>
          <button onClick={handleSave} disabled={isSaving} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#000', color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: isSaving ? 0.5 : 1 }}>
            {isSaving ? 'Saving...' : 'Publish'}
          </button>
        </header>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          {['colors', 'typography', 'layout', 'sorting'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} style={{ flex: 1, padding: '12px 0', border: 'none', background: activeTab === tab ? '#fafafa' : '#fff', borderBottom: activeTab === tab ? '2px solid #000' : '2px solid transparent', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Control Panels */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#fafafa' }}>
          
          {activeTab === 'colors' && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Primary Accent</label>
                <input type="color" value={theme.colors.primary} onChange={e => setTheme({ ...theme, colors: { ...theme.colors, primary: e.target.value } })} style={{ width: '100%', height: '40px', padding: '0', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Background Color</label>
                <input type="color" value={theme.colors.background} onChange={e => setTheme({ ...theme, colors: { ...theme.colors, background: e.target.value } })} style={{ width: '100%', height: '40px', padding: '0', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Text Color</label>
                <input type="color" value={theme.colors.text} onChange={e => setTheme({ ...theme, colors: { ...theme.colors, text: e.target.value } })} style={{ width: '100%', height: '40px', padding: '0', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Heading Font</label>
                <select value={theme.typography.heading} onChange={e => setTheme({ ...theme, typography: { ...theme.typography, heading: e.target.value } })} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <option value="Outfit, sans-serif">Outfit</option>
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Times New Roman, serif">Times New Roman</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Body Font</label>
                <select value={theme.typography.body} onChange={e => setTheme({ ...theme, typography: { ...theme.typography, body: e.target.value } })} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <option value="Outfit, sans-serif">Outfit</option>
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Arial, sans-serif">Arial</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div style={{ display: 'grid', gap: '30px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>Max Container Width</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {['1000px', '1200px', '1400px', '100%'].map(w => (
                    <button key={w} onClick={() => setTheme({ ...theme, containerWidth: w })} style={{ padding: '8px', border: theme.containerWidth === w ? '2px solid #000' : '1px solid #ddd', background: '#fff', borderRadius: '4px' }}>{w}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>Catalog Grid Columns</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[2, 3, 4].map(c => (
                    <button key={c} onClick={() => setTheme({ ...theme, catalogGridCols: c })} style={{ padding: '8px', border: theme.catalogGridCols === c ? '2px solid #000' : '1px solid #ddd', background: '#fff', borderRadius: '4px' }}>{c}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>Thumbnail Ratio</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {['landscape', 'square', 'portrait'].map(r => (
                    <button key={r} onClick={() => setTheme({ ...theme, catalogImageRatio: r as any })} style={{ padding: '8px', border: theme.catalogImageRatio === r ? '2px solid #000' : '1px solid #ddd', background: '#fff', borderRadius: '4px', textTransform: 'capitalize' }}>{r}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>Product Image Size</label>
                <input type="range" min="300" max="700" step="50" value={theme.productImageSize} onChange={e => setTheme({ ...theme, productImageSize: parseInt(e.target.value) })} style={{ width: '100%' }} />
                <div style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '5px' }}>{theme.productImageSize}px</div>
              </div>
            </div>
          )}

          {activeTab === 'sorting' && (
            <div style={{ display: 'grid', gap: '40px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>Homepage Section Flow</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {theme.sectionOrder.map((section, index) => (
                    <div 
                      key={section}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('sectionIndex', index.toString())}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const fromIndex = parseInt(e.dataTransfer.getData('sectionIndex'));
                        moveSection(fromIndex, index);
                      }}
                      style={{ padding: '12px 16px', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'grab', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span style={{ fontSize: '0.9rem', textTransform: 'capitalize' }}>{section} Section</span>
                      <span style={{ color: '#aaa' }}>☰</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '5px' }}>Curated Collections</label>
                <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '15px' }}>Drag products from the "All Products" pool below into these curated buckets.</p>
                
                {['popular', 'budget', 'lightFiltering'].map(listName => (
                  <div 
                    key={listName} 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const productId = e.dataTransfer.getData('productId');
                      if (productId) addToCuratedList(listName as any, productId);
                    }}
                    style={{ marginBottom: '20px', padding: '15px', background: '#fff', border: '2px dashed #ccc', borderRadius: '8px' }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      {listName === 'popular' ? 'Most Popular' : listName === 'budget' ? 'Budget Friendly' : 'Light Filtering'}
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {theme.curatedLists[listName as keyof typeof theme.curatedLists].map(id => {
                        const p = products.find(prod => prod.id === id);
                        if (!p) return null;
                        return (
                          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            <span>{p.name}</span>
                            <button onClick={() => removeFromCuratedList(listName as any, p.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'red', fontWeight: 'bold' }}>×</button>
                          </div>
                        );
                      })}
                      {theme.curatedLists[listName as keyof typeof theme.curatedLists].length === 0 && (
                        <span style={{ fontSize: '0.75rem', color: '#aaa' }}>Drop products here...</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '5px' }}>All Products Pool</label>
                <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '15px' }}>Drag these to reorder the main catalog, or drag them into the curated buckets above.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {orderedProducts.map((p, index) => (
                    <div 
                      key={p.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('productIndex', index.toString());
                        e.dataTransfer.setData('productId', p.id);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const fromIndex = parseInt(e.dataTransfer.getData('productIndex'));
                        if (!isNaN(fromIndex)) moveProduct(fromIndex, index);
                      }}
                      style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <div style={{ width: '30px', height: '30px', backgroundColor: '#eee', backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : 'none', backgroundSize: 'cover', borderRadius: '4px' }}></div>
                      <span style={{ fontSize: '0.8rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                      <span style={{ color: '#aaa', fontSize: '0.8rem' }}>☰</span>
                    </div>
                  ))}
                </div>
                {orderedProducts.length === 0 && <div style={{ fontSize: '0.8rem', color: '#888' }}>No products found.</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane (Live Preview) */}
      <div style={{ flex: 1, backgroundColor: '#f0f0f0', position: 'relative' }}>
        <iframe 
          ref={iframeRef}
          src="/"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
        {/* Transparent overlay while saving to prevent interaction */}
        {isSaving && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.5)' }}></div>}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Product, FabricFamily, FabricColor } from '../lib/products';
import { ThemeConfig } from '../lib/theme_actions';

interface ConfiguratorProps {
  product: Product;
  theme?: ThemeConfig;
}

export default function Configurator({ product, theme }: ConfiguratorProps) {
  const [width, setWidth] = useState('24');
  const [height, setHeight] = useState('36');
  const [quantity, setQuantity] = useState('1');
  
  // Advanced State
  const initialFamily = product.fabricFamilies?.[0];
  const [selectedFamily, setSelectedFamily] = useState<FabricFamily | null>(initialFamily || null);
  const [selectedColor, setSelectedColor] = useState<FabricColor | null>(initialFamily?.colors?.[0] || null);
  
  // Modifiers: Map of groupId -> optionId
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string>>({});
  // Sub-Attributes: Map of subAttributeId -> choiceId
  const [selectedSubAttributes, setSelectedSubAttributes] = useState<Record<string, string>>({});
  
  const [totalPrice, setTotalPrice] = useState(product.basePrice);
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = () => {
    if (!selectedFamily) return;
    const idx = selectedFamily.colors.findIndex(c => c.colorId === selectedColor?.colorId);
    setLightboxIndex(idx !== -1 ? idx : 0);
    setLightboxOpen(true);
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedFamily) return;
    const newIdx = (lightboxIndex + 1) % selectedFamily.colors.length;
    setLightboxIndex(newIdx);
    setSelectedColor(selectedFamily.colors[newIdx]);
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedFamily) return;
    const newIdx = (lightboxIndex - 1 + selectedFamily.colors.length) % selectedFamily.colors.length;
    setLightboxIndex(newIdx);
    setSelectedColor(selectedFamily.colors[newIdx]);
  };

  const parseFraction = (val: string): number => {
    if (!val) return 0;
    if (val.includes(' ')) {
      const [whole, frac] = val.split(' ');
      return parseFloat(whole) + parseFraction(frac);
    }
    if (val.includes('/')) {
      const [num, den] = val.split('/');
      return parseFloat(num) / parseFloat(den);
    }
    return parseFloat(val) || 0;
  };

  useEffect(() => {
    const w = parseFraction(width);
    const h = parseFraction(height);
    
    let price = 0;
    if (product.basePriceMode === 'perSqFt') {
      const sqFt = (w * h) / 144;
      price = sqFt * product.basePrice;
    } else {
      price = product.basePrice;
    }

    // Add Fabric Family Modifier
    if (selectedFamily) price += selectedFamily.priceModifier;

    // Add Modifiers and Sub-Attributes
    product.modifiers?.forEach(group => {
      const selectedOptionId = selectedModifiers[group.id];
      if (selectedOptionId) {
        const option = group.options.find(o => o.id === selectedOptionId);
        if (option) {
          price += option.priceAdjustment;
          // Sub-attributes
          option.subAttributes?.forEach(sub => {
            const selectedChoiceId = selectedSubAttributes[sub.id];
            if (selectedChoiceId) {
              const choice = sub.choices.find(c => c.id === selectedChoiceId);
              if (choice) price += choice.priceAdjustment;
            }
          });
        }
      }
    });

    setTotalPrice(Math.round(price) * (parseInt(quantity) || 1));
  }, [width, height, quantity, selectedFamily, selectedColor, selectedModifiers, selectedSubAttributes, product]);

  const bgImageUrl = selectedColor?.mediaUrl || product.imageUrl || '';

  return (
    <>
      <style>{`
        .config-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .config-container {
            flex-direction: row;
            align-items: flex-start;
            gap: 60px;
          }
        }
        .visual-panel {
          position: relative;
          height: 300px;
          width: 300px;
          border-radius: 16px;
          margin-top: 20px;
          background-color: ${selectedColor?.hex || '#f9f9f9'};
          background-image: ${bgImageUrl ? `url(${bgImageUrl})` : 'none'};
          background-size: cover;
          background-position: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          flex-shrink: 0;
          border: 1px solid rgba(0,0,0,0.05);
        }
        @media (min-width: 1024px) {
          .visual-panel {
            width: ${theme?.productImageSize || 500}px;
            height: ${theme?.productImageSize || 500}px;
            position: sticky;
            top: 140px;
            margin-top: 40px;
          }
        }
        .control-panel {
          width: 100%;
          padding: 40px 0;
          background: transparent;
        }
        @media (min-width: 1024px) {
          .control-panel {
            flex: 1;
            padding: 40px 0 140px 0; 
          }
        }
        .glass-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(0,0,0,0.05);
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.05);
        }
        @media (min-width: 1024px) {
          .glass-bar {
            width: 600px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 16px 16px 0 0;
            border: 1px solid rgba(0,0,0,0.05);
            padding: 20px 40px;
          }
        }
      `}</style>

      <div className="config-container">
        {/* Visual Preview */}
        <div className="visual-panel" onClick={openLightbox} style={{ cursor: 'pointer' }}>
          <div style={{ position: 'absolute', bottom: '-30px', left: 0, width: '100%', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, color: '#888' }}>
            PREVIEW: {selectedColor?.name || 'Base Model'}
          </div>
          <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.8)', padding: '8px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            🔍 ENLARGE
          </div>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 400, letterSpacing: '-0.03em' }}>{product.name}</h2>
          
          {/* Measurements */}
          <div style={{ marginBottom: '4rem' }}>
            <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block', color: '#000' }}>
              Precision Dimensions
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '8px' }}>WIDTH (IN)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 24 1/2"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  style={{ width: '100%', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '0', fontSize: '1.1rem', outline: 'none', background: '#fafafa', transition: 'border 0.3s' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '8px' }}>HEIGHT (IN)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 36 3/4"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  style={{ width: '100%', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '0', fontSize: '1.1rem', outline: 'none', background: '#fafafa', transition: 'border 0.3s' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '8px' }}>QUANTITY</label>
                <input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ width: '100%', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '0', fontSize: '1.1rem', outline: 'none', background: '#fafafa', transition: 'border 0.3s' }}
                />
              </div>
            </div>
          </div>

          {/* Fabric Selection */}
          {product.fabricFamilies && product.fabricFamilies.length > 0 && (
            <div style={{ marginBottom: '4rem' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block', color: '#000' }}>
                Architectural Finish
              </label>
              
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
                {product.fabricFamilies.map(fam => (
                  <button 
                    key={fam.fabricId}
                    onClick={() => { setSelectedFamily(fam); setSelectedColor(fam.colors[0] || null); }}
                    style={{ 
                      padding: '10px 20px', borderRadius: '30px', border: selectedFamily?.fabricId === fam.fabricId ? '1px solid #000' : '1px solid #eaeaea', cursor: 'pointer', whiteSpace: 'nowrap',
                      backgroundColor: selectedFamily?.fabricId === fam.fabricId ? '#000' : '#fff',
                      color: selectedFamily?.fabricId === fam.fabricId ? '#fff' : '#000',
                      fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.3s'
                    }}
                  >{fam.name} {fam.priceModifier > 0 && `(+$${fam.priceModifier})`}</button>
                ))}
              </div>

              {selectedFamily && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '15px' }}>
                  {selectedFamily.colors.map(color => (
                    <div 
                      key={color.colorId}
                      onClick={() => setSelectedColor(color)}
                      style={{ 
                        border: selectedColor?.colorId === color.colorId ? '2px solid #000' : '1px solid transparent',
                        padding: '4px', borderRadius: '8px', cursor: 'pointer', opacity: color.status === 'out-of-stock' ? 0.5 : 1,
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ 
                        height: '70px', backgroundColor: color.hex, borderRadius: '4px',
                        backgroundImage: color.mediaUrl ? `url(${color.mediaUrl})` : 'none',
                        backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}></div>
                      <div style={{ padding: '8px 0 0 0', fontSize: '0.65rem', textAlign: 'center', fontWeight: 600, color: '#333' }}>{color.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dynamic Modifiers */}
          {product.modifiers && product.modifiers.map(group => {
            const selectedOption = group.options.find(o => o.id === selectedModifiers[group.id]);
            
            return (
              <div key={group.id} style={{ marginBottom: '4rem', borderTop: '1px solid #eaeaea', paddingTop: '3rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block', color: '#000' }}>
                  {group.name}
                </label>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                  {group.options.map(opt => (
                    <div 
                      key={opt.id}
                      onClick={() => setSelectedModifiers({ ...selectedModifiers, [group.id]: opt.id })}
                      style={{ 
                        border: selectedOption?.id === opt.id ? '2px solid #000' : '1px solid #eaeaea',
                        padding: '20px', cursor: 'pointer', background: selectedOption?.id === opt.id ? '#fafafa' : '#fff',
                        display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.2s'
                      }}
                    >
                      {opt.mediaUrl && (
                        <div style={{ width: '60px', height: '60px', borderRadius: '4px', backgroundImage: `url(${opt.mediaUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', flexShrink: 0, border: '1px solid #eee', backgroundColor: '#fff' }} />
                      )}
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 400, color: '#000' }}>{opt.name}</div>
                        <div style={{ fontSize: '0.8rem', color: opt.priceAdjustment > 0 ? '#10b981' : '#888', marginTop: '4px' }}>{opt.priceAdjustment > 0 ? `+ $${opt.priceAdjustment}` : 'Included in Base'}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-Attributes Accordion */}
                {selectedOption && selectedOption.subAttributes && selectedOption.subAttributes.length > 0 && (
                  <div style={{ marginTop: '20px', padding: '20px 20px 20px 30px', borderLeft: '2px solid #000' }}>
                    {selectedOption.subAttributes.map(sub => (
                      <div key={sub.id} style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px', color: '#555' }}>{sub.name}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {sub.choices.map(choice => (
                            <button 
                              key={choice.id}
                              onClick={() => setSelectedSubAttributes({ ...selectedSubAttributes, [sub.id]: choice.id })}
                              style={{ 
                                padding: '10px 20px', cursor: 'pointer', fontSize: '0.8rem',
                                border: selectedSubAttributes[sub.id] === choice.id ? '1px solid #000' : '1px solid #ddd',
                                backgroundColor: selectedSubAttributes[sub.id] === choice.id ? '#000' : '#fff',
                                color: selectedSubAttributes[sub.id] === choice.id ? '#fff' : '#000',
                                transition: 'all 0.2s'
                              }}
                            >
                              {choice.name} {choice.priceAdjustment > 0 && `(+$${choice.priceAdjustment})`}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Glassmorphic Cart Bar */}
      <div className="glass-bar">
        <div>
          <span style={{ fontSize: '0.7rem', color: '#555', fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>ESTIMATED TOTAL</span>
          <span style={{ fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.05em' }}>${totalPrice}</span>
        </div>
        <button style={{ padding: '16px 32px', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          ADD TO PROJECT
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedFamily && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'
        }} onClick={() => setLightboxOpen(false)}>
          
          <button style={{ position: 'absolute', top: '30px', right: '30px', background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', padding: '10px' }} onClick={() => setLightboxOpen(false)}>✕</button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', maxWidth: '90vw' }}>
            <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '3rem', padding: '20px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px' }} onClick={prevLightboxImage}>‹</button>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={selectedFamily.colors[lightboxIndex]?.mediaUrl} alt={selectedFamily.colors[lightboxIndex]?.name} style={{ maxHeight: '75vh', maxWidth: '75vw', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              <div style={{ color: 'white', marginTop: '20px', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                {selectedFamily.colors[lightboxIndex]?.name}
              </div>
            </div>

            <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '3rem', padding: '20px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px' }} onClick={nextLightboxImage}>›</button>
          </div>
        </div>
      )}
    </>
  );
}


'use client';

import React, { useState, useEffect } from 'react';
import { Product, FabricFamily, FabricColor } from '../lib/products';
import { ThemeConfig } from '../lib/theme_actions';
import { addToCart } from '../lib/cart_actions';
import { useRouter } from 'next/navigation';

interface ConfiguratorProps {
  product: Product;
  theme?: ThemeConfig;
  allProducts?: Product[];
}

export default function Configurator({ product, theme }: ConfiguratorProps) {
  const router = useRouter();
  const [width, setWidth] = useState('24');
  const [widthFraction, setWidthFraction] = useState('0');
  const [height, setHeight] = useState('36');
  const [heightFraction, setHeightFraction] = useState('0');
  const [quantity, setQuantity] = useState('1');
  const [roomName, setRoomName] = useState('');
  
  const initialFamily = product.fabricFamilies?.[0];
  const [selectedFamily, setSelectedFamily] = useState<FabricFamily | null>(initialFamily || null);
  const categories = Array.from(new Set((product.fabricFamilies || []).map(f => f.category || 'Standard'))).sort();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<FabricColor | null>(initialFamily?.colors?.[0] || null);
  
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string>>({});
  const [selectedSubAttributes, setSelectedSubAttributes] = useState<Record<string, string>>({});
  
  const [totalPrice, setTotalPrice] = useState(product.basePrice);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hardwareLightboxImage, setHardwareLightboxImage] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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

  const handleOrderSubmit = async () => {
    setOrderStatus('submitting');
    
    const orderDetails = {
      family: selectedFamily?.name,
      color: selectedColor?.name,
      roomName: roomName || 'Unspecified Room',
      modifiers: Object.entries(selectedModifiers).map(([groupId, optId]) => {
        const group = product.modifiers?.find(m => m.id === groupId);
        const opt = group?.options.find(o => o.id === optId);
        return `${group?.name}: ${opt?.name}`;
      }),
      subAttributes: Object.entries(selectedSubAttributes).map(([subId, choiceId]) => {
        return `${subId}: ${choiceId}`;
      })
    };

    const w = (parseFloat(width) || 0) + parseFraction(widthFraction);
    const h = (parseFloat(height) || 0) + parseFraction(heightFraction);

    const localCartId = typeof window !== 'undefined' ? localStorage.getItem('local_cart_id') || undefined : undefined;

    const res = await addToCart({
      productName: product.name,
      width: w.toString(),
      height: h.toString(),
      quantity: parseInt(quantity) || 1,
      totalPrice: totalPrice,
      details: orderDetails
    }, localCartId);

    if (res && res.error) {
      alert("Failed to add to cart: " + res.error);
      setOrderStatus('idle');
      return;
    }
    
    if (res && res.cartId && typeof window !== 'undefined') {
      localStorage.setItem('local_cart_id', res.cartId);
    }

    setOrderStatus('success');
    setRoomName(''); 
    setTimeout(() => setOrderStatus('idle'), 3000);
  };

  const getSelectedIds = () => Object.values(selectedModifiers);

  const getDynamicMinWidth = () => {
    const liftStyle = selectedModifiers['lift-style'];
    if (liftStyle === 'motorization') return 24;
    if (liftStyle === 'cordless') return 20;
    return 12;
  };

  const isOptionCompatible = (opt: any) => {
    const selected = getSelectedIds();
    if (opt.requires && opt.requires.length > 0) {
      if (!opt.requires.some((r: string) => selected.includes(r))) return false;
    }
    if (opt.excludes && opt.excludes.length > 0) {
      if (opt.excludes.some((e: string) => selected.includes(e))) return false;
    }
    return true;
  };

  useEffect(() => {
    const w = (parseFloat(width) || 0) + parseFraction(widthFraction);
    const h = (parseFloat(height) || 0) + parseFraction(heightFraction);
    
    let price = 0;
    if (product.basePriceMode === 'perSqFt') {
      const sqFt = (w * h) / 144;
      price = sqFt * product.basePrice;
    } else {
      price = product.basePrice;
    }

    if (selectedFamily) price += selectedFamily.priceModifier;

    let newSelectedModifiers = { ...selectedModifiers };
    let hasChanges = false;

    product.modifiers?.forEach(group => {
      const selectedOptionId = newSelectedModifiers[group.id];
      if (selectedOptionId) {
        const option = group.options.find(o => o.id === selectedOptionId);
        if (option) {
          if (!isOptionCompatible(option)) {
            delete newSelectedModifiers[group.id];
            hasChanges = true;
          } else {
            price += option.priceAdjustment;
            option.subAttributes?.forEach(sub => {
              const selectedChoiceId = selectedSubAttributes[sub.id];
              if (selectedChoiceId) {
                const choice = sub.choices.find(c => c.id === selectedChoiceId);
                if (choice) price += choice.priceAdjustment;
              }
            });
          }
        }
      }
    });

    if (hasChanges) {
      setSelectedModifiers(newSelectedModifiers);
    }

    setTotalPrice(Math.round(price) * (parseInt(quantity) || 1));
  }, [width, widthFraction, height, heightFraction, quantity, selectedFamily, selectedColor, selectedModifiers, selectedSubAttributes, product]);

  const bgImageUrl = selectedColor?.mediaUrl || product.imageUrl || '';

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-[1400px] mx-auto w-full relative">
      
      {/* Visual Preview Left Column */}
      <div className="w-full lg:w-1/2 flex-shrink-0">
        <div 
          onClick={openLightbox} 
          className="sticky top-32 w-full aspect-[4/5] rounded-[18px] bg-gray-50 shadow-sm cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-lg group"
          style={{
            backgroundColor: selectedColor?.hex || '#f9f9f9',
            backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-[#0B2C5F] px-4 py-2 rounded-full text-xs font-semibold tracking-wider shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            🔍 ENLARGE
          </div>
        </div>
      </div>

      {/* Control Panel Right Column */}
      <div className="w-full lg:w-1/2 pb-40">
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-serif text-[#0B2C5F] mb-4 leading-tight">{product.name}</h1>
          <p className="text-xl text-gray-500 font-medium">From ${product.basePrice}</p>
        </div>
        
        {/* Step 1: Measurements */}
        <div className="bg-white p-8 rounded-[18px] shadow-[0_12px_28px_rgba(11,44,95,0.06)] mb-8 transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(11,44,95,0.1)]">
          <h3 className="text-lg font-medium text-[#0B2C5F] mb-6">1. Dimensions & Quantity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">WIDTH (IN)</label>
              <div className="flex gap-3">
                <input type="number" min="12" value={width} onChange={(e) => setWidth(e.target.value)} className="w-2/3 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300" />
                <select value={widthFraction} onChange={(e) => setWidthFraction(e.target.value)} className="w-1/3 px-3 py-3 border border-gray-200 rounded-xl focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300 appearance-none bg-white">
                  <option value="0">0"</option>
                  <option value="1/8">1/8"</option>
                  <option value="1/4">1/4"</option>
                  <option value="3/8">3/8"</option>
                  <option value="1/2">1/2"</option>
                  <option value="5/8">5/8"</option>
                  <option value="3/4">3/4"</option>
                  <option value="7/8">7/8"</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">HEIGHT (IN)</label>
              <div className="flex gap-3">
                <input type="number" min="12" value={height} onChange={(e) => setHeight(e.target.value)} className="w-2/3 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300" />
                <select value={heightFraction} onChange={(e) => setHeightFraction(e.target.value)} className="w-1/3 px-3 py-3 border border-gray-200 rounded-xl focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300 appearance-none bg-white">
                  <option value="0">0"</option>
                  <option value="1/8">1/8"</option>
                  <option value="1/4">1/4"</option>
                  <option value="3/8">3/8"</option>
                  <option value="1/2">1/2"</option>
                  <option value="5/8">5/8"</option>
                  <option value="3/4">3/4"</option>
                  <option value="7/8">7/8"</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">ROOM NAME</label>
              <input type="text" placeholder="e.g. Master Bedroom" value={roomName} onChange={(e) => setRoomName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">QUANTITY</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300" />
            </div>
          </div>
        </div>

        {/* Step 2: Fabric Selection */}
        {product.fabricFamilies && product.fabricFamilies.length > 0 && (
          <div className="bg-white p-8 rounded-[18px] shadow-[0_12px_28px_rgba(11,44,95,0.06)] mb-8 transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(11,44,95,0.1)]">
            <h3 className="text-lg font-medium text-[#0B2C5F] mb-6">2. Fabric Collection</h3>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {product.fabricFamilies.map(fam => (
                <button 
                  key={fam.fabricId}
                  onClick={() => { setSelectedFamily(fam); setSelectedColor(fam.colors[0] || null); }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedFamily?.fabricId === fam.fabricId ? 'bg-[#0B2C5F] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0B2C5F] hover:text-[#0B2C5F]'}`}
                >{fam.name} {fam.priceModifier > 0 && `(+$${fam.priceModifier})`}</button>
              ))}
            </div>

            {/* Swatch Grid */}
            {selectedFamily && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-y-6 gap-x-4">
                {selectedFamily.colors.map(color => (
                  <div 
                    key={color.colorId}
                    onClick={() => setSelectedColor(color)}
                    className={`flex flex-col items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105 ${color.status === 'out-of-stock' ? 'opacity-50' : 'opacity-100'}`}
                  >
                    <div 
                      className={`w-14 h-14 rounded-full shadow-sm bg-cover bg-center bg-clip-content p-[2px] transition-all duration-300 ${selectedColor?.colorId === color.colorId ? 'border-[3px] border-[#0B2C5F]' : 'border-[3px] border-transparent'}`}
                      style={{ 
                        backgroundColor: color.hex, 
                        backgroundImage: color.mediaUrl ? `url(${color.mediaUrl})` : 'none'
                      }}
                    />
                    <span className={`text-xs text-center font-medium ${selectedColor?.colorId === color.colorId ? 'text-[#0B2C5F]' : 'text-gray-500'}`}>
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Modifiers */}
        {product.modifiers && product.modifiers.map((group, index) => {
          const selectedOption = group.options.find(o => o.id === selectedModifiers[group.id]);
          
          return (
            <div key={group.id} className="bg-white p-8 rounded-[18px] shadow-[0_12px_28px_rgba(11,44,95,0.06)] mb-8 transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(11,44,95,0.1)]">
              <h3 className="text-lg font-medium text-[#0B2C5F] mb-6">{index + 3}. {group.name}</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {group.options.map(opt => {
                  const isCompatible = isOptionCompatible(opt);
                  const isSelected = selectedOption?.id === opt.id;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => { if (isCompatible) setSelectedModifiers({ ...selectedModifiers, [group.id]: opt.id }); }}
                      className={`flex items-center gap-5 p-5 border rounded-xl transition-all duration-300 ${isSelected ? 'border-[#0B2C5F] bg-[#EEF4FB]/30' : 'border-gray-200 bg-white hover:border-gray-300'} ${isCompatible ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-50'}`}
                    >
                      {/* Radio indicator */}
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 transition-all duration-300 ${isSelected ? 'border-[6px] border-[#0B2C5F] bg-white' : 'border-2 border-gray-300 bg-white'}`} />
                      
                      {opt.mediaUrl && (
                        <div 
                          onClick={(e) => { e.stopPropagation(); setHardwareLightboxImage(opt.mediaUrl || null); }} 
                          className="w-12 h-12 rounded-lg border border-gray-100 bg-white bg-contain bg-center bg-no-repeat cursor-zoom-in shadow-sm hover:shadow-md transition-shadow"
                          style={{ backgroundImage: `url(${opt.mediaUrl})` }}
                        />
                      )}
                      
                      <div className="flex-1">
                        <div className="text-base font-medium text-[#0B2C5F]">
                          {opt.name} {!isCompatible && <span className="text-xs text-red-500 ml-2 font-normal">Incompatible</span>}
                        </div>
                        <div className="text-sm mt-1 text-gray-500">
                          {opt.priceAdjustment > 0 ? `+ $${opt.priceAdjustment}` : 'Included in Base'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sub-Attributes */}
              {selectedOption && selectedOption.subAttributes && selectedOption.subAttributes.length > 0 && (
                <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                  {selectedOption.subAttributes.map((sub, i) => (
                    <div key={sub.id} className={`${i > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}`}>
                      <div className="text-sm font-medium text-[#0B2C5F] mb-4">{sub.name}</div>
                      <div className="flex flex-wrap gap-3">
                        {sub.choices.map(choice => (
                          <button 
                            key={choice.id}
                            onClick={() => setSelectedSubAttributes({ ...selectedSubAttributes, [sub.id]: choice.id })}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedSubAttributes[sub.id] === choice.id ? 'bg-[#0B2C5F] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0B2C5F] hover:text-[#0B2C5F]'}`}
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

      {/* Floating Glassmorphic Cart Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 z-50 shadow-[0_-4px_20px_rgba(11,44,95,0.06)]">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex justify-between items-center lg:justify-end lg:gap-12 lg:pr-16">
          <div className="lg:absolute lg:left-16 flex flex-col">
            <span className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-1">Total Price</span>
            <span className="text-3xl font-serif font-medium text-[#0B2C5F] leading-none">${totalPrice}</span>
          </div>
          
          {(() => {
            const isTooLarge = selectedFamily?.maxWidth && (parseFloat(width) > selectedFamily.maxWidth);
            const isTooSmall = parseFloat(width) < getDynamicMinWidth();
            
            if (isTooLarge || isTooSmall) {
              return (
                <button className="px-8 py-4 rounded-full text-sm font-medium bg-red-500 text-white cursor-not-allowed opacity-90">
                  INVALID SIZE
                </button>
              );
            }
            
            return (
              <button 
                onClick={handleOrderSubmit}
                disabled={orderStatus === 'submitting'}
                className={`px-10 py-4 rounded-full text-[0.95rem] font-medium text-white transition-all duration-300 shadow-md hover:shadow-lg ${orderStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-[#0B2C5F] hover:bg-[#071F45] hover:-translate-y-0.5'} ${orderStatus === 'submitting' ? 'opacity-80 cursor-wait' : 'cursor-pointer'}`}
              >
                {orderStatus === 'submitting' ? 'Processing...' : orderStatus === 'success' ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            );
          })()}
        </div>
      </div>

      {/* Lightbox Modals... */}
      {lightboxOpen && selectedFamily && (
        <div className="fixed inset-0 z-[9999] bg-[#071F45]/90 backdrop-blur-sm flex flex-col items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-8 right-8 text-white text-3xl hover:text-[#D4AF37] transition-colors" onClick={() => setLightboxOpen(false)}>✕</button>
          <div className="flex items-center gap-10 max-w-[90vw]">
            <button className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white text-4xl flex items-center justify-center transition-all" onClick={prevLightboxImage}>‹</button>
            <div className="flex flex-col items-center">
              <img src={selectedFamily.colors[lightboxIndex]?.mediaUrl} alt={selectedFamily.colors[lightboxIndex]?.name} className="max-h-[75vh] max-w-[75vw] object-contain rounded-2xl shadow-2xl" />
              <div className="text-white mt-6 text-xl font-medium tracking-wide">
                {selectedFamily.colors[lightboxIndex]?.name}
              </div>
            </div>
            <button className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white text-4xl flex items-center justify-center transition-all" onClick={nextLightboxImage}>›</button>
          </div>
        </div>
      )}
    </div>
  );
}

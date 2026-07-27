'use client';

import React, { useState, useEffect } from 'react';
import { Product, FabricFamily, FabricColor, Category } from '../lib/products';
import { saveProduct, getCategories, getProducts } from '../lib/storage_actions';
import { useRouter } from 'next/navigation';

export default function ProductBuilder({ productId }: { productId?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(!!productId);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: '',
    basePrice: 10,
    basePriceMode: 'perSqFt',
    description: '',
    imageUrl: '',
    mediaAssets: [],
    status: 'published',
    fabricFamilies: [
      { 
        fabricId: 'fam-1', 
        name: 'Standard Linen', 
        priceModifier: 0, 
        colors: [{ colorId: 'col-1', name: 'Snow White', hex: '#ffffff', status: 'active', mediaUrl: '' }] 
      }
    ],
    modifiers: [
      { id: 'mod-1', name: 'Lift Style', isRequired: true, options: [{ id: 'opt-1', name: 'Cordless', priceAdjustment: 0, mediaUrl: '' }] }
    ],
    constraints: { minWidth: 400, maxWidth: 3000, minHeight: 400, maxHeight: 4000 },
    logic: []
  });

  useEffect(() => {
    async function load() {
      const cats = await getCategories();
      setCategories(cats);
      
      if (productId) {
        const products = await getProducts();
        const existing = products.find(p => p.id === productId);
        if (existing) {
          setFormData(existing);
        } else {
          alert('Product not found!');
          router.push('/admin/products');
        }
      } else {
        if (cats.length > 0 && !formData.category) {
          setFormData(prev => ({ ...prev, category: cats[0].name }));
        }
      }
      setIsLoading(false);
    }
    load();
  }, [productId]); // Run on mount or when productId changes

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSave = async () => {
    if (!formData.name) {
      alert('Missing Product Name');
      return;
    }
    
    const finalProduct = {
      ...formData,
      id: productId || formData.name.toLowerCase().replace(/ /g, '-'), // Preserve ID if editing
    } as Product;
    
    const success = await saveProduct(finalProduct);
    if (success) {
      router.push('/admin/products');
    } else {
      alert('Failed to save product. Check server logs.');
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>CATALOG MANAGEMENT</span>
          <h1 style={{ fontSize: '2.5rem' }}>Modular Product Builder</h1>
          <p style={{ color: '#888', marginTop: '10px' }}>Configure architectural window treatments with precise logic and physical constraints.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={handleSave} style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#000', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
            {productId ? 'Save Changes' : 'Publish Product'}
          </button>
        </div>
      </header>

      {isLoading ? (
        <div style={{ color: '#888', padding: '40px' }}>Loading product data...</div>
      ) : (
        <>
          {/* Step Indicator */}
      <div style={{ display: 'flex', gap: '40px', marginBottom: '60px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <StepIcon num={1} active={step >= 1} label="BASIC INFO" />
        <StepIcon num={2} active={step >= 2} label="DIMENSIONS" />
        <StepIcon num={3} active={step >= 3} label="HARDWARE" />
        <StepIcon num={4} active={step >= 4} label="LOGIC / RULES" />
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '40px' }}>
        {step === 1 && <BasicInfoStep data={formData} update={setFormData} categories={categories} />}
        {step === 2 && <DimensionsStep data={formData} update={setFormData} />}
        {step === 3 && <HardwareStep data={formData} update={setFormData} />}
        {step === 4 && <LogicStep data={formData} update={setFormData} />}

        <div style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleBack} style={{ padding: '12px 24px', border: 'none', background: 'none', color: '#888', cursor: 'pointer', opacity: step === 1 ? 0 : 1 }}>← BACK</button>
          <button onClick={handleNext} style={{ 
            padding: '12px 40px', 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 600, 
            cursor: 'pointer',
            display: step === 4 ? 'none' : 'block'
          }}>NEXT STEP</button>
        </div>
      </div>
        </>
      )}
    </div>
  );
}

function StepIcon({ num, active, label }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: active ? 1 : 0.3 }}>
       <div style={{ 
         width: '32px', height: '32px', borderRadius: '50%', 
         backgroundColor: active ? '#000' : '#eee', 
         color: active ? '#fff' : '#000',
         display: 'flex', alignItems: 'center', justifyContent: 'center',
         fontSize: '0.8rem', fontWeight: 700
       }}>{num}</div>
       <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>{label}</div>
    </div>
  );
}

function BasicInfoStep({ data, update, categories }: any) {
  return (
    <div style={{ display: 'grid', gap: '40px' }}>
      <Section title="Basic Information">
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '10px' }}>PRODUCT NAME</label>
            <input 
              placeholder="e.g., Signature S-Fold Linen"
              value={data.name}
              onChange={e => update({...data, name: e.target.value})}
              style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#f9f9f9' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
             <div>
                <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '10px' }}>CATEGORY</label>
                <select 
                  value={data.category}
                  onChange={e => update({...data, category: e.target.value})}
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#f9f9f9' }}
                >
                  {categories.length === 0 ? <option disabled>No categories found</option> : categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
             </div>
             <div>
                <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '10px' }}>PRICING MODE</label>
                <select 
                  value={data.basePriceMode}
                  onChange={e => update({...data, basePriceMode: e.target.value})}
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#f9f9f9' }}
                >
                  <option value="perSqFt">Per Sq Ft</option>
                  <option value="fixed">Fixed Price</option>
                </select>
             </div>
             <div>
                <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '10px' }}>
                  {data.basePriceMode === 'perSqFt' ? 'PRICE / SQFT ($)' : 'BASE PRICE ($)'}
                </label>
                <input 
                  type="number"
                  value={data.basePrice}
                  onChange={e => update({...data, basePrice: parseFloat(e.target.value)})}
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#f9f9f9' }}
                />
             </div>
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '10px' }}>PRODUCT IMAGES (UPLOAD & SELECT MAIN)</label>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '15px' }}>
              {(data.mediaAssets || []).map((url: string, idx: number) => (
                <div 
                  key={idx} 
                  onClick={() => update({...data, imageUrl: url})}
                  style={{ 
                    width: '100px', height: '100px', 
                    borderRadius: '8px', 
                    border: data.imageUrl === url ? '3px solid #000' : '1px solid #eee',
                    backgroundImage: `url(${url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {data.imageUrl === url && <div style={{ position: 'absolute', top: 5, right: 5, background: '#000', color: '#fff', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px' }}>MAIN</div>}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newAssets = (data.mediaAssets || []).filter((u: string) => u !== url);
                      update({...data, mediaAssets: newAssets, imageUrl: data.imageUrl === url ? (newAssets[0] || '') : data.imageUrl});
                    }}
                    style={{ position: 'absolute', top: -5, right: -5, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '0.6rem' }}
                  >✕</button>
                </div>
              ))}
              
              {/* Upload Button */}
              <label style={{ 
                width: '100px', height: '100px', 
                borderRadius: '8px', border: '1px dashed #ccc', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                cursor: 'pointer', backgroundColor: '#f9f9f9', fontSize: '1.5rem', color: '#888'
              }}>
                +
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files) return;
                    
                    const newUrls: string[] = [];
                    for (let i = 0; i < files.length; i++) {
                      const formData = new FormData();
                      formData.append('file', files[i]);
                      try {
                        const res = await fetch('/api/upload', { method: 'POST', body: formData });
                        const result = await res.json();
                        if (result.url) newUrls.push(result.url);
                      } catch(err) {
                        console.error(err);
                      }
                    }
                    
                    const updatedAssets = [...(data.mediaAssets || []), ...newUrls];
                    update({
                      ...data, 
                      mediaAssets: updatedAssets, 
                      imageUrl: data.imageUrl ? data.imageUrl : updatedAssets[0] // Set first as main automatically
                    });
                  }}
                />
              </label>
            </div>
            <input 
              placeholder="Or paste an image URL..."
              value={data.imageUrl}
              onChange={e => {
                const url = e.target.value;
                update({
                  ...data, 
                  imageUrl: url, 
                  mediaAssets: (data.mediaAssets || []).includes(url) || !url ? data.mediaAssets : [...(data.mediaAssets || []), url]
                });
              }}
              style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#f9f9f9' }}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

function DimensionsStep({ data, update }: any) {
  const c = data.constraints;
  const setC = (nc: any) => update({...data, constraints: {...c, ...nc}});

  return (
    <Section title="Dimension Constraints (MM)">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
           <div style={{ padding: '24px', backgroundColor: '#fcfcfc', border: '1px solid #eee', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '0.8rem', marginBottom: '20px' }}>WIDTH</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                 <div>
                    <label style={{ fontSize: '0.6rem', color: '#888' }}>MIN</label>
                    <input type="number" value={c.minWidth} onChange={e => setC({minWidth: parseInt(e.target.value)})} style={{ width: '100%', border: 'none', background: '#f5f5f5', padding: '10px', marginTop: '5px' }} />
                 </div>
                 <div>
                    <label style={{ fontSize: '0.6rem', color: '#888' }}>MAX</label>
                    <input type="number" value={c.maxWidth} onChange={e => setC({maxWidth: parseInt(e.target.value)})} style={{ width: '100%', border: 'none', background: '#f5f5f5', padding: '10px', marginTop: '5px' }} />
                 </div>
              </div>
           </div>
           <div style={{ padding: '24px', backgroundColor: '#fcfcfc', border: '1px solid #eee', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '0.8rem', marginBottom: '20px' }}>HEIGHT</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                 <div>
                    <label style={{ fontSize: '0.6rem', color: '#888' }}>MIN</label>
                    <input type="number" value={c.minHeight} onChange={e => setC({minHeight: parseInt(e.target.value)})} style={{ width: '100%', border: 'none', background: '#f5f5f5', padding: '10px', marginTop: '5px' }} />
                 </div>
                 <div>
                    <label style={{ fontSize: '0.6rem', color: '#888' }}>MAX</label>
                    <input type="number" value={c.maxHeight} onChange={e => setC({maxHeight: parseInt(e.target.value)})} style={{ width: '100%', border: 'none', background: '#f5f5f5', padding: '10px', marginTop: '5px' }} />
                 </div>
              </div>
           </div>
      </div>
    </Section>
  );
}

function HardwareStep({ data, update }: any) {
  // --- FAMILY CRUD ---
  const addFamily = () => {
    const name = prompt('Fabric Family Name (e.g. Premium Silk):');
    if (!name) return;
    const newFam: FabricFamily = { fabricId: `fam-${Date.now()}`, name, priceModifier: 0, colors: [] };
    update({ ...data, fabricFamilies: [...(data.fabricFamilies || []), newFam] });
  };
  const editFamily = (famId: string, oldName: string, oldPrice: number) => {
    const name = prompt('Edit Family Name:', oldName);
    if (!name && name !== '') return;
    const priceStr = prompt('Edit Base Price Modifier ($):', oldPrice.toString());
    const priceModifier = priceStr ? parseFloat(priceStr) : oldPrice;
    update({ ...data, fabricFamilies: data.fabricFamilies.map((f: FabricFamily) => f.fabricId === famId ? { ...f, name: name || f.name, priceModifier } : f) });
  };
  const deleteFamily = (famId: string) => {
    if (!confirm('Delete this fabric family and all its colors?')) return;
    update({ ...data, fabricFamilies: data.fabricFamilies.filter((f: FabricFamily) => f.fabricId !== famId) });
  };

  // --- COLOR CRUD ---
  const addColor = (familyId: string) => {
    const name = prompt('Color Name (e.g. Midnight Blue):');
    if (!name) return;
    const hex = prompt('Hex Code (e.g. #0a192f):', '#000000') || '#000000';
    const newColor: FabricColor = { colorId: `col-${Date.now()}`, name, hex, status: 'active', mediaUrl: '' };
    update({ ...data, fabricFamilies: data.fabricFamilies.map((fam: FabricFamily) => fam.fabricId === familyId ? { ...fam, colors: [...fam.colors, newColor] } : fam) });
  };
  const editColor = (familyId: string, colorId: string, oldName: string, oldHex: string) => {
    const name = prompt('Edit Color Name:', oldName);
    if (!name && name !== '') return;
    const hex = prompt('Edit Hex Code:', oldHex) || oldHex;
    update({ ...data, fabricFamilies: data.fabricFamilies.map((fam: FabricFamily) => fam.fabricId === familyId ? { ...fam, colors: fam.colors.map(c => c.colorId === colorId ? { ...c, name: name || c.name, hex } : c) } : fam) });
  };
  const deleteColor = (familyId: string, colorId: string) => {
    if (!confirm('Delete this color?')) return;
    update({ ...data, fabricFamilies: data.fabricFamilies.map((fam: FabricFamily) => fam.fabricId === familyId ? { ...fam, colors: fam.colors.filter(c => c.colorId !== colorId) } : fam) });
  };

  const updateColorMedia = async (familyId: string, colorId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.url) {
        update({ ...data, fabricFamilies: data.fabricFamilies.map((fam: FabricFamily) => fam.fabricId === familyId ? { ...fam, colors: fam.colors.map(c => c.colorId === colorId ? { ...c, mediaUrl: result.url } : c) } : fam) });
      }
    } catch(err) { console.error(err); }
  };

  // --- MODIFIER CRUD ---
  const editModifier = (modId: string, oldName: string) => {
    const name = prompt('Edit Attribute Group Name:', oldName);
    if (!name) return;
    update({ ...data, modifiers: data.modifiers.map((m: any) => m.id === modId ? { ...m, name } : m) });
  };
  const deleteModifier = (modId: string) => {
    if (!confirm('Delete this attribute group and ALL its options?')) return;
    update({ ...data, modifiers: data.modifiers.filter((m: any) => m.id !== modId) });
  };

  // --- OPTION CRUD ---
  const editOption = (modId: string, optId: string, oldName: string, oldPrice: number) => {
    const name = prompt('Edit Option Name:', oldName);
    if (!name && name !== '') return;
    const priceStr = prompt('Edit Price Adjustment ($):', oldPrice.toString());
    const priceAdjustment = priceStr ? parseFloat(priceStr) : oldPrice;
    update({ ...data, modifiers: data.modifiers.map((m: any) => m.id === modId ? { ...m, options: m.options.map((o: any) => o.id === optId ? { ...o, name: name || o.name, priceAdjustment } : o) } : m) });
  };
  const deleteOption = (modId: string, optId: string) => {
    if (!confirm('Delete this option?')) return;
    update({ ...data, modifiers: data.modifiers.map((m: any) => m.id === modId ? { ...m, options: m.options.filter((o: any) => o.id !== optId) } : m) });
  };

  // --- SUB-ATTRIBUTE CRUD ---
  const editSub = (modId: string, optId: string, subId: string, oldName: string) => {
    const name = prompt('Edit Sub-Attribute Name:', oldName);
    if (!name) return;
    update({ ...data, modifiers: data.modifiers.map((m: any) => m.id === modId ? { ...m, options: m.options.map((o: any) => o.id === optId ? { ...o, subAttributes: o.subAttributes.map((s: any) => s.id === subId ? { ...s, name } : s) } : o) } : m) });
  };
  const deleteSub = (modId: string, optId: string, subId: string) => {
    if (!confirm('Delete this sub-attribute?')) return;
    update({ ...data, modifiers: data.modifiers.map((m: any) => m.id === modId ? { ...m, options: m.options.map((o: any) => o.id === optId ? { ...o, subAttributes: o.subAttributes.filter((s: any) => s.id !== subId) } : o) } : m) });
  };

  // --- CHOICE CRUD ---
  const editChoice = (modId: string, optId: string, subId: string, choiceId: string, oldName: string, oldPrice: number) => {
    const name = prompt('Edit Choice Name:', oldName);
    if (!name && name !== '') return;
    const priceStr = prompt('Edit Price Adjustment ($):', oldPrice.toString());
    const priceAdjustment = priceStr ? parseFloat(priceStr) : oldPrice;
    update({ ...data, modifiers: data.modifiers.map((m: any) => m.id === modId ? { ...m, options: m.options.map((o: any) => o.id === optId ? { ...o, subAttributes: o.subAttributes.map((s: any) => s.id === subId ? { ...s, choices: s.choices.map((c: any) => c.id === choiceId ? { ...c, name: name || c.name, priceAdjustment } : c) } : s) } : o) } : m) });
  };
  const deleteChoice = (modId: string, optId: string, subId: string, choiceId: string) => {
    if (!confirm('Delete this choice?')) return;
    update({ ...data, modifiers: data.modifiers.map((m: any) => m.id === modId ? { ...m, options: m.options.map((o: any) => o.id === optId ? { ...o, subAttributes: o.subAttributes.map((s: any) => s.id === subId ? { ...s, choices: s.choices.filter((c: any) => c.id !== choiceId) } : s) } : o) } : m) });
  };


  return (
    <Section title="Materials & Hardware (GIF-Style Configurator)">
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#888' }}>FABRIC FAMILIES & COLORS</h4>
          <button onClick={addFamily} style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>+ New Fabric Family</button>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {(data.fabricFamilies || []).map((fam: FabricFamily) => (
            <div key={fam.fabricId} style={{ border: '1px solid #eee', borderRadius: '12px', background: '#fff', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              
              <div style={{ padding: '20px', background: '#fafafa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <h5 style={{ fontSize: '1.1rem', margin: 0 }}>{fam.name}</h5>
                  <span style={{ fontSize: '0.7rem', color: '#888', background: '#eee', padding: '4px 8px', borderRadius: '4px' }}>Base +${fam.priceModifier}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => editFamily(fam.fabricId, fam.name, fam.priceModifier)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>✏️</button>
                  <button onClick={() => deleteFamily(fam.fabricId)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'red' }}>🗑️</button>
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                  {fam.colors.map((color) => (
                    <div key={color.colorId} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '10px', position: 'relative', background: '#fff' }}>
                      
                      <div style={{ 
                        height: '120px', borderRadius: '6px', marginBottom: '10px', backgroundColor: color.hex,
                        backgroundImage: color.mediaUrl ? `url(${color.mediaUrl})` : 'none',
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0f0f0', position: 'relative', overflow: 'hidden'
                      }}>
                        {!color.mediaUrl && <span style={{ color: '#fff', mixBlendMode: 'difference', fontSize: '0.8rem', opacity: 0.9, marginBottom: '10px' }}>No Picture</span>}
                        <label style={{ background: 'rgba(255,255,255,0.9)', color: '#000', padding: '6px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}>
                          {color.mediaUrl ? 'Change Picture' : '+ Upload Picture'}
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                            if (e.target.files && e.target.files[0]) updateColorMedia(fam.fabricId, color.colorId, e.target.files[0]);
                          }} />
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000' }}>{color.name}</div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button onClick={() => editColor(fam.fabricId, color.colorId, color.name, color.hex)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>✏️</button>
                          <button onClick={() => deleteColor(fam.fabricId, color.colorId)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'red' }}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addColor(fam.fabricId)} style={{ border: '1px dashed #ccc', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', height: '100%', minHeight: '150px' }}>
                    <span style={{ fontSize: '1.5rem', color: '#888', marginBottom: '5px' }}>+</span>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Add Color</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(!data.fabricFamilies || data.fabricFamilies.length === 0) && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', border: '1px dashed #ccc', borderRadius: '12px' }}>No fabric families added yet.</div>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '40px', marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', color: '#000', margin: 0 }}>DYNAMIC ATTRIBUTES</h4>
            <p style={{ fontSize: '0.8rem', color: '#888', margin: '5px 0 0 0' }}>Define custom configurations like Lift Style, Mount Type, Valance, etc.</p>
          </div>
          <button onClick={() => {
            const name = prompt('Attribute Group Name (e.g. Lift Style):');
            if (!name) return;
            const newGroup = { id: `mod-${Date.now()}`, name, isRequired: true, options: [] };
            update({ ...data, modifiers: [...(data.modifiers || []), newGroup] });
          }} style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
            + Add Attribute Group
          </button>
        </div>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          {(data.modifiers || []).map((group: any, groupIndex: number) => (
            <div key={group.id} style={{ border: '1px solid #eee', borderRadius: '12px', background: '#fff', overflow: 'hidden' }}>
              <div style={{ padding: '15px 20px', background: '#fafafa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button disabled={groupIndex === 0} onClick={() => {
                      const newMods = [...data.modifiers];
                      [newMods[groupIndex - 1], newMods[groupIndex]] = [newMods[groupIndex], newMods[groupIndex - 1]];
                      update({ ...data, modifiers: newMods });
                    }} style={{ border: 'none', background: 'none', cursor: groupIndex === 0 ? 'not-allowed' : 'pointer', opacity: groupIndex === 0 ? 0.3 : 1, padding: 0 }}>↑</button>
                    <button disabled={groupIndex === data.modifiers.length - 1} onClick={() => {
                      const newMods = [...data.modifiers];
                      [newMods[groupIndex + 1], newMods[groupIndex]] = [newMods[groupIndex], newMods[groupIndex + 1]];
                      update({ ...data, modifiers: newMods });
                    }} style={{ border: 'none', background: 'none', cursor: groupIndex === data.modifiers.length - 1 ? 'not-allowed' : 'pointer', opacity: groupIndex === data.modifiers.length - 1 ? 0.3 : 1, padding: 0 }}>↓</button>
                  </div>
                  <h5 style={{ fontSize: '1rem', margin: 0 }}>{group.name}</h5>
                  <button onClick={() => editModifier(group.id, group.name)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => deleteModifier(group.id)} style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️ Delete Group</button>
                  <button onClick={() => {
                    const optName = prompt(`New option for ${group.name} (e.g. Motorized):`);
                    if (!optName) return;
                    const price = prompt('Price adjustment ($):', '0') || '0';
                    const newOpt = { id: `opt-${Date.now()}`, name: optName, priceAdjustment: parseFloat(price), mediaUrl: '' };
                    const updated = data.modifiers.map((m: any) => m.id === group.id ? { ...m, options: [...m.options, newOpt] } : m);
                    update({ ...data, modifiers: updated });
                  }} style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: '#fff', color: '#000', border: '1px solid #ccc', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Option</button>
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                  {group.options.map((opt: any) => (
                    <div key={opt.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', position: 'relative', background: '#fff' }}>
                      
                      <div style={{ 
                        height: '100px', borderRadius: '6px', marginBottom: '10px', backgroundColor: '#f5f5f5',
                        backgroundImage: opt.mediaUrl ? `url(${opt.mediaUrl})` : 'none',
                        backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee', position: 'relative', overflow: 'hidden'
                      }}>
                        {!opt.mediaUrl && <span style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '8px' }}>No Picture</span>}
                        <label style={{ background: 'rgba(255,255,255,0.9)', color: '#000', padding: '6px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}>
                          {opt.mediaUrl ? 'Change Picture' : '+ Upload Picture'}
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const formData = new FormData();
                              formData.append('file', e.target.files[0]);
                              try {
                                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                const result = await res.json();
                                if (result.url) {
                                  const updated = data.modifiers.map((m: any) => m.id === group.id ? { ...m, options: m.options.map((o: any) => o.id === opt.id ? { ...o, mediaUrl: result.url } : o) } : m);
                                  update({ ...data, modifiers: updated });
                                }
                              } catch(err) { console.error(err); }
                            }
                          }} />
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#000' }}>{opt.name}</div>
                          <div style={{ fontSize: '0.85rem', color: opt.priceAdjustment > 0 ? '#10b981' : '#888', marginTop: '2px', fontWeight: 600 }}>
                            {opt.priceAdjustment > 0 ? `+ $${opt.priceAdjustment}` : 'Included'}
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <button onClick={() => editOption(group.id, opt.id, opt.name, opt.priceAdjustment)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>✏️</button>
                          <button onClick={() => deleteOption(group.id, opt.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'red' }}>🗑️</button>
                        </div>
                      </div>
                      
                      {/* Sub-Attributes */}
                      <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #eee' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 600 }}>SUB-ATTRIBUTES</span>
                          <button onClick={() => {
                            const subName = prompt(`Sub-attribute name for ${opt.name} (e.g. Wand Position):`);
                            if (!subName) return;
                            const newSub = { id: `sub-${Date.now()}`, name: subName, choices: [] };
                            const updated = data.modifiers.map((m: any) => m.id === group.id ? { ...m, options: m.options.map((o: any) => o.id === opt.id ? { ...o, subAttributes: [...(o.subAttributes || []), newSub] } : o) } : m);
                            update({ ...data, modifiers: updated });
                          }} style={{ padding: '4px 8px', borderRadius: '4px', background: '#f5f5f5', border: '1px solid #ccc', fontSize: '0.6rem', cursor: 'pointer' }}>+ Add</button>
                        </div>
                        
                        {(opt.subAttributes || []).map((sub: any) => (
                          <div key={sub.id} style={{ marginBottom: '10px', background: '#fafafa', padding: '10px', borderRadius: '6px', border: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{sub.name}</span>
                                <button onClick={() => editSub(group.id, opt.id, sub.id, sub.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}>✏️</button>
                                <button onClick={() => deleteSub(group.id, opt.id, sub.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', color: 'red' }}>🗑️</button>
                              </div>
                              <button onClick={() => {
                                const choiceName = prompt(`Choice for ${sub.name} (e.g. Left):`);
                                if (!choiceName) return;
                                const price = prompt('Price adjustment ($):', '0') || '0';
                                const newChoice = { id: `choice-${Date.now()}`, name: choiceName, priceAdjustment: parseFloat(price) };
                                const updated = data.modifiers.map((m: any) => m.id === group.id ? { ...m, options: m.options.map((o: any) => o.id === opt.id ? { ...o, subAttributes: o.subAttributes.map((s: any) => s.id === sub.id ? { ...s, choices: [...s.choices, newChoice] } : s) } : o) } : m);
                                update({ ...data, modifiers: updated });
                              }} style={{ fontSize: '0.7rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>+ Choice</button>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                              {sub.choices.map((c: any) => (
                                <span key={c.id} style={{ fontSize: '0.7rem', background: '#fff', border: '1px solid #ddd', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <span onClick={() => editChoice(group.id, opt.id, sub.id, c.id, c.name, c.priceAdjustment)} style={{ cursor: 'pointer' }}>
                                    {c.name} <span style={{ color: c.priceAdjustment > 0 ? '#10b981' : '#888' }}>({c.priceAdjustment > 0 ? `+$${c.priceAdjustment}` : '+$0'})</span>
                                  </span>
                                  <button onClick={() => deleteChoice(group.id, opt.id, sub.id, c.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', padding: 0, fontSize: '0.6rem' }}>✕</button>
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {group.options.length === 0 && <div style={{ fontSize: '0.8rem', color: '#aaa', fontStyle: 'italic' }}>No options added.</div>}
                </div>
              </div>
            </div>
          ))}
          {(!data.modifiers || data.modifiers.length === 0) && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', border: '1px dashed #ccc', borderRadius: '12px' }}>Click "Add Attribute Group" to create options like Lift Style.</div>
          )}
        </div>
      </div>
    </Section>
  );
}

function LogicStep({ data, update }: any) {
  return (
    <Section title="Customization Logic">
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>Apply pricing surcharges and material compatibility rules.</p>
      <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '12px', background: '#fcfcfc' }}>
         <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Oversize Width Logic</div>
         <div style={{ fontSize: '0.7rem', color: '#888' }}>If Width {'>'} 2500mm, apply +15% material surcharge.</div>
      </div>
    </Section>
  );
}

function Section({ title, children }: any) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '25px', color: '#000' }}>{title}</h3>
      {children}
    </div>
  );
}

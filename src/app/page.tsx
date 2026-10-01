import React from 'react';
import Link from 'next/link';
import { getProducts } from '../lib/storage_actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await getProducts();
  const activeProducts = allProducts.filter((p: any) => p.status === 'published');
  
  const umbrellasMap = new Map();
  activeProducts.forEach((p: any) => {
    if (p.category) {
      if (!umbrellasMap.has(p.category)) {
        umbrellasMap.set(p.category, p.images?.[0]?.url || p.imageUrl || null);
      } else if (!umbrellasMap.get(p.category) && (p.images?.[0]?.url || p.imageUrl)) {
        umbrellasMap.set(p.category, p.images?.[0]?.url || p.imageUrl);
      }
    }
  });

  const activeCategories = Array.from(umbrellasMap.entries()).map(([name, image]) => ({ name, image }));

  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      .responsive-pad { padding: 0 10%; }
      .flex-between { display: flex; justify-content: space-between; align-items: center; }
      .btn-primary { display: inline-flex; align-items: center; padding: 12px 28px; background-color: #D4AF37; color: #071F45; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.3s; border: none; cursor: pointer; }
      .btn-primary:hover { opacity: 0.9; }
      .btn-nav { padding: 8px 16px; background-color: #071F45; color: #fff; border-radius: 18px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
      
      header { height: 90px; border-bottom: 1px solid #E5E7EB; position: sticky; top: 0; background: #fff; z-index: 100; }
      .hero-section { min-height: 80vh; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #071F45; }
      .hero-bg { position: absolute; inset: 0; opacity: 0.4; background-image: url('https://res.cloudinary.com/dz63zobq2/image/upload/v1734914194/Duo_Stripes_l0t2qg.jpg'); background-size: cover; background-position: center; mix-blend-mode: luminosity; }
      .hero-content { position: relative; z-index: 10; text-align: center; color: white; max-width: 800px; padding: 0 20px; }
      .hero-title { font-family: var(--font-playfair), serif; font-size: 4rem; font-weight: 700; margin-bottom: 24px; line-height: 1.1; }
      .hero-subtitle { font-family: var(--font-jost), sans-serif; font-size: 1.25rem; margin-bottom: 40px; opacity: 0.9; }
      
      .section-title { text-align: center; font-family: var(--font-playfair), serif; font-size: 2.5rem; color: #071F45; margin-bottom: 40px; }
      .grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
      
      .product-card { display: flex; flex-direction: column; border-radius: 16px; overflow: hidden; text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .product-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
      .card-img-wrapper { position: relative; width: 100%; padding-top: 100%; overflow: hidden; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
      .card-img-wrapper img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
      .card-content { padding: 24px; text-align: center; display: flex; flex-direction: column; flex-grow: 1; }
      .card-title { font-family: var(--font-playfair), serif; font-size: 1.5rem; color: #071F45; font-weight: 700; margin-bottom: 8px; }
      .card-subtitle { font-size: 0.9rem; color: #6B7280; font-family: 'Outfit', sans-serif; letter-spacing: 0.05em; text-transform: uppercase; }
      
      .value-props { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; text-align: center; padding: 80px 10%; background: #fff; }
      @media (max-width: 768px) {
        .hero-title { font-size: 2.5rem; }
        .hero-subtitle { font-size: 1rem; }
        .value-props { grid-template-columns: 1fr; gap: 30px; }
      }
    `}} />

      <header className="responsive-pad flex-between">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/smart-decor-logo.png" alt="Smart Decor Logo" style={{ height: '45px', width: 'auto' }}  />
            <div style={{ width: '45px', height: '45px', background: '#D4AF37', borderRadius: '4px', display: 'none', alignItems: 'center', justifyContent: 'center', color: '#071F45', fontWeight: 'bold', fontSize: '24px', fontFamily: 'serif' }}>S</div>
            <div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '22px', fontWeight: 'bold', color: '#071F45', lineHeight: '1' }}>Smart Decor</div>
              <div style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '11px', color: '#666', letterSpacing: '1px', marginTop: '2px' }}>HOME INTERIORS</div>
            </div>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/products/all" className="btn-nav" style={{ background: 'transparent', color: '#071F45' }}>All Products</Link>
          <Link href="/contact" className="btn-nav" style={{ background: 'transparent', color: '#071F45' }}>Contact</Link>
          <Link href="/admin" className="btn-nav">Admin Portal</Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-bg"></div>
          <div className="hero-content">
            <h1 className="hero-title">Architectural Light Control</h1>
            <p className="hero-subtitle">Premium custom blinds and curtains engineered for precise light management and unparalleled design.</p>
            <Link href="#collections" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              Explore Collections
            </Link>
          </div>
        </section>

        <section id="collections" className="responsive-pad" style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#f9f9f9' }}>
          <div className="flex-between" style={{ marginBottom: '40px' }}>
            <div>
              <h2 className="section-title" style={{ margin: 0, textAlign: 'left' }}>Shop by Product</h2>
              <p style={{ color: '#6B7280', marginTop: '10px' }}>Discover our tailored solutions for every window.</p>
            </div>
            <Link href="/products/all" style={{ color: '#071F45', fontWeight: 600, textDecoration: 'none' }}>View All &rarr;</Link>
          </div>
          
          <div className="grid-layout">
            {activeCategories.map(category => (
                <Link href={`/products/${encodeURIComponent(category.name)}`} key={category.name} className="product-card">
                  <div className="card-img-wrapper">
                    {category.image ? (
                      <img src={category.image} alt={category.name} />
                    ) : (
                      <div style={{ color: '#8D99AE' }}>No Image</div>
                    )}
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{category.name}</h3>
                    <p className="card-subtitle">Custom Treatments</p>
                  </div>
                </Link>
            ))}
            {activeCategories.length === 0 && (
              <p style={{ color: '#6B7280', gridColumn: '1 / -1', padding: '2rem', textAlign: 'center' }}>No products available yet.</p>
            )}
          </div>
        </section>

        <section className="value-props responsive-pad">
          <div className="value-prop">
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>Free Shipping</h4>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>On orders over $100.</p>
          </div>
          <div className="value-prop">
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>Secure Payments</h4>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>100% safe and encrypted.</p>
          </div>
          <div className="value-prop">
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>Premium Quality</h4>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Built to last.</p>
          </div>
        </section>
      </main>
    </>
  );
}

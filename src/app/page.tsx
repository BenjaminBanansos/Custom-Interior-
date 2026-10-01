import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '../lib/storage_actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  
  // Sort and filter active products
  const activeProducts = products
    .filter(p => p.status !== 'draft')
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      .responsive-pad { padding: 0 10%; }
      .flex-between { display: flex; justify-content: space-between; align-items: center; }
      .btn-primary { display: inline-flex; align-items: center; padding: 12px 28px; background-color: #D4AF37; color: #071F45; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.3s; border: none; cursor: pointer; }
      .btn-primary:hover { opacity: 0.9; }
      .btn-nav { padding: 8px 16px; background-color: #071F45; color: #fff; border-radius: 18px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
      
      header { height: 90px; border-bottom: 1px solid #E5E7EB; position: sticky; top: 0; background: #fff; z-index: 100; }
      .nav-links { display: flex; gap: 24px; margin-left: 2rem; align-items: center; }
      .nav-links a { text-decoration: none; color: #071F45; font-weight: 500; font-size: 0.95rem; }
      .logo-container { height: 60px; display: flex; align-items: center; gap: 12px; text-decoration: none; }
      .logo-img { height: 100%; object-fit: contain; border-radius: 8px; }
      
      .hero { background-color: #F5F7F9; padding-left: 10%; height: 75vh; min-height: 500px; display: flex; align-items: center; position: relative; }
      .hero-content { max-width: 650px; z-index: 10; }
      .hero-title { font-size: 4rem; font-weight: 700; line-height: 1.1; margin-bottom: 24px; color: #071F45; font-family: 'Outfit', sans-serif; }
      .hero-text { font-size: 1.2rem; color: #374151; line-height: 1.6; margin-bottom: 32px; }
      
      .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem; }
      .product-card { border-radius: 16px; overflow: hidden; background: #F5F7F9; text-decoration: none; color: inherit; transition: transform 0.3s; border: 1px solid #E5E7EB; }
      .product-card:hover { transform: translateY(-4px); }
      .card-img-wrapper { height: 260px; background: #EEF4FB; display: flex; align-items: center; justify-content: center; }
      .card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
      .card-content { padding: 1.5rem; }
      .card-title { font-size: 1.5rem; margin-bottom: 0.5rem; color: #071F45; font-family: 'Outfit', sans-serif; }
      .card-subtitle { color: #6B7280; font-size: 0.95rem; }
      
      .value-props { background-color: #F5F7F9; padding-top: 4rem; padding-bottom: 4rem; display: flex; flex-wrap: wrap; gap: 2rem; justify-content: space-between; }
      .value-prop { text-align: center; flex: 1; min-width: 200px; }
      
      @media (max-width: 1024px) {
        .responsive-pad { padding: 0 5%; }
        .hero { padding-left: 5%; height: 60vh; }
        .hero-title { font-size: 3rem; }
      }
      @media (max-width: 768px) {
        .nav-links { display: none; }
        header { height: 75px; }
        .logo-container { height: 45px; }
        .hero { padding: 0 5%; text-align: center; align-items: center; justify-content: center; height: 55vh; }
        .hero-title { font-size: 2.5rem; }
        .hero-text { font-size: 1rem; }
      }
    `}} />
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', color: '#071F45', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Navbar */}
      <header className="responsive-pad flex-between">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" className="logo-container">
            <img src="/smart_decor_logo.jpg" alt="Smart Decor Logo" className="logo-img" />
            <span style={{ fontWeight: 700, fontSize: '1.4rem', color: '#071F45', letterSpacing: '-0.5px', fontFamily: 'Outfit, sans-serif' }}>SMART DECOR</span>
          </Link>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/categories/all">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="nav-links">
          <Link href="/account/login">Login</Link>
          <Link href="/cart">Cart (0)</Link>
          <Link href="/account/dealer-login" className="btn-nav">Dealer Portal</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Premium Custom Blinds & Shades</h1>
          <p className="hero-text">Stylish. Functional. Made for your space. Explore our wide range of custom window treatments. Built with precision for modern homes.</p>
          <Link href="/categories/all" className="btn-primary">Shop Collections &rarr;</Link>
        </div>
      </section>

      {/* Dynamic Products Grid */}
      <section className="responsive-pad" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="flex-between" style={{ alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <span style={{ color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Shop by Category</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>Explore Our Collection</h2>
          </div>
          <Link href="/categories/all" style={{ color: '#071F45', fontWeight: 600, textDecoration: 'none' }}>View All &rarr;</Link>
        </div>
        
        <div className="grid-layout">
          {activeProducts.map(product => (
            <Link href={`/product/${product._id}`} key={product._id} className="product-card">
              <div className="card-img-wrapper">
                {product.images && product.images[0] ? (
                  <img src={product.images[0].url} alt={product.name} />
                ) : (
                  <div style={{ color: '#8D99AE' }}>No Image</div>
                )}
              </div>
              <div className="card-content">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-subtitle">{product.categoryId || 'Custom Treatment'}</p>
              </div>
            </Link>
          ))}
          {activeProducts.length === 0 && (
            <p style={{ color: '#6B7280', gridColumn: '1 / -1', padding: '2rem', textAlign: 'center' }}>No products available yet.</p>
          )}
        </div>
      </section>

      {/* Value Props */}
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
      
      {/* Footer / Newsletter */}
      <section className="responsive-pad flex-between" style={{ background: 'linear-gradient(120deg,#071f45,#0b2c5f 60%,#154785)', paddingTop: '4rem', paddingBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', margin: '0 0 1rem 0' }}>Get The Latest Offers</h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', margin: 0, fontSize: '1.1rem' }}>Subscribe to our newsletter and never miss a deal on custom window treatments.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', background: '#fff', padding: '0.5rem', borderRadius: '12px', minWidth: '300px', width: '100%', maxWidth: '400px' }}>
          <input type="email" placeholder="Email Address" style={{ border: 'none', outline: 'none', padding: '0.5rem 1rem', flex: 1, width: '100%' }} />
          <button style={{ background: '#071F45', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
        </div>
      </section>

    </main>
    </>
  );
}

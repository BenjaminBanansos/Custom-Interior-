import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '../lib/storage_actions';
import { getTheme } from '../lib/theme_actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  const theme = await getTheme();
  
  // Sort products for display
  const orderedProducts = [...products].sort((a, b) => (a.order || 99) - (b.order || 99)).filter(p => p.status !== 'draft');

  return (
    <main style={{ flex: 1, margin: '0 auto', width: '100%', backgroundColor: '#fdfcfb', color: '#111' }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: '#DFA878', color: '#fff', textAlign: 'center', padding: '10px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        WINTER SALE IS NOW ON - UP TO 65% OFF SELECT FABRICS
      </div>

      {/* Navigation */}
      <nav style={{ 
        height: '90px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 4rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <a href="#collection" style={{ color: '#0B192C', textDecoration: 'none' }}>Collection</a>
          <a href="#about" style={{ color: '#666', textDecoration: 'none' }}>Our Atelier</a>
        </div>
        
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', letterSpacing: '0.15em', fontWeight: 600, textDecoration: 'none', color: '#0B192C', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          STITCH
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <a href="/login" style={{ color: '#0B192C', textDecoration: 'none' }}>Dealer Login</a>
          <Link href="/cart" style={{ backgroundColor: '#0B192C', color: '#fff', padding: '12px 24px', textDecoration: 'none', borderRadius: '4px' }}>Cart</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '80vh', 
        minHeight: '600px',
        backgroundColor: '#0B192C',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: 0.4
        }}></div>
        <div style={{ position: 'relative', zIndex: 10, padding: '0 10%', maxWidth: '800px' }}>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Stylish. Functional. <br />
            <span style={{ color: '#DFA878', fontStyle: 'italic', fontWeight: 400 }}>Made for your space.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '40px', lineHeight: 1.6, maxWidth: '500px', fontWeight: 300 }}>
            Explore our wide range of bespoke blinds and shades, tailored specifically to your exact architectural dimensions.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#collection" style={{ backgroundColor: '#DFA878', color: '#fff', padding: '16px 32px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '4px', transition: 'background 0.3s' }}>
              Shop The Sale
            </a>
            <a href="/category/roller-shades" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', padding: '16px 32px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
              Explore Collection
            </a>
          </div>
        </div>
      </section>

      {/* Featured Collection / Sale */}
      <section id="collection" style={{ padding: '8rem 5%', backgroundColor: '#fdfcfb' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ color: '#DFA878', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>Shop by Category</div>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '2.5rem', fontWeight: 300, color: '#0B192C' }}>Custom Window Treatments</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {orderedProducts.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', group: 'true' }}>
              <div style={{ 
                height: '420px', 
                backgroundColor: '#f5f5f5', 
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#fff', padding: '6px 12px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', borderRadius: '4px', color: '#0B192C', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  Save 65%
                </div>
              </div>
              <div style={{ padding: '0 8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.4rem', fontWeight: 400, color: '#0B192C', margin: 0 }}>{product.name}</h3>
                  <div style={{ color: '#DFA878', fontSize: '1.2rem' }}>→</div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 12px 0' }}>{product.category} — Clean & Modern</p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0B192C' }}>${product.basePrice}</span>
                  <span style={{ fontSize: '0.9rem', color: '#aaa', textDecoration: 'line-through' }}>${Math.round(product.basePrice * 2.8)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section id="about" style={{ 
        margin: '0 5% 6rem', 
        background: 'linear-gradient(120deg, #0B192C, #1E3E62)', 
        borderRadius: '16px', 
        padding: '5rem 4rem',
        color: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '3rem'
      }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ color: '#DFA878', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>Dealer Network</div>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '2.5rem', fontWeight: 300, marginBottom: '24px', lineHeight: 1.2 }}>Need Help with Installation?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.6, margin: 0, maxWidth: '400px' }}>
            Contact our dealer network and get it done by certified professionals in your area.
          </p>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'flex-end' }}>
          <a href="/login" style={{ backgroundColor: '#fff', color: '#0B192C', padding: '20px 40px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '8px', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}>
            Contact Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '5rem 5% 3rem', 
        backgroundColor: '#fff', 
        color: '#111',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '24px', color: '#0B192C' }}>STITCH</div>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px' }}>
              Architectural light control and bespoke window treatments, engineered for the modern home.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#0B192C', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>Shop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Roller Shades</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Zebra Blinds</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Motorization</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#0B192C', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Track Order</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Installation Guide</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Warranty</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#0B192C', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>Admin</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/login" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Dealer Login</a>
              <a href="/admin" style={{ color: '#DFA878', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Atelier Dashboard</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#999' }}>
          <p>© 2026 STITCH CANADA. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#999', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#999', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

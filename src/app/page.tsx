import React from 'react';
import Link from 'next/link';
import { getProducts } from '../lib/storage_actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const orderedProducts = [...products].sort((a, b) => (a.order || 99) - (b.order || 99)).filter(p => p.status !== 'draft');

  return (
    <main style={{ flex: 1, margin: '0 auto', width: '100%', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* Top Banner - Winter Sale */}
      <div style={{ backgroundColor: 'var(--text-primary)', color: '#fff', textAlign: 'center', padding: '10px', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em' }}>
        Winter Sale is Now On - Get Free Shipping for orders above $100
      </div>

      {/* Navigation */}
      <nav style={{ 
        height: '90px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 4rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <Link href="/categories/all" style={{ color: 'var(--text-secondary)' }}>Shop Categories</Link>
          <Link href="/about" style={{ color: 'var(--text-secondary)' }}>Our Story</Link>
          <Link href="/contact" style={{ color: 'var(--text-secondary)' }}>Contact</Link>
        </div>
        
        <Link href="/" style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          STITCH
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
          <Link href="/account/login" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.2rem' }}>👤</span> Login
          </Link>
          <Link href="/account/dealer-login" style={{ color: 'var(--text-secondary)' }}>Dealer Portal</Link>
          <Link href="/cart" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛒</span> Cart
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '80vh', 
        minHeight: '600px',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%'
      }}>
        <div style={{ flex: 1, paddingRight: '4rem', zIndex: 10 }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Stylish. Functional.<br />Made for your space.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Explore our wide range of custom blinds and shades. Precision-engineered architectural light control for modern homes.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/categories/all" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Explore Collection
            </Link>
            <Link href="#sale" className="btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Shop the Sale
            </Link>
          </div>
        </div>
        
        {/* Right Hero Visual - Soft Rounded Image */}
        <div style={{ 
          flex: 1.2, 
          height: '80%', 
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-tertiary)',
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'var(--shadow-md)'
        }}></div>
      </section>

      {/* Categories Grid - Emulating Janal's "Shop by Category" */}
      <section style={{ padding: '6rem 5%', backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>Shop by category</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Explore Our Collection</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {['Roller Shades', 'Custom Window Treatments', 'Motorized Automation'].map((cat, i) => (
            <Link key={i} href={`/categories/${cat.replace(/\s+/g, '-')}`} style={{ display: 'block', position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition-smooth)' }}>
              <div style={{ 
                height: '400px', 
                backgroundColor: 'var(--bg-secondary)', 
                backgroundImage: 'url(https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease'
              }} className="cat-img"></div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, rgba(26,29,32,0.9), transparent)', color: '#fff' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: '#fff' }}>{cat}</h3>
                <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Clean & Modern →</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/categories/all" className="btn-outline">View All Categories</Link>
        </div>
      </section>

      {/* Promotional / Bargain Section (65% OFF) */}
      <section id="sale" style={{ padding: '6rem 5%', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Ends Today</div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>65% OFF Winter Sale</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Bargain Fabric Duo-Glide Shades</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {orderedProducts.slice(0, 4).map(product => (
            <div key={product.id} style={{ 
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              transition: 'var(--transition-smooth)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: 'var(--text-primary)', color: '#fff', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 500, borderRadius: 'var(--radius-pill)', zIndex: 10 }}>
                65% Off
              </div>
              <div style={{ 
                height: '240px', 
                backgroundColor: 'var(--bg-tertiary)',
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem'
              }}></div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{product.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                BARGAIN LIGHT FILTERING FABRIC DUO-GLIDE SHADES
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>${product.basePrice}</span>
                <Link href={`/product/${product.id}`} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
                  Add to Cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Dealer CTA matching Janal's Gradient Footer Top */}
      <section style={{ 
        background: 'linear-gradient(120deg, #1A1D20, #343A40 60%, #495057)', 
        padding: '5rem 5%',
        color: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '3rem'
      }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Dealer Network</div>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.2rem', fontWeight: 500, marginBottom: '1rem', color: '#fff' }}>Need Help with Installation?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0, maxWidth: '500px' }}>
            Contact our dealer network and get it done by professionals.
          </p>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/contact" style={{ backgroundColor: '#fff', color: 'var(--text-primary)', padding: '1rem 2.5rem', fontSize: '0.95rem', fontWeight: 600, borderRadius: 'var(--radius-pill)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }}>
            Contact Now
          </Link>
        </div>
      </section>

      {/* Footer matching Janal layout */}
      <footer style={{ 
        backgroundColor: 'var(--bg-primary)', 
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '3rem', padding: '4rem 5%' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>STITCH</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Functional, beautiful window treatments for the modern home.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-subtle)', display: 'grid', placeItems: 'center' }}>f</div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-subtle)', display: 'grid', placeItems: 'center' }}>ig</div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/categories/roller-shades" style={{ color: 'var(--text-muted)' }}>Roller Shades</Link>
              <Link href="/categories/duo-glide" style={{ color: 'var(--text-muted)' }}>Duo-Glide</Link>
              <Link href="/track-order" style={{ color: 'var(--text-muted)' }}>Track Order</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/about" style={{ color: 'var(--text-muted)' }}>About Us</Link>
              <Link href="/contact" style={{ color: 'var(--text-muted)' }}>Contact Us</Link>
              <Link href="/account/dealer-login" style={{ color: 'var(--text-muted)' }}>Dealer Login</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Contact</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>100 Architectural Way<br />Toronto, ON M5V 2H1</p>
            <a href="mailto:info@stitchcanada.com" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>info@stitchcanada.com</a>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <p>© 2026 STITCH CANADA. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

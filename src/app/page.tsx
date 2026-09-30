import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '../lib/storage_actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  
  // Sort products
  const orderedProducts = [...products].sort((a, b) => (a.order || 99) - (b.order || 99)).filter(p => p.status !== 'draft');

  return (
    <main style={{ flex: 1, margin: '0 auto', width: '100%' }}>
      
      {/* Top Promotional Banner - High Contrast Steel */}
      <div style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', textAlign: 'center', padding: '12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        ENGINEERED FOR PRECISION // 65% OFF SELECT METALLIC FABRICS // ENDS TODAY
      </div>

      {/* Structural Navigation */}
      <nav style={{ 
        height: '90px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 4rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <Link href="/categories/all" style={{ color: 'var(--text-secondary)' }}>All Products</Link>
          <Link href="/about" style={{ color: 'var(--text-secondary)' }}>About Us</Link>
          <Link href="/contact" style={{ color: 'var(--text-secondary)' }}>Contact</Link>
        </div>
        
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.8rem', letterSpacing: '0.2em', fontWeight: 300, color: 'var(--text-primary)', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          STITCH
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <Link href="/account/login" style={{ color: 'var(--text-secondary)' }}>Login</Link>
          <Link href="/account/dealer-login" style={{ color: 'var(--text-secondary)' }}>Dealer Portal</Link>
          <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <span style={{ display: 'block', width: '16px', height: '16px', border: '2px solid currentColor', borderTop: 'none', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-6px', left: '2px', width: '8px', height: '6px', border: '2px solid currentColor', borderBottom: 'none', borderRadius: '4px 4px 0 0' }}></span>
            </span>
            Cart
          </Link>
        </div>
      </nav>

      {/* Hero Section - Structural Steel Aesthetic */}
      <section style={{ 
        position: 'relative', 
        height: '85vh', 
        minHeight: '700px',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ flex: 1, paddingRight: '4rem', zIndex: 10, animation: 'fadeUp 1s ease forwards' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'var(--text-secondary)' }}></span>
            Architectural Grade
          </div>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '2rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Precision.<br />
            Function.<br />
            <span style={{ color: 'var(--text-secondary)' }}>Integration.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '480px', fontWeight: 400 }}>
            Explore our industrial-grade custom window treatments, engineered for the most demanding modern spaces.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/categories/all" className="btn-primary">
              Explore Collection
            </Link>
          </div>
        </div>
        
        {/* Right Hero Visual - Sharp Polygon Cut */}
        <div style={{ 
          flex: 1.2, 
          height: '80%', 
          position: 'relative',
          clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)',
          backgroundColor: 'var(--bg-tertiary)',
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid var(--border-subtle)'
        }}>
          {/* Overlay grid lines for industrial feel */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
        </div>
      </section>

      {/* Categories Grid - Emulating Janal's "Shop by Category" but Steel */}
      <section style={{ padding: '8rem 5%', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>Engineered Systems</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Select your architectural light control category.</p>
          </div>
          <Link href="/categories/all" className="btn-outline">
            View All Categories
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {/* Mocking categories since categories from storage_actions might be simple strings */}
          {['Roller Shades', 'Duo-Glide', 'Motorized Automation'].map((cat, i) => (
            <Link key={i} href={`/categories/${cat.replace(/\s+/g, '-')}`} style={{ display: 'block', position: 'relative', group: 'true' }}>
              <div style={{ 
                height: '400px', 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-subtle)',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                position: 'relative',
                overflow: 'hidden',
                transition: 'var(--transition-smooth)'
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--bg-tertiary)', opacity: 0.5, transition: 'var(--transition-smooth)' }} className="category-bg"></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{cat}</h3>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Explore System →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional / Bargain Section (65% OFF) mapped to Steel */}
      <section style={{ padding: '8rem 5%', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>Terminal Clearance</div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}>Bargain Fabric Systems</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {orderedProducts.slice(0, 4).map(product => (
            <div key={product.id} style={{ 
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-primary)',
              padding: '1.5rem',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', border: '1px solid var(--text-primary)', color: 'var(--text-primary)', padding: '4px 8px', fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                65% OFF
              </div>
              <div style={{ 
                height: '250px', 
                backgroundColor: 'var(--bg-tertiary)',
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-subtle)'
              }}></div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', minHeight: '40px' }}>
                BARGAIN {product.category.toUpperCase()} SHADES
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>${product.basePrice}</span>
                </div>
                <Link href={`/product/${product.id}`} className="btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
                  Configure
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Dealer CTA - Janal Newsletter Equivalent */}
      <section style={{ 
        margin: '8rem 5%', 
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-strong)',
        padding: '5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '3rem',
        clipPath: 'polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
      }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>Dealer Network</div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Professional Installation Integration</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '500px' }}>
            Access our certified dealer network to ensure your architectural systems are installed with absolute precision.
          </p>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/contact" className="btn-primary" style={{ padding: '1.25rem 3rem' }}>
            Initialize Contact
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-subtle)', 
        backgroundColor: 'var(--bg-secondary)',
        padding: '6rem 5% 3rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '2rem', letterSpacing: '0.2em', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>STITCH</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '300px' }}>
              Precision-engineered light control systems for industrial and residential applications.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Systems</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/categories/roller-shades" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Roller Shades</Link>
              <Link href="/categories/duo-glide" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Duo-Glide</Link>
              <Link href="/categories/motorized" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Motorization</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/track-order" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Track Order</Link>
              <Link href="/warranty" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Warranty</Link>
              <Link href="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Contact Us</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Access Portals</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/account/login" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>User Login</Link>
              <Link href="/account/dealer-login" style={{ color: 'var(--text-primary)', fontSize: '0.9rem', borderLeft: '2px solid var(--text-primary)', paddingLeft: '8px' }}>Dealer Portal</Link>
              <Link href="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Admin Console</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p>© 2026 STITCH ARCHITECTURAL. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

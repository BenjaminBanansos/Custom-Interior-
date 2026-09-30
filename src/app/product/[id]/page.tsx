import React from 'react';
import Link from 'next/link';
import { getProducts } from '../../../lib/storage_actions';
import { getTheme } from '../../../lib/theme_actions';
import Configurator from '../../../components/Configurator';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find(p => p.id === id);
  const theme = await getTheme();

  if (!product) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Navigation */}
      <nav style={{ padding: '0 4rem', height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 0, zIndex: 100 }}>
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
          <Link href="/cart" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛒</span> Cart
          </Link>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '120px', margin: '0 auto', maxWidth: theme.containerWidth, transition: 'max-width 0.3s ease' }}>
        <div style={{ marginBottom: '20px' }}>
          <Link href="/categories/all" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>←</span> Back to Categories
          </Link>
        </div>
        
        <Configurator product={product} theme={theme} allProducts={products} />

        {/* Product Details Section */}
        <section style={{ marginTop: '80px', borderTop: '1px solid var(--border-subtle)', paddingTop: '60px' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Product Details</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', marginBottom: '3rem', lineHeight: 1.6 }}>
            {product.description || 'Premium architectural grade window treatments sourced globally and assembled in Canada. UV resistant, color-stable, and engineered for precision light control.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Materials</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Premium grade fabrics. UV resistant and color-stable.
              </p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Mechanism</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Ultra-smooth lift systems with optional motorization.
              </p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Warranty</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                5-year architectural warranty on all mechanisms.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

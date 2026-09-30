import React from 'react';
import Link from 'next/link';
import { getProducts } from '../../../lib/storage_actions';

export const dynamic = 'force-dynamic';

export default async function AllProducts() {
  const products = await getProducts();
  const orderedProducts = [...products].sort((a, b) => (a.order || 99) - (b.order || 99)).filter(p => p.status !== 'draft');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Structural Navigation */}
      <nav style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', letterSpacing: '0.2em', color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <Link href="/categories/all" style={{ color: 'var(--text-primary)' }}>All Systems</Link>
          <Link href="/about" style={{ color: 'var(--text-secondary)' }}>About</Link>
          <Link href="/cart" style={{ color: 'var(--text-secondary)' }}>Cart</Link>
        </div>
      </nav>

      <div style={{ padding: '6rem 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Terminal Systems</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Precision engineered architectural shading solutions.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/categories/all/wishlist" className="btn-outline">Access Wishlist</Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
          {orderedProducts.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} style={{ display: 'block', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)', padding: '1rem', transition: 'var(--transition-smooth)' }}>
              <div style={{ 
                height: '350px', 
                backgroundColor: 'var(--bg-tertiary)',
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '1rem',
                border: '1px solid var(--border-subtle)',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
              }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.category}</p>
                </div>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  ${product.basePrice}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

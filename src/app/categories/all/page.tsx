import React from 'react';
import Link from 'next/link';
import { getProducts } from '../../../lib/storage_actions';

export const dynamic = 'force-dynamic';

export default async function AllProducts() {
  const products = await getProducts();
  const orderedProducts = [...products].sort((a, b) => (a.order || 99) - (b.order || 99)).filter(p => p.status !== 'draft');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Structural Navigation */}
      <nav style={{ padding: '0 4rem', height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <Link href="/categories/all" style={{ color: 'var(--text-primary)' }}>All Products</Link>
          <Link href="/about" style={{ color: 'var(--text-secondary)' }}>About Us</Link>
          <Link href="/categories/all/wishlist" style={{ color: 'var(--text-secondary)' }}>Wishlist</Link>
          <Link href="/cart" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛒</span> Cart
          </Link>
        </div>
      </nav>

      <div style={{ padding: '6rem 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>All Products</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Explore our full collection of custom window treatments.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/categories/all/wishlist" className="btn-outline">View Wishlist</Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {orderedProducts.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} style={{ 
              display: 'block', 
              backgroundColor: '#fff', 
              borderRadius: 'var(--radius-md)', 
              padding: '1.5rem', 
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-smooth)' 
            }}>
              <div style={{ 
                height: '280px', 
                backgroundColor: 'var(--bg-tertiary)',
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '1.5rem',
                borderRadius: 'var(--radius-sm)'
              }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{product.category}</p>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
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

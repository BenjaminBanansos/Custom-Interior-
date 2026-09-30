import React from 'react';
import Link from 'next/link';

export default function Wishlist() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Navigation */}
      <nav style={{ padding: '0 4rem', height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <Link href="/categories/all" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>←</span> Back to Store
        </Link>
      </nav>

      <div style={{ padding: '6rem 5%', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Wishlist</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '4rem' }}>Your saved custom window treatments.</p>
        
        <div style={{ 
          border: '1px dashed var(--border-subtle)', 
          padding: '6rem 2rem', 
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>♡</div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>No items saved yet.</h3>
          <Link href="/categories/all" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}

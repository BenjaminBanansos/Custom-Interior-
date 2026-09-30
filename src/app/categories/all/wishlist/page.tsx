import React from 'react';
import Link from 'next/link';

export default function Wishlist() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Structural Navigation */}
      <nav style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', letterSpacing: '0.2em', color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <Link href="/categories/all" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ← Return to Terminal
        </Link>
      </nav>

      <div style={{ padding: '8rem 5%', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Saved Specifications</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '4rem' }}>Your wishlist of structural shading systems.</p>
        
        <div style={{ 
          border: '1px dashed var(--border-strong)', 
          padding: '5rem 2rem', 
          backgroundColor: 'var(--bg-secondary)',
          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
        }}>
          <div style={{ fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>∅</div>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>No configurations saved.</h3>
          <Link href="/categories/all" className="btn-outline">
            Browse Systems
          </Link>
        </div>
      </div>
    </main>
  );
}

import React from 'react';
import Link from 'next/link';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'var(--bg-secondary)' // soft off-white background
    }}>
      {/* Auth Navigation */}
      <nav style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>←</span> Back to Store
        </Link>
      </nav>

      {/* Auth Container */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '480px',
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          padding: '3rem 2.5rem',
          position: 'relative'
        }}>
          {children}
        </div>
      </div>
      
      {/* Simple Footer */}
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        © 2026 Stitch Canada.
      </div>
    </div>
  );
}

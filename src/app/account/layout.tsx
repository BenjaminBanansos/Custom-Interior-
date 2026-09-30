import React from 'react';
import Link from 'next/link';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'var(--bg-primary)'
    }}>
      {/* Auth Navigation */}
      <nav style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', letterSpacing: '0.2em', color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ← Return to Terminal
        </Link>
      </nav>

      {/* Auth Container */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '440px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          padding: '3rem',
          position: 'relative',
          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
        }}>
          {/* Industrial accent lines */}
          <div style={{ position: 'absolute', top: 0, left: '20px', right: 0, height: '2px', backgroundColor: 'var(--border-strong)' }}></div>
          
          {children}
        </div>
      </div>
    </div>
  );
}

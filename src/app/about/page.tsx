import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Structural Navigation */}
      <nav style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', letterSpacing: '0.2em', color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ← Return to Terminal
        </Link>
      </nav>

      <div style={{ padding: '8rem 5%', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--text-primary)', marginBottom: '2rem', borderLeft: '4px solid var(--accent-steel)', paddingLeft: '2rem' }}>About Our Atelier</h1>
        
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p>
            At Stitch Architectural, we engineer precision light control systems for the most demanding modern spaces. We reject the notion that window treatments are merely decorative.
          </p>
          <p>
            Our systems are structural integrations, designed with absolute geometric precision, industrial-grade materials, and an uncompromising commitment to minimalist luxury.
          </p>
          
          <div style={{ padding: '3rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)', marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Our Mission</h3>
            <p style={{ fontSize: '1rem' }}>To bridge the gap between heavy industrial reliability and high-end residential aesthetics. Every system is made-to-measure, built to last, and designed to disappear into the architecture.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

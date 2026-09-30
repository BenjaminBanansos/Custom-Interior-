import React from 'react';
import Link from 'next/link';

export default function Contact() {
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

      <div style={{ padding: '8rem 5%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Initialize Contact</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem' }}>
            Whether you require technical support for an ongoing installation or wish to inquire about our wholesale dealer network, our systems team is ready to assist.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Headquarters</h4>
              <p style={{ color: 'var(--text-muted)' }}>100 Architectural Way<br />Toronto, ON M5V 2H1<br />Canada</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Communications</h4>
              <p style={{ color: 'var(--text-muted)' }}>systems@stitchcanada.com<br />+1 (800) 555-0198</p>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 500px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '4rem', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>First Name</label>
                <input type="text" className="input-steel" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Last Name</label>
                <input type="text" className="input-steel" />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email Identifier</label>
              <input type="email" className="input-steel" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Message Directive</label>
              <textarea className="input-steel" rows={5} style={{ resize: 'vertical' }}></textarea>
            </div>
            
            <button type="button" className="btn-primary" style={{ marginTop: '1rem' }}>
              Transmit Protocol
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

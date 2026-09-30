import React from 'react';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Authentication</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access your Stitch Architectural profile.</p>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email Identifier</label>
          <input type="email" className="input-steel" placeholder="john@example.com" />
        </div>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Access Code</span>
            <Link href="/account/forgot-password" style={{ color: 'var(--text-primary)', fontSize: '0.75rem' }}>Forgot?</Link>
          </label>
          <input type="password" className="input-steel" placeholder="••••••••" />
        </div>
        
        <button type="button" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
          Initialize Access
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Require dealer clearance? <Link href="/account/dealer-login" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Dealer Portal</Link>
      </div>
    </>
  );
}

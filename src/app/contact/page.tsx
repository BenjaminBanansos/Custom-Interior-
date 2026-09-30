import React from 'react';
import Link from 'next/link';

export default function Contact() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Navigation */}
      <nav style={{ padding: '0 4rem', height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          STITCH
        </Link>
        <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>←</span> Back to Store
        </Link>
      </nav>

      <div style={{ padding: '6rem 5%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        <div style={{ flex: '1 1 400px', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Contact Us</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem' }}>
            We're here to help. Whether you have a question about an order, need design advice, or want to join our dealer network, please get in touch.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Visit Us</h4>
              <p style={{ color: 'var(--text-muted)' }}>100 Architectural Way<br />Toronto, ON M5V 2H1<br />Canada</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Reach Out</h4>
              <p style={{ color: 'var(--text-muted)' }}>hello@stitchcanada.com<br />+1 (800) 555-0198</p>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 500px', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', padding: '3.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Send a Message</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>First Name</label>
                <input type="text" className="input-elegant" placeholder="John" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>Last Name</label>
                <input type="text" className="input-elegant" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>Email Address</label>
              <input type="email" className="input-elegant" placeholder="john@example.com" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>Message</label>
              <textarea className="input-elegant" rows={5} placeholder="How can we help you today?" style={{ resize: 'vertical' }}></textarea>
            </div>
            
            <button type="button" className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

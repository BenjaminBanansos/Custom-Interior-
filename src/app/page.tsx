import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      .responsive-pad { padding: 0 10%; }
      .hero-section { padding-left: 10%; height: 80vh; min-height: 600px; }
      .hero-title { font-size: 4.5rem; }
      .hero-text { font-size: 1.25rem; max-width: 600px; }
      .nav-links { display: flex; gap: 20px; }
      .nav-brand { margin-left: 2rem; }
      .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
      .flex-wrap-layout { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2rem; }
      
      /* Laptop / Tablet */
      @media (max-width: 1024px) {
        .responsive-pad { padding: 0 5%; }
        .hero-section { padding-left: 5%; }
        .hero-title { font-size: 3.5rem; }
      }
      
      /* Mobile */
      @media (max-width: 768px) {
        .nav-links { display: none; } /* Hide links on mobile for simplicity */
        .nav-brand { margin-left: 0; }
        .hero-title { font-size: 2.5rem; }
        .hero-text { font-size: 1rem; }
        .hero-section { align-items: center; justify-content: center; padding: 0 5%; text-align: center; height: 60vh; min-height: 400px; }
        .responsive-pad { padding: 3rem 5%; }
        .flex-wrap-layout { flex-direction: column; align-items: center; text-align: center; }
      }
    `}} />
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', color: '#071F45', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Navbar */}
      <header className="responsive-pad" style={{ height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>Janal | Shades4U</span>
          <nav className="nav-links nav-brand">
            <Link href="/" style={{ textDecoration: 'none', color: '#071F45', fontWeight: 500 }}>Home</Link>
            <Link href="/categories/all" style={{ textDecoration: 'none', color: '#071F45', fontWeight: 500 }}>Shop</Link>
            <Link href="/about" style={{ textDecoration: 'none', color: '#071F45', fontWeight: 500 }}>About</Link>
            <Link href="/contact" style={{ textDecoration: 'none', color: '#071F45', fontWeight: 500 }}>Contact</Link>
          </nav>
        </div>
        <div className="nav-links" style={{ alignItems: 'center' }}>
          <Link href="/account/login" style={{ textDecoration: 'none', color: '#071F45', fontWeight: 500 }}>Login</Link>
          <Link href="/cart" style={{ textDecoration: 'none', color: '#071F45', fontWeight: 500 }}>Cart</Link>
          <Link href="/account/dealer-login" style={{ padding: '8px 16px', backgroundColor: '#071F45', color: '#fff', borderRadius: '18px', textDecoration: 'none', fontWeight: 600 }}>Dealer Login</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#F5F7F9'
      }}>
        <div style={{ zIndex: 10 }}>
          <h1 className="hero-title" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#071F45', lineHeight: 1.1, marginBottom: '24px' }}>
            Winter Sale is Now On
          </h1>
          <p className="hero-text" style={{ color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
            Stylish. Functional. Made for your space. Explore our wide range of blinds and shades. Get Free Shipping for orders above $100
          </p>
          <Link href="/categories/all" style={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            padding: '16px 32px', 
            backgroundColor: '#D4AF37', 
            color: '#071F45', 
            borderRadius: '999px', 
            textDecoration: 'none', 
            fontWeight: 700,
            fontSize: '1.1rem',
            transition: 'background 0.3s'
          }}>
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="responsive-pad" style={{ paddingTop: '6rem', paddingBottom: '6rem', backgroundColor: '#FFFFFF' }}>
        <div className="flex-wrap-layout" style={{ alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <span style={{ color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Shop by category</span>
            <h2 style={{ fontSize: '3rem', fontFamily: 'Outfit, sans-serif', color: '#071F45', margin: '0.5rem 0 0 0' }}>Explore Our Collection</h2>
          </div>
          <Link href="/categories/all" style={{ color: '#071F45', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            View All Categories →
          </Link>
        </div>

        <div className="grid-layout">
          {/* Card 1 */}
          <Link href="/categories/Duo-Glide" style={{ textDecoration: 'none', color: 'inherit', display: 'block', borderRadius: '18px', overflow: 'hidden', backgroundColor: '#F5F7F9', transition: 'transform 0.3s' }}>
            <div style={{ height: '300px', backgroundColor: '#EEF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="https://shades4u.s3.amazonaws.com/images/assets/duoglide.png" alt="Duo-Glide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif', margin: '0 0 0.5rem 0', color: '#071F45' }}>Duo-Glide</h3>
              <p style={{ color: '#6B7280', margin: 0 }}>Custom Window Treatments</p>
            </div>
          </Link>
          
          {/* Card 2 */}
          <Link href="/categories/Roller" style={{ textDecoration: 'none', color: 'inherit', display: 'block', borderRadius: '18px', overflow: 'hidden', backgroundColor: '#F5F7F9', transition: 'transform 0.3s' }}>
            <div style={{ height: '300px', backgroundColor: '#EEF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="https://shades4u.s3.amazonaws.com/images/assets/roller.png" alt="Roller Shades" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif', margin: '0 0 0.5rem 0', color: '#071F45' }}>Roller Shades</h3>
              <p style={{ color: '#6B7280', margin: 0 }}>Clean & Modern</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="responsive-pad flex-wrap-layout" style={{ backgroundColor: '#F5F7F9', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
          <h4 style={{ color: '#071F45', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif', margin: '0 0 0.5rem 0' }}>Free Shipping</h4>
          <p style={{ color: '#6B7280', margin: 0 }}>On orders over $100.</p>
        </div>
        <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
          <h4 style={{ color: '#071F45', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif', margin: '0 0 0.5rem 0' }}>Secure Payments</h4>
          <p style={{ color: '#6B7280', margin: 0 }}>100% safe and encrypted.</p>
        </div>
        <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
          <h4 style={{ color: '#071F45', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif', margin: '0 0 0.5rem 0' }}>Premium Quality</h4>
          <p style={{ color: '#6B7280', margin: 0 }}>Built to last.</p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="responsive-pad flex-wrap-layout" style={{ background: 'linear-gradient(120deg,#071f45,#0b2c5f 60%,#154785)', paddingTop: '5rem', paddingBottom: '5rem', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', margin: '0 0 1rem 0' }}>Get The Latest Offers & Updates</h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', margin: 0, fontSize: '1.1rem' }}>Subscribe to our newsletter and never miss a deal on custom blinds and shades.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', background: '#fff', padding: '0.5rem', borderRadius: '12px', minWidth: '300px', width: '100%', maxWidth: '400px' }}>
          <input type="email" placeholder="Email Address" style={{ border: 'none', outline: 'none', padding: '0.5rem 1rem', flex: 1, width: '100%' }} />
          <button style={{ background: '#071F45', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
        </div>
      </section>

      {/* Dealer Network */}
      <section className="responsive-pad flex-wrap-layout" style={{ paddingTop: '5rem', paddingBottom: '5rem', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <div>
          <span style={{ color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Partner with us</span>
          <h2 style={{ color: '#071F45', fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', margin: '0.5rem 0 1rem 0' }}>Would you like to partner with us?</h2>
          <p style={{ color: '#6B7280', fontSize: '1.1rem', maxWidth: '600px' }}>Join the Janal dealer network for exclusive catalog access, dealer pricing, and dedicated support.</p>
        </div>
        <Link href="/account/dealer-login" style={{ padding: '16px 32px', backgroundColor: '#071F45', color: '#fff', borderRadius: '999px', textDecoration: 'none', fontWeight: 700 }}>
          Apply online
        </Link>
      </section>

    </main>
    </>
  );
}

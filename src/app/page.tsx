import React from 'react';
import { getProducts } from '../lib/storage_actions';
import { getTheme } from '../lib/theme_actions';
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();
  const theme = await getTheme();
  
  // Sort products based on theme.productOrder
  let orderedProducts = [...products];
  if (theme.productOrder && theme.productOrder.length > 0) {
    orderedProducts = [];
    theme.productOrder.forEach(id => {
      const p = products.find(prod => prod.id === id);
      if (p) orderedProducts.push(p);
    });
    // Append any products not in the sort order (e.g. newly created ones)
    products.forEach(p => {
      if (!theme.productOrder.includes(p.id)) orderedProducts.push(p);
    });
  }

  // Extract unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Define the sections
  const HeroSection = (
    <section key="hero" style={{ 
      height: '80vh', 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="flex-center" style={{ padding: '0 10%', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          EST. 2024 | TORONTO, CANADA
        </span>
        <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '2rem' }}>
          Architectural <br/> Light Control.
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Custom-engineered window treatments designed for the modern Canadian home. Wholesale & Retail solutions.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" style={{ backgroundColor: 'var(--primary-color)' }}>EXPLORE CATALOG</button>
          <button className="btn-primary btn-outline" style={{ borderColor: 'var(--primary-color)', color: 'var(--text-color)' }}>WHOLESALE LOGIN</button>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
         <div style={{ 
           width: '100%', 
           height: '100%', 
           background: 'linear-gradient(135deg, #1a1a1a 0%, #2b2b2b 100%)',
           display: 'flex',
           alignItems: 'flex-end',
           padding: '4rem'
         }}>
           <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-outfit)', fontSize: '5rem' }}>
             ZENITH ZEBRA<br/>SERIES 01
           </div>
         </div>
      </div>
    </section>
  );

  const CatalogSection = (
    <section key="catalog" id="retail" style={{ padding: '8rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Select Your Style</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Hand-picked fabrics and premium mechanisms.</p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${theme.catalogGridCols}, 1fr)`, 
        gap: '40px' 
      }}>
        {orderedProducts.map(product => {
          let heightStr = '240px';
          if (theme.catalogImageRatio === 'square') heightStr = '100%';
          if (theme.catalogImageRatio === 'portrait') heightStr = '400px';
          if (theme.catalogImageRatio === 'landscape') heightStr = '240px';

          return (
          <Link key={product.id} href={`/product/${product.id}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              height: heightStr, 
              aspectRatio: theme.catalogImageRatio === 'square' ? '1 / 1' : 'auto',
              backgroundColor: product.fabricFamilies?.[0]?.colors?.[0]?.hex || product.fabrics?.[0]?.hex || 'var(--bg-secondary)', 
              backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginBottom: '1.5rem',
              transition: 'var(--transition-smooth)',
              position: 'relative',
              borderRadius: '8px'
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{product.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>From ${product.basePrice}</p>
              </div>
              <div style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }}>→</div>
            </div>
          </Link>
          )
        })}
      </div>
    </section>
  );

  const CategoriesSection = (
    <section key="categories" style={{ padding: '6rem 2rem', backgroundColor: '#f9f9f9' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Shop by Category</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {categories.map(cat => {
          // Find first product in this category to use as a cover image
          const coverProduct = products.find(p => p.category === cat);
          // Generate the URL slug for the category
          const catId = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <Link href={`/category/${catId}`} key={cat} style={{ textDecoration: 'none' }}>
              <div style={{ 
                height: '300px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', position: 'relative',
                backgroundImage: coverProduct?.imageUrl ? `url(${coverProduct.imageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>{cat.replace(/-/g, ' ')}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );

  const renderCuratedGrid = (title: string, listId: 'popular' | 'budget' | 'lightFiltering') => {
    const list = theme.curatedLists?.[listId] || [];
    if (list.length === 0) return null;

    const curatedProducts = list.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;

    return (
      <div key={listId} style={{ marginBottom: '6rem' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '10px' }}>{title}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${theme.catalogGridCols}, 1fr)`, gap: '30px' }}>
          {curatedProducts.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ height: '300px', backgroundColor: product.fabricFamilies?.[0]?.colors?.[0]?.hex || 'var(--bg-secondary)', backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '1rem', borderRadius: '8px' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{product.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>From ${product.basePrice}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const CuratedSection = (
    <section key="curated" style={{ padding: '6rem 2rem' }}>
      {renderCuratedGrid('Most Popular', 'popular')}
      {renderCuratedGrid('Budget Friendly', 'budget')}
      {renderCuratedGrid('Light Filtering Options', 'lightFiltering')}
    </section>
  );

  return (
    <main style={{ flex: 1, margin: '0 auto', maxWidth: theme.containerWidth, width: '100%', transition: 'max-width 0.3s ease' }}>
      {/* Navigation */}
      <nav style={{ 
        height: '80px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 4rem',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        zIndex: 100
      }}>
        <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.25rem', letterSpacing: '0.1em', fontWeight: 600 }}>
          STITCH CANADA
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>
          <a href="#retail">RETAIL</a>
          <a href="#wholesale" style={{ color: 'var(--text-secondary)' }}>WHOLESALE</a>
          <a href="#about" style={{ color: 'var(--text-secondary)' }}>OUR STORY</a>
        </div>
        <div>
          <button className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.75rem' }}>
            WHATSAPP US
          </button>
        </div>
      </nav>

      {/* Dynamic Sections mapped from Theme DND Order */}
      {(theme.sectionOrder || ['hero', 'categories', 'curated', 'catalog']).map(section => {
        if (section === 'hero') return HeroSection;
        if (section === 'categories') return CategoriesSection;
        if (section === 'curated') return CuratedSection;
        if (section === 'catalog') return CatalogSection;
        return null;
      })}

      {/* Footer */}
      <footer style={{ 
        padding: '4rem', 
        backgroundColor: 'var(--accent-dark)', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', marginBottom: '2rem' }}>STITCH</div>
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem' }}>© 2024 STITCH BLINDS CANADA. ALL RIGHTS RESERVED.</p>
        <Link href="/admin" style={{ fontSize: '0.6rem', opacity: 0.3, textDecoration: 'none', color: 'white', letterSpacing: '0.1em' }}>
          ADMIN ACCESS
        </Link>
      </footer>
    </main>
  );
}

import React from 'react';
import { getProducts, getCategories } from '../../../lib/storage_actions';
import { getTheme } from '../../../lib/theme_actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const categories = await getCategories();
  const products = await getProducts();
  const theme = await getTheme();

  const category = categories.find(c => c.id === params.id);
  
  if (!category) {
    notFound();
  }

  // Filter products by this category
  const categoryProducts = products.filter(p => p.category === category.id);

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
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>STITCH CANADA</Link>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>
          <Link href="/#retail">RETAIL</Link>
          <Link href="/#wholesale" style={{ color: 'var(--text-secondary)' }}>WHOLESALE</Link>
          <Link href="/#about" style={{ color: 'var(--text-secondary)' }}>OUR STORY</Link>
        </div>
      </nav>

      {/* Category Header */}
      <section style={{ 
        height: '40vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-secondary)',
        backgroundImage: category.imageUrl ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${category.imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: category.imageUrl ? 'white' : 'inherit'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'var(--font-outfit)' }}>{category.name}</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>{category.description}</p>
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ padding: '6rem 2rem' }}>
        {categoryProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <h2>New products arriving soon!</h2>
            <p>We are currently updating our catalog for this category.</p>
            <Link href="/#retail" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.8rem 2rem', backgroundColor: 'var(--primary-color)', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
              View All Products
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${theme.catalogGridCols}, 1fr)`, 
            gap: '40px' 
          }}>
            {categoryProducts.map(product => {
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
              );
            })}
          </div>
        )}
      </section>
      
      {/* Footer */}
      <footer style={{ 
        padding: '4rem', 
        backgroundColor: 'var(--accent-dark)', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', marginBottom: '2rem' }}>STITCH</div>
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem' }}>© 2024 STITCH BLINDS CANADA. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}

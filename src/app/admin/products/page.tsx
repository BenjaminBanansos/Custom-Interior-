
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '../../../lib/products';
import { getProducts, deleteProduct } from '../../../lib/storage_actions';

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [baseProducts, setBaseProducts] = useState<any[]>([]);
  const [filterProduct, setFilterProduct] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function loadData() {
    try {
      const bpData = await fetch('/api/base-products').then(res => res.json()).catch(() => []);
      setBaseProducts(bpData);
      // Add a timestamp to bust next.js cache for sure
      const prodData = await getProducts();
      if (!Array.isArray(prodData)) {
        setErrorMsg("Data returned is not an array: " + JSON.stringify(prodData));
      } else {
        setProducts(prodData);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Unknown error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await deleteProduct(id);
    await loadData();
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = React.useMemo(() => {
    let sortableItems = products.filter(p => {
      if (filterProduct && p.productFamily !== filterProduct) return false;
      if (filterCategory && p.category !== filterCategory) return false;
      return true;
    });
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = (a as any)[sortConfig.key] || '';
        let bValue = (b as any)[sortConfig.key] || '';
        
        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else {
      // Default sort by productFamily then category
      sortableItems.sort((a, b) => {
        const famA = a.productFamily || '';
        const famB = b.productFamily || '';
        if (famA < famB) return -1;
        if (famA > famB) return 1;
        
        const catA = a.category || '';
        const catB = b.category || '';
        if (catA < catB) return -1;
        if (catA > catB) return 1;
        
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig, filterProduct, filterCategory]);

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key === columnKey) {
      return <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>;
    }
    return <span style={{ opacity: 0.3 }}> ↕</span>;
  };

  return (
    <div>
      <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>INVENTORY CONTROL</span>
          <h1 style={{ fontSize: '2.5rem' }}>Master Product List</h1>
          <p style={{ color: '#888', marginTop: '10px' }}>Manage industrial specifications and retail availability for all window treatments.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={loadData} style={{
            backgroundColor: '#fff', 
            color: '#000', 
            padding: '12px 24px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>↻ REFRESH DATA</button>
          <Link href="/admin/products/new" style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            padding: '12px 24px', 
            border: 'none', 
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}>+ NEW PRODUCT</Link>
        </div>
      </header>

      {errorMsg ? (
        <div style={{ color: 'red', padding: '20px', border: '1px solid red', backgroundColor: '#fee' }}>
          <h3>Debug Error:</h3>
          <p>{errorMsg}</p>
        </div>
      ) : isLoading ? (
        <div style={{ color: '#888' }}>Loading products...</div>
      ) : (
        <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee', backgroundColor: '#fcfcfc' }}>
                <th onClick={() => handleSort('productFamily')} style={{ padding: '20px', fontSize: '0.7rem', color: '#888', fontWeight: 700, cursor: 'pointer' }}>
                  PRODUCT FAMILY <SortIcon columnKey="productFamily" />
                </th>
                <th onClick={() => handleSort('category')} style={{ padding: '20px', fontSize: '0.7rem', color: '#888', fontWeight: 700, cursor: 'pointer' }}>
                  CATEGORY <SortIcon columnKey="category" />
                </th>
                <th onClick={() => handleSort('name')} style={{ padding: '20px', fontSize: '0.7rem', color: '#888', fontWeight: 700, cursor: 'pointer' }}>
                  PRODUCT NAME <SortIcon columnKey="name" />
                </th>
                <th onClick={() => handleSort('basePrice')} style={{ padding: '20px', fontSize: '0.7rem', color: '#888', fontWeight: 700, cursor: 'pointer' }}>
                  BASE PRICE <SortIcon columnKey="basePrice" />
                </th>
                <th onClick={() => handleSort('status')} style={{ padding: '20px', fontSize: '0.7rem', color: '#888', fontWeight: 700, cursor: 'pointer' }}>
                  STATUS <SortIcon columnKey="status" />
                </th>
                <th style={{ padding: '20px', fontSize: '0.7rem', color: '#888', fontWeight: 700 }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#aaa' }}>No products found in the atelier database.</td>
                </tr>
              ) : (
                sortedProducts.map(product => {
                  try {
                    return (
                  <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{product.productFamily || 'Unknown'}</td>
                    <td style={{ padding: '20px', fontSize: '0.8rem', color: '#555' }}>
                      <span style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>{product.category}</span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#f5f5f5', 
                          borderRadius: '4px',
                          backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}></div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{(product.name || 'Unnamed Product')}</div>
                          <div style={{ fontSize: '0.7rem', color: '#aaa' }}>ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                      ${product.basePrice} <span style={{ fontSize: '0.6rem', color: '#aaa' }}>({product.basePriceMode === 'fixed' ? 'FIXED' : 'PER SQ M'})</span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.6rem', 
                        fontWeight: 700,
                        backgroundColor: product.status === 'published' ? '#ecfdf5' : '#fef2f2',
                        color: product.status === 'published' ? '#10b981' : '#ef4444'
                      }}>{(product.status || 'draft').toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <Link href={`/product/${product.id}`} style={{ fontSize: '0.7rem', color: '#888', textDecoration: 'none' }}>VIEW</Link>
                        <Link href={`/admin/products/${product.id}/edit`} style={{ fontSize: '0.7rem', color: '#0066cc', textDecoration: 'none' }}>EDIT</Link>
                        <button onClick={() => handleDelete(product.id)} style={{ border: 'none', background: 'none', fontSize: '0.7rem', color: '#ef4444', cursor: 'pointer', padding: 0 }}>DELETE</button>
                      </div>
                    </td>
                  </tr>
                );
                  } catch (e: any) {
                    return <tr key={product.id || Math.random()}><td colSpan={6}>Render Error: {e.message}</td></tr>;
                  }
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// cache bust
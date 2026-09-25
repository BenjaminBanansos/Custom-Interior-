'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function FloatingCart() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <a 
      href="/cart"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#000',
        color: '#fff',
        width: '60px',
        height: '60px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        zIndex: 9999,
        textDecoration: 'none'
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    </a>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Manually check if they have the admin_token cookie
    const hasToken = document.cookie.includes('admin_token=');
    if (!hasToken) {
      // Force a HARD browser redirect to clear all Next.js RSC router cache state
      window.location.href = '/login';
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) {
    // Render nothing while checking to avoid flash
    return <div style={{ minHeight: '100vh', backgroundColor: '#fcfcfc' }} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '280px', padding: '60px 80px' }}>
        {children}
      </main>
    </div>
  );
}

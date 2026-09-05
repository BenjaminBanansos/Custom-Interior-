export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const adminToken = cookieStore.get('admin_token');

  if (!adminToken) {
    redirect('/login');
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

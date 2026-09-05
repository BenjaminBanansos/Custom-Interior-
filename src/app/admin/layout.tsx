import React from 'react';
import { cookies } from 'next/headers';
import AdminSidebar from './AdminSidebar';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const hasToken = cookieStore.get('admin_token');

  if (!hasToken) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <script dangerouslySetInnerHTML={{ __html: `window.location.href = "/login";` }} />
        <p>Redirecting to login...</p>
      </div>
    );
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

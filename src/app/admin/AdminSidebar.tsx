'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/orders', label: 'Orders', icon: '📦' },
    { href: '/admin/products', label: 'Products', icon: '🏷️' },
    { href: '/admin/users', label: 'Customers', icon: '👥' },
    { href: '/admin/marketing', label: 'Marketing', icon: '📈' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside style={{ width: '250px', backgroundColor: '#071F45', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px' }}>ATELIER</h2>
        <p style={{ margin: 0, fontSize: '0.7rem', color: '#D4AF37', marginTop: '5px' }}>ADMINISTRATION</p>
      </div>

      <nav style={{ flex: 1, padding: '20px 0' }}>
        {links.map(link => {
          const isActive = pathname === link.href || (pathname && pathname.startsWith(link.href + '/'));
          return (
            <Link 
              key={link.href} 
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 25px',
                color: isActive ? '#fff' : '#a0aabf',
                textDecoration: 'none',
                backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                borderLeft: `3px solid ${isActive ? '#D4AF37' : 'transparent'}`,
                transition: 'all 0.2s'
              }}
            >
              <span style={{ marginRight: '15px', fontSize: '1.2rem' }}>{link.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Link href="/" style={{ display: 'block', padding: '10px', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
          EXIT TO STORE
        </Link>
      </div>
    </aside>
  );
}

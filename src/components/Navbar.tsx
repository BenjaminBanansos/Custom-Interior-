'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="w-full h-[90px] flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] px-8 md:px-16 sticky top-0 z-[100] transition-all duration-300">
      <div className="flex gap-8 md:gap-12 text-[0.95rem] font-medium">
        <Link href="/categories/all" className={`transition-colors duration-300 hover:text-[#D4AF37] ${pathname.includes('/categories') ? 'text-[#0B2C5F]' : 'text-[#6B7280]'}`}>Shop</Link>
        <Link href="/about" className={`transition-colors duration-300 hover:text-[#D4AF37] ${pathname === '/about' ? 'text-[#0B2C5F]' : 'text-[#6B7280]'}`}>Our Story</Link>
        <Link href="/contact" className={`transition-colors duration-300 hover:text-[#D4AF37] ${pathname === '/contact' ? 'text-[#0B2C5F]' : 'text-[#6B7280]'}`}>Contact</Link>
      </div>
      
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-3xl font-semibold text-[#0B2C5F] tracking-wide">
        STITCH
      </Link>
      
      <div className="flex gap-8 items-center text-[0.95rem] font-medium">
        <Link href="/account/login" className={`flex items-center gap-2 transition-colors duration-300 hover:text-[#D4AF37] ${pathname.includes('/account') ? 'text-[#0B2C5F]' : 'text-[#6B7280]'}`}>
          <span className="text-lg">👤</span> <span className="hidden md:inline">Login</span>
        </Link>
        <Link href="/cart" className={`flex items-center gap-2 transition-colors duration-300 hover:text-[#D4AF37] ${pathname === '/cart' ? 'text-[#0B2C5F]' : 'text-[#0B2C5F]'}`}>
          <span className="text-lg">🛒</span> <span className="hidden md:inline">Cart</span>
        </Link>
      </div>
    </nav>
  );
}

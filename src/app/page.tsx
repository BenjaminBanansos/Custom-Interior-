
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://shades4u.s3.amazonaws.com/images/assets/duoglide.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C5F]/90 via-[#0B2C5F]/40 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-32">
          <span className="text-[#8D99AE] text-sm md:text-base tracking-[0.2em] font-medium mb-6 uppercase">Precision Engineered</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight drop-shadow-lg">
            Architectural Light Control
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto">
            Custom-tailored blinds and curtains for retail and wholesale. Premium quality designed for Canadian homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/categories/all" className="px-10 py-4 bg-white text-[#1A1D20] rounded-sm font-medium hover:bg-[#F5F7F9] transition-all duration-300 shadow-xl hover:-translate-y-1">
              Shop Collections
            </Link>
            <Link href="/account/dealer-login" className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-sm font-medium hover:bg-white/10 transition-all duration-300">
              Dealer Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[#F5F7F9] px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#8D99AE] text-sm font-bold tracking-widest uppercase mb-3 block">Our Products</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1D20]">Premium Collections</h2>
            </div>
            <Link href="/categories/all" className="hidden md:inline-flex text-[#1A1D20] font-medium hover:text-[#8D99AE] transition-colors items-center gap-2">
              View All <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category Card 1 */}
            <Link href="/categories/Duo-Glide" className="group block bg-white rounded-sm overflow-hidden shadow-[0_12px_28px_rgba(26,29,32,0.06)] hover:shadow-[0_12px_28px_rgba(26,29,32,0.12)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                <img src="https://shades4u.s3.amazonaws.com/images/assets/duoglide.png" alt="Duo Glide" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-serif text-[#1A1D20] mb-1">Duo-Glide</h3>
                  <p className="text-gray-500 text-sm">Light Filtering & Privacy</p>
                </div>
                <div className="w-12 h-12 rounded-sm bg-[#1A1D20] text-white flex items-center justify-center transition-colors group-hover:bg-[#8D99AE]">
                  <span className="text-xl">→</span>
                </div>
              </div>
            </Link>

            {/* Category Card 2 */}
            <Link href="/categories/Roller" className="group block bg-white rounded-sm overflow-hidden shadow-[0_12px_28px_rgba(26,29,32,0.06)] hover:shadow-[0_12px_28px_rgba(26,29,32,0.12)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                <img src="https://shades4u.s3.amazonaws.com/images/assets/roller.png" alt="Roller Shades" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-serif text-[#1A1D20] mb-1">Roller Shades</h3>
                  <p className="text-gray-500 text-sm">Minimalist & Modern</p>
                </div>
                <div className="w-12 h-12 rounded-sm bg-[#1A1D20] text-white flex items-center justify-center transition-colors group-hover:bg-[#8D99AE]">
                  <span className="text-xl">→</span>
                </div>
              </div>
            </Link>

            {/* Category Card 3 */}
            <Link href="/categories/Silhouette" className="group block bg-white rounded-sm overflow-hidden shadow-[0_12px_28px_rgba(26,29,32,0.06)] hover:shadow-[0_12px_28px_rgba(26,29,32,0.12)] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                <img src="https://shades4u.s3.amazonaws.com/images/assets/silhouette.png" alt="Silhouette" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-serif text-[#1A1D20] mb-1">Silhouette</h3>
                  <p className="text-gray-500 text-sm">Soft Elegance</p>
                </div>
                <div className="w-12 h-12 rounded-sm bg-[#1A1D20] text-white flex items-center justify-center transition-colors group-hover:bg-[#8D99AE]">
                  <span className="text-xl">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Dealer CTA Section */}
      <section className="py-24 bg-[#1A1D20] text-white px-8 md:px-16 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#8D99AE] font-medium tracking-[0.2em] uppercase text-sm mb-6 block">Trade Professionals</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Join our Dealer Network</h2>
          <p className="text-lg text-white/80 font-light mb-10">
            Get access to wholesale pricing, dedicated support, and our premium product catalog. Exclusively for designers, architects, and installers.
          </p>
          <Link href="/account/dealer-login" className="inline-block px-12 py-5 bg-white text-[#1A1D20] rounded-sm font-medium hover:bg-[#8D99AE] hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1">
            Apply for Trade Account
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-3xl font-semibold text-[#1A1D20] tracking-wide">
            STITCH
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link href="/about" className="hover:text-[#1A1D20] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-[#1A1D20] transition-colors">Contact</Link>
            <Link href="/account/login" className="hover:text-[#1A1D20] transition-colors">Login</Link>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Stitch Interiors. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

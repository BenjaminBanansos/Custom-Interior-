import React from 'react';
import Link from 'next/link';
import { getProducts } from '../lib/storage_actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await getProducts();
  const activeProducts = allProducts.filter((p: any) => p.status === 'published');
  
  const umbrellasMap = new Map();
  activeProducts.forEach((p: any) => {
    if (p.category) {
      if (!umbrellasMap.has(p.category)) {
        umbrellasMap.set(p.category, p.images?.[0]?.url || p.imageUrl || null);
      } else if (!umbrellasMap.get(p.category) && (p.images?.[0]?.url || p.imageUrl)) {
        umbrellasMap.set(p.category, p.images?.[0]?.url || p.imageUrl);
      }
    }
  });

  const activeCategories = Array.from(umbrellasMap.entries()).map(([name, image]) => ({ name, image }));

  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      .hero-mask {
        border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
        overflow: hidden;
      }
      .badge-dashed {
        border: 2px dashed rgba(255,255,255,0.4);
        border-radius: 50%;
      }
    `}} />

    {/* Navigation */}
    <nav className="w-full bg-white z-50 relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
            <div className="flex items-center">
                <span className="text-3xl font-bold text-[#0F2C59] italic tracking-tight" style={{ fontFamily: 'serif' }}>SmartDecor</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <Link href="/login" className="bg-[#0F2C59] text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors">Dealer Login</Link>
                <button className="text-[#0F2C59] hover:text-[#EBB422] transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>
    </nav>

    {/* Hero Section */}
    <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-20 overflow-hidden">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-8">
            
            {/* Left Side: Typography */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F2C59] leading-[1.15] mb-6">
                    Winter Sale is Now On
                </h1>
                
                <p className="text-gray-500 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                    Stylish. Functional. Made for your space. Explore our wide range of custom blinds and shades.
                    <br/><br/>
                    Get Free Shipping for orders above $100
                </p>

                <Link href="#collections" className="inline-flex items-center justify-center bg-[#EBB422] text-[#0F2C59] font-bold text-lg px-8 py-3.5 rounded-full hover:bg-yellow-400 transition-colors shadow-lg">
                    Shop Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>

                <div className="mt-16 flex items-center gap-6">
                    <div className="flex items-center text-[#0F2C59] font-bold text-xl">
                        01<span className="text-gray-400 text-sm font-normal ml-1">/ 03</span>
                    </div>
                    <div className="w-24 h-[2px] bg-gray-200 relative">
                        <div className="absolute left-0 top-0 h-full w-1/3 bg-[#EBB422]"></div>
                    </div>
                    <div className="flex gap-3">
                        <button className="w-10 h-10 rounded-full border-2 border-[#0F2C59] text-[#0F2C59] flex items-center justify-center hover:bg-[#0F2C59] hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button className="w-10 h-10 rounded-full border-2 border-[#0F2C59] text-[#0F2C59] flex items-center justify-center hover:bg-[#0F2C59] hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side: Janal Style Masked Image */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end min-h-[450px] md:min-h-[550px]">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 md:right-10 w-48 h-48 bg-[#EBB422] rounded-full -z-10 translate-x-10 -translate-y-10"></div>
                <div className="absolute top-1/2 left-0 md:left-10 w-24 h-24 bg-[#0F2C59] rounded-full -z-10 -translate-y-1/2"></div>
                <div className="absolute inset-4 border border-[#EBB422] opacity-40 rounded-[50%] -z-10 transform -rotate-6 hidden md:block"></div>

                {/* Masked Hero Image */}
                <div className="hero-mask relative w-[90%] max-w-[500px] aspect-[4/3] bg-gray-100 z-10 border-4 border-white shadow-2xl">
                    <img src="https://smartdecor.store/uploads/1779278868731-Black-Mockup__Tokyo-Light-FilteringH6w1zq.jpg" 
                         alt="Duo Stripes Mockup" 
                         className="w-full h-full object-cover" />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 md:left-12 z-20 w-24 h-24 bg-[#0F2C59] rounded-full border-2 border-[#EBB422] flex flex-col items-center justify-center text-white text-center shadow-lg">
                    <svg className="w-6 h-6 text-red-500 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.5 6h-5zm0 0"/></svg>
                    <span className="text-[7px] font-bold uppercase tracking-wider">Proudly<br/>Canadian</span>
                </div>

                <div className="absolute bottom-10 left-0 md:-left-4 z-20 w-32 h-32 bg-[#EBB422] rounded-full flex items-center justify-center shadow-xl">
                    <div className="w-[110px] h-[110px] badge-dashed flex flex-col items-center justify-center">
                        <span className="text-[#0F2C59] font-bold text-2xl leading-none">60%</span>
                        <span className="text-[#0F2C59] font-bold text-xl leading-none">OFF</span>
                    </div>
                </div>

            </div>
        </div>
    </main>

    {/* Categories Section */}
    <section id="collections" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <h2 className="text-[#EBB422] font-bold text-sm tracking-widest uppercase mb-2">Shop By Category</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#0F2C59]">Explore Our Collection</h3>
                </div>
                <Link href="/admin/products" className="text-[#0F2C59] font-semibold mt-4 md:mt-0 flex items-center hover:text-[#EBB422] transition-colors">
                    View All Categories <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeCategories.map(category => (
                    <div key={category.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full group">
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                            {category.image ? (
                                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                        </div>
                        <div className="p-8 flex justify-between items-center">
                            <div>
                                <h4 className="text-xl font-bold text-[#0F2C59] mb-1">{category.name}</h4>
                                <p className="text-gray-500 text-sm">Custom Window Treatments</p>
                            </div>
                            <Link href={`/products/${encodeURIComponent(category.name)}`} className="w-12 h-12 bg-[#0F2C59] text-white rounded-full flex items-center justify-center hover:bg-[#EBB422] transition-colors shadow-md shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
    </>
  );
}

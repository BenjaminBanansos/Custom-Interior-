
import React from 'react';
import { getProductById, getProducts } from '../../lib/products_actions';
import { getTheme } from '../../lib/theme_actions';
import Configurator from '../../components/Configurator';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const [product, allProducts, theme] = await Promise.all([
    getProductById(params.id),
    getProducts(),
    getTheme()
  ]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F5F7F9]">
        <div className="bg-white p-12 rounded-sm shadow-sm text-center">
          <h1 className="text-3xl font-serif text-[#1A1D20] mb-4">Product Not Found</h1>
          <a href="/categories/all" className="text-[#8D99AE] hover:underline font-medium">Return to Shop</a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F7F9] min-h-screen">
      {/* Breadcrumb Header */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-8">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <a href="/" className="hover:text-[#1A1D20] transition-colors">Home</a>
          <span>/</span>
          <a href="/categories/all" className="hover:text-[#1A1D20] transition-colors">Shop</a>
          <span>/</span>
          <a href={`/categories/${product.fabricFamilies?.[0]?.category || 'all'}`} className="hover:text-[#1A1D20] transition-colors">{product.fabricFamilies?.[0]?.category || 'Category'}</a>
          <span>/</span>
          <span className="text-[#1A1D20]">{product.name}</span>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-16">
        <Configurator product={product} allProducts={allProducts} theme={theme} />
      </div>
    </div>
  );
}

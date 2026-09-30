
'use client';

import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, checkoutCart } from '@/lib/cart_actions';
import { sendOtp, verifyOtp } from '@/lib/otp_actions';
import { getLoggedInCustomer, logoutCustomer } from '@/lib/customer_auth';
import { Product } from '@/lib/products';
import { getProducts } from '@/lib/products_actions';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'cart' | 'email' | 'verify'>('cart');
  const [msg, setMsg] = useState('');
  
  const [productsDb, setProductsDb] = useState<Record<string, Product>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const localCartId = typeof window !== 'undefined' ? localStorage.getItem('local_cart_id') || undefined : undefined;
      const [cartItems, loggedInCustomer, prods] = await Promise.all([
        getCart(localCartId),
        getLoggedInCustomer(),
        getProducts()
      ]);
      
      const pMap: Record<string, Product> = {};
      prods.forEach(p => pMap[p.name] = p);
      setProductsDb(pMap);
      
      setItems(cartItems);
      setCustomer(loggedInCustomer);
    } catch (err) {
      console.error('Error loading cart:', err);
      setMsg('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    const localCartId = typeof window !== 'undefined' ? localStorage.getItem('local_cart_id') || undefined : undefined;
    await removeFromCart(id, localCartId);
    loadData();
  };

  const handleLogout = async () => {
    await logoutCustomer();
    loadData();
  };

  const handleSendCode = async () => {
    setMsg('Sending code...');
    const res = await sendOtp(email);
    if (res.success) {
      setStep('verify');
      setMsg('Code sent to ' + email);
    } else {
      setMsg('Failed: ' + res.error);
    }
  };

  const handleVerify = async () => {
    setMsg('Verifying...');
    const res = await verifyOtp(email, code);
    if (res.success) {
      setMsg('Verified! Redirecting checkout...');
      await handleCheckout();
    } else {
      setMsg('Failed: ' + res.error);
    }
  };

  const handleCheckout = async () => {
    const localCartId = typeof window !== 'undefined' ? localStorage.getItem('local_cart_id') || undefined : undefined;
    const res = await checkoutCart(localCartId);
    if (res.success) {
      setItems([]);
      alert("Checkout Successful! We will contact you soon.");
      if (typeof window !== 'undefined') localStorage.removeItem('local_cart_id');
      window.location.href = '/';
    } else {
      alert("Checkout failed: " + res.error);
    }
  };

  const beginCheckout = () => {
    if (customer) {
      handleCheckout();
    } else {
      setStep('email');
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[#0B2C5F] text-xl">Loading your cart...</div>;

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = total * 0.05;
  const grandTotal = total + tax;

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-12 w-full">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif text-[#0B2C5F] tracking-tight">Your Cart</h1>
      </div>
      
      {items.length === 0 ? (
        <div className="bg-white p-16 rounded-[18px] text-center shadow-[0_12px_28px_rgba(11,44,95,0.06)] border border-gray-100">
          <p className="text-[#0B2C5F] text-2xl font-serif mb-8">Your cart is empty.</p>
          <a href="/categories/all" className="inline-block px-10 py-4 bg-[#0B2C5F] text-white rounded-full font-medium hover:bg-[#071F45] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="lg:w-2/3 flex flex-col gap-6">
            {items.map(item => {
              const p = productsDb[item.productName];
              const img = p?.imageUrl || 'https://shades4u.s3.amazonaws.com/images/assets/duoglide.png';
              
              return (
                <div key={item._id} className="bg-white p-6 rounded-[18px] flex flex-col sm:flex-row gap-8 shadow-[0_12px_28px_rgba(11,44,95,0.06)] border border-gray-100 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(11,44,95,0.1)] group">
                  <div className="w-full sm:w-48 h-48 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 relative">
                    <img src={img} alt={item.productName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h2 className="text-2xl font-serif text-[#0B2C5F] font-medium leading-tight">{item.productName}</h2>
                        <span className="text-xl font-serif text-[#0B2C5F]">${item.totalPrice}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-1 mb-4">{item.width}" W x {item.height}" H &nbsp;&bull;&nbsp; Qty: {item.quantity}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.details?.family && (
                          <span className="bg-[#EEF4FB] text-[#0B2C5F] px-3 py-1 rounded-full text-xs font-medium border border-[#0B2C5F]/10">
                            {item.details.family}
                          </span>
                        )}
                        {item.details?.color && (
                          <span className="bg-[#EEF4FB] text-[#0B2C5F] px-3 py-1 rounded-full text-xs font-medium border border-[#0B2C5F]/10">
                            {item.details.color}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleRemove(item._id)}
                        className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-[18px] shadow-[0_12px_28px_rgba(11,44,95,0.06)] border border-gray-100 p-8 sticky top-32">
              <h3 className="text-2xl font-serif text-[#0B2C5F] mb-8">Order Summary</h3>
              
              <div className="flex flex-col gap-4 mb-8 text-[0.95rem] text-[#0B2C5F]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">Calculated at next step</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Tax (5%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-6 flex justify-between items-end">
                  <span className="text-lg font-serif">Total</span>
                  <span className="text-3xl font-serif font-medium">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {step === 'cart' && (
                <div className="flex flex-col gap-4">
                  {customer ? (
                    <div className="mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
                      <span className="text-gray-500 block mb-1">Logged in as</span>
                      <strong className="text-[#0B2C5F] block">{customer.email}</strong>
                      <button onClick={handleLogout} className="text-xs text-[#D4AF37] hover:underline mt-2 inline-block">Logout</button>
                    </div>
                  ) : null}
                  <button 
                    onClick={beginCheckout}
                    className="w-full bg-[#0B2C5F] text-white py-4 rounded-full font-medium hover:bg-[#071F45] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}

              {step === 'email' && (
                <div className="mt-8 bg-gray-50 p-6 border border-gray-200 rounded-[18px]">
                  <h4 className="font-medium text-[#0B2C5F] mb-4">Guest Checkout</h4>
                  <input 
                    type="email" 
                    placeholder="Enter email address" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300 mb-4 bg-white"
                  />
                  <button 
                    onClick={handleSendCode}
                    className="w-full bg-[#0B2C5F] text-white py-3 rounded-full font-medium hover:bg-[#071F45] transition-all"
                  >
                    Continue
                  </button>
                  {msg && <p className="mt-4 text-sm text-[#0B2C5F] text-center font-medium">{msg}</p>}
                </div>
              )}

              {step === 'verify' && (
                <div className="mt-8 bg-gray-50 p-6 border border-gray-200 rounded-[18px]">
                  <h4 className="font-medium text-[#0B2C5F] mb-2">Check your email</h4>
                  <p className="text-sm text-gray-500 mb-4">We sent a verification code to {email}</p>
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit code" 
                    value={code} 
                    onChange={e => setCode(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center tracking-widest text-lg focus:border-[#0B2C5F] focus:ring-1 focus:ring-[#0B2C5F] outline-none transition-all duration-300 mb-4 bg-white"
                  />
                  <button 
                    onClick={handleVerify}
                    className="w-full bg-[#0B2C5F] text-white py-3 rounded-full font-medium hover:bg-[#071F45] transition-all"
                  >
                    Verify & Complete
                  </button>
                  {msg && <p className="mt-4 text-sm text-[#0B2C5F] text-center font-medium">{msg}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

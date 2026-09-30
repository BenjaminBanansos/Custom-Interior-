'use client';

import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, checkoutCart } from '@/lib/cart_actions';
import { sendOtp, verifyOtp } from '@/lib/otp_actions';
import { getLoggedInCustomer, logoutCustomer } from '@/lib/customer_auth';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'cart' | 'email' | 'verify'>('cart');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const localCartId = typeof window !== 'undefined' ? localStorage.getItem('local_cart_id') || undefined : undefined;
      const [cartItems, loggedInCustomer] = await Promise.all([
        getCart(localCartId),
        getLoggedInCustomer()
      ]);
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
    if (!email) {
      setMsg('Please enter an email.');
      return;
    }
    setMsg('Sending code...');
    const res = await sendOtp(email);
    if (res.success) {
      setMsg('Code sent! Check your email.');
      setStep('verify');
    } else {
      setMsg(res.error || 'Failed to send code.');
    }
  };

  const handleVerifyAndCheckout = async () => {
    if (!code) {
      setMsg('Please enter the code.');
      return;
    }
    setMsg('Verifying code...');
    const res = await verifyOtp(email, code);
    if (res.success) {
      setMsg('Verified! Processing order...');
      const localCartId = typeof window !== 'undefined' ? localStorage.getItem('local_cart_id') || undefined : undefined;
      const checkoutRes = await checkoutCart(email, 'Guest Customer', localCartId);
      if (checkoutRes.success) {
        setMsg(`Success! Your order ID is ${checkoutRes.orderId}`);
        setItems([]);
        if (typeof window !== 'undefined') localStorage.removeItem('local_cart_id');
        setStep('cart');
      } else {
        setMsg(checkoutRes.error || 'Failed to checkout.');
      }
    } else {
      setMsg(res.error || 'Invalid code.');
    }
  };

  const handleLoggedInCheckout = async () => {
    if (!customer) return;
    setMsg('Processing order...');
    const localCartId = typeof window !== 'undefined' ? localStorage.getItem('local_cart_id') || undefined : undefined;
    const checkoutRes = await checkoutCart(customer.email, customer.username, localCartId);
    if (checkoutRes.success) {
      setMsg(`Success! Your order ID is ${checkoutRes.orderId}`);
      setItems([]);
      if (typeof window !== 'undefined') localStorage.removeItem('local_cart_id');
      setStep('cart');
    } else {
      setMsg(checkoutRes.error || 'Failed to checkout.');
    }
  };

  if (loading) return (
    <main className="min-h-screen bg-[#F5F7F9] flex flex-col">

      {/* Navigation */}
      <nav className="w-full h-[90px] flex justify-between items-center bg-white border-b border-gray-200 shadow-sm px-16 sticky top-0 z-[100]">
        <div className="flex gap-10 text-[0.9rem] font-medium">
          <a href="/categories/all" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Shop Categories</a>
          <a href="/about" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Our Story</a>
          <a href="/contact" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Contact</a>
        </div>
        
        <a href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-3xl font-semibold text-[#1A1D20]">
          STITCH
        </a>
        
        <div className="flex gap-8 items-center text-[0.9rem] font-medium">
          <a href="/account/login" className="text-gray-500 flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
            <span className="text-xl">👤</span> Login
          </a>
          <a href="/cart" className="text-[#1A1D20] flex items-center gap-2">
            <span className="text-xl">🛒</span> Cart
          </a>
        </div>
      </nav>

    <div className="flex h-screen items-center justify-center">
      <div className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase animate-pulse">
        LOADING BASKET...
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 font-sans">
      <h1 className="text-3xl font-light mb-16 tracking-tight">Your Project Basket</h1>
      
      {items.length === 0 ? (
        <div className="py-20 border-t border-b border-gray-200 rounded-none text-center">
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">Your basket is empty.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-[#343A40] text-white px-8 py-4 text-[0.95rem] font-medium tracking-wide hover:bg-[#1A1D20] transition-colors"
          >
            RETURN TO SHOP
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="border-b border-[#343A40] pb-4 mb-8">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">Items ({items.length})</h2>
            </div>
            
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.cartItemId} className="flex gap-6 border-b border-gray-100 pb-8 relative group">
                  <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{item.productName.split(' ')[0]}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-lg">{item.productName}</h3>
                      <button 
                        onClick={() => handleRemove(item.cartItemId)} 
                        className="text-gray-400 hover:text-red-500 text-xl font-light transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    
                    {item.details?.roomName && item.details?.roomName !== 'Unspecified Room' && (
                      <div className="inline-block bg-gray-100 px-2 py-1 mb-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-600">
                          {item.details.roomName}
                        </span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mt-2">
                      <div>
                        <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Dimensions</span>
                        {item.width}" W × {item.height}" H
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Fabric</span>
                        {item.details?.family || 'N/A'} - {item.details?.color || 'N/A'}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-6">
                      <div className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-xl font-light">
                        ${item.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-white rounded-none shadow-sm p-8">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-8 border-b border-gray-200 rounded-none pb-4">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm text-gray-500 uppercase tracking-wider">Subtotal</span>
                <span className="text-2xl font-light">${items.reduce((sum, item) => sum + item.totalPrice, 0)}</span>
              </div>
              
              {customer ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 border border-gray-200 rounded-none">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Signed in as</p>
                    <p className="font-semibold">{customer.username}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                  <button 
                    onClick={handleLoggedInCheckout} 
                    className="w-full bg-[#343A40] text-white py-4 rounded-none shadow-md text-[0.95rem] font-medium tracking-wide hover:bg-[#1A1D20] transition-colors"
                  >
                    Place Order
                  </button>
                  <button onClick={handleLogout} className="w-full text-gray-400 text-xs tracking-widest uppercase mt-4 hover:text-[#1A1D20] transition-colors">Sign out</button>
                </div>
              ) : (
                <>
                  {step === 'cart' && (
                    <div className="space-y-4">
                      <button 
                        onClick={() => window.location.href = '/api/auth/google'}
                        className="w-full bg-white border border-gray-200 rounded-none text-[#1A1D20] py-4 flex justify-center items-center gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <img src="https://img.icons8.com/color/48/google-logo.png" className="w-5 h-5" alt="Google" />
                        <span className="text-[0.95rem] font-medium tracking-wide">Sign in with Google</span>
                      </button>
                      
                      <div className="relative flex py-6 items-center">
                        <div className="flex-grow border-t border-gray-200 rounded-none"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] font-bold tracking-widest uppercase">OR CONTINUE AS GUEST</span>
                        <div className="flex-grow border-t border-gray-200 rounded-none"></div>
                      </div>

                      <button 
                        onClick={() => setStep('email')} 
                        className="w-full bg-[#343A40] text-white py-4 rounded-none shadow-md text-[0.95rem] font-medium tracking-wide hover:bg-[#1A1D20] transition-colors"
                      >
                        Guest Checkout
                      </button>
                    </div>
                  )}

                  {step === 'email' && (
                    <div className="space-y-4">
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">Enter your email to receive a verification code.</p>
                      <input 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="name@company.com" 
                        className="w-full bg-white border border-gray-200 rounded-none p-4 text-sm outline-none focus:border-[#343A40] transition-colors"
                      />
                      <button 
                        onClick={handleSendCode} 
                        className="w-full bg-[#343A40] text-white py-4 rounded-none shadow-md text-[0.95rem] font-medium tracking-wide hover:bg-[#1A1D20] transition-colors mt-2"
                      >
                        Send Code
                      </button>
                      <button onClick={() => setStep('cart')} className="w-full text-gray-400 text-xs tracking-widest uppercase mt-4 hover:text-[#1A1D20] transition-colors">Cancel</button>
                    </div>
                  )}

                  {step === 'verify' && (
                    <div className="space-y-4">
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">Enter the 6-digit code sent to <br/><b className="text-[#1A1D20]">{email}</b></p>
                      <input 
                        type="text" 
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder="••••••" 
                        className="w-full bg-white border border-gray-200 rounded-none p-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-[#343A40] transition-colors"
                        maxLength={6}
                      />
                      <button 
                        onClick={handleVerifyAndCheckout} 
                        className="w-full bg-[#343A40] text-white py-4 rounded-none shadow-md text-[0.95rem] font-medium tracking-wide hover:bg-[#1A1D20] transition-colors mt-2"
                      >
                        Verify & Place Order
                      </button>
                      <button onClick={() => setStep('email')} className="w-full text-gray-400 text-xs tracking-widest uppercase mt-4 hover:text-[#1A1D20] transition-colors">Back</button>
                    </div>
                  )}
                </>
              )}

              {msg && (
                <div className={`mt-6 p-4 text-xs tracking-wide uppercase font-bold border ${msg.includes('Success') ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]' : 'bg-gray-100 border-gray-200 rounded-none text-[#1A1D20]'}`}>
                  {msg}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </main>
  );
}

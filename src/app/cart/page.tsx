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
      const [cartItems, loggedInCustomer] = await Promise.all([
        getCart(),
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
    await removeFromCart(id);
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
      const checkoutRes = await checkoutCart(email, 'Guest Customer');
      if (checkoutRes.success) {
        setMsg(`Success! Your order ID is ${checkoutRes.orderId}`);
        setItems([]);
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
    const checkoutRes = await checkoutCart(customer.email, customer.username);
    if (checkoutRes.success) {
      setMsg(`Success! Your order ID is ${checkoutRes.orderId}`);
      setItems([]);
      setStep('cart');
    } else {
      setMsg(checkoutRes.error || 'Failed to checkout.');
    }
  };

  if (loading) return <div className="p-10">Loading Cart...</div>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-10">Your Project Basket</h1>
      
      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Items</h2>
            {items.map(item => (
              <div key={item.cartItemId} className="border p-4 rounded mb-4 relative">
                <button onClick={() => handleRemove(item.cartItemId)} className="absolute top-4 right-4 text-red-500 font-bold">✕</button>
                <h3 className="font-bold">{item.productName}</h3>
                <p className="text-sm text-gray-600">{item.width}" W x {item.height}" H</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="font-bold mt-2">${item.totalPrice}</p>
                <div className="text-xs text-gray-500 mt-2">
                  <p>{item.details?.family} - {item.details?.color}</p>
                </div>
              </div>
            ))}
            <div className="text-xl font-bold mt-6">
              Total: ${items.reduce((sum, item) => sum + item.totalPrice, 0)}
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded border">
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            
            {customer ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-4 border rounded">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {customer.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold">{customer.username}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLoggedInCheckout} 
                  className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
                >
                  Place Order as {customer.username}
                </button>
                <button onClick={handleLogout} className="w-full text-gray-500 text-sm mt-2">Sign out</button>
              </div>
            ) : (
              <>
                {step === 'cart' && (
                  <div className="space-y-4">
                    <button 
                      onClick={() => window.location.href = '/api/auth/google'}
                      className="w-full bg-white border border-gray-300 text-black py-3 rounded font-bold hover:bg-gray-100 flex justify-center items-center gap-2 transition-colors"
                    >
                      <img src="https://img.icons8.com/color/48/google-logo.png" className="w-6 h-6" alt="Google" />
                      Sign in with Google
                    </button>
                    
                    <div className="relative flex py-5 items-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR CONTINUE WITHOUT ACCOUNT</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button 
                      onClick={() => setStep('email')} 
                      className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
                    >
                      Guest Checkout
                    </button>
                  </div>
                )}

                {step === 'email' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Enter your email to receive a verification code.</p>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full border p-3 rounded outline-none focus:border-black"
                    />
                    <button 
                      onClick={handleSendCode} 
                      className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
                    >
                      Send Verification Code
                    </button>
                    <button onClick={() => setStep('cart')} className="w-full text-gray-500 text-sm">Cancel</button>
                  </div>
                )}

                {step === 'verify' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Enter the 6-digit code sent to <b>{email}</b></p>
                    <input 
                      type="text" 
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder="123456" 
                      className="w-full border p-3 rounded text-center text-2xl tracking-widest outline-none focus:border-black"
                      maxLength={6}
                    />
                    <button 
                      onClick={handleVerifyAndCheckout} 
                      className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
                    >
                      Verify & Place Order
                    </button>
                    <button onClick={() => setStep('email')} className="w-full text-gray-500 text-sm">Back</button>
                  </div>
                )}
              </>
            )}

            {msg && (
              <div className="mt-4 p-4 bg-gray-100 text-black text-sm rounded font-medium border border-gray-200">
                {msg}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

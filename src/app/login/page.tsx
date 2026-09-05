'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin dashboard
        window.location.href = '/admin?bust=' + Date.now(); // Refresh to ensure layout gets updated state
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9',
      backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f0f0f0 100%)',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '60px 40px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Top Accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #000, #333)'
        }}></div>

        <div style={{ 
          width: '48px', 
          height: '48px', 
          backgroundColor: '#000', 
          borderRadius: '12px',
          marginBottom: '24px'
        }}></div>
        
        <h1 style={{ 
          fontSize: '1.8rem', 
          fontWeight: 700, 
          marginBottom: '8px',
          color: '#111',
          letterSpacing: '-0.03em'
        }}>
          Atelier Admin
        </h1>
        <p style={{ 
          fontSize: '0.9rem', 
          color: '#666', 
          marginBottom: '40px',
          textAlign: 'center' 
        }}>
          Sign in to manage your luxury storefront
        </p>

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#444', marginBottom: '8px' }}>
              Username
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fafafa',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              required
              onFocus={(e) => { e.target.style.borderColor = '#000'; e.target.style.backgroundColor = '#fff'; }}
              onBlur={(e) => { e.target.style.borderColor = '#e0e0e0'; e.target.style.backgroundColor = '#fafafa'; }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#444', marginBottom: '8px' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#fafafa',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              required
              onFocus={(e) => { e.target.style.borderColor = '#000'; e.target.style.backgroundColor = '#fff'; }}
              onBlur={(e) => { e.target.style.borderColor = '#e0e0e0'; e.target.style.backgroundColor = '#fafafa'; }}
            />
          </div>

          {error && (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#fff1f0', 
              border: '1px solid #ffccc7', 
              color: '#cf1322', 
              borderRadius: '8px',
              fontSize: '0.85rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '16px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#222'; }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#000'; }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

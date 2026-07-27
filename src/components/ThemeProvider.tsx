'use client';

import React, { useEffect, useState } from 'react';
import { ThemeConfig } from '../lib/theme_actions';

export default function ThemeProvider({ 
  children, 
  initialTheme 
}: { 
  children: React.ReactNode, 
  initialTheme: ThemeConfig 
}) {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);

  // Listen for real-time updates from the Admin iframe bridge
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'UPDATE_THEME') {
        setTheme(event.data.theme);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{
      '--primary-color': theme.colors?.primary || '#000000',
      '--bg-color': theme.colors?.background || '#ffffff',
      '--text-color': theme.colors?.text || '#111111',
      '--font-heading': theme.typography?.heading || 'Outfit, sans-serif',
      '--font-body': theme.typography?.body || 'Inter, sans-serif',
      // We also apply basic styles to this wrapper to enforce the theme
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
      fontFamily: 'var(--font-body)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    } as React.CSSProperties}>
      {/* We pass the active theme via context if needed, but CSS vars handle most styling */}
      {children}
    </div>
  );
}

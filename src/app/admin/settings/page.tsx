'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Settings</h1>
        <p style={{ color: '#888' }}>Manage your workspace preferences and configurations.</p>
      </header>
      
      <div style={{ backgroundColor: '#fff', border: '1px solid #eee', padding: '40px', borderRadius: '12px' }}>
        <p style={{ color: '#666' }}>Settings module is currently under construction. Future updates will include user management, API keys, and notification preferences.</p>
      </div>
    </div>
  );
}

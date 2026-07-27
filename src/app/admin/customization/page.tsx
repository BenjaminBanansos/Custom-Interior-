'use client';

import React, { useState, useEffect } from 'react';
import { getCustomizationSettings, saveCustomizationSettings } from '../../../lib/customization_actions';
import { CustomizationSettings, LocalizedSetting } from '../../../lib/customization';

export default function CustomizationPage() {
  const [settings, setSettings] = useState<CustomizationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      const data = await getCustomizationSettings();
      if (data) {
        // Ensure array exists to prevent errors from old data formats
        if (!data.localizedSettings) data.localizedSettings = [];
        setSettings(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setMessage('');
    
    const success = await saveCustomizationSettings(settings);
    if (success) {
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Error saving settings.');
    }
    setSaving(false);
  };

  const addLocation = () => {
    if (!settings) return;
    const newLoc: LocalizedSetting = {
      id: 'loc-' + Date.now(),
      region: 'New Region',
      taxRate: 0,
      currency: 'USD'
    };
    setSettings({
      ...settings,
      localizedSettings: [...settings.localizedSettings, newLoc]
    });
  };

  const removeLocation = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      localizedSettings: settings.localizedSettings.filter(l => l.id !== id)
    });
  };

  const updateLocation = (id: string, field: keyof LocalizedSetting, value: string | number) => {
    if (!settings) return;
    const updated = settings.localizedSettings.map(loc => {
      if (loc.id === id) {
        return { ...loc, [field]: value };
      }
      return loc;
    });
    setSettings({ ...settings, localizedSettings: updated });
  };

  if (loading) return <div>Loading customization settings...</div>;
  if (!settings) return <div>Error loading settings.</div>;

  return (
    <div>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Customization</h1>
        <p style={{ color: '#888' }}>Global rules, localization, and branding options.</p>
      </header>
      
      <div style={{ backgroundColor: '#fff', border: '1px solid #eee', padding: '40px', borderRadius: '12px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px' }}>
          
          {/* PRICING */}
          <section>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Global Pricing</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Global Pricing Multiplier</label>
              <input 
                type="number" step="0.01" 
                value={settings.globalPricingMultiplier} 
                onChange={e => setSettings({...settings, globalPricingMultiplier: parseFloat(e.target.value)})}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', maxWidth: '300px' }}
              />
              <small style={{ color: '#888' }}>Multiplies all base prices globally (e.g. 1.2 for +20%).</small>
            </div>
          </section>

          <hr style={{ borderTop: '1px solid #eee' }} />

          {/* LOCALIZATION: TAX & CURRENCY */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem' }}>Localization (Tax & Currency)</h2>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>Adaptive settings based on the customer's region.</p>
              </div>
              <button 
                type="button" 
                onClick={addLocation}
                style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #000', backgroundColor: '#fff', cursor: 'pointer' }}
              >
                + Add Region
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {settings.localizedSettings.map((loc) => (
                <div key={loc.id} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 2 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Region Name</label>
                    <input 
                      type="text" 
                      value={loc.region} 
                      onChange={e => updateLocation(loc.id, 'region', e.target.value)}
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Currency (e.g. USD)</label>
                    <input 
                      type="text" 
                      value={loc.currency} 
                      onChange={e => updateLocation(loc.id, 'currency', e.target.value)}
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Tax Rate (Decimal)</label>
                    <input 
                      type="number" step="0.01" 
                      value={loc.taxRate} 
                      onChange={e => updateLocation(loc.id, 'taxRate', parseFloat(e.target.value))}
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                  </div>

                  <button 
                    type="button" 
                    onClick={() => removeLocation(loc.id)}
                    style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', height: '40px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {settings.localizedSettings.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#888', border: '1px dashed #ccc', borderRadius: '8px' }}>
                  No localized settings configured. Add a region above.
                </div>
              )}
            </div>
          </section>

          <hr style={{ borderTop: '1px solid #eee' }} />

          {/* BRANDING */}
          <section>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Branding</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Primary Brand Color (Hex)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="color" 
                  value={settings.branding.primaryColor} 
                  onChange={e => setSettings({...settings, branding: { ...settings.branding, primaryColor: e.target.value }})}
                  style={{ width: '50px', height: '40px', padding: 0, border: 'none', cursor: 'pointer' }}
                />
                <input 
                  type="text" 
                  value={settings.branding.primaryColor} 
                  onChange={e => setSettings({...settings, branding: { ...settings.branding, primaryColor: e.target.value }})}
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', maxWidth: '240px' }}
                />
              </div>
            </div>
          </section>

          <button 
            type="submit" 
            disabled={saving}
            style={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              padding: '12px', 
              borderRadius: '6px', 
              border: 'none', 
              cursor: 'pointer',
              marginTop: '10px',
              fontWeight: 600,
              maxWidth: '300px'
            }}>
            {saving ? 'Saving...' : 'Save Customization Settings'}
          </button>
          
          {message && <div style={{ color: '#10b981', fontWeight: 600 }}>{message}</div>}

        </form>
      </div>
    </div>
  );
}

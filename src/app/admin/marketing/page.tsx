'use client';

import React, { useState, useEffect } from 'react';
import { getLeads, updateLeadStatus, getCRMConfig, saveCRMConfig, generateCampaign, Lead, CRMConfig } from '../../../lib/crm_actions';
import { getProducts } from '../../../lib/storage_actions';
import { Product } from '../../../lib/products';

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState<'crm' | 'studio' | 'settings'>('studio');
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [config, setConfig] = useState<CRMConfig>({ geminiApiKey: '' });
  const [products, setProducts] = useState<Product[]>([]);
  
  // Campaign Studio State
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [campaignGoal, setCampaignGoal] = useState<string>('Email Newsletter to Wholesale Clients');
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignOutput, setCampaignOutput] = useState<{ subject: string, body: string, caption: string } | null>(null);

  useEffect(() => {
    getLeads().then(setLeads);
    getCRMConfig().then(setConfig);
    getProducts().then(setProducts);
  }, []);

  const handleSaveConfig = async () => {
    const success = await saveCRMConfig(config);
    if (success) alert('API Key Saved successfully.');
    else alert('Failed to save configuration.');
  };

  const handleGenerate = async () => {
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return alert("Please select a product first.");
    
    setIsGenerating(true);
    const result = await generateCampaign(product, campaignGoal);
    setCampaignOutput(result);
    setIsGenerating(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>GROWTH ENGINE</span>
          <h1 style={{ fontSize: '2.5rem' }}>CRM & AI Marketing</h1>
          <p style={{ color: '#888', marginTop: '10px' }}>Manage leads and generate high-converting copy using Gemini AI.</p>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '40px' }}>
        <button onClick={() => setActiveTab('studio')} style={{ padding: '15px 30px', border: 'none', background: 'transparent', borderBottom: activeTab === 'studio' ? '2px solid #000' : '2px solid transparent', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>AI Campaign Studio</button>
        <button onClick={() => setActiveTab('crm')} style={{ padding: '15px 30px', border: 'none', background: 'transparent', borderBottom: activeTab === 'crm' ? '2px solid #000' : '2px solid transparent', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>Audience Tracker</button>
        <button onClick={() => setActiveTab('settings')} style={{ padding: '15px 30px', border: 'none', background: 'transparent', borderBottom: activeTab === 'settings' ? '2px solid #000' : '2px solid transparent', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>AI Integrations</button>
      </div>

      {activeTab === 'studio' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
          {/* Controls */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Generate Campaign</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Select Product to Highlight</label>
              <select 
                value={selectedProductId} 
                onChange={e => setSelectedProductId(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="">-- Choose a Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (from ${p.basePrice})</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Campaign Goal & Audience</label>
              <textarea 
                value={campaignGoal}
                onChange={e => setCampaignGoal(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical' }}
              />
            </div>

            <button 
              onClick={handleGenerate} 
              disabled={isGenerating || !selectedProductId}
              style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', background: '#000', color: '#fff', fontWeight: 600, cursor: isGenerating || !selectedProductId ? 'not-allowed' : 'pointer', opacity: isGenerating || !selectedProductId ? 0.5 : 1 }}
            >
              {isGenerating ? 'Generating with Gemini...' : 'Generate Marketing Copy ✨'}
            </button>
            {!config.geminiApiKey && (
              <p style={{ fontSize: '0.7rem', color: '#eab308', marginTop: '10px', textAlign: 'center' }}>
                Running in Mock Mode. Add your API Key in Integrations to unlock Gemini.
              </p>
            )}
          </div>

          {/* Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!campaignOutput && !isGenerating && (
              <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', borderRadius: '12px', border: '1px dashed #ccc', color: '#888' }}>
                Select a product and click generate to build your campaign.
              </div>
            )}

            {isGenerating && (
              <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', borderRadius: '12px', border: '1px solid #eee', color: '#000', fontWeight: 600, animation: 'pulse 1.5s infinite' }}>
                <style>{`@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }`}</style>
                Writing high-converting copy...
              </div>
            )}

            {campaignOutput && !isGenerating && (
              <>
                {/* Email Block */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#888', marginBottom: '15px' }}>EMAIL CAMPAIGN</div>
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Subject: </span>
                    <strong style={{ fontSize: '1.1rem' }}>{campaignOutput.subject}</strong>
                  </div>
                  <div 
                    style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#333' }}
                    dangerouslySetInnerHTML={{ __html: campaignOutput.body }} 
                  />
                </div>

                {/* Social Block */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#888', marginBottom: '15px' }}>INSTAGRAM / SOCIAL CAPTION</div>
                  <div style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#333', whiteSpace: 'pre-wrap' }}>
                    {campaignOutput.caption}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'crm' && (
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Audience Tracker</h3>
          {leads.length === 0 ? (
            <p style={{ color: '#888' }}>No leads captured yet. Add a lead capture form to your storefront.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ padding: '12px 0', fontSize: '0.8rem', color: '#888' }}>NAME</th>
                  <th style={{ padding: '12px 0', fontSize: '0.8rem', color: '#888' }}>EMAIL</th>
                  <th style={{ padding: '12px 0', fontSize: '0.8rem', color: '#888' }}>SOURCE</th>
                  <th style={{ padding: '12px 0', fontSize: '0.8rem', color: '#888' }}>STATUS</th>
                  <th style={{ padding: '12px 0', fontSize: '0.8rem', color: '#888' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px 0', fontWeight: 500 }}>{lead.name}</td>
                    <td style={{ padding: '16px 0', color: '#555' }}>{lead.email}</td>
                    <td style={{ padding: '16px 0' }}><span style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{lead.source}</span></td>
                    <td style={{ padding: '16px 0' }}>
                      <select 
                        value={lead.status}
                        onChange={async (e) => {
                          await updateLeadStatus(lead.id, e.target.value as any);
                          getLeads().then(setLeads); // refresh
                        }}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.8rem' }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <button style={{ background: 'transparent', border: '1px solid #ccc', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Email Lead</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', maxWidth: '600px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Google Gemini Integration</h3>
          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '30px' }}>
            Paste your Google Gemini API key below to unlock advanced AI generation for your marketing campaigns. 
            If no key is provided, the system will run in Mock Mode.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>Gemini API Key</label>
            <input 
              type="password" 
              value={config.geminiApiKey}
              onChange={e => setConfig({ ...config, geminiApiKey: e.target.value })}
              placeholder="AIzaSy..."
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <button onClick={handleSaveConfig} style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', background: '#000', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
            Save Integration
          </button>
        </div>
      )}
    </div>
  );
}

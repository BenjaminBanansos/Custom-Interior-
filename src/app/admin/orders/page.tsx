'use client';

import React, { useState, useEffect } from 'react';
import { fetchAdminOrders, confirmOrder, Order } from '@/lib/order_actions';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const data = await fetchAdminOrders();
    setOrders(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setLoading(false);
  };

  const handleConfirm = async (id: string) => {
    const res = await confirmOrder(id);
    if (res.success) {
      loadOrders();
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Order Management</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>Verify, confirm, and manage customer orders and quotes.</p>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '24px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{order.id} - {order.productName}</h3>
                  <p style={{ margin: '4px 0 0', color: '#888', fontSize: '0.85rem' }}>{new Date(order.date).toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    backgroundColor: order.status === 'Confirmed' ? '#e6f7ff' : '#fffbe6',
                    color: order.status === 'Confirmed' ? '#1890ff' : '#faad14',
                    border: \`1px solid \${order.status === 'Confirmed' ? '#91d5ff' : '#ffe58f'}\`
                  }}>
                    {order.status}
                  </span>
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => handleConfirm(order.id)}
                      style={{ padding: '8px 16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Verify & Confirm
                    </button>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Specifications</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li><strong>Size:</strong> {order.width}" W x {order.height}" H</li>
                    <li><strong>Quantity:</strong> {order.quantity}</li>
                    <li><strong>Fabric:</strong> {order.details.family} - {order.details.color}</li>
                    <li><strong>Total Est. Price:</strong> \${order.totalPrice}</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Configuration</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: '#555' }}>
                    {order.details.modifiers?.map((mod: string, i: number) => <li key={i}>• {mod}</li>)}
                  </ul>
                </div>
              </div>
              
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #eaeaea', display: 'flex', gap: '10px' }}>
                <button style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
                  ✉️ Send Quote to Customer
                </button>
                <button style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
                  📥 Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

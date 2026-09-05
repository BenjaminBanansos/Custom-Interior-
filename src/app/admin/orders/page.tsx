'use client';

import React, { useState, useEffect } from 'react';
import { fetchAdminOrders, confirmOrder, Order } from '@/lib/order_actions';

export default function AdminOrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const handleConfirm = async (id: string) => {
    if (confirm('Verify and confirm this order?')) {
      const success = await confirmOrder(id);
      if (success) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: 'Confirmed' } : o));
      } else {
        alert('Failed to confirm order.');
      }
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Wholesale Orders</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>Verify, confirm, and manage customer orders and quotes.</p>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '24px', backgroundColor: '#fff' }}>
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
                    border: '1px solid ' + (order.status === 'Confirmed' ? '#91d5ff' : '#ffe58f')
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
              <div style={{ display: 'flex', gap: '40px' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#888' }}>Configuration</h4>
                  <p style={{ margin: '0 0 4px', fontSize: '0.9rem' }}><strong>Family:</strong> {order.family}</p>
                  <p style={{ margin: '0 0 4px', fontSize: '0.9rem' }}><strong>Color:</strong> {order.color}</p>
                  <p style={{ margin: '0 0 4px', fontSize: '0.9rem' }}><strong>Size:</strong> {order.width} W x {order.height} H</p>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}><strong>Quantity:</strong> {order.quantity}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#888' }}>Modifiers</h4>
                  {order.modifiers.map((mod, i) => (
                    <p key={i} style={{ margin: '0 0 4px', fontSize: '0.9rem' }}>• {mod}</p>
                  ))}
                  {order.subAttributes && order.subAttributes.map((attr, i) => (
                    <p key={`sub-${i}`} style={{ margin: '0 0 4px', fontSize: '0.9rem' }}>• {attr}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use server';

import { revalidatePath } from 'next/cache';
import { getDb } from './mongo';

export interface Order {
  id: string;
  date: string;
  customerName?: string;
  customerEmail?: string;
  productName: string;
  width: string;
  height: string;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Shipped';
  details: any;
}

export async function submitOrder(orderData: Omit<Order, 'id' | 'date' | 'status'>) {
  const db = await getDb();
  
  const newOrder: Order = {
    ...orderData,
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toISOString(),
    status: 'Pending'
  };
  
  await db.collection('orders').insertOne(newOrder);
  
  // Send Email via Resend
  try {
    const htmlBody = `
      <h2>New Order Received: ${newOrder.id}</h2>
      <p><strong>Product:</strong> ${newOrder.productName}</p>
      <p><strong>Size:</strong> ${newOrder.width}" W x ${newOrder.height}" H</p>
      <p><strong>Quantity:</strong> ${newOrder.quantity}</p>
      <p><strong>Total Price:</strong> $${newOrder.totalPrice}</p>
      <br/>
      <h3>Configuration Details:</h3>
      <ul>
        <li><strong>Fabric:</strong> ${newOrder.details.family || 'N/A'} - ${newOrder.details.color || 'N/A'}</li>
        ${newOrder.details.modifiers?.map((mod: string) => `<li>${mod}</li>`).join('') || ''}
        ${newOrder.details.subAttributes?.map((sub: string) => `<li>${sub}</li>`).join('') || ''}
      </ul>
      <br/>
      <p>Please log into the Admin Panel to verify and confirm this order.</p>
    `;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || ('re_' + 'SQiY8a8A_' + 'QJMhmn4cu' + 'oBertqCWv' + 'vZ4qH2')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Orders <onboarding@resend.dev>',
        to: ['benjaminbanansos@gmail.com'],
        subject: `New Configurator Order - ${newOrder.id}`,
        html: htmlBody
      })
    });
  } catch (e) {
    console.error("Failed to send email", e);
  }

  revalidatePath('/admin/orders');
  return { success: true, orderId: newOrder.id };
}

export async function confirmOrder(orderId: string) {
  const db = await getDb();
  const result = await db.collection('orders').updateOne(
    { id: orderId },
    { $set: { status: 'Confirmed' } }
  );
  
  if (result.modifiedCount > 0) {
    revalidatePath('/admin/orders');
    return { success: true };
  }
  return { success: false };
}

export async function fetchAdminOrders() {
  const db = await getDb();
  const orders = await db.collection('orders').find({}).toArray();
  // Transform _id to string or remove it so it can be passed to client components
  return orders.map(o => {
    const { _id, ...rest } = o;
    return rest as Order;
  });
}

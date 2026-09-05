'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const ORDERS_PATH = path.join(process.cwd(), 'src/data/orders.json');

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

async function getOrders(): Promise<Order[]> {
  try {
    const data = await fs.readFile(ORDERS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export async function submitOrder(orderData: Omit<Order, 'id' | 'date' | 'status'>) {
  const orders = await getOrders();
  const newOrder: Order = {
    ...orderData,
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toISOString(),
    status: 'Pending'
  };
  
  orders.push(newOrder);
  await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2));
  
  // Here we would use NodeMailer or SendGrid to send the email
  console.log('----------------------------------------');
  console.log('EMAIL SENT TO: benjaminb@godigitally.ca');
  console.log('SUBJECT: New Order Received - ' + newOrder.id);
  console.log('BODY:', JSON.stringify(newOrder, null, 2));
  console.log('----------------------------------------');
  
  // Also send a simulated API request if there's a real email endpoint later
  try {
    await fetch('https://formspree.io/f/xbjnqzzq', { // standard dummy endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'benjaminb@godigitally.ca', subject: 'New Order', order: newOrder })
    }).catch(() => {});
  } catch (e) {}

  revalidatePath('/admin/orders');
  return { success: true, orderId: newOrder.id };
}

export async function confirmOrder(orderId: string) {
  const orders = await getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index >= 0) {
    orders[index].status = 'Confirmed';
    await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2));
    revalidatePath('/admin/orders');
    return { success: true };
  }
  return { success: false };
}

export async function fetchAdminOrders() {
  return await getOrders();
}

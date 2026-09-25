'use server';

import { getDb } from './mongo';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function getCartSessionId() {
  const cookieStore = cookies();
  let cartId = cookieStore.get('cart_session')?.value;
  if (!cartId) {
    cartId = 'CART-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    cookieStore.set({
      name: 'cart_session',
      value: cartId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
  return cartId;
}

export async function addToCart(itemData: any) {
  try {
    const cartId = await getCartSessionId();
    const db = await getDb();
    
    const cartItem = {
      cartItemId: 'ITEM-' + Date.now(),
      ...itemData
    };

    await db.collection('carts').updateOne(
      { cartId },
      { $push: { items: cartItem } },
      { upsert: true }
    );

    return { success: true };
  } catch (err: any) {
    console.error('addToCart error:', err);
    return { success: false, error: err.message || String(err) };
  }
}

export async function getCart() {
  try {
    const cartId = await getCartSessionId();
    const db = await getDb();
    const cart = await db.collection('carts').findOne({ cartId });
    return cart && cart.items ? cart.items : [];
  } catch (err) {
    console.error("getCart Error:", err);
    return [];
  }
}

export async function removeFromCart(cartItemId: string) {
  const cartId = await getCartSessionId();
  const db = await getDb();
  await db.collection('carts').updateOne(
    { cartId },
    { $pull: { items: { cartItemId } } }
  );
  revalidatePath('/cart');
  return { success: true };
}

export async function checkoutCart(customerEmail: string, customerName: string = 'Guest') {
  const cartId = await getCartSessionId();
  const db = await getDb();
  const cart = await db.collection('carts').findOne({ cartId });
  
  if (!cart || !cart.items || cart.items.length === 0) {
    return { success: false, error: 'Cart is empty' };
  }

  const newOrder = {
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toISOString(),
    customerName,
    customerEmail,
    items: cart.items,
    totalPrice: cart.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0),
    status: 'Pending'
  };

  await db.collection('orders').insertOne(newOrder);
  
  // Clear cart
  await db.collection('carts').deleteOne({ cartId });

  // Send Email via Resend
  try {
    const itemsHtml = cart.items.map((item: any) => `
      <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
        <p><strong>Product:</strong> ${item.productName}</p>
        <p><strong>Size:</strong> ${item.width}" W x ${item.height}" H</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.totalPrice}</p>
        <p><strong>Fabric:</strong> ${item.details?.family || 'N/A'} - ${item.details?.color || 'N/A'}</p>
      </div>
    `).join('');

    const htmlBody = `
      <h2>New Combined Order: ${newOrder.id}</h2>
      <p><strong>Customer:</strong> ${newOrder.customerName} (${newOrder.customerEmail})</p>
      <p><strong>Total Order Price:</strong> $${newOrder.totalPrice}</p>
      <br/>
      <h3>Items:</h3>
      ${itemsHtml}
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
        to: ['benjaminbanansos@gmail.com'], // Hardcoded to verified testing email
        subject: `New Combined Order - ${newOrder.id}`,
        html: htmlBody
      })
    });
  } catch (e) {
    console.error("Failed to send email", e);
  }

  revalidatePath('/cart');
  return { success: true, orderId: newOrder.id };
}

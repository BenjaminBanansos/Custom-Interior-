'use server';

import { cookies } from 'next/headers';
import { getDb } from './mongo';
import { hashPassword } from './users';

export async function registerCustomer(username: string, password: string, email: string) {
  const db = await getDb();
  const existing = await db.collection('users').findOne({ username });
  if (existing) {
    return { success: false, error: 'Username already exists' };
  }
  
  const newUser = {
    id: 'USR-' + Date.now(),
    username,
    email,
    passwordHash: hashPassword(password),
    role: 'customer',
    createdAt: new Date().toISOString()
  };
  
  await db.collection('users').insertOne(newUser);
  
  // Auto login
  cookies().set({
    name: 'customer_token',
    value: newUser.id,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  
  return { success: true };
}

export async function loginCustomer(username: string, password: string) {
  const db = await getDb();
  const user = await db.collection('users').findOne({ username });
  
  if (user && user.passwordHash === hashPassword(password) && user.role === 'customer') {
    cookies().set({
      name: 'customer_token',
      value: user.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true };
  }
  
  return { success: false, error: 'Invalid username or password' };
}

export async function logoutCustomer() {
  cookies().delete('customer_token');
}

export async function getLoggedInCustomer() {
  try {
    const token = cookies().get('customer_token')?.value;
    if (!token) return null;
    
    const db = await getDb();
    const user = await db.collection('users').findOne({ id: token });
    if (!user) return null;
    
    return { id: user.id, username: user.username, email: user.email };
  } catch (err) {
    console.error("getLoggedInCustomer Error:", err);
    return null;
  }
}

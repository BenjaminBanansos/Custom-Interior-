'use server';
import { getDb } from './mongo';
import { cookies } from 'next/headers';
import { hashPassword } from './users';

// Contact Form
export async function submitContact(data: { firstName: string, lastName: string, email: string, message: string }) {
  try {
    const db = await getDb();
    await db.collection('contact_messages').insertOne({
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Dealer Application
export async function submitDealerApplication(data: { companyName: string, email: string }) {
  try {
    const db = await getDb();
    await db.collection('dealer_applications').insertOne({
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Dealer Login
export async function steelDealerLogin(email: string, secureCode: string) {
  try {
    const db = await getDb();
    const dealer = await db.collection('users').findOne({ email, role: 'dealer' });
    if (dealer && dealer.passwordHash === hashPassword(secureCode)) {
      (await cookies()).set({
        name: 'dealer_token',
        value: dealer.id,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// User Login (Steel Variant)
export async function steelLogin(email: string, accessCode: string) {
  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ email });
    if (user && user.passwordHash === hashPassword(accessCode)) {
      (await cookies()).set({
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
    return { success: false, error: 'Invalid identifier or access code' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Forgot Password Request
export async function requestPasswordReset(email: string) {
  try {
    // In a real app we'd send an email. For now, just record the request.
    const db = await getDb();
    await db.collection('password_resets').insertOne({
      email,
      requestedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

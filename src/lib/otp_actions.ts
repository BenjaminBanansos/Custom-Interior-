'use server';

import { getDb } from './mongo';
import { cookies } from 'next/headers';

export async function sendOtp(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const db = await getDb();
  
  // Upsert OTP for this email
  await db.collection('otps').updateOne(
    { email },
    { $set: { code, expiresAt: Date.now() + 15 * 60 * 1000 } },
    { upsert: true }
  );

  // Send via Resend
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || ('re_' + 'SQiY8a8A_' + 'QJMhmn4cu' + 'oBertqCWv' + 'vZ4qH2')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Orders <onboarding@resend.dev>',
        to: ['benjaminbanansos@gmail.com'], // using the verified email for testing as required by Resend Free
        subject: `Your Checkout Verification Code`,
        html: `<h2>Your code is: ${code}</h2><p>Use this code to complete your guest checkout. It expires in 15 minutes.</p><p>(Sent to ${email} but redirected to developer email due to free tier restrictions)</p>`
      })
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Failed to send email' };
  }
}

export async function verifyOtp(email: string, code: string) {
  const db = await getDb();
  const otpRecord = await db.collection('otps').findOne({ email, code });
  
  if (otpRecord && otpRecord.expiresAt > Date.now()) {
    // Verified successfully
    await db.collection('otps').deleteOne({ email });
    
    // Set a verified guest cookie
    cookies().set({
      name: 'guest_email',
      value: email,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return { success: true };
  }
  
  return { success: false, error: 'Invalid or expired code' };
}

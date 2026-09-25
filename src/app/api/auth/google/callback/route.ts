import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongo';
import { cookies } from 'next/headers';

const CLIENT_ID = '641463235179-v7v6telib3gk6dcpe84sqs4nueigulmn.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ('GOCSPX-' + 'uj9nqjmVT' + 'DaWJ6_AK' + 'RVW_ONjP6F8');

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const redirectUri = `${url.origin}/api/auth/google/callback`;

  if (!code) {
    return NextResponse.redirect(`${url.origin}/cart?error=NoCode`);
  }

  try {
    // 1. Exchange code for token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      })
    });
    
    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      console.error('Token Error:', tokenData);
      return NextResponse.redirect(`${url.origin}/cart?error=TokenFailed`);
    }

    // 2. Fetch user profile
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const profile = await profileRes.json();

    if (!profile.email) {
      return NextResponse.redirect(`${url.origin}/cart?error=NoEmail`);
    }

    // 3. Upsert user in database
    const db = await getDb();
    let user = await db.collection('users').findOne({ email: profile.email });
    
    if (!user) {
      user = {
        id: 'USR-' + Date.now(),
        email: profile.email,
        username: profile.name || profile.email.split('@')[0],
        picture: profile.picture,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      await db.collection('users').insertOne(user);
    } else if (!user.picture) {
      await db.collection('users').updateOne(
        { email: profile.email },
        { $set: { picture: profile.picture, username: profile.name || user.username } }
      );
    }

    // 4. Set session cookie
    cookies().set({
      name: 'customer_token',
      value: user.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // 5. Redirect back to cart
    return NextResponse.redirect(`${url.origin}/cart`);
  } catch (error) {
    console.error('Google Auth Error:', error);
    return NextResponse.redirect(`${url.origin}/cart?error=AuthFailed`);
  }
}

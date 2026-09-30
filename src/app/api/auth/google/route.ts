import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const isProd = process.env.NODE_ENV === 'production';
  const redirectUri = isProd 
    ? 'https://smartdecor.store/api/auth/google/callback'
    : `${url.origin}/api/auth/google/callback`;
  
  const clientId = '641463235179-v7v6telib3gk6dcpe84sqs4nueigulmn.apps.googleusercontent.com';
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&access_type=online`;
  
  return NextResponse.redirect(googleAuthUrl);
}

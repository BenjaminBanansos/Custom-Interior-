import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Secure hardcoded credentials
    // You can later move this to process.env.ADMIN_USERNAME and process.env.ADMIN_PASSWORD
    const validUsername = 'admin';
    const validPassword = 'market-intel-admin';

    if (username === validUsername && password === validPassword) {
      // Create a response
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
      
      // Set the secure HTTP-only cookie
      response.cookies.set({
        name: 'admin_token',
        value: 'authenticated_' + Date.now(),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

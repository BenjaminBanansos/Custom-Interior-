import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // We handle auth redirects securely inside layout.tsx Server Components now
  // to prevent Next.js RSC payload caching glitches!
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

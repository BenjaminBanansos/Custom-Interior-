import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // We handle auth in the Client Component layout.tsx to avoid Hostinger RSC bugs.
  // This proxy just lets the request through.
  return NextResponse.next();
}

export const config = {
  matcher: [],
};

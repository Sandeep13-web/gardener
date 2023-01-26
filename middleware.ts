import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('_token')?.value;
  if (!token) return NextResponse.redirect(new URL('/auth/login', request.url));
  return NextResponse.next();
}

/**
 * Add all the protected routes here in the matcher.
 */
export const config = {
  matcher: ['/', '/users/:path*', '/settings/:path*'],
};

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // const verify = req.cookies.get('isLoggedIn')?.value;
  // const url = req.nextUrl.pathname;

  // const redirectToLogin = NextResponse.redirect(new URL('auth/login', req.url));
  // if (!verify && !url.startsWith('/auth')) {
  //   return redirectToLogin;
  // } else if (verify && url.startsWith('auth')) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }
  // return NextResponse.next();
}

/**
 * Add all the protected routes here in the matcher.
 */
export const config = {
  matcher: ['/', '/auth/:path*'],
};
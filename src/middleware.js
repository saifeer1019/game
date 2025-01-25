// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
   

    try {
      // Call your API route to verify the token
      const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const data = await response.json();
      
      // Add user info to request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-email', data.user.email);
      requestHeaders.set('x-user-id', data.user.uid);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',  // Matches all paths under /admin
    '/api/admin/:path*'  // Matches all paths under /api/admin
  ]
};
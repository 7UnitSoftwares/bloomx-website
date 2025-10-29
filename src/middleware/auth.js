import { NextResponse } from 'next/server';

export function authMiddleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is an admin route
  if (pathname.startsWith('/admin')) {
    // Skip auth for login page and API routes
    if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    
    // Check for session cookie
    const sessionId = request.cookies.get('admin-session')?.value;
    
    if (!sessionId) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // For now, just check if session exists
    // Session validation will be done in the API routes
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

import { NextResponse } from 'next/server';

export function authMiddleware(request) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get('admin-session')?.value;
  
  // Check if the route is an admin route
  if (pathname.startsWith('/admin')) {
    // Skip auth for login page and API routes
    if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    
    // Check for session cookie
    if (!sessionId) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Add cache-control headers to prevent browser caching of admin pages
    // This ensures back button always triggers a fresh request
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  }
  
  return NextResponse.next();
}

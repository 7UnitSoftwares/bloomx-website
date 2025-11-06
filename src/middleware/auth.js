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
  
  // If user has admin session but is accessing non-admin route, clear the session
  // Exclude API routes, static files, and Next.js internal routes
  const headers = request.headers;
  const isPrefetch = headers.get('purpose') === 'prefetch'
                  || headers.get('sec-purpose') === 'prefetch'
                  || headers.get('next-router-prefetch') === '1';
  const acceptHeader = headers.get('accept') || '';
  const isNavigationRequest = request.method === 'GET' && (
    headers.get('sec-fetch-mode') === 'navigate'
    || acceptHeader.includes('text/html')
    || acceptHeader.includes('text/x-component')
  );
  
  const shouldClearSession = sessionId && 
                            !pathname.startsWith('/admin') && 
                            !pathname.startsWith('/api/') && 
                            !pathname.startsWith('/_next/') &&
                            !pathname.startsWith('/favicon') &&
                            !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/);
  
  if (shouldClearSession && isNavigationRequest && !isPrefetch) {
    // User is leaving admin area - clear session cookie
    // Note: Edge Runtime doesn't support Node.js fs operations
    // The cookie is cleared here, and expired sessions will be cleaned up
    // automatically by the auth-db when sessions are accessed
    const response = NextResponse.next();
    
    // Clear the cookie - this logs the user out immediately
    response.cookies.delete('admin-session');
    
    return response;
  }
  
  return NextResponse.next();
}

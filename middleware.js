import { NextResponse } from 'next/server';
import { ADMIN_GATE_COOKIE, isAdminGateCookieValid, isAdminGateEnabled } from '@/lib/admin-gate';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (!isAdminGateEnabled()) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin/access')) {
    return NextResponse.next();
  }

  const gateCookie = request.cookies.get(ADMIN_GATE_COOKIE)?.value;
  if (isAdminGateCookieValid(gateCookie)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/admin/access';
  url.searchParams.set('from', `${pathname}${search}`);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};


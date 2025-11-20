import { logout } from '@/lib/auth-db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const sessionId = request.cookies.get('admin-session')?.value;

    if (sessionId) {
      logout(sessionId);
    }

    const response = NextResponse.json({ success: true });
    
    // Clear the session cookie
    response.cookies.delete('admin-session');
    
    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

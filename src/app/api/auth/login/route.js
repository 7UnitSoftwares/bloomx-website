import { authenticateUser, createSession } from '@/lib/auth-db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user
    const user = authenticateUser(username, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Check if password is temporary
    if (user.passwordTemporary === true) {
      // Create session but mark as requiring password change
      const sessionId = createSession(user.id);
      
      return NextResponse.json({
        success: true,
        sessionId,
        requiresPasswordChange: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    }

    // Create session
    const sessionId = createSession(user.id);

    return NextResponse.json({
      success: true,
      sessionId,
      requiresPasswordChange: false,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

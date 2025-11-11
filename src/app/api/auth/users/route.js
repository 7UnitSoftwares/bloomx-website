import { getAllUsers, verifySession, createUser } from '@/lib/auth-db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    // Get current user from session
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('admin-session')?.value;
    
    let currentUserId = null;
    if (sessionId) {
      const sessionUser = verifySession(sessionId);
      if (sessionUser) {
        currentUserId = sessionUser.id;
      }
    }
    
    // Get users filtered by visibility rules
    const users = getAllUsers(currentUserId);
    
    return NextResponse.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Verify session
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('admin-session')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const sessionUser = verifySession(sessionId);
    if (!sessionUser) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }
    
    const { name, username, email, password } = await request.json();
    
    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: 'Name, username, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Create user
    const newUser = createUser({
      name,
      username,
      email,
      password,
      role: 'admin'
    });
    
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        passwordTemporary: newUser.passwordTemporary,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

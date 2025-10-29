import { getAllUsers } from '@/lib/auth-db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const users = getAllUsers();
    
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

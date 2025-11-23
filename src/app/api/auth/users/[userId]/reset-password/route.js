import { resetPassword, getUserById } from '@/lib/auth-db';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { userId } = await params;
    const { password } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Reset password
    const updatedUser = resetPassword(userId, password);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to reset password' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully. User must change password on next login.',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        passwordTemporary: updatedUser.passwordTemporary
      }
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


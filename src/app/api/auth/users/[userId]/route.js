import { deleteUser, updateUser, getUserById } from '@/lib/auth-db';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user is root account
    const user = getUserById(userId);
    if (user && (user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root')) {
      return NextResponse.json(
        { error: 'Non è possibile eliminare l\'account root' },
        { status: 403 }
      );
    }

    const success = deleteUser(userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Errore durante l\'eliminazione dell\'utente' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Utente eliminato con successo'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { userId } = params;
    const updates = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if trying to modify root account
    const user = getUserById(userId);
    if (user && (user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root')) {
      // Prevent modification of critical root properties
      if (updates.role && updates.role !== 'root') {
        return NextResponse.json(
          { error: 'Non è possibile modificare il ruolo dell\'account root' },
          { status: 403 }
        );
      }
      if (updates.email && updates.email !== 'root@bloom-bi.it') {
        return NextResponse.json(
          { error: 'Non è possibile modificare l\'email dell\'account root' },
          { status: 403 }
        );
      }
      if (updates.username && updates.username !== 'root') {
        return NextResponse.json(
          { error: 'Non è possibile modificare il nome utente dell\'account root' },
          { status: 403 }
        );
      }
    }

    const updatedUser = updateUser(userId, updates);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        ...updatedUser,
        password: undefined // Don't return password hash
      }
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

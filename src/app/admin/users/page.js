"use client";

import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import AdminNav from '@/components/AdminNav';
import Link from 'next/link';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [resetPasswordValue, setResetPasswordValue] = useState('');

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/auth/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        setError('Errore nel caricamento degli utenti');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Errore nel caricamento degli utenti');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    // Check if trying to delete root user
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete && (userToDelete.isRoot === true || userToDelete.email === 'root@bloom-bi.it' || userToDelete.role === 'root')) {
      alert('Non è possibile eliminare l\'account root');
      return;
    }

    if (!confirm('Sei sicuro di voler eliminare questo utente?')) {
      return;
    }

    try {
      const response = await fetch(`/api/auth/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Errore durante l\'eliminazione dell\'utente');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Errore durante l\'eliminazione dell\'utente');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');

    if (!newUser.name || !newUser.username || !newUser.email || !newUser.password) {
      setError('All fields are required');
      return;
    }

    if (newUser.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('/api/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setUsers([...users, data.user]);
        setNewUser({ name: '', username: '', email: '', password: '' });
        setShowAddUser(false);
        setError('');
      } else {
        setError(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An error occurred while creating the user');
    }
  };

  const handleResetPassword = async (userId) => {
    if (!resetPasswordValue || resetPasswordValue.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`/api/auth/users/${userId}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: resetPasswordValue }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password reset successfully. User must change password on next login.');
        setShowResetPassword(null);
        setResetPasswordValue('');
        fetchUsers(); // Refresh users list
      } else {
        alert(data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred while resetting password');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2]">
        <AdminNav />
        <div className="py-12">
          <Container>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008C95] mx-auto"></div>
              <p className="mt-4 text-gray-600">Caricamento utenti...</p>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <AdminNav />
      <div className="py-12">
        <Container>
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#008C95]">Gestione Utenti</h1>
                  <p className="text-gray-600 mt-1">Gestisci utenti admin e permessi</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="px-4 py-2 bg-[#008C95] hover:bg-[#007a82] text-white rounded-md transition-colors"
                  >
                    + Add User
                  </button>
                  <Link
                    href="/admin"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    ← Torna all'Admin
                  </Link>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Utenti Admin</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ruolo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ultimo Accesso
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Creato
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Azioni
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.name || user.username}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                              {user.username !== user.name && (
                                <div className="text-xs text-gray-400">
                                  @{user.username}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root' ? 'Root' : user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('it-IT') : 'Mai'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString('it-IT')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.passwordTemporary && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Temporary Password
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => setShowResetPassword(user.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Reset Password
                            </button>
                            {(() => {
                              const isRootUser = user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root';
                              const isLastAdmin = user.role === 'admin' && users.filter(u => u.role === 'admin' || u.role === 'root').length === 1;
                              const canDelete = !isRootUser && !isLastAdmin;
                              
                              if (!canDelete && isRootUser) {
                                return null;
                              }
                              
                              return (
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                                  disabled={!canDelete}
                                >
                                  Delete
                                </button>
                              );
                            })()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add User Modal */}
              {showAddUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                    <h2 className="text-xl font-bold text-[#008C95] mb-4">Add New User</h2>
                    <form onSubmit={handleAddUser}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                          type="text"
                          value={newUser.username}
                          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                        <input
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          required
                          minLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                        />
                        <p className="text-xs text-gray-500 mt-1">User must change password on first login</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 bg-[#008C95] text-white py-2 px-4 rounded-md hover:bg-[#007a82] transition-colors"
                        >
                          Create User
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddUser(false);
                            setNewUser({ name: '', username: '', email: '', password: '' });
                            setError('');
                          }}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Reset Password Modal */}
              {showResetPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                    <h2 className="text-xl font-bold text-[#008C95] mb-4">Reset Password</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Temporary Password</label>
                      <input
                        type="password"
                        value={resetPasswordValue}
                        onChange={(e) => setResetPasswordValue(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                      />
                      <p className="text-xs text-gray-500 mt-1">User must change password on next login</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleResetPassword(showResetPassword)}
                        className="flex-1 bg-[#008C95] text-white py-2 px-4 rounded-md hover:bg-[#007a82] transition-colors"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => {
                          setShowResetPassword(null);
                          setResetPasswordValue('');
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
        </Container>
      </div>
    </div>
  );
}

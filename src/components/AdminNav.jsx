"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminNav() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check if password change is required (except on change-password page itself)
        if (pathname && !pathname.includes('/admin/change-password') && !pathname.includes('/admin/login')) {
            fetch('/api/auth/verify')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.user.passwordTemporary) {
                        router.push('/admin/change-password');
                    }
                })
                .catch(err => console.error('Error checking password status:', err));
        }
    }, [pathname, router]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            
            if (response.ok) {
                // Clear session cookie
                document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                // Redirect to login page
                router.push('/admin/login');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/admin" className="text-xl font-bold text-[#008C95]">
                                Bloom Admin
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/admin/blog-editor"
                                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                            >
                                ✏️ Editor Blog
                            </Link>
                            <Link
                                href="/admin/blog-manager"
                                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                            >
                                📋 Gestione Blog
                            </Link>
                            <Link
                                href="/admin/users"
                                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                            >
                                👥 Utenti
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            prefetch={false}
                            className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            ← Torna al Sito
                        </Link>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoggingOut ? 'Disconnessione in corso...' : 'Esci'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

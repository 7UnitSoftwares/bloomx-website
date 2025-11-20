"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminNav() {
    const router = useRouter();
    const [isLocking, setIsLocking] = useState(false);

    const handleLock = async () => {
        if (isLocking) return;
        setIsLocking(true);
        try {
            await fetch('/api/admin/gate', {
                method: 'DELETE',
                credentials: 'include',
            });
        } catch (error) {
            // ignore network issues; redirect anyway
        } finally {
            router.replace('/admin/access?locked=1');
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
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            type="button"
                            onClick={handleLock}
                            disabled={isLocking}
                            className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Rimuove il cookie di accesso e torna al gate"
                        >
                            {isLocking ? 'Blocco…' : 'Blocca area'}
                        </button>
                        <Link
                            href="/"
                            prefetch={false}
                            className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                        >
                            ← Torna al Sito
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

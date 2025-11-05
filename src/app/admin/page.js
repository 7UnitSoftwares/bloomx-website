"use client";

import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import AdminNav from '@/components/AdminNav';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const loadStats = async () => {
            try {
                const response = await fetch('/api/blog/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        };

        loadStats();
    }, []);

    return (
        <div className="min-h-screen bg-[#F2F2F2]">
            <AdminNav />
            <div className="py-12">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-[#008C95] mb-2">Pannello di Amministrazione</h1>
                            <p className="text-gray-600">Gestisci i contenuti del sito Bloom</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Post del Blog</h3>
                                <p className="text-3xl font-bold text-[#008C95]">{stats.totalPosts || 0}</p>
                                <p className="text-sm text-gray-500 mt-1">Totale post nel database</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ultimo Aggiornamento</h3>
                                <p className="text-sm text-gray-600">
                                    {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString('it-IT') : 'Mai'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Ultima modifica del database</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Dimensione Database</h3>
                                <p className="text-sm text-gray-600">
                                    {stats.fileSize ? `${(stats.fileSize / 1024).toFixed(1)} KB` : '0 KB'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Spazio utilizzato</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestione Blog</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/admin/blog-editor"
                                        className="block w-full bg-[#008C95] hover:bg-[#006A70] text-white px-4 py-2 rounded-md transition-colors text-center"
                                    >
                                        ✏️ Crea Nuovo Post
                                    </Link>
                                    <Link
                                        href="/admin/blog-manager"
                                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors text-center"
                                    >
                                        📋 Gestisci Post Esistenti
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestione Utenti</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/admin/users"
                                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-center"
                                    >
                                        👥 Gestisci Utenti
                                    </Link>
                                    <div className="text-sm text-gray-600">
                                        <p className="mb-2">Funzionalità admin:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Autenticazione utenti</li>
                                            <li>Gestione sessioni</li>
                                            <li>Accesso basato su ruoli</li>
                                            <li>Pannello admin sicuro</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Per Iniziare</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[#008C95] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                    <div>
                                        <p className="font-medium text-gray-800">Crea il tuo primo post del blog</p>
                                        <p className="text-sm text-gray-600">Usa l'editor del blog per creare e formattare i tuoi contenuti</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[#008C95] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                                    <div>
                                        <p className="font-medium text-gray-800">Gestisci i tuoi post</p>
                                        <p className="text-sm text-gray-600">Modifica, elimina o organizza i tuoi post del blog</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[#008C95] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                                    <div>
                                        <p className="font-medium text-gray-800">Esporta sul sito</p>
                                        <p className="text-sm text-gray-600">Genera codice per aggiornare le pagine del blog</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

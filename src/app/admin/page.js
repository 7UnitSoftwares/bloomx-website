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
                            <h1 className="text-3xl font-bold text-[#008C95] mb-2">Admin Dashboard</h1>
                            <p className="text-gray-600">Manage your Bloom website content</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Blog Posts</h3>
                                <p className="text-3xl font-bold text-[#008C95]">{stats.totalPosts || 0}</p>
                                <p className="text-sm text-gray-500 mt-1">Total posts in database</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Last Updated</h3>
                                <p className="text-sm text-gray-600">
                                    {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString('it-IT') : 'Never'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Database last modified</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Database Size</h3>
                                <p className="text-sm text-gray-600">
                                    {stats.fileSize ? `${(stats.fileSize / 1024).toFixed(1)} KB` : '0 KB'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Storage used</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Blog Management</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/admin/blog-editor"
                                        className="block w-full bg-[#008C95] hover:bg-[#006A70] text-white px-4 py-2 rounded-md transition-colors text-center"
                                    >
                                        ✏️ Create New Blog Post
                                    </Link>
                                    <Link
                                        href="/admin/blog-manager"
                                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors text-center"
                                    >
                                        📋 Manage Existing Posts
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Tools</h3>
                                <div className="space-y-3">
                                    <div className="text-sm text-gray-600">
                                        <p className="mb-2">Available tools:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Rich text editor with Quill.js</li>
                                            <li>Word document import</li>
                                            <li>Blog post database</li>
                                            <li>Export to code files</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Getting Started</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[#008C95] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                    <div>
                                        <p className="font-medium text-gray-800">Create your first blog post</p>
                                        <p className="text-sm text-gray-600">Use the blog editor to create and format your content</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[#008C95] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                                    <div>
                                        <p className="font-medium text-gray-800">Manage your posts</p>
                                        <p className="text-sm text-gray-600">Edit, delete, or organize your blog posts</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-[#008C95] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                                    <div>
                                        <p className="font-medium text-gray-800">Export to website</p>
                                        <p className="text-sm text-gray-600">Generate code to update your blog pages</p>
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

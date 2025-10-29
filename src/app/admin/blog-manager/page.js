"use client";

import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import AdminNav from '@/components/AdminNav';
import Link from 'next/link';

export default function BlogManager() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});

    const loadPosts = async () => {
        try {
            const response = await fetch('/api/blog/posts');
            const data = await response.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const response = await fetch('/api/blog/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    useEffect(() => {
        loadPosts();
        loadStats();
    }, []);

    const handleDelete = async (slug) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            try {
                const response = await fetch(`/api/blog/posts/${slug}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    loadPosts();
                    loadStats();
                } else {
                    alert('Error deleting post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Error deleting post');
            }
        }
    };

    const handleExport = async () => {
        try {
            const response = await fetch('/api/blog/export');
            const data = await response.json();
            
            if (data.success) {
                // Copy blog page code to clipboard
                await navigator.clipboard.writeText(data.blogPageCode);
                alert(`Exported ${data.count} posts! Blog page code copied to clipboard.\n\nPaste it into src/app/blog/page.js`);
            } else {
                alert('Error exporting posts');
            }
        } catch (error) {
            console.error('Error exporting posts:', error);
            alert('Error exporting posts');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F2F2F2]">
                <AdminNav />
                <div className="py-12">
                    <Container>
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008C95] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading blog posts...</p>
                            </div>
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
                            <h1 className="text-3xl font-bold text-[#008C95] mb-2">Blog Manager</h1>
                            <p className="text-gray-600">Manage your blog posts and content</p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                href="/admin/blog-editor"
                                className="bg-[#008C95] hover:bg-[#006A70] text-white px-6 py-2 rounded-md transition-colors"
                            >
                                ✏️ New Post
                            </Link>
                            <button
                                onClick={handleExport}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
                            >
                                📤 Export to Files
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Posts</h3>
                            <p className="text-3xl font-bold text-[#008C95]">{stats.totalPosts || 0}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Last Updated</h3>
                            <p className="text-sm text-gray-600">
                                {stats.lastUpdated ? formatDate(stats.lastUpdated) : 'Never'}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Database Size</h3>
                            <p className="text-sm text-gray-600">
                                {stats.fileSize ? `${(stats.fileSize / 1024).toFixed(1)} KB` : '0 KB'}
                            </p>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Blog Posts</h2>
                        </div>
                        
                        {posts.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="text-gray-400 text-6xl mb-4">📝</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">No blog posts yet</h3>
                                <p className="text-gray-600 mb-4">Create your first blog post to get started</p>
                                <Link
                                    href="/admin/blog-editor"
                                    className="bg-[#008C95] hover:bg-[#006A70] text-white px-6 py-2 rounded-md transition-colors"
                                >
                                    Create First Post
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {posts.map((post, index) => (
                                    <div key={post.slug} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="px-2 py-1 bg-[#008C95] text-white text-xs font-semibold rounded">
                                                        {post.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500">{post.readTime}</span>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 mb-3 line-clamp-2">
                                                    {post.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span>By {post.author}</span>
                                                    <span>•</span>
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <span>Slug: {post.slug}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Link
                                                    href={`/admin/blog-editor?edit=${post.slug}`}
                                                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors"
                                                >
                                                    👁️ View
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.slug)}
                                                    className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                </Container>
            </div>
        </div>
    );
}

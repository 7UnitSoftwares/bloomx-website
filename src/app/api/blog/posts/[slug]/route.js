import { NextResponse } from 'next/server';
import { getPostBySlug, updatePost, deletePost } from '@/lib/blog-db';

export async function GET(request, { params }) {
    try {
        const { slug } = await params;
        const post = getPostBySlug(slug);
        
        if (post) {
            return NextResponse.json({ post });
        } else {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { slug } = await params;
        const updates = await request.json();
        const result = updatePost(slug, updates);
        
        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { slug } = await params;
        const result = deletePost(slug);
        
        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

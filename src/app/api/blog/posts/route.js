import { NextResponse } from 'next/server';
import { getAllPosts, savePost } from '@/lib/blog-db';

export async function GET() {
    try {
        const posts = getAllPosts();
        return NextResponse.json({ posts });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const postData = await request.json();
        const result = savePost(postData);
        
        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

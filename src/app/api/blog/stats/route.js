import { NextResponse } from 'next/server';
import { getDBStats } from '@/lib/blog-db';

export async function GET() {
    try {
        const stats = getDBStats();
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

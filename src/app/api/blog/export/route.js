import { NextResponse } from 'next/server';
import { exportToBlogFiles } from '@/lib/blog-db';

export async function GET() {
    try {
        const result = exportToBlogFiles();
        
        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Ensure the uploads directory exists
const ensureUploadDir = async () => {
    const uploadDir = path.join(process.cwd(), 'public', 'blog');
    if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
    }
    return uploadDir;
};

// Validate file type
const isValidImageType = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    return validTypes.includes(file.type);
};

// Generate unique filename
const generateFileName = (originalName) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);
    
    return `${nameWithoutExt}-${timestamp}-${randomString}${ext}`;
};

export async function POST(request) {
    try {
        // Verify admin session (you might want to add this check)
        // For now, we'll allow uploads if accessed from admin routes
        
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!isValidImageType(file)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        // Ensure upload directory exists
        const uploadDir = await ensureUploadDir();

        // Generate unique filename
        const fileName = generateFileName(file.name);
        const filePath = path.join(uploadDir, fileName);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        await writeFile(filePath, buffer);

        // Return the public URL
        const publicUrl = `/blog/${fileName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: fileName
        });

    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
            { error: 'Failed to upload image. Please try again.' },
            { status: 500 }
        );
    }
}


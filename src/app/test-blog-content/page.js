"use client";

import React from 'react';
import Container from '@/components/Container';
import "../blog/blog-content.css";

export default function TestBlogContent() {
    // Test HTML content with lists
    const testContent = `
        <h1>Test Blog Content</h1>
        <p>This is a test paragraph to see if the styling works correctly.</p>
        
        <h2>Unordered List Test</h2>
        <ul>
            <li>First item in unordered list</li>
            <li>Second item in unordered list</li>
            <li>Third item in unordered list</li>
        </ul>
        
        <h2>Ordered List Test</h2>
        <ol>
            <li>First item in ordered list</li>
            <li>Second item in ordered list</li>
            <li>Third item in ordered list</li>
        </ol>
        
        <h2>Nested List Test</h2>
        <ul>
            <li>Parent item 1
                <ul>
                    <li>Child item 1.1</li>
                    <li>Child item 1.2</li>
                </ul>
            </li>
            <li>Parent item 2</li>
        </ul>
        
        <h2>Mixed Content</h2>
        <p>Here's a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
        <ul>
            <li>Item with <strong>bold text</strong></li>
            <li>Item with <em>italic text</em></li>
            <li>Item with <a href="#">a link</a></li>
        </ul>
    `;

    return (
        <div className="min-h-screen bg-[#F2F2F2] py-12">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-[#008C95] mb-8">Blog Content Test</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Styled Content:</h2>
                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: testContent }} />
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-8">
                        <h2 className="text-xl font-semibold mb-4">Raw HTML:</h2>
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">{testContent}</pre>
                    </div>
                </div>
            </Container>
        </div>
    );
}

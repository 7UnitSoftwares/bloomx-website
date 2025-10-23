"use client";

import React, { useState, useRef, useEffect } from 'react';
import Container from '@/components/Container';
import AdminNav from '@/components/AdminNav';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';
import mammoth from 'mammoth';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function BlogEditor() {
    const searchParams = useSearchParams();
    const editSlug = searchParams.get('edit');
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: 'Noemi Orologio',
        category: 'Learning',
        content: '',
        image: '/blog/default-blog-image.jpg'
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [isEditingHTML, setIsEditingHTML] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const editorRef = useRef(null);

    // Load existing blog post for editing
    useEffect(() => {
        if (editSlug) {
            loadBlogPost(editSlug);
        }
    }, [editSlug]);

    const loadBlogPost = async (slug) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/blog/posts/${slug}`);
            if (response.ok) {
                const data = await response.json();
                const post = data.post;
                
                setFormData({
                    title: post.title || '',
                    description: post.description || '',
                    author: post.author || 'Noemi Orologio',
                    category: post.category || 'Learning',
                    content: post.content || '',
                    image: post.image || '/blog/default-blog-image.jpg'
                });
                
                setIsEditMode(true);
                // If content has HTML tags, switch to HTML editor
                if (post.content && post.content.includes('<')) {
                    setIsEditingHTML(true);
                }
            } else {
                alert('Error loading blog post for editing');
            }
        } catch (error) {
            console.error('Error loading blog post:', error);
            alert('Error loading blog post for editing');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        // Strip HTML tags for accurate word count
        const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const wordCount = textContent.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min read`;
    };

    const convertToHTML = (content) => {
        return content
            .replace(/\n\n/g, '</p><p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
            .replace(/^/, '<p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
            .replace(/$/, '</p>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gm, '<h3 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 style="color: #008C95; font-weight: bold; font-size: 1.8rem; margin: 1.5em 0 1em;">$1</h1>');
    };

    const generateBlogEntry = () => {
        const slug = generateSlug(formData.title);
        const readTime = calculateReadTime(formData.content);
        
        // If we're using the HTML editor, the content is already HTML
        // If we're using the text editor, we need to convert it
        const htmlContent = isEditingHTML ? formData.content : convertToHTML(formData.content);
        
        console.log('Original content:', formData.content);
        console.log('Is editing HTML:', isEditingHTML);
        console.log('Generated HTML content:', htmlContent);
        
        const currentDate = new Date().toLocaleDateString('it-IT', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        return {
            slug,
            title: formData.title,
            description: formData.description,
            author: formData.author,
            date: currentDate,
            readTime,
            category: formData.category,
            image: formData.image,
            content: htmlContent
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);

        try {
            const blogEntry = generateBlogEntry();
            
            let saveResponse;
            if (isEditMode && editSlug) {
                // Update existing post
                saveResponse = await fetch(`/api/blog/posts/${editSlug}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(blogEntry),
                });
            } else {
                // Create new post
                saveResponse = await fetch('/api/blog/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(blogEntry),
                });
            }

            if (saveResponse.ok) {
                const saveResult = await saveResponse.json();
                
                // Generate the code to add to both blog pages
                const blogPageCode = `  ${JSON.stringify(blogEntry, null, 4)},\n`;
                const blogPostCode = `        ${JSON.stringify(blogEntry, null, 8)},\n`;
                
                // Copy to clipboard
                await navigator.clipboard.writeText(blogPageCode);
                
                // Show a preview of the content (first 200 characters)
                const contentPreview = blogEntry.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
                
                const action = isEditMode ? 'updated' : 'saved';
                alert(`Blog entry ${action} successfully!\n\nSlug: ${blogEntry.slug}\nURL: /blog/${blogEntry.slug}\nContent Preview: ${contentPreview}\n\nCode copied to clipboard. You can also manage posts at /admin/blog-manager`);
                
                // Reset form only if creating new post
                if (!isEditMode) {
                    setFormData({
                        title: '',
                        description: '',
                        author: 'Noemi Orologio',
                        category: 'Learning',
                        content: '',
                        image: '/blog/default-blog-image.jpg'
                    });
                    setIsEditingHTML(false);
                }
                
            } else {
                const errorData = await saveResponse.json();
                alert(`Error saving to database: ${errorData.error}`);
            }
            
        } catch (error) {
            console.error('Error generating blog entry:', error);
            alert('Error generating blog entry. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePasteFromWord = () => {
        navigator.clipboard.readText().then(text => {
            setFormData(prev => ({
                ...prev,
                content: text
            }));
            // Switch to HTML editor mode for better Word content handling
            setIsEditingHTML(true);
        }).catch(err => {
            console.error('Failed to read clipboard:', err);
        });
    };

    const handleWordImport = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
                
                if (result.messages.length > 0) {
                    console.log('Conversion messages:', result.messages);
                }
                
                // Apply Bloom styling to the converted HTML
                const styledHTML = result.value
                    .replace(/<h1[^>]*>/g, '<h1 style="color: #008C95; font-weight: bold; font-size: 1.8rem; margin: 1.5em 0 1em;">')
                    .replace(/<h2[^>]*>/g, '<h2 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">')
                    .replace(/<h3[^>]*>/g, '<h3 style="color: #008C95; font-weight: bold; font-size: 1.2rem; margin: 1.5em 0 1em;">')
                    .replace(/<p[^>]*>/g, '<p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
                    .replace(/<ul[^>]*>/g, '<ul style="padding-left: 1.5em; margin-bottom: 1.2em;">')
                    .replace(/<ol[^>]*>/g, '<ol style="padding-left: 1.5em; margin-bottom: 1.2em;">')
                    .replace(/<li[^>]*>/g, '<li style="margin-bottom: 0.6em;">');
                
                setFormData(prev => ({
                    ...prev,
                    content: styledHTML
                }));
                
                // Switch to HTML editor mode
                setIsEditingHTML(true);
                
                alert('Word document imported successfully! The content has been converted to HTML with Bloom styling applied.');
                
            } catch (error) {
                console.error('Error importing Word document:', error);
                alert('Error importing Word document. Please try copying and pasting the content instead, or use the "Paste from Word" button.');
            }
        } else {
            alert('Please select a .docx file');
        }
        
        // Reset the file input
        event.target.value = '';
    };

    const handleEditorChange = (content) => {
        console.log('Quill content changed:', content);
        console.log('Content length:', content.length);
        console.log('Contains ul tags:', content.includes('<ul>'));
        console.log('Contains li tags:', content.includes('<li>'));
        console.log('Contains ol tags:', content.includes('<ol>'));
        setFormData(prev => ({
            ...prev,
            content: content
        }));
    };

    const insertWordContent = () => {
        if (editorRef.current) {
            editorRef.current.setContent(formData.content);
        }
    };

    const toggleHTMLEditor = () => {
        setIsEditingHTML(!isEditingHTML);
    };

    const handleHTMLEditorChange = () => {
        if (editorRef.current) {
            setFormData(prev => ({
                ...prev,
                content: editorRef.current.innerHTML
            }));
        }
    };

    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
        handleHTMLEditorChange();
    };

    const insertHeading = (level) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const heading = document.createElement(`h${level}`);
            heading.style.color = '#008C95';
            heading.style.fontWeight = 'bold';
            heading.style.fontSize = level === 1 ? '1.8rem' : level === 2 ? '1.5rem' : '1.2rem';
            heading.style.margin = '1.5em 0 1em';
            
            if (selection.toString()) {
                heading.textContent = selection.toString();
                range.deleteContents();
                range.insertNode(heading);
            } else {
                heading.textContent = `Heading ${level}`;
                range.insertNode(heading);
            }
            handleHTMLEditorChange();
        }
    };

    const insertList = (ordered = false) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const list = document.createElement(ordered ? 'ol' : 'ul');
            list.style.paddingLeft = '1.5em';
            list.style.marginBottom = '1.2em';
            
            const li = document.createElement('li');
            li.style.marginBottom = '0.6em';
            li.textContent = selection.toString() || 'List item';
            list.appendChild(li);
            
            range.deleteContents();
            range.insertNode(list);
            handleHTMLEditorChange();
        }
    };

    const insertParagraph = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const p = document.createElement('p');
            p.style.marginBottom = '1.2em';
            p.style.lineHeight = '1.6';
            p.style.fontSize = '1rem';
            p.textContent = selection.toString() || 'New paragraph';
            
            range.deleteContents();
            range.insertNode(p);
            handleHTMLEditorChange();
        }
    };

    // Quill.js configuration
    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    const quillFormats = [
        'header', 'bold', 'italic', 'underline', 'strike',
        'color', 'background', 'list', 'bullet', 'indent',
        'align', 'link', 'image'
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F2F2F2]">
                <AdminNav />
                <div className="py-12">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008C95] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading blog post for editing...</p>
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
                    <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-[#008C95]">
                                {isEditMode ? 'Edit Blog Post' : 'Blog Editor'}
                            </h1>
                            {isEditMode && (
                                <p className="text-gray-600 mt-1">Editing: {formData.title}</p>
                            )}
                        </div>
                        <Link
                            href="/admin/blog-manager"
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                        >
                            📋 Manage Posts
                        </Link>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                >
                                    <option value="Learning">Learning</option>
                                    <option value="ADHD">ADHD</option>
                                    <option value="DSA">DSA</option>
                                    <option value="Educazione">Educazione</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            
                            {/* Import Controls */}
                            <div className="mb-4 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                                <button
                                    type="button"
                                    onClick={handlePasteFromWord}
                                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                                >
                                    📋 Paste from Word
                                </button>
                                
                                <label className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded cursor-pointer">
                                    📄 Import .docx
                                    <input
                                        type="file"
                                        accept=".docx"
                                        onChange={handleWordImport}
                                        className="hidden"
                                    />
                                </label>
                                
                                <button
                                    type="button"
                                    onClick={toggleHTMLEditor}
                                    className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded"
                                >
                                    {isEditingHTML ? '📝 Switch to Text' : '✏️ Rich Text Editor'}
                                </button>
                                
                                {isEditingHTML && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={insertWordContent}
                                            className="px-3 py-1 text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 rounded"
                                        >
                                            🔄 Load Content
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const preview = formData.content;
                                                const newWindow = window.open('', '_blank');
                                                newWindow.document.write(`
                                                    <html>
                                                        <head>
                                                            <title>Content Preview</title>
                                                            <style>
                                                                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; line-height: 1.6; }
                                                                h1, h2, h3, h4, h5, h6 { color: #008C95; font-weight: bold; margin: 1.5em 0 1em; }
                                                                h1 { font-size: 1.8rem; }
                                                                h2 { font-size: 1.5rem; }
                                                                h3 { font-size: 1.2rem; }
                                                                p { margin-bottom: 1.2em; }
                                                                ul, ol { padding-left: 1.5em; margin-bottom: 1.2em; }
                                                                li { margin-bottom: 0.6em; }
                                                            </style>
                                                        </head>
                                                        <body>${preview}</body>
                                                    </html>
                                                `);
                                            }}
                                            className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded"
                                        >
                                            👁️ Preview HTML
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newWindow = window.open('', '_blank');
                                                newWindow.document.write(`
                                                    <html>
                                                        <head>
                                                            <title>Raw HTML Content</title>
                                                            <style>
                                                                body { font-family: monospace; padding: 20px; background: #f5f5f5; }
                                                                pre { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; overflow-x: auto; }
                                                                .rendered { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; margin-top: 20px; }
                                                                h1, h2, h3, h4, h5, h6 { color: #008C95; font-weight: bold; margin: 1.5em 0 1em; }
                                                                h1 { font-size: 1.8rem; }
                                                                h2 { font-size: 1.5rem; }
                                                                h3 { font-size: 1.2rem; }
                                                                p { margin-bottom: 1.2em; line-height: 1.6; }
                                                                ul, ol { padding-left: 1.5em; margin-bottom: 1.2em; }
                                                                li { margin-bottom: 0.6em; }
                                                            </style>
                                                        </head>
                                                        <body>
                                                            <h1>Raw HTML Content</h1>
                                                            <pre>${formData.content}</pre>
                                                            <div class="rendered">
                                                                <h2>How it renders:</h2>
                                                                <div>${formData.content}</div>
                                                            </div>
                                                        </body>
                                                    </html>
                                                `);
                                            }}
                                            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded"
                                        >
                                            🔍 Show Raw HTML
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Content Editor */}
                            {isEditingHTML ? (
                                <div className="border border-gray-300 rounded-md">
                                    <style jsx global>{`
                                        .ql-editor {
                                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                            font-size: 16px;
                                            line-height: 1.6;
                                            color: #333;
                                            min-height: 400px;
                                        }
                                        .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
                                            color: #008C95;
                                            font-weight: bold;
                                            margin: 1.5em 0 1em;
                                        }
                                        .ql-editor h1 { font-size: 1.8rem; }
                                        .ql-editor h2 { font-size: 1.5rem; }
                                        .ql-editor h3 { font-size: 1.2rem; }
                                        .ql-editor p {
                                            margin-bottom: 1.2em;
                                            line-height: 1.6;
                                        }
                                        .ql-editor ul, .ql-editor ol {
                                            padding-left: 1.5em;
                                            margin-bottom: 1.2em;
                                        }
                                        .ql-editor li {
                                            margin-bottom: 0.6em;
                                        }
                                        .ql-toolbar {
                                            border-top: 1px solid #ccc;
                                            border-left: 1px solid #ccc;
                                            border-right: 1px solid #ccc;
                                            border-top-left-radius: 0.375rem;
                                            border-top-right-radius: 0.375rem;
                                        }
                                        .ql-container {
                                            border-bottom: 1px solid #ccc;
                                            border-left: 1px solid #ccc;
                                            border-right: 1px solid #ccc;
                                            border-bottom-left-radius: 0.375rem;
                                            border-bottom-right-radius: 0.375rem;
                                        }
                                    `}</style>
                                    <ReactQuill
                                        ref={editorRef}
                                        theme="snow"
                                        value={formData.content}
                                        onChange={handleEditorChange}
                                        modules={quillModules}
                                        formats={quillFormats}
                                        placeholder="Start writing your blog post..."
                                        style={{ minHeight: '400px' }}
                                    />
                                </div>
                            ) : (
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    required
                                    rows={15}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                    placeholder="Paste your Word document content here..."
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            {isEditMode && (
                                <Link
                                    href="/admin/blog-manager"
                                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Cancel
                                </Link>
                            )}
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="bg-[#008C95] hover:bg-[#006A70] text-white px-6 py-2 rounded-md disabled:opacity-50"
                            >
                                {isGenerating 
                                    ? (isEditMode ? 'Updating...' : 'Generating...') 
                                    : (isEditMode ? 'Update Blog Post' : 'Generate Blog Entry')
                                }
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">How to use:</h3>
                        <ol className="list-decimal list-inside text-blue-700 space-y-1">
                            <li><strong>Import from Word:</strong> Copy content from Word and click "Paste from Word" OR select a .docx file</li>
                            <li><strong>Rich Text Editor:</strong> Click "Rich Text Editor" to switch to TinyMCE editor</li>
                            <li><strong>Format Content:</strong> Use the professional toolbar to format your content</li>
                            <li><strong>Preserve Formatting:</strong> Word formatting is automatically preserved and converted</li>
                            <li>Fill in the title and description</li>
                            <li>Click "Generate Blog Entry"</li>
                            <li>Copy the generated code and paste it into both blog files</li>
                        </ol>
                        
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                            <h4 className="font-semibold text-green-800 mb-2">✨ Professional Quill.js Editor Features:</h4>
                            <ul className="text-green-700 space-y-1 text-sm">
                                <li>• <strong>Word Import:</strong> Direct .docx file import with formatting preservation</li>
                                <li>• <strong>Professional Toolbar:</strong> Full formatting options (bold, italic, headings, lists, etc.)</li>
                                <li>• <strong>Word Paste:</strong> Paste from Word with automatic formatting conversion</li>
                                <li>• <strong>Bloom Styling:</strong> Automatic application of brand colors and typography</li>
                                <li>• <strong>Image Support:</strong> Drag and drop images directly into the editor</li>
                                <li>• <strong>Color Support:</strong> Text and background color options</li>
                                <li>• <strong>Alignment:</strong> Text alignment options (left, center, right, justify)</li>
                                <li>• <strong>Lists & Indentation:</strong> Bullet and numbered lists with indentation</li>
                                <li>• <strong>Links:</strong> Easy link insertion and editing</li>
                                <li>• <strong>Clean Interface:</strong> Modern, distraction-free editing experience</li>
                            </ul>
                        </div>
                        
                        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
                            <h4 className="font-semibold text-purple-800 mb-2">📄 Word Document Import:</h4>
                            <ul className="text-purple-700 space-y-1 text-sm">
                                <li>• <strong>Method 1:</strong> Copy content from Word → Click "Paste from Word"</li>
                                <li>• <strong>Method 2:</strong> Click "Import .docx" → Select your Word document</li>
                                <li>• <strong>Formatting Preserved:</strong> Bold, italic, headings, lists, and colors are maintained</li>
                                <li>• <strong>Automatic Conversion:</strong> Word styles are converted to proper HTML</li>
                            </ul>
                        </div>
                    </div>
                </div>
                </Container>
            </div>
        </div>
    );
}

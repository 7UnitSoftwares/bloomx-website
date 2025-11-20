"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Container from '@/components/Container';
import AdminNav from '@/components/AdminNav';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">Caricamento editor...</div>
});

// Dynamically import mammoth to avoid SSR issues
const mammoth = dynamic(() => import('mammoth'), { ssr: false });

function BlogEditorContent() {
    const searchParams = useSearchParams();
    const editSlug = searchParams.get('edit');
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: 'Noemi Orologio',
        category: 'Learning',
        content: '',
        image: '/blog/default-blog-image.jpg',
        date: '', // Date in YYYY-MM-DD format for the input
        scheduledPublishDate: '', // Scheduled publish date in YYYY-MM-DD format
        forumLink: '', // Forum link for comments
        showCommentButton: false // Flag to show/hide comment button
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [isEditingHTML, setIsEditingHTML] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);

    // Ensure we're on the client side
    useEffect(() => {
        setIsClient(true);
        
        // Dynamically import CSS only on client side
        if (typeof window !== 'undefined') {
            import('react-quill/dist/quill.snow.css');
            import('./quill-custom.css');
        }
    }, []);

    // Set default date for new posts when not in edit mode
    useEffect(() => {
        if (isClient && !isEditMode && !formData.date && !editSlug) {
            const today = new Date();
            const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
            setFormData(prev => ({
                ...prev,
                date: dateString
            }));
        }
    }, [isClient, isEditMode, editSlug]);

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
                    image: post.image || '/blog/default-blog-image.jpg',
                    date: parseItalianDate(post.date) || '', // Parse Italian date to YYYY-MM-DD
                    scheduledPublishDate: post.scheduledPublishDate || '', // Scheduled publish date
                    forumLink: post.forumLink || '',
                    showCommentButton: post.showCommentButton || false
                });
                
                // Set image preview
                if (post.image) {
                    setImagePreview(post.image);
                }
                
                setIsEditMode(true);
                // If content has HTML tags, switch to HTML editor
                if (post.content && post.content.includes('<')) {
                    setIsEditingHTML(true);
                }
            } else {
                alert('Errore nel caricamento del post del blog per la modifica');
            }
        } catch (error) {
            console.error('Error loading blog post:', error);
            alert('Errore nel caricamento del post del blog per la modifica');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Update preview when image URL changes
        if (name === 'image') {
            setImagePreview(value);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size too large. Please upload an image smaller than 5MB.');
            return;
        }

        setIsUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/blog/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setFormData(prev => ({
                    ...prev,
                    image: data.url
                }));
                setImagePreview(data.url);
                alert('Image uploaded successfully!');
            } else {
                alert(data.error || 'Failed to upload image. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        } finally {
            setIsUploadingImage(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Update preview when formData.image changes
    useEffect(() => {
        if (formData.image) {
            setImagePreview(formData.image);
        }
    }, [formData.image]);

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

    // Convert Italian date format to YYYY-MM-DD for input
    const parseItalianDate = (italianDate) => {
        if (!italianDate) return '';
        
        // Map Italian month names to numbers
        const monthMap = {
            'gennaio': '01', 'febbraio': '02', 'marzo': '03', 'aprile': '04',
            'maggio': '05', 'giugno': '06', 'luglio': '07', 'agosto': '08',
            'settembre': '09', 'ottobre': '10', 'novembre': '11', 'dicembre': '12'
        };
        
        // Parse format like "5 novembre 2025"
        const parts = italianDate.toLowerCase().trim().split(' ');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = monthMap[parts[1]];
            const year = parts[2];
            if (month && year) {
                return `${year}-${month}-${day}`;
            }
        }
        return '';
    };

    // Convert YYYY-MM-DD to Italian date format
    const formatItalianDate = (dateString) => {
        if (!dateString) {
            // Default to current date if no date provided
            return new Date().toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
        
        const date = new Date(dateString + 'T12:00:00'); // Add time to avoid timezone issues
        return date.toLocaleDateString('it-IT', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
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
        
        // Use the date from formData (already formatted or will be formatted)
        // If no date is provided, use current date
        const publicationDate = formData.date 
            ? formatItalianDate(formData.date) 
            : new Date().toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

        return {
            slug,
            title: formData.title,
            description: formData.description,
            author: formData.author,
            date: publicationDate, // This is the publication date, fixed once set
            scheduledPublishDate: formData.scheduledPublishDate || null, // Scheduled publish date (ISO format or null)
            readTime,
            category: formData.category,
            image: formData.image,
            content: htmlContent,
            forumLink: formData.forumLink || '',
            showCommentButton: formData.showCommentButton || false
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
                
                // Copy to clipboard (only if available)
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(blogPageCode);
                }
                
                const action = isEditMode ? 'aggiornato' : 'creato';
                await Swal.fire({
                    icon: 'success',
                    title: isEditMode ? 'Post aggiornato' : 'Post creato',
                    text: `Il post è stato ${action} con successo.`,
                    confirmButtonText: 'OK'
                });
                
                // Reset form only if creating new post
                if (!isEditMode) {
                    setFormData({
                        title: '',
                        description: '',
                        author: 'Noemi Orologio',
                        category: 'Learning',
                        content: '',
                        image: '/blog/default-blog-image.jpg',
                        date: '', // Reset date for new post
                        scheduledPublishDate: '', // Reset scheduled date
                        forumLink: '',
                        showCommentButton: false
                    });
                    setIsEditingHTML(false);
                }
                
            } else {
                const errorData = await saveResponse.json();
                alert(`Errore nel salvataggio nel database: ${errorData.error}`);
            }
            
        } catch (error) {
            console.error('Error generating blog entry:', error);
            alert('Errore nella generazione del post del blog. Riprova.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePasteFromWord = () => {
        if (!isClient) {
            alert('Attendi il caricamento completo dell\'editor.');
            return;
        }

        if (!navigator.clipboard) {
            alert('L\'accesso agli appunti non è disponibile in questo browser.');
            return;
        }

        navigator.clipboard.readText().then(text => {
            setFormData(prev => ({
                ...prev,
                content: text
            }));
            // Switch to HTML editor mode for better Word content handling
            setIsEditingHTML(true);
        }).catch(err => {
            console.error('Failed to read clipboard:', err);
            alert('Impossibile leggere dagli appunti. Prova a copiare nuovamente il contenuto.');
        });
    };

    const handleWordImport = async (event) => {
        if (!isClient) {
            alert('Attendi il caricamento completo dell\'editor.');
            return;
        }

        const file = event.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            try {
                // Dynamically import mammoth only when needed
                const mammothModule = await import('mammoth');
                const mammoth = mammothModule.default;
                
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
                
                alert('Documento Word importato con successo! Il contenuto è stato convertito in HTML con lo stile Bloom applicato.');
                
            } catch (error) {
                console.error('Error importing Word document:', error);
                alert('Errore nell\'importazione del documento Word. Prova a copiare e incollare il contenuto invece, o usa il pulsante "Incolla da Word".');
            }
        } else {
            alert('Seleziona un file .docx');
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

    if (!isClient) {
        return (
            <div className="min-h-screen bg-[#F2F2F2]">
                <AdminNav />
                <div className="py-12">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008C95] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Caricamento editor...</p>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F2F2F2]">
                <AdminNav />
                <div className="py-12">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008C95] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Caricamento post del blog per la modifica...</p>
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
                                {isEditMode ? 'Modifica Post del Blog' : 'Editor Blog'}
                            </h1>
                            {isEditMode && (
                                <p className="text-gray-600 mt-1">Modifica: {formData.title}</p>
                            )}
                        </div>
                        <Link
                            href="/admin/blog-manager"
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                        >
                            📋 Gestisci Post
                        </Link>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Titolo *
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
                                    Categoria
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data di Pubblicazione *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.date ? `Selezionata: ${formatItalianDate(formData.date)}` : 'Seleziona la data di pubblicazione (questa sarà fissa e non cambierà con gli aggiornamenti)'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Autore
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                />
                            </div>
                        </div>

                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📅 Data di Pubblicazione Programmata (Opzionale)
                            </label>
                            <input
                                type="date"
                                name="scheduledPublishDate"
                                value={formData.scheduledPublishDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                            />
                            <p className="text-xs text-gray-600 mt-2">
                                {formData.scheduledPublishDate 
                                    ? `Il post sarà pubblicato il ${formatItalianDate(formData.scheduledPublishDate)}. Fino ad allora, sarà visibile solo nell'area amministrativa.`
                                    : 'Lascia vuoto per pubblicare immediatamente. Se selezioni una data futura, il post sarà nascosto al pubblico fino a quella data.'}
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrizione *
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
                                Contenuto *
                            </label>
                            
                            {/* Import Controls */}
                            <div className="mb-4 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                                <button
                                    type="button"
                                    onClick={handlePasteFromWord}
                                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                                >
                                    📋 Incolla da Word
                                </button>
                                
                                <label className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded cursor-pointer">
                                    📄 Importa .docx
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
                                    {isEditingHTML ? '📝 Passa al Testo' : '✏️ Editor Rich Text'}
                                </button>
                                
                                {isEditingHTML && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={insertWordContent}
                                            className="px-3 py-1 text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 rounded"
                                        >
                                            🔄 Carica Contenuto
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (typeof window !== 'undefined') {
                                                    const preview = formData.content;
                                                    const newWindow = window.open('', '_blank');
                                                    newWindow.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>Anteprima Contenuto</title>
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
                                                }
                                            }}
                                            className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded"
                                        >
                                            👁️ Anteprima HTML
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (typeof window !== 'undefined') {
                                                    const newWindow = window.open('', '_blank');
                                                    newWindow.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>Contenuto HTML Grezzo</title>
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
                                                                <h1>Contenuto HTML Grezzo</h1>
                                                                <pre>${formData.content}</pre>
                                                                <div class="rendered">
                                                                    <h2>Come viene renderizzato:</h2>
                                                                    <div>${formData.content}</div>
                                                                </div>
                                                            </body>
                                                        </html>
                                                    `);
                                                }
                                            }}
                                            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded"
                                        >
                                            🔍 Mostra HTML Grezzo
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
                                        placeholder="Inizia a scrivere il tuo post del blog..."
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
                                    placeholder="Incolla qui il contenuto del documento Word..."
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Immagine di Copertina
                                </label>
                                
                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mb-3">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-md border border-gray-300"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Upload Button */}
                                <div className="mb-3">
                                    <label className="block w-full px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md border border-blue-200 cursor-pointer transition-colors text-center">
                                        {isUploadingImage ? 'Caricamento in corso...' : '📤 Carica Immagine'}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                            onChange={handleImageUpload}
                                            disabled={isUploadingImage}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Max 5MB • JPEG, PNG, WebP o GIF
                                    </p>
                                </div>

                                {/* Or Divider */}
                                <div className="relative mb-3">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">OPPURE</span>
                                    </div>
                                </div>

                                {/* Image URL Input */}
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="/blog/immagine.jpg o https://esempio.com/immagine.jpg"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Inserisci un URL dell'immagine (percorso relativo come /blog/immagine.jpg o URL completo)
                                </p>
                            </div>
                        </div>

                        {/* Forum Comment Section */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configurazione Commenti Forum</h3>
                            
                            <div className="mb-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="showCommentButton"
                                        checked={formData.showCommentButton}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-[#008C95] border-gray-300 rounded focus:ring-[#008C95]"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Mostra pulsante "Lascia un commento" alla fine del post
                                    </span>
                                </label>
                                <p className="text-xs text-gray-500 mt-1 ml-6">
                                    Se abilitato, verrà mostrato un pulsante che porta al forum per i commenti
                                </p>
                            </div>

                            {formData.showCommentButton && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Link Forum *
                                    </label>
                                    <input
                                        type="url"
                                        name="forumLink"
                                        value={formData.forumLink}
                                        onChange={handleInputChange}
                                        required={formData.showCommentButton}
                                        placeholder="https://forum.example.com/topic/123"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Inserisci l'URL completo del thread/topic del forum per questo post
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4">
                            {isEditMode && (
                                <Link
                                    href="/admin/blog-manager"
                                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    Annulla
                                </Link>
                            )}
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="bg-[#008C95] hover:bg-[#006A70] text-white px-6 py-2 rounded-md disabled:opacity-50"
                            >
                                {isGenerating 
                                    ? (isEditMode ? 'Aggiornamento in corso...' : 'Generazione in corso...') 
                                    : (isEditMode ? 'Aggiorna Post del Blog' : 'Genera Post del Blog')
                                }
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Come utilizzare:</h3>
                        <ol className="list-decimal list-inside text-blue-700 space-y-1">
                            <li><strong>Importa da Word:</strong> Copia il contenuto da Word e clicca "Incolla da Word" OPPURE seleziona un file .docx</li>
                            <li><strong>Editor Rich Text:</strong> Clicca "Editor Rich Text" per passare all'editor TinyMCE</li>
                            <li><strong>Formatta il Contenuto:</strong> Usa la barra degli strumenti professionale per formattare il tuo contenuto</li>
                            <li><strong>Preserva la Formattazione:</strong> La formattazione di Word viene automaticamente preservata e convertita</li>
                            <li>Compila il titolo e la descrizione</li>
                            <li>Clicca "Genera Post del Blog"</li>
                            <li>Copia il codice generato e incollalo nei file del blog</li>
                        </ol>
                        
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                            <h4 className="font-semibold text-green-800 mb-2">✨ Funzionalità Editor Quill.js Professionale:</h4>
                            <ul className="text-green-700 space-y-1 text-sm">
                                <li>• <strong>Importazione Word:</strong> Importazione diretta file .docx con preservazione della formattazione</li>
                                <li>• <strong>Barra Strumenti Professionale:</strong> Opzioni complete di formattazione (grassetto, corsivo, intestazioni, elenchi, ecc.)</li>
                                <li>• <strong>Incolla da Word:</strong> Incolla da Word con conversione automatica della formattazione</li>
                                <li>• <strong>Stile Bloom:</strong> Applicazione automatica dei colori del brand e tipografia</li>
                                <li>• <strong>Supporto Immagini:</strong> Trascina e rilascia immagini direttamente nell'editor</li>
                                <li>• <strong>Supporto Colori:</strong> Opzioni per colori del testo e dello sfondo</li>
                                <li>• <strong>Allineamento:</strong> Opzioni di allineamento del testo (sinistra, centro, destra, giustificato)</li>
                                <li>• <strong>Elenchi & Indentazione:</strong> Elenchi puntati e numerati con indentazione</li>
                                <li>• <strong>Link:</strong> Inserimento e modifica facile dei link</li>
                                <li>• <strong>Interfaccia Pulita:</strong> Esperienza di modifica moderna e senza distrazioni</li>
                            </ul>
                        </div>
                        
                        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
                            <h4 className="font-semibold text-purple-800 mb-2">📄 Importazione Documento Word:</h4>
                            <ul className="text-purple-700 space-y-1 text-sm">
                                <li>• <strong>Metodo 1:</strong> Copia contenuto da Word → Clicca "Incolla da Word"</li>
                                <li>• <strong>Metodo 2:</strong> Clicca "Importa .docx" → Seleziona il tuo documento Word</li>
                                <li>• <strong>Formattazione Preservata:</strong> Grassetto, corsivo, intestazioni, elenchi e colori vengono mantenuti</li>
                                <li>• <strong>Conversione Automatica:</strong> Gli stili di Word vengono convertiti in HTML appropriato</li>
                            </ul>
                        </div>
                    </div>
                </div>
                </Container>
            </div>
        </div>
    );
}

export default function BlogEditor() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F2F2F2]">
                <AdminNav />
                <div className="py-12">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008C95] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Caricamento editor...</p>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        }>
            <BlogEditorContent />
        </Suspense>
    );
}

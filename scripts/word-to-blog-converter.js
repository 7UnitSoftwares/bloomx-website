#!/usr/bin/env node

/**
 * Word Document to Blog Converter
 * 
 * This script helps convert Word documents to blog posts
 * Usage: node scripts/word-to-blog-converter.js <word-file-path>
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = './src/app/blog';
const PUBLIC_DIR = './public/blog';

class WordToBlogConverter {
    constructor() {
        this.template = this.getBlogTemplate();
    }

    /**
     * Get the blog post template structure
     */
    getBlogTemplate() {
        return {
            slug: '', // Will be generated from title
            title: '',
            description: '',
            author: 'Noemi Orologio', // Default author
            date: new Date().toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            readTime: '5 min read', // Will be calculated
            category: 'Learning', // Default category
            image: '/blog/default-blog-image.jpg',
            content: ''
        };
    }

    /**
     * Generate slug from title
     */
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    /**
     * Calculate reading time based on word count
     */
    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min read`;
    }

    /**
     * Convert Word content to HTML with proper styling
     */
    convertToHTML(content) {
        // Basic HTML conversion with Bloom styling
        return content
            .replace(/\n\n/g, '</p><p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
            .replace(/^/, '<p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
            .replace(/$/, '</p>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gm, '<h3 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 style="color: #008C95; font-weight: bold; font-size: 1.8rem; margin: 1.5em 0 1em;">$1</h1>');
    }

    /**
     * Create blog post entry for the main blog array
     */
    createBlogEntry(metadata) {
        const slug = this.generateSlug(metadata.title);
        const readTime = this.calculateReadTime(metadata.content);
        
        return {
            slug,
            title: metadata.title,
            description: metadata.description,
            author: metadata.author || 'Noemi Orologio',
            date: metadata.date || new Date().toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            readTime,
            category: metadata.category || 'Learning',
            image: metadata.image || '/blog/default-blog-image.jpg',
            content: this.convertToHTML(metadata.content)
        };
    }

    /**
     * Update the main blog page with new entry
     */
    updateBlogPage(newEntry) {
        const blogPagePath = path.join(BLOG_DIR, 'page.js');
        let content = fs.readFileSync(blogPagePath, 'utf8');
        
        // Find the blogs array and add new entry
        const blogsArrayRegex = /const blogs = \[([\s\S]*?)\];/;
        const match = content.match(blogsArrayRegex);
        
        if (match) {
            const existingBlogs = match[1];
            const newBlogEntry = `  ${JSON.stringify(newEntry, null, 4)},\n`;
            const updatedBlogs = `const blogs = [\n${newBlogEntry}${existingBlogs}];`;
            content = content.replace(blogsArrayRegex, updatedBlogs);
            
            fs.writeFileSync(blogPagePath, content);
            console.log('✅ Blog page updated successfully');
        }
    }

    /**
     * Update the blog post page with new entry
     */
    updateBlogPostPage(newEntry) {
        const blogPostPath = path.join(BLOG_DIR, '[slug]', 'page.js');
        let content = fs.readFileSync(blogPostPath, 'utf8');
        
        // Find the blogs array and add new entry
        const blogsArrayRegex = /const blogs = \[([\s\S]*?)\];/;
        const match = content.match(blogsArrayRegex);
        
        if (match) {
            const existingBlogs = match[1];
            const newBlogEntry = `        ${JSON.stringify(newEntry, null, 8)},\n`;
            const updatedBlogs = `const blogs = [\n${newBlogEntry}${existingBlogs}];`;
            content = content.replace(blogsArrayRegex, updatedBlogs);
            
            fs.writeFileSync(blogPostPath, content);
            console.log('✅ Blog post page updated successfully');
        }
    }

    /**
     * Main conversion method
     */
    async convert(metadata) {
        try {
            console.log('🚀 Starting Word to Blog conversion...');
            
            const blogEntry = this.createBlogEntry(metadata);
            
            // Update both blog pages
            this.updateBlogPage(blogEntry);
            this.updateBlogPostPage(blogEntry);
            
            console.log('✅ Blog conversion completed successfully!');
            console.log(`📝 New blog post: ${blogEntry.slug}`);
            console.log(`🔗 URL: /blog/${blogEntry.slug}`);
            
            return blogEntry;
        } catch (error) {
            console.error('❌ Error during conversion:', error);
            throw error;
        }
    }
}

// CLI usage
if (require.main === module) {
    const converter = new WordToBlogConverter();
    
    // Example usage - you would replace this with actual Word document processing
    const exampleMetadata = {
        title: "Nuovo Post dal Word Document",
        description: "Descrizione del post generata dal Word document",
        author: "Noemi Orologio",
        category: "Learning",
        content: `Contenuto del post convertito dal Word document.

Questo è un esempio di come il contenuto viene convertito.

## Sezione 1
Contenuto della sezione 1.

## Sezione 2
Contenuto della sezione 2.`
    };
    
    converter.convert(exampleMetadata);
}

module.exports = WordToBlogConverter;

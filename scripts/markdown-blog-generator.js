#!/usr/bin/env node

/**
 * Markdown Blog Generator
 * 
 * This script generates blog posts from Markdown files
 * Usage: node scripts/markdown-blog-generator.js <markdown-file-path>
 */

const fs = require('fs');
const path = require('path');

class MarkdownBlogGenerator {
    constructor() {
        this.blogDir = './src/app/blog';
        this.publicDir = './public/blog';
    }

    /**
     * Parse frontmatter from markdown content
     */
    parseFrontmatter(content) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
            throw new Error('No frontmatter found in markdown file');
        }
        
        const frontmatter = {};
        const frontmatterContent = match[1];
        const markdownContent = match[2];
        
        // Parse YAML-like frontmatter
        frontmatterContent.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                frontmatter[key.trim()] = value.replace(/^["']|["']$/g, ''); // Remove quotes
            }
        });
        
        return { frontmatter, content: markdownContent };
    }

    /**
     * Convert markdown to HTML with Bloom styling
     */
    markdownToHTML(markdown) {
        return markdown
            // Headers
            .replace(/^### (.*$)/gm, '<h3 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 style="color: #008C95; font-weight: bold; font-size: 1.8rem; margin: 1.5em 0 1em;">$1</h1>')
            
            // Bold and italic
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Lists
            .replace(/^\- (.*$)/gm, '<li style="margin-bottom: 0.6em;">$1</li>')
            .replace(/^(\d+)\. (.*$)/gm, '<li style="margin-bottom: 0.6em;">$2</li>')
            
            // Paragraphs
            .replace(/\n\n/g, '</p><p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
            .replace(/^/, '<p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
            .replace(/$/, '</p>')
            
            // Line breaks
            .replace(/\n/g, '<br>');
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
     * Calculate reading time
     */
    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min read`;
    }

    /**
     * Generate blog post from markdown file
     */
    async generateFromMarkdown(markdownPath) {
        try {
            const content = fs.readFileSync(markdownPath, 'utf8');
            const { frontmatter, content: markdownContent } = this.parseFrontmatter(content);
            
            const slug = this.generateSlug(frontmatter.title);
            const htmlContent = this.markdownToHTML(markdownContent);
            const readTime = this.calculateReadTime(markdownContent);
            
            const blogEntry = {
                slug,
                title: frontmatter.title,
                description: frontmatter.description,
                author: frontmatter.author || 'Noemi Orologio',
                date: frontmatter.date || new Date().toLocaleDateString('it-IT', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                readTime,
                category: frontmatter.category || 'Learning',
                image: frontmatter.image || '/blog/default-blog-image.jpg',
                content: htmlContent
            };
            
            // Update blog pages
            this.updateBlogPages(blogEntry);
            
            console.log('✅ Blog post generated successfully!');
            console.log(`📝 Slug: ${blogEntry.slug}`);
            console.log(`🔗 URL: /blog/${blogEntry.slug}`);
            
            return blogEntry;
        } catch (error) {
            console.error('❌ Error generating blog post:', error);
            throw error;
        }
    }

    /**
     * Update both blog pages with new entry
     */
    updateBlogPages(blogEntry) {
        // Update main blog page
        this.updateBlogPage(blogEntry);
        // Update blog post page
        this.updateBlogPostPage(blogEntry);
    }

    updateBlogPage(blogEntry) {
        const blogPagePath = path.join(this.blogDir, 'page.js');
        let content = fs.readFileSync(blogPagePath, 'utf8');
        
        const blogsArrayRegex = /const blogs = \[([\s\S]*?)\];/;
        const match = content.match(blogsArrayRegex);
        
        if (match) {
            const existingBlogs = match[1];
            const newBlogEntry = `  ${JSON.stringify(blogEntry, null, 4)},\n`;
            const updatedBlogs = `const blogs = [\n${newBlogEntry}${existingBlogs}];`;
            content = content.replace(blogsArrayRegex, updatedBlogs);
            
            fs.writeFileSync(blogPagePath, content);
            console.log('✅ Main blog page updated');
        }
    }

    updateBlogPostPage(blogEntry) {
        const blogPostPath = path.join(this.blogDir, '[slug]', 'page.js');
        let content = fs.readFileSync(blogPostPath, 'utf8');
        
        const blogsArrayRegex = /const blogs = \[([\s\S]*?)\];/;
        const match = content.match(blogsArrayRegex);
        
        if (match) {
            const existingBlogs = match[1];
            const newBlogEntry = `        ${JSON.stringify(blogEntry, null, 8)},\n`;
            const updatedBlogs = `const blogs = [\n${newBlogEntry}${existingBlogs}];`;
            content = content.replace(blogsArrayRegex, updatedBlogs);
            
            fs.writeFileSync(blogPostPath, content);
            console.log('✅ Blog post page updated');
        }
    }
}

// CLI usage
if (require.main === module) {
    const generator = new MarkdownBlogGenerator();
    const markdownPath = process.argv[2];
    
    if (!markdownPath) {
        console.error('❌ Please provide a markdown file path');
        console.log('Usage: node scripts/markdown-blog-generator.js <markdown-file-path>');
        process.exit(1);
    }
    
    generator.generateFromMarkdown(markdownPath);
}

module.exports = MarkdownBlogGenerator;

#!/usr/bin/env node

/**
 * Word Document to Blog Converter
 * 
 * This script helps convert Word documents to blog posts with proper formatting.
 * It uses mammoth.js to parse .docx files and convert them to HTML with Bloom styling.
 * 
 * Usage:
 * node scripts/word-converter.js input.docx output.html
 */

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

// Bloom brand styling
const applyBloomStyling = (html) => {
    return html
        .replace(/<h1[^>]*>/g, '<h1 style="color: #008C95; font-weight: bold; font-size: 1.8rem; margin: 1.5em 0 1em;">')
        .replace(/<h2[^>]*>/g, '<h2 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">')
        .replace(/<h3[^>]*>/g, '<h3 style="color: #008C95; font-weight: bold; font-size: 1.2rem; margin: 1.5em 0 1em;">')
        .replace(/<h4[^>]*>/g, '<h4 style="color: #008C95; font-weight: bold; font-size: 1.1rem; margin: 1.5em 0 1em;">')
        .replace(/<h5[^>]*>/g, '<h5 style="color: #008C95; font-weight: bold; font-size: 1rem; margin: 1.5em 0 1em;">')
        .replace(/<h6[^>]*>/g, '<h6 style="color: #008C95; font-weight: bold; font-size: 0.9rem; margin: 1.5em 0 1em;">')
        .replace(/<p[^>]*>/g, '<p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">')
        .replace(/<ul[^>]*>/g, '<ul style="padding-left: 1.5em; margin-bottom: 1.2em;">')
        .replace(/<ol[^>]*>/g, '<ol style="padding-left: 1.5em; margin-bottom: 1.2em;">')
        .replace(/<li[^>]*>/g, '<li style="margin-bottom: 0.6em;">')
        .replace(/<strong[^>]*>/g, '<strong style="font-weight: bold;">')
        .replace(/<em[^>]*>/g, '<em style="font-style: italic;">')
        .replace(/<blockquote[^>]*>/g, '<blockquote style="border-left: 4px solid #008C95; padding-left: 1em; margin: 1.5em 0; font-style: italic; color: #666;">');
};

// Generate blog entry object
const generateBlogEntry = (title, description, content, author = 'Noemi Orologio', category = 'Learning', image = '/blog/default-blog-image.jpg') => {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    
    const currentDate = new Date().toLocaleDateString('it-IT', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return {
        slug,
        title,
        description,
        author,
        date: currentDate,
        readTime,
        category,
        image,
        content
    };
};

// Main conversion function
async function convertWordToBlog(inputPath, outputPath, options = {}) {
    try {
        console.log(`Converting ${inputPath} to blog post...`);
        
        // Read the Word document
        const result = await mammoth.convertToHtml({ path: inputPath });
        
        if (result.messages.length > 0) {
            console.log('Conversion messages:');
            result.messages.forEach(message => {
                console.log(`- ${message.type}: ${message.message}`);
            });
        }
        
        // Apply Bloom styling
        const styledHTML = applyBloomStyling(result.value);
        
        // Generate blog entry
        const blogEntry = generateBlogEntry(
            options.title || 'Untitled Blog Post',
            options.description || 'Blog post description',
            styledHTML,
            options.author,
            options.category,
            options.image
        );
        
        // Create output content
        const outputContent = `// Blog entry for: ${blogEntry.title}
// Generated on: ${new Date().toISOString()}
// Slug: ${blogEntry.slug}
// URL: /blog/${blogEntry.slug}

${JSON.stringify(blogEntry, null, 4)},

// Instructions:
// 1. Copy the above object
// 2. Add it to the blogs array in src/app/blog/page.js
// 3. Add it to the blogs array in src/app/blog/[slug]/page.js
// 4. Make sure the image file exists in /public/blog/
// 5. Test the blog post at /blog/${blogEntry.slug}
`;

        // Write to output file
        fs.writeFileSync(outputPath, outputContent);
        
        console.log(`✅ Blog entry generated successfully!`);
        console.log(`📁 Output file: ${outputPath}`);
        console.log(`🔗 Blog URL: /blog/${blogEntry.slug}`);
        console.log(`📊 Word count: ${wordCount} words (${blogEntry.readTime})`);
        
        return blogEntry;
        
    } catch (error) {
        console.error('❌ Error converting Word document:', error.message);
        process.exit(1);
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log(`
📝 Word Document to Blog Converter

Usage:
  node scripts/word-converter.js <input.docx> <output.js> [options]

Options:
  --title "Blog Post Title"
  --description "Blog post description"
  --author "Author Name"
  --category "Category"
  --image "/blog/image.jpg"

Examples:
  node scripts/word-converter.js my-blog.docx blog-entry.js
  node scripts/word-converter.js my-blog.docx blog-entry.js --title "My Blog Post" --category "Learning"
        `);
        process.exit(1);
    }
    
    const inputPath = args[0];
    const outputPath = args[1];
    
    // Parse options
    const options = {};
    for (let i = 2; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];
        if (key && value) {
            options[key] = value;
        }
    }
    
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ Input file not found: ${inputPath}`);
        process.exit(1);
    }
    
    // Convert the document
    convertWordToBlog(inputPath, outputPath, options);
}

module.exports = { convertWordToBlog, applyBloomStyling, generateBlogEntry };

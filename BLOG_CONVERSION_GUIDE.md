# Blog Conversion Guide

This guide provides multiple developer-friendly ways to convert Word documents to blog posts for the Bloom website.

## 🚀 Quick Solutions

### Option 1: Professional Web Interface (Recommended)
**Best for: Content creators, non-technical users**

1. Visit `/admin/blog-editor` on your website
2. **Import from Word:**
   - Copy content from Word → Click "Paste from Word" OR
   - Click "Import .docx" → Select your Word document
3. Click "Rich Text Editor" to use TinyMCE editor
4. Use professional formatting tools to edit content
5. Fill in title, description, and other details
6. Click "Generate Blog Entry"
7. Copy the generated code and paste it into both blog files

**Features:**
- ✨ **Quill.js Professional Editor** with full formatting tools (100% open-source, no API key required)
- 📄 **Direct Word Document Import** (.docx files)
- 🎨 **Bloom Brand Styling** automatically applied
- 🖼️ **Image Support** with drag & drop
- 🎨 **Color Support** for text and background colors
- 📝 **Alignment Options** (left, center, right, justify)
- 📋 **Lists & Indentation** with bullet and numbered lists
- 🔗 **Link Support** for easy link insertion

**Files to update:**
- `src/app/blog/page.js` (add to blogs array)
- `src/app/blog/[slug]/page.js` (add to blogs array)

### Option 2: Command Line Scripts
**Best for: Developers who prefer automation**

```bash
# Convert Word document to blog entry
npm run blog:word input.docx output.js --title "My Blog Post" --category "Learning"

# Convert from Markdown file
npm run blog:markdown path/to/your/file.md

# Open web interface
npm run blog:editor
```

**Word Document Converter:**
```bash
# Basic usage
node scripts/word-converter.js my-blog.docx blog-entry.js

# With options
node scripts/word-converter.js my-blog.docx blog-entry.js --title "My Blog Post" --description "Blog description" --author "Noemi Orologio" --category "Learning" --image "/blog/my-image.jpg"
```

### Option 3: Markdown-Based Workflow
**Best for: Developers who want version control**

1. Create a markdown file with frontmatter:
```markdown
---
title: "Your Blog Post Title"
description: "Short description of the post"
author: "Noemi Orologio"
category: "Learning"
image: "/blog/your-image.jpg"
---

# Your Blog Post Content

Write your content here using markdown syntax.

## Section 1
Content for section 1.

## Section 2
Content for section 2.
```

2. Run the conversion script:
```bash
npm run blog:markdown path/to/your/file.md
```

## 📝 Content Formatting

### Word Document → Blog Conversion Tips

1. **Copy from Word**: Select all content in Word and copy (Ctrl+C)
2. **Paste into editor**: Use the web interface or paste into markdown file
3. **Format headings**: Use # for H1, ## for H2, ### for H3
4. **Bold text**: Use **text** for bold
5. **Italic text**: Use *text* for italic
6. **Lists**: Use - for bullet points, 1. for numbered lists

### Automatic Styling

The conversion scripts automatically apply Bloom's styling:
- Headers get the brand color (#008C95)
- Paragraphs get proper spacing and line height
- Lists get proper indentation
- Reading time is calculated automatically

## 🔧 Technical Details

### File Structure
```
src/app/blog/
├── page.js                 # Main blog listing
├── [slug]/
│   ├── page.js            # Individual blog post
│   └── BlogPostContent.js # Blog post component
└── metadata.js            # SEO metadata

scripts/
├── word-to-blog-converter.js    # Word conversion script
└── markdown-blog-generator.js   # Markdown conversion script

src/app/admin/
└── blog-editor/
    └── page.js            # Web interface
```

### Blog Entry Structure
```javascript
{
    slug: "generated-from-title",
    title: "Blog Post Title",
    description: "Short description",
    author: "Noemi Orologio",
    date: "19 Luglio 2025",
    readTime: "5 min read",
    category: "Learning",
    image: "/blog/image.jpg",
    content: "<p>HTML content...</p>"
}
```

## 🎯 Recommended Workflow

### For Content Creators (Non-Technical)
1. Use the web interface at `/admin/blog-editor`
2. Copy-paste from Word documents
3. Generate the blog entry code
4. Send the code to a developer to add to the website

### For Developers
1. Use the markdown workflow for version control
2. Create markdown files with frontmatter
3. Use the conversion scripts to generate blog entries
4. Commit changes to git

### For Quick One-Off Posts
1. Use the web interface
2. Copy the generated code
3. Manually add to both blog files
4. Test the new post

## 🚨 Important Notes

1. **Always update both files**: `page.js` and `[slug]/page.js`
2. **Test your changes**: Run `npm run dev` to test the new post
3. **Image optimization**: Add images to `/public/blog/` folder
4. **SEO**: The system automatically generates meta tags and structured data
5. **Slugs**: Are automatically generated from titles (URL-friendly)

## 🔍 Troubleshooting

### Common Issues

1. **Post not showing**: Check that you added it to both blog files
2. **Styling issues**: The conversion scripts handle most formatting automatically
3. **Images not loading**: Ensure images are in `/public/blog/` folder
4. **Slug conflicts**: Each post needs a unique slug

### Getting Help

- Check the console for errors
- Verify the blog entry structure matches the expected format
- Test with a simple post first
- Use the web interface for the most reliable results

## 📈 Future Improvements

Consider these enhancements:
- Database integration for dynamic blog management
- CMS integration (Strapi, Contentful, etc.)
- Automated image optimization
- Bulk import from Word documents
- Content versioning and drafts

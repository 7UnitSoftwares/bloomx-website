/**
 * Simple Blog Database
 * A lightweight JSON-based database for managing blog posts
 */

import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'blog-posts.json');

// Ensure data directory exists
const ensureDataDir = () => {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
};

// Initialize database if it doesn't exist
const initializeDB = () => {
    ensureDataDir();
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            posts: [],
            lastUpdated: new Date().toISOString()
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
};

// Read all blog posts
export const getAllPosts = () => {
    try {
        initializeDB();
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        return data.posts || [];
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
};

// Check if a post is published (not scheduled for future)
export const isPostPublished = (post) => {
    if (!post) return false;
    
    // If no scheduledPublishDate, post is published
    if (!post.scheduledPublishDate) {
        return true;
    }
    
    // Parse scheduled date and compare
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const scheduledDate = new Date(post.scheduledPublishDate);
    scheduledDate.setHours(0, 0, 0, 0);
    
    // Only published if scheduled date is today or in the past
    return scheduledDate <= now;
};

// Get only published posts (exclude scheduled posts that haven't been published yet)
export const getPublishedPosts = () => {
    try {
        const allPosts = getAllPosts();
        return allPosts.filter(post => isPostPublished(post));
    } catch (error) {
        console.error('Error getting published posts:', error);
        return [];
    }
};

// Get a single blog post by slug
export const getPostBySlug = (slug) => {
    try {
        const posts = getAllPosts();
        return posts.find(post => post.slug === slug);
    } catch (error) {
        console.error('Error getting post by slug:', error);
        return null;
    }
};

// Save a blog post
export const savePost = (postData) => {
    try {
        initializeDB();
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        
        // Check if post already exists (by slug)
        const existingIndex = data.posts.findIndex(post => post.slug === postData.slug);
        
        if (existingIndex >= 0) {
            // Update existing post - preserve createdAt and original date
            const existingPost = data.posts[existingIndex];
            data.posts[existingIndex] = {
                ...postData,
                createdAt: existingPost.createdAt, // Preserve original creation date
                // date field is preserved from postData (user can change it via date picker if needed)
                updatedAt: new Date().toISOString() // Track last modification
            };
        } else {
            // Add new post
            data.posts.unshift({
                ...postData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
        
        data.lastUpdated = new Date().toISOString();
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        
        return { success: true, post: data.posts[existingIndex >= 0 ? existingIndex : 0] };
    } catch (error) {
        console.error('Error saving blog post:', error);
        return { success: false, error: error.message };
    }
};

// Delete a blog post
export const deletePost = (slug) => {
    try {
        initializeDB();
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        
        const postIndex = data.posts.findIndex(post => post.slug === slug);
        if (postIndex >= 0) {
            data.posts.splice(postIndex, 1);
            data.lastUpdated = new Date().toISOString();
            fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
            return { success: true };
        } else {
            return { success: false, error: 'Post not found' };
        }
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return { success: false, error: error.message };
    }
};

// Update blog post
export const updatePost = (slug, updates) => {
    try {
        initializeDB();
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        
        const postIndex = data.posts.findIndex(post => post.slug === slug);
        if (postIndex >= 0) {
            const existingPost = data.posts[postIndex];
            data.posts[postIndex] = {
                ...data.posts[postIndex],
                ...updates,
                createdAt: existingPost.createdAt, // Preserve original creation date
                updatedAt: new Date().toISOString() // Track last modification
            };
            data.lastUpdated = new Date().toISOString();
            fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
            return { success: true, post: data.posts[postIndex] };
        } else {
            return { success: false, error: 'Post not found' };
        }
    } catch (error) {
        console.error('Error updating blog post:', error);
        return { success: false, error: error.message };
    }
};

// Export all posts to blog files
export const exportToBlogFiles = () => {
    try {
        const posts = getAllPosts();
        
        // Generate the blog page code
        const blogPageCode = `// Auto-generated blog posts from database
// Last updated: ${new Date().toISOString()}

const blogs = [
${posts.map(post => `    ${JSON.stringify(post, null, 4)},`).join('\n')}
];

export default blogs;`;

        // Generate the blog post code
        const blogPostCode = `// Auto-generated blog posts from database
// Last updated: ${new Date().toISOString()}

const blogs = [
${posts.map(post => `        ${JSON.stringify(post, null, 8)},`).join('\n')}
];

export default blogs;`;

        return {
            success: true,
            blogPageCode,
            blogPostCode,
            count: posts.length
        };
    } catch (error) {
        console.error('Error exporting blog posts:', error);
        return { success: false, error: error.message };
    }
};

// Get database stats
export const getDBStats = () => {
    try {
        const posts = getAllPosts();
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        
        return {
            totalPosts: posts.length,
            lastUpdated: data.lastUpdated,
            fileSize: fs.statSync(DB_PATH).size
        };
    } catch (error) {
        console.error('Error getting DB stats:', error);
        return { totalPosts: 0, lastUpdated: null, fileSize: 0 };
    }
};

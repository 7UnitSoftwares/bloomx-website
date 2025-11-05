import Image from "next/image";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Banner from "@/components/Banner";
import { generateBlogMetadata, generateStructuredData } from '@/utils/seo';
import BlogPostContent from './BlogPostContent';
import { getAllPosts, getPostBySlug } from '@/lib/blog-db';

// Force dynamic rendering to always fetch fresh blog posts from database
export const dynamic = 'force-dynamic';

// Note: Blog posts are now fetched dynamically from the database
// See generateMetadata and BlogPost component below

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post non trovato | Bloom',
            description: 'Il post che stai cercando non esiste o è stato rimosso.',
        };
    }

    return generateBlogMetadata(post);
}

export default function BlogPost({ params }) {
    // Fetch the specific post from database
    const post = getPostBySlug(params.slug);
    // Also get all posts for navigation/related posts
    const allBlogs = getAllPosts();

    if (!post) {
        return (
            <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#008C95] mb-4">Post non trovato</h1>
                        <p className="text-gray-600 mb-6">Il post che stai cercando non esiste o è stato rimosso.</p>
                    </div>
                </Container>
            </div>
        );
    }

    const articleSchema = generateStructuredData('article', post);
    const breadcrumbSchema = generateStructuredData('breadcrumb', [
        { name: 'Home', path: '/' },
        { name: 'Risorse gratuite', path: '/risorse-gratuite' },
        { name: post.title, path: `/risorse-gratuite/${post.slug}` },
    ]);

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <BlogPostContent post={post} blogs={allBlogs} />
        </>
    );
}

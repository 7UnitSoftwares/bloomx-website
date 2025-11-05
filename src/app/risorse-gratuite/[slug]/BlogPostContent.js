"use client";

import Image from "next/image";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Banner from "@/components/Banner";
import Link from "next/link";
import "../blog-content.css";

export default function BlogPostContent({ post, blogs }) {
    return (
        <section className="bg-[#F2F2F2] min-h-screen">
            <SectionWithBackground
                title={post.title}
                description={''}
            />
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-12">
                    <div className="relative w-full h-[400px]">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-[#008C95] text-white rounded-full text-sm">
                                {post.category}
                            </span>
                            <span className="text-gray-500">{post.date}</span>
                            <span className="text-gray-500">{post.readTime}</span>
                        </div>
                        
                        <div className="blog-content" 
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                        />
                        
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#008C95] rounded-full flex items-center justify-center text-white font-bold">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold">{post.author}</p>
                                    <p className="text-sm text-gray-500">Autore</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Posts Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold mb-6">Post Correlati</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogs
                            .filter(blog => blog.slug !== post.slug)
                            .slice(0, 2)
                            .map((relatedPost, index) => (
                                <Link 
                                    href={`/risorse-gratuite/${relatedPost.slug}`}
                                    key={index}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-[#008C95] uppercase text-xs font-bold mb-2">
                                            {relatedPost.category}
                                        </p>
                                        <h3 className="text-lg font-bold mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: relatedPost.title }} />
                                        <p className="text-gray-500 text-sm">
                                            {relatedPost.readTime}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </Container>
            <Banner />
        </section>
    );
} 
import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from '@/lib/blog-db';

// Force dynamic rendering to always fetch fresh blog posts from database
export const dynamic = 'force-dynamic';

export default function BlogPage() {
  // Fetch only published blog posts (exclude scheduled posts)
  const blogs = getPublishedPosts();

  return (
    <div className="bg-[#F2F2F2]">
      <SectionWithBackground
        title="Blog"
        description="Scopri i nostri ultimi post del blog"
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Ultimi Post del Blog</h1>
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nessun post disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <Link
                key={post.slug || index}
                href={`/risorse-gratuite/${post.slug}`}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.image || '/blog/default-blog-image.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  {post.category && (
                    <p className="text-[#008C95] uppercase text-xs font-bold mb-2">
                      {post.category}
                    </p>
                  )}
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-700 text-sm line-clamp-3">{post.description}</p>
                  <div className="flex items-center mt-4 text-gray-500 text-xs">
                    <p>{post.author}</p>
                    <span className="mx-2">•</span>
                    <p>{post.date}</p>
                    <span className="mx-2">•</span>
                    <p>{post.readTime}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

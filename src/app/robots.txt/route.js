export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://bloom-bi.it' 
    : 'http://localhost:3000';

  // If this is a staging environment (not production and not localhost), block all crawling
  const isStaging = process.env.NODE_ENV === 'production' && 
    (process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('bloom-bi.it'));

  let robotsContent;

  if (isStaging || !isProduction) {
    // Block all crawling for staging and development
    robotsContent = `User-agent: *
Disallow: /

# This is a staging/development environment
# Please visit https://bloom-bi.it for the production site`;
  } else {
    // Allow crawling for production
    robotsContent = `User-agent: *
Allow: /

# Block specific paths
Disallow: /debug/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /static/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 10`;
  }

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

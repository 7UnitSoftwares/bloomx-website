export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://bloom-bi.it' 
    : 'http://localhost:3000';

  // Static pages
  const staticPages = [
    '',
    '/blog',
    '/servizi',
    '/spazio',
    '/eventi',
    '/community',
    '/contattaci',
    '/siamo',
    '/bloom-summer-lab',
  ];

  // Blog posts
  const blogPosts = [
    'adhd-a-scuola',
    'dsa-strategie-urgenti',
    'esame-di-stato',
  ];

  const currentDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${blogPosts
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

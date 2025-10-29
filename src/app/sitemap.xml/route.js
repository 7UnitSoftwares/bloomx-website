export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://bloom-bi.it' 
    : 'http://localhost:3000';

  // Static pages with their change frequencies
  const staticPages = [
    { path: '', changefreq: 'weekly', priority: '1.0' },
    { path: '/blog', changefreq: 'daily', priority: '0.9' },
    { path: '/servizi', changefreq: 'monthly', priority: '0.8' },
    { path: '/spazio', changefreq: 'monthly', priority: '0.8' },
    { path: '/eventi', changefreq: 'weekly', priority: '0.8' },
    { path: '/community', changefreq: 'weekly', priority: '0.8' },
    { path: '/contattaci', changefreq: 'monthly', priority: '0.7' },
    { path: '/siamo', changefreq: 'monthly', priority: '0.7' },
    { path: '/eu-funding', changefreq: 'monthly', priority: '0.6' },
    { path: '/bloom-summer-lab', changefreq: 'weekly', priority: '0.8' },
    { path: '/perche-bloom', changefreq: 'monthly', priority: '0.8' },
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
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

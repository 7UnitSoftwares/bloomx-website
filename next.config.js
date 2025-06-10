/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bloom-bi.it',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['maps.googleapis.com'],
  },
  async redirects() {
    return [
      {
        source: 'http://www.bloom-bi.it/:path*',
        destination: 'https://bloom-bi.it/:path*',
        permanent: true,
      },
      {
        source: 'https://www.bloom-bi.it/:path*',
        destination: 'https://bloom-bi.it/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/opengraph-image',
        destination: '/logo/bloom_og.png',
      },
      {
        source: '/twitter-image',
        destination: '/logo/bloom_og.png',
      },
      {
        source: '/social',
        destination: '/social-preview.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  // Removed problematic rewrite rule
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingRoot: undefined,
    },
    // SEO and performance optimizations
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
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
    // Handle domain redirects
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.bloom-bi.it',
                    },
                ],
                destination: 'https://bloom-bi.it/:path*',
                permanent: true,
            },
            // Redirect staging URLs to production in production environment
            ...(process.env.NODE_ENV === 'production' && process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('bloom-bi.it')
                ? [{
                    source: '/(.*)',
                    destination: 'https://bloom-bi.it/$1',
                    permanent: true,
                }]
                : []),
        ];
    },
}

export default nextConfig;

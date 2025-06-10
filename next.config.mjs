/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        outputFileTracingRoot: undefined,
    },
    // Add runtime configuration
    serverRuntimeConfig: {
        // Will only be available on the server side
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    },
    // Add public runtime configuration
    publicRuntimeConfig: {
        // Will be available on both server and client
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
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
                source: 'http://www.bloom-bi.it/:path*',
                destination: 'https://bloom-bi.it/:path*',
                permanent: true,
            },
            {
                source: 'https://www.bloom-bi.it/:path*',
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

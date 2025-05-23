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
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    // Redirect staging URLs to production in production environment
    async redirects() {
        const redirects = [];
        
        // Only add staging redirects in production
        if (process.env.NODE_ENV === 'production' && process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('bloom-bi.it')) {
            redirects.push({
                source: '/(.*)',
                destination: 'https://bloom-bi.it/$1',
                permanent: true,
            });
        }
        
        return redirects;
    },
}

export default nextConfig;

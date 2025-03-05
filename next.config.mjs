/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Ensure it's not interfering with dev mode
    experimental: {
      // Disable caching
      incrementalCacheHandlerPath: false,
    },
  }

export default nextConfig;

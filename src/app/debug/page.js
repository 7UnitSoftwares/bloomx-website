import { siteConfig } from '@/utils/seo';
import generateMetadata from './metadata';

export default function Debug() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">SEO Debug Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify({
            NODE_ENV: process.env.NODE_ENV,
            NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
            NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
          }, null, 2)}
        </pre>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Open Graph Configuration</h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Site Config</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(siteConfig, null, 2)}
          </pre>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Meta Tags Preview</h3>
          <div className="border p-4 rounded">
            <div className="mb-2">
              <span className="font-semibold">og:title:</span> SEO Debug Page
            </div>
            <div className="mb-2">
              <span className="font-semibold">og:description:</span> A page to test and debug Open Graph and social media previews for Bloom website
            </div>
            <div className="mb-2">
              <span className="font-semibold">og:image:</span> {siteConfig.ogImage}
            </div>
            <div className="mb-2">
              <span className="font-semibold">og:url:</span> {siteConfig.url}/debug
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Social Media Preview Testing</h2>
        <p className="mb-4">Use these tools to test your social media previews:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(`${siteConfig.url}/debug`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200"
          >
            <h3 className="font-semibold text-blue-700">Facebook Debugger</h3>
            <p className="text-sm text-gray-600">Test how your page appears when shared on Facebook</p>
          </a>
          
          <a 
            href={`https://cards-dev.twitter.com/validator?url=${encodeURIComponent(`${siteConfig.url}/debug`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200"
          >
            <h3 className="font-semibold text-blue-700">Twitter Card Validator</h3>
            <p className="text-sm text-gray-600">Test how your page appears when shared on Twitter</p>
          </a>
          
          <a 
            href={`https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(`${siteConfig.url}/debug`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200"
          >
            <h3 className="font-semibold text-blue-700">LinkedIn Post Inspector</h3>
            <p className="text-sm text-gray-600">Test how your page appears when shared on LinkedIn</p>
          </a>
          
          <a 
            href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(`${siteConfig.url}/debug`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200"
          >
            <h3 className="font-semibold text-blue-700">Google Rich Results Test</h3>
            <p className="text-sm text-gray-600">Test structured data and how your page appears in Google</p>
          </a>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Image Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Default Open Graph Image</h3>
            <img 
              src={`${siteConfig.url}${siteConfig.ogImage}`} 
              alt="Default Open Graph Preview" 
              className="max-w-full h-auto border rounded"
            />
            <p className="mt-2 text-sm text-gray-600">This is the default image from siteConfig</p>
          </div>
          
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Page-Specific Open Graph Image</h3>
            <img 
              src={`${siteConfig.url}/debug/opengraph-image`} 
              alt="Page-Specific Open Graph Preview" 
              className="max-w-full h-auto border rounded"
            />
            <p className="mt-2 text-sm text-gray-600">This is the dynamically generated image for this page</p>
          </div>
        </div>
      </div>
    </div>
  );
}

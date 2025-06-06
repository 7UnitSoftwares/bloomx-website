"use client";

import { useState, useEffect } from 'react';
import { siteConfig } from '@/utils/seo';

export default function DebugPage() {
  const [baseUrl, setBaseUrl] = useState('');
  const [nodeEnv, setNodeEnv] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [twitterImageUrl, setTwitterImageUrl] = useState('');
  const [blogOgImageUrl, setBlogOgImageUrl] = useState('');
  const [blogTwitterImageUrl, setBlogTwitterImageUrl] = useState('');
  const [blogPostOgImageUrl, setBlogPostOgImageUrl] = useState('');
  const [blogPostTwitterImageUrl, setBlogPostTwitterImageUrl] = useState('');

  useEffect(() => {
    setBaseUrl(siteConfig.url);
    setNodeEnv(process.env.NODE_ENV || 'unknown');
    setOgImageUrl(`${siteConfig.url}/opengraph-image`);
    setTwitterImageUrl(`${siteConfig.url}/twitter-image`);
    setBlogOgImageUrl(`${siteConfig.url}/blog/opengraph-image`);
    setBlogTwitterImageUrl(`${siteConfig.url}/blog/twitter-image`);
    setBlogPostOgImageUrl(`${siteConfig.url}/blog/adhd-a-scuola/opengraph-image`);
    setBlogPostTwitterImageUrl(`${siteConfig.url}/blog/adhd-a-scuola/twitter-image`);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">SEO Debug Page</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Environment Information</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Base URL:</strong> {baseUrl}</p>
          <p><strong>NODE_ENV:</strong> {nodeEnv}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">OpenGraph Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Home Page</h3>
            <p className="mb-2 break-all"><strong>URL:</strong> {ogImageUrl}</p>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={ogImageUrl} 
                alt="Home OpenGraph" 
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = '/logo/bloom_og.png';
                  e.target.alt = 'Failed to load';
                }}
              />
            </div>
          </div>
          
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Blog Page</h3>
            <p className="mb-2 break-all"><strong>URL:</strong> {blogOgImageUrl}</p>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={blogOgImageUrl} 
                alt="Blog OpenGraph" 
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = '/logo/bloom_og.png';
                  e.target.alt = 'Failed to load';
                }}
              />
            </div>
          </div>
          
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Blog Post</h3>
            <p className="mb-2 break-all"><strong>URL:</strong> {blogPostOgImageUrl}</p>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={blogPostOgImageUrl} 
                alt="Blog Post OpenGraph" 
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = '/logo/bloom_og.png';
                  e.target.alt = 'Failed to load';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Twitter Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Home Page</h3>
            <p className="mb-2 break-all"><strong>URL:</strong> {twitterImageUrl}</p>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={twitterImageUrl} 
                alt="Home Twitter" 
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = '/logo/bloom_og.png';
                  e.target.alt = 'Failed to load';
                }}
              />
            </div>
          </div>
          
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Blog Page</h3>
            <p className="mb-2 break-all"><strong>URL:</strong> {blogTwitterImageUrl}</p>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={blogTwitterImageUrl} 
                alt="Blog Twitter" 
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = '/logo/bloom_og.png';
                  e.target.alt = 'Failed to load';
                }}
              />
            </div>
          </div>
          
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Blog Post</h3>
            <p className="mb-2 break-all"><strong>URL:</strong> {blogPostTwitterImageUrl}</p>
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={blogPostTwitterImageUrl} 
                alt="Blog Post Twitter" 
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = '/logo/bloom_og.png';
                  e.target.alt = 'Failed to load';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Test Social Media Preview</h2>
        <p className="mb-4">Use these tools to test your social media previews:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><a href="https://www.opengraph.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenGraph.xyz</a></li>
          <li><a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter Card Validator</a></li>
          <li><a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Sharing Debugger</a></li>
          <li><a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn Post Inspector</a></li>
        </ul>
      </div>
    </div>
  );
}

import { siteConfig } from '@/utils/seo';

export default function generateMetadata() {
  // Use the dynamically generated images for this page
  const ogImage = '/debug/opengraph-image';
  const twitterImage = '/debug/twitter-image';
  
  // Create the full URLs for the images
  const fullOgImageUrl = `${siteConfig.url}${ogImage}`;
  const fullTwitterImageUrl = `${siteConfig.url}${twitterImage}`;
  
  return {
    title: 'SEO Debug Page | Bloom',
    description: 'A page to test and debug Open Graph and social media previews for Bloom website',
    keywords: ['SEO', 'Open Graph', 'social media', 'debugging', 'meta tags'].join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/debug',
    },
    openGraph: {
      title: 'SEO Debug Page',
      description: 'A page to test and debug Open Graph and social media previews for Bloom website',
      url: `${siteConfig.url}/debug`,
      siteName: siteConfig.name,
      images: [
        {
          url: fullOgImageUrl,
          width: 1200,
          height: 630,
          alt: 'SEO Debug Page',
        },
      ],
      locale: 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SEO Debug Page',
      description: 'A page to test and debug Open Graph and social media previews for Bloom website',
      images: [
        {
          url: fullTwitterImageUrl,
          alt: 'SEO Debug Page',
        }
      ],
      creator: '@bloomcentro',
    },
    robots: {
      index: process.env.NODE_ENV === 'production',
      follow: process.env.NODE_ENV === 'production',
      nocache: process.env.NODE_ENV !== 'production',
      googleBot: {
        index: process.env.NODE_ENV === 'production',
        follow: process.env.NODE_ENV === 'production',
        noimageindex: process.env.NODE_ENV !== 'production',
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

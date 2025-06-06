import { generatePageMetadata } from '@/utils/seo';

export default function generateMetadata() {
  return generatePageMetadata({
    title: 'SEO Debug',
    description: 'Debug page for testing OpenGraph and Twitter images',
    path: '/debug',
    type: 'website',
    keywords: [
      'debug',
      'SEO',
      'OpenGraph',
      'Twitter Cards',
      'social media preview'
    ],
  });
}

import { generatePageMetadata } from '@/utils/seo';

export default function generateMetadata() {
  return generatePageMetadata({
    title: 'Blog',
    description: 'Articoli, guide e risorse per studenti, genitori e professionisti',
    path: '/blog',
    type: 'website',
    keywords: [
      'blog educativo',
      'risorse pedagogiche',
      'ADHD',
      'DSA',
      'metodo di studio',
      'apprendimento',
      'pedagogia moderna',
      'supporto scolastico'
    ],
  });
}

// SEO utility functions for Bloom website

export const siteConfig = {
  name: 'Bloom Centro Pedagogico',
  description: 'Bloom è un centro di pedagogia moderna che accompagna le persone nel loro percorso di vita. Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e apprendere in modo efficace.',
  url: process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it' : 'http://localhost:3000',
  ogImage: '/logo/bloom_og.png', // Changed from SVG to PNG for better social media support
  links: {
    twitter: 'https://twitter.com/bloom_centro', // Replace with actual Twitter
    facebook: 'https://facebook.com/bloomcentro', // Replace with actual Facebook
    instagram: 'https://instagram.com/bloomcentro', // Replace with actual Instagram
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  authors,
  section,
  keywords = [],
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const fullUrl = `${siteConfig.url}${path}`;
  // Use static image for better compatibility
  const ogImage = '/logo/bloom_og.png';
  // Use static image for better compatibility
  const twitterImage = '/logo/bloom_og.png';

  const baseKeywords = [
    'pedagogia moderna',
    'centro educativo',
    'supporto studenti',
    'ADHD',
    'DSA',
    'metodo di studio',
    'educazione personalizzata',
    'Bologna',
  ];

  const allKeywords = [...baseKeywords, ...keywords].join(', ');

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: authors ? authors.map(author => ({ name: author })) : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title || siteConfig.name,
      description: fullDescription,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: 'it_IT',
      type,
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: fullDescription,
      images: [
        {
          url: `${siteConfig.url}${twitterImage}`,
          alt: title || siteConfig.name,
        }
      ],
      creator: '@bloomcentro', // Replace with actual Twitter handle
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

export function generateBlogMetadata(post) {
  // Convert Italian date format to ISO string
  const [day, month, year] = post.date.split(' ');
  const months = {
    'Gennaio': '01', 'Febbraio': '02', 'Marzo': '03', 'Aprile': '04',
    'Maggio': '05', 'Giugno': '06', 'Luglio': '07', 'Agosto': '08',
    'Settembre': '09', 'Ottobre': '10', 'Novembre': '11', 'Dicembre': '12'
  };
  const isoDate = `${year}-${months[month]}-${day.padStart(2, '0')}`;

  return {
    title: `${post.title} | Bloom Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: isoDate,
      authors: [post.author],
      section: post.category,
      images: [
        {
          url: `${siteConfig.url}/logo/bloom_og.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [
        {
          url: `${siteConfig.url}/logo/bloom_og.png`,
          alt: post.title,
        }
      ],
    },
  };
}

export function generateStructuredData(type, data) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  };

  // Helper function to convert Italian date to ISO string
  const convertItalianDateToISO = (dateStr) => {
    const [day, month, year] = dateStr.split(' ');
    const months = {
      'Gennaio': '01', 'Febbraio': '02', 'Marzo': '03', 'Aprile': '04',
      'Maggio': '05', 'Giugno': '06', 'Luglio': '07', 'Agosto': '08',
      'Settembre': '09', 'Ottobre': '10', 'Novembre': '11', 'Dicembre': '12'
    };
    return `${year}-${months[month]}-${day.padStart(2, '0')}`;
  };

  switch (type) {
    case 'organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo/bloom_og.png`, // Changed from SVG to PNG for better compatibility
        description: siteConfig.description,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IT',
          addressLocality: 'Bologna',
        },
        sameAs: Object.values(siteConfig.links),
      };

    case 'website':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    case 'article':
      const isoDate = convertItalianDateToISO(data.date);
      return {
        ...baseStructuredData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: `${siteConfig.url}/logo/bloom_og.png`,
        author: {
          '@type': 'Person',
          name: data.author,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/logo/bloom_og.png`, // Changed from SVG to PNG for better compatibility
          },
        },
        datePublished: isoDate,
        dateModified: isoDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteConfig.url}/blog/${data.slug}`,
        },
      };

    case 'breadcrumb':
      return {
        ...baseStructuredData,
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${siteConfig.url}${item.path}`,
        })),
      };

    default:
      return baseStructuredData;
  }
}

import { ImageResponse } from 'next/og';
import { siteConfig } from '@/utils/seo';

export const runtime = 'edge';

export const alt = 'Bloom Blog Post';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// This would typically come from an API or database
const blogs = [
  {
    slug: "adhd-a-scuola",
    title: "ADHD a scuola: meno ansia, più risultati con queste strategie efficaci",
    description: "Questo blog offre strategie pratiche ed empatiche per aiutare gli studenti con ADHD a gestire l'ansia scolastica e migliorare il rendimento durante verifiche e interrogazioni.",
    image: "/blog/adhd.jpg",
  },
  {
    slug: "dsa-strategie-urgenti",
    title: "DSA: strategie urgenti per affrontare interrogazioni e scritti",
    description: "Studiare e affrontare interrogazioni o compiti scritti può trasformarsi in un momento di ansia e frustrazione per tanti studenti. Ma per chi convive con un Disturbo Specifico dell'Apprendimento (DSA), le sfide si moltiplicano.",
    image: "/blog/dsa.jpg",
  },
  {
    slug: "esame-di-stato",
    title: "Esami e verifiche di fine anno? Ecco il metodo di studio che ti aiuta nell'ultimo periodo",
    description: "Maggio è il mese che per studenti di ogni età segna l'inizio della corsa finale. Le interrogazioni si moltiplicano, i debiti scolastici bussano alla porta, e per molti iniziano le notti insonni o i pomeriggi interminabili passati sui libri.",
    image: "/blog/esamie.jpg",
  }
];

export default async function Image({ params }) {
  const post = blogs.find(blog => blog.slug === params.slug) || {
    title: 'Bloom Blog',
    description: 'Articoli, guide e risorse per studenti, genitori e professionisti',
    image: '/logo/bloom_og.png',
  };

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Background color instead of image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#f5f5f5',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            height: '100%',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#00A59B',
              marginBottom: '20px',
              maxWidth: '900px',
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#666666',
              textAlign: 'center',
              maxWidth: '800px',
              marginBottom: '40px',
            }}
          >
            {post.description.length > 150 
              ? post.description.substring(0, 150) + '...' 
              : post.description}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              fontSize: '20px',
              color: '#00A59B',
              fontWeight: 'bold',
            }}
          >
            Bloom Centro Pedagogico | Blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

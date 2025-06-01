import localFont from "next/font/local";
import "./globals.css";

import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { validateEnv } from '@/utils/config';
import { generatePageMetadata, generateStructuredData } from '@/utils/seo';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ["latin"], 
  weights: [400, 500, 600, 700, 800, 900],
});

// Server-side logging
if (typeof window === 'undefined') {
    console.log('[BLOOM-SERVER]', new Date().toISOString(), 'Application starting...');
    const envValid = validateEnv();
    if (!envValid) {
        console.error('[BLOOM-SERVER]', new Date().toISOString(), 'Application started with invalid environment configuration');
    } else {
        console.log('[BLOOM-SERVER]', new Date().toISOString(), 'Application started successfully');
    }
}

export const metadata = {
  title: "Fiorire nel tuo spazio, col tuo tempo | Bloom",
  description: "Bloom è un centro di pedagogia moderna che accompagna le persone nel loro percorso di vita. Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e apprendere in modo efficace.",
  keywords: "pedagogia moderna, centro educativo, supporto studenti, ADHD, DSA, metodo di studio, educazione personalizzata, Bologna",
  authors: [{ name: "Bloom Centro Pedagogico" }],
  creator: "Bloom Centro Pedagogico",
  publisher: "Bloom Centro Pedagogico",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it' : 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fiorire nel tuo spazio, col tuo tempo | Bloom",
    description: "Bloom è un centro di pedagogia moderna che accompagna le persone nel loro percorso di vita. Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e apprendere in modo efficace.",
    url: 'https://bloom-bi.it/',
    siteName: 'Bloom Centro Pedagogico',
    images: [
      {
        url: 'https://bloom-bi.it/logo/bloom_og.png',
        width: 1200,
        height: 630,
        alt: 'Bloom Centro Pedagogico - Logo',
        type: 'image/png',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fiorire nel tuo spazio, col tuo tempo | Bloom",
    description: "Bloom è un centro di pedagogia moderna che accompagna le persone nel loro percorso di vita. Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e apprendere in modo efficace.",
    images: ['https://bloom-bi.it/logo/bloom_og.png'],
    creator: '@bloomcentro',
    site: '@bloomcentro',
  },
  linkedin: {
    title: 'Bloom - Centro Pedagogico',
    description: 'Bloom è un centro pedagogico che offre percorsi di studio, consulenza e laboratori per studenti, genitori e professionisti.',
    image: 'https://bloom-bi.it/og-image.jpg',
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = generateStructuredData('organization');
  const websiteSchema = generateStructuredData('website');

  return (
    <html lang="it">
      <head>
        {/* Iubenda script for privacy policy and cookie banner */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Script src="https://cdn.iubenda.com/iubenda.js" strategy="afterInteractive" />
        <Script src="//embeds.iubenda.com/widgets/25200606-b9a2-41af-9769-28fce4ba743a.js" strategy="afterInteractive" />
        <Script id="iubenda-consent-init" strategy="afterInteractive">
          {`var _iub = _iub || {}; _iub.cons_instructions = _iub.cons_instructions || []; _iub.cons_instructions.push(["init", {api_key: "S7lZ34EUG9S06UUpARbEAxgNTHLCc7J4"}]);`}
        </Script>
        <Script src="https://cdn.iubenda.com/cons/iubenda_cons.js" strategy="afterInteractive" async />
        <meta property="og:image" content="https://bloom-bi.it/logo/bloom_og.png" />
        <meta name="twitter:image" content="https://bloom-bi.it/logo/bloom_og.png" />
      </head>
      <body className={`${montserrat.className} overflow-x-hidden antialiased`}>
        <Navbar /> 
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

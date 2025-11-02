import localFont from "next/font/local";
import "./globals.css";
import { Montserrat, Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LayoutWrapper from "@/components/LayoutWrapper";
import { validateEnv } from '@/utils/config';
import { generatePageMetadata, generateStructuredData, siteConfig } from '@/utils/seo';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 800, 900],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
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
  title: {
    default: 'Bloom - Centro Pedagogico',
    template: '%s | Bloom - Centro Pedagogico'
  },
  description: 'Bloom è un centro pedagogico che offre percorsi di studio, consulenza e laboratori per studenti, genitori e professionisti.',
  keywords: ['pedagogia moderna', 'centro educativo', 'supporto studenti', 'ADHD', 'DSA', 'metodo di studio', 'educazione personalizzata', 'Bologna'],
  authors: [{ name: 'Bloom Centro Pedagogico' }],
  creator: 'Bloom Centro Pedagogico',
  publisher: 'Bloom Centro Pedagogico',
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it' : 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it' : 'http://localhost:3000',
    siteName: 'Bloom - Centro Pedagogico',
    title: 'Bloom - Centro Pedagogico',
    description: 'Bloom è un centro di pedagogia moderna che offre percorsi di studio, consulenza e laboratori per studenti, genitori e professionisti.',
    images: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it/logo/bloom_og.png' : 'http://localhost:3000/logo/bloom_og.png',
        width: 1200,
        height: 630,
        alt: 'Bloom - Centro Pedagogico',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bloomcentro',
    creator: '@bloomcentro',
    title: 'Bloom - Centro Pedagogico',
    description: 'Bloom è un centro di pedagogia moderna che offre percorsi di studio, consulenza e laboratori per studenti, genitori e professionisti.',
    images: {
      url: process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it/logo/bloom_og.png' : 'http://localhost:3000/logo/bloom_og.png',
      alt: 'Bloom - Centro Pedagogico',
      width: 1200,
      height: 630,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google01c4432048631384',
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = generateStructuredData('organization');
  const websiteSchema = generateStructuredData('website');

  return (
    <html lang="it">
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* Additional meta tags for better social media support */}
        <meta property="og:image:secure_url" content={process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it/logo/bloom_og.png' : 'http://localhost:3000/logo/bloom_og.png'} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* LinkedIn specific tags */}
        <meta property="og:title" content="Bloom - Centro Pedagogico" />
        <meta property="og:description" content="Bloom è un centro di pedagogia moderna che offre percorsi di studio, consulenza e laboratori per studenti, genitori e professionisti." />

        {/* Twitter specific tags */}
        <meta name="twitter:image:src" content={process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it/logo/bloom_og.png' : 'http://localhost:3000/logo/bloom_og.png'} />
        <meta name="twitter:domain" content={process.env.NODE_ENV === 'production' ? 'bloom-bi.it' : 'localhost:3000'} />
        <meta name="twitter:url" content={process.env.NODE_ENV === 'production' ? 'https://bloom-bi.it' : 'http://localhost:3000'} />

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
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TZS4RQJX');`}
        </Script>
        {/* End Google Tag Manager */}
        
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-E19PR8FE79" strategy="afterInteractive" />
        <Script id="gtag-script" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E19PR8FE79');`}
        </Script>
      </head>
      <body suppressHydrationWarning={true} className={`${montserrat.className} ${roboto.variable} overflow-x-hidden antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZS4RQJX" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        <div className="pt-16">
          <LayoutWrapper>
            <main>

              {children}
            </main>
          </LayoutWrapper>
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

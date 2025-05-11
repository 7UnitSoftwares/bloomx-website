import localFont from "next/font/local";
import "./globals.css";

import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { validateEnv } from '@/utils/config';

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        {/* Iubenda script for privacy policy and cookie banner */}
        <script
          type="text/javascript"
          src="YOUR_IUBENDA_SCRIPT_URL"
        ></script>
        <link rel="icon" href="/favicon.ico" />
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

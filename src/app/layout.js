import localFont from "next/font/local";
import "./globals.css";

import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  // weight: [], // Adjust weights as needed
  subsets: ["latin"], 
  weights: [400, 500, 600, 700, 800, 900],
});
export const metadata = {
  title: "Fiorire nel tuo spazio, col tuo tempo | Bloom",
  description: "Bloom è un centro di pedagogia moderna che accompagna le persone nel loro percorso di vita. Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e apprendere in modo efficace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} overflow-x-hidden antialiased`}>
      {/* <Navbar/>  */}
      {children}
      {/* <Footer/> */}
      </body>
    </html>
  );
}

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
  title: "Bloom",
  description: "Bloom App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} overflow-x-hidden antialiased`}>
      <Navbar/> 
      {children}
      <Footer/>
      </body>
    </html>
  );
}

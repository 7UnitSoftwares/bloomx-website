"use client";

import Image from "next/image";
import HeroSection from "./homepage/HeroSection";
import OpenDayBanner from "./homepage/OpenDayBanner";
import Projects from "./homepage/Projects";
import Space from "./homepage/Space";
import Services from "./homepage/Service";
import Events from "./homepage/Events";
import YouTubeChannel from "./homepage/YouTubeChannel";
import Contact from "@/components/Contact";
import PDFModal from "@/components/PDFModal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBannerClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="overflow-hidden">
        <HeroSection onBannerClick={handleBannerClick} />
        <Projects />
        <Services />
        <Space />
        <Events />
        <YouTubeChannel />
        <Contact />
      </div>
      
      {/* PDF Modal */}
      <PDFModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        pdfUrl="/xstampadigitale.pdf" 
      />
    </>
  );
}

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
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleBannerClick = () => {
    router.push('/eu-funding');
  };

  return (
    <div className="overflow-hidden">
      <HeroSection onBannerClick={handleBannerClick} />
      <Projects />
      <Services />
      <Space />
      <Events />
      <YouTubeChannel />
      <Contact />
    </div>
  );
}

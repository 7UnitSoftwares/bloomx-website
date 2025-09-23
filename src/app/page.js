import Image from "next/image";
import HeroSection from "./homepage/HeroSection";
import OpenDayBanner from "./homepage/OpenDayBanner";
import Projects from "./homepage/Projects";
import Space from "./homepage/Space";
import Services from "./homepage/Service";
import Events from "./homepage/Events";
import YouTubeChannel from "./homepage/YouTubeChannel";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        <HeroSection />
        <Projects />
        <Services />
        <Space />
        <Events />
        <YouTubeChannel />
        <Contact />
      </div>
    </>
  );
}

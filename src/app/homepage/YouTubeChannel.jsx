"use client";

import Container from "@/components/Container";
import VideoCarousel from "@/components/VideoCarousel";
import { useState, useEffect } from "react";

const YouTubeChannel = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback video data in case API is not configured
  const fallbackVideos = [
    {
      id: "tSeM6q0QXmU",
      title: "Bloom Nanny - Comunicazione efficace e codice deontologico della baby sitter | Centro Bloom",
      description: "Essere una baby sitter non significa solo prendersi cura dei bambini, ma anche rispettare un vero e proprio codice deontologico fatto di principi, correttezza e comunicazione chiara con i genitori.",
      thumbnail: "https://img.youtube.com/vi/tSeM6q0QXmU/maxresdefault.jpg"
    },
    {
      id: "STV08tNjhB8",
      title: "Yoga del Cuore: un Percorso di Crescita per Bambini, Adulti e Famiglie",
      description: "🧘‍♀️ Yoga del Cuore - Un laboratorio unico che unisce yoga, arteterapia e mindfulness per armonizzare corpo, mente ed emozioni.",
      thumbnail: "https://img.youtube.com/vi/STV08tNjhB8/maxresdefault.jpg"
    },
    {
      id: "GINHMC4AHg0",
      title: "Mindfulness tra le righe: meditazione e lettura per ritrovare equilibrio e benessere",
      description: "Respira, leggi, ritrova te stesso. ✨ Immagina un momento tutto tuo: un libro aperto, un respiro profondo, la mente che si calma. Mindfulness tra le righe è un laboratorio per adulti e ragazzi ispirato al metodo MBSR (Mindfulness-Based Stress Reduction), dove lettura e meditazione si incontrano per riportarti nel presente.",
      thumbnail: "https://img.youtube.com/vi/GINHMC4AHg0/maxresdefault.jpg"
    },
    {
      id: "Jy0hJCTnFuc",
      title: "La Navicella dei Bambini Curiosi: laboratorio di Ludopedagogia tra storie, creatività e divertimento",
      description: "🚀 La Navicella dei Bambini Curiosi è un laboratorio pensato per accompagnare i bambini in un viaggio appassionante tra storie incredibili, scoperte e attività creative. Un percorso che stimola capacità cognitive, pensiero creativo e immaginazione, trasformando l’apprendimento in un’avventura divertente.",
      thumbnail: "https://img.youtube.com/vi/Jy0hJCTnFuc/maxresdefault.jpg"
    },
    {
      id: "Wm-2cQ3gcbw",
      title: "Le Mie Mani sono Magiche | Laboratorio Creativo di Arte, Pittura e Riciclo per Bambini",
      description: "Le Mie Mani sono Magiche - Un laboratorio creativo che unisce arte, pittura e riciclo per stimolare fantasia, manualità e consapevolezza.",
      thumbnail: "https://img.youtube.com/vi/Wm-2cQ3gcbw/maxresdefault.jpg"
    }
  ];

  // Use fallback videos for now to avoid API issues
  useEffect(() => {
    setVideos(fallbackVideos);
    setLoading(false);
  }, []);

  const handleVideoClick = (video, index) => {
    // Open YouTube video in new tab
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div id="youtube" className="bg-white py-16 md:py-20">
        <Container>
          <div className="text-center mb-12">
            <h1 className="typography text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Il Nostro Canale YouTube
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-medium text-[#808080] max-w-3xl mx-auto">
              Esplora i nostri video educativi, tutorial e contenuti che accompagnano il percorso di crescita 
              di bambini, ragazzi e famiglie. Ogni video è pensato per ispirare, educare e supportare.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A59B]"></div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div id="youtube" className="bg-white py-16 md:py-20">
      <Container>
        <div className="text-center mb-12">
          <h1 className="typography text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Il Nostro Canale YouTube
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-medium text-[#808080] max-w-3xl mx-auto">
            Esplora i nostri video educativi, tutorial e contenuti che accompagnano il percorso di crescita 
            di bambini, ragazzi e famiglie. Ogni video è pensato per ispirare, educare e supportare.
          </p>
        </div>

        {/* Video Carousel */}
        <div className="mb-8">
          <VideoCarousel 
            videos={videos} 
            onVideoClick={handleVideoClick}
          />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="https://www.youtube.com/@BloomCenterBI" // Replace with actual YouTube channel URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00A59B] hover:bg-[#008C95] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Iscriviti al Canale
          </a>
        </div>
      </Container>
    </div>
  );
};

export default YouTubeChannel;

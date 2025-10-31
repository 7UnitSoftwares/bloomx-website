"use client";

import Container from "@/components/Container";
import TestimonialCard from "@/components/Testimonial";
import InterestFormModal from "@/components/InterestFormModal";
import { TestimonialData } from "@/data/Testimonial";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleExpressInterest = () => {
    setIsModalOpen(true);
  };

  const handleEventClick = () => {
    router.push('/eventi');
  };

  return (
    <div>
      {/* Events Section */}
      <Container>
        <div className="mt-10 lg:mt-16">
          <h1 className="typography text-center mb-8">
            I Nostri Eventi
          </h1>
          
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Mindfulness tra le righe */}
            <div 
              className="bg-white rounded-2xl shadow-lg border border-[#00A59B]/20 p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={handleEventClick}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-[#00A59B] mb-3">
                  Mindfulness tra le righe
                </h2>
                <div className="bg-[#00A59B] text-white px-4 py-2 rounded-full inline-block text-sm font-semibold">
                  20:30 - 22:00
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-base text-gray-700 leading-relaxed">
                  Edizione autunnale: un percorso di lettura consapevole e pratiche di presenza per rallentare, ascoltarsi e vivere il presente con maggiore chiarezza e serenità.
                </p>
                
                <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#00A59B]/10">
                  <h3 className="text-sm font-bold text-[#00A59B] mb-2">
                    6 Ottobre 2025
                  </h3>
                  <p className="text-sm text-gray-600">
                    Un momento speciale per dedicarsi alla lettura consapevole e alle pratiche di mindfulness.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button className="bg-[#00A59B] hover:bg-[#008C95] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200">
                  Scopri di più
                </button>
              </div>
            </div>

            {/* La notte delle luci gentili */}
            <div 
              className="bg-white rounded-2xl shadow-lg border border-[#00A59B]/20 p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={handleEventClick}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-[#00A59B] mb-3">
                  La notte delle luci gentili
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <div className="bg-[#FF6B35] text-white px-3 py-2 rounded-full inline-block font-semibold whitespace-nowrap">
                    30 Ottobre • 16:30-18:00
                  </div>
                  <div className="bg-[#FF6B35] text-white px-3 py-2 rounded-full inline-block font-semibold whitespace-nowrap">
                    31 Ottobre • 15:30-17:00
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-base text-gray-700 leading-relaxed">
                  Un laboratorio di <strong className="text-[#FF6B35]">Halloween soft</strong> tra creatività, emozioni e Yoga Bimbi. Un pomeriggio magico per bambini dai <strong className="text-[#00A59B]">6 agli 11 anni</strong>.
                </p>
                
                <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFE0B2] rounded-xl p-4 border border-[#FF6B35]/20">
                  <h3 className="text-sm font-bold text-[#FF6B35] mb-2">
                    🎃 Laboratorio Halloween Speciale
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Due giornate dedicate alla creatività e al benessere dei bambini
                  </p>
                  <p className="text-xs text-gray-600">
                    Un'esperienza dolce e coinvolgente che combina arte, mindfulness e movimento.
                  </p>
                </div>
                
                <div className="bg-[#f0fdfa] rounded-xl p-4 border border-[#00A59B]/20">
                  <p className="text-xs text-gray-700">
                    <strong className="text-[#00A59B]">Età consigliata:</strong> 6-11 anni • <strong className="text-[#00A59B]">Durata:</strong> 1h30 per sessione
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200">
                  Scopri di più
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-[#F2F2F2] mt-10 lg:mt-10">
        <Container>
          <h1 className="typography pt-5 lg:pt-16">Le voci di chi ci ha scelto</h1>
           <div className="grid lg:grid-cols-3 gap-10 lg:mt-16 p-4 pb-16">
            {TestimonialData.map((data, index) => {
              return <TestimonialCard data={data} key={index} />;
            })}
          </div>
        </Container>
      </div>
      
      {/* Interest Form Modal */}
      <InterestFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        interest="Pausa Mindful"
      />
    </div>
  );
}

export default Events;

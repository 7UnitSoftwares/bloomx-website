"use client";

import Container from "@/components/Container";
import TestimonialCard from "@/components/Testimonial";
import InterestFormModal from "@/components/InterestFormModal";
import { TestimonialData } from "@/data/Testimonial";
import { useState } from "react";

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpressInterest = () => {
    setIsModalOpen(true);
  };

  const handleEventClick = () => {
    window.open('https://portal.bloom-bi.it/events', '_blank');
  };

  return (
    <div>
      {/* Events Section */}
      <Container>
        <div className="mt-10 lg:mt-16">
          <h1 className="typography text-center mb-8">
            I Nostri Eventi
          </h1>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Calendario dell'Avvento Bloom 2025 */}
            <div 
              className="bg-white rounded-2xl shadow-lg border border-[#00A59B]/20 p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col"
              onClick={handleEventClick}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-[#00A59B] mb-4">
                  Calendario dell'Avvento Bloom 2025
                </h2>
                <div className="bg-[#00A59B] text-white px-4 py-2 rounded-full inline-block text-sm font-semibold mb-3">
                  28 novembre
                </div>
                <div className="text-sm text-gray-600">
                  Laboratorio creativo per bambini (6–11 anni)
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="text-center mb-6">
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Un pomeriggio magico per creare insieme il proprio calendario dell'Avvento, fatto di piccoli doni, messaggi gentili e momenti di gratitudine.
                  </p>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick();
                    }}
                    className="bg-[#00A59B] hover:bg-[#008C95] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
                  >
                    Scopri di più
                  </button>
                </div>
              </div>
            </div>

            {/* Intrecci di Natale */}
            <div 
              className="bg-white rounded-2xl shadow-lg border border-[#00A59B]/20 p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col"
              onClick={handleEventClick}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-[#00A59B] mb-4">
                  Intrecci di Natale
                </h2>
                <div className="bg-[#00A59B] text-white px-4 py-2 rounded-full inline-block text-sm font-semibold mb-3">
                  3 dicembre
                </div>
                <div className="text-sm text-gray-600">
                  Laboratorio esperienziale per adulti
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="text-center mb-6">
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Mindfulness, storytelling e craft terapeutico: la ghirlanda delle emozioni.
                  </p>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick();
                    }}
                    className="bg-[#00A59B] hover:bg-[#008C95] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
                  >
                    Scopri di più
                  </button>
                </div>
              </div>
            </div>

            {/* Il Villaggio delle Emozioni Natalizie */}
            <div 
              className="bg-white rounded-2xl shadow-lg border border-[#00A59B]/20 p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col"
              onClick={handleEventClick}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-[#00A59B] mb-4">
                  Il Villaggio delle Emozioni Natalizie
                </h2>
                <div className="bg-[#00A59B] text-white px-4 py-2 rounded-full inline-block text-sm font-semibold mb-3">
                  10 dicembre
                </div>
                <div className="text-sm text-gray-600">
                  Laboratorio per bambini (6–11 anni)
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="text-center mb-6">
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Storytelling, giochi espressivi e mindfulness del respiro per imparare a riconoscere e vivere le emozioni del Natale.
                  </p>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick();
                    }}
                    className="bg-[#00A59B] hover:bg-[#008C95] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
                  >
                    Scopri di più
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Button to see all events */}
          <div className="text-center mt-10 lg:mt-12">
            <button
              onClick={handleEventClick}
              className="bg-[#00A59B] hover:bg-[#008C95] text-white font-bold text-lg py-4 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Scopri tutti i nostri eventi
            </button>
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

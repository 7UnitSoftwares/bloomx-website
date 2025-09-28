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

  return (
    <div>
      {/* Pausa Mindful Section */}
      <Container>
        <div className="mt-10 lg:mt-16">
          <h1 className="typography text-center mb-8">
            Pausa Mindful
          </h1>
          
          {/* Main Content Card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-[#00A59B]/20 p-6 lg:p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#00A59B] mb-3">
                  In arrivo questo autunno
                </h2>
                <div className="bg-[#00A59B] text-white px-4 py-2 rounded-full inline-block text-base font-semibold">
                  dalle 13:15 alle 14:15
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  Prenditi un'ora tutta per te con <strong className="text-[#00A59B]">Pausa Mindful</strong>: una camminata guidata che ti aiuta a rallentare, respirare e ritrovare presenza.
                </p>
                
                <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#00A59B]/10">
                  <h3 className="text-lg font-bold text-[#00A59B] mb-2">
                    Ogni mercoledì, dalle 13:15 alle 14:15
                  </h3>
                  <p className="text-base text-gray-700 mb-2">
                    Partenza da <strong>Piazza Gaudenzio Sella</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Un momento speciale per staccare dal lavoro, ridurre lo stress e ricaricare energia e chiarezza.
                  </p>
                </div>
                
                <div className="bg-[#f0fdfa] rounded-xl p-4 border border-[#00A59B]/20">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-[#00A59B]">In caso di maltempo</strong>, l'esperienza si sposta indoor con semplici pratiche di mindfulness.
                  </p>
                  <p className="text-xs text-gray-600 text-center">
                    Stay tuned sui nostri canali social o scrivici per maggiori dettagli e date!
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button 
                  onClick={handleExpressInterest}
                  className="bg-[#00A59B] hover:bg-[#008C95] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
                >
                  Esprimi interesse
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

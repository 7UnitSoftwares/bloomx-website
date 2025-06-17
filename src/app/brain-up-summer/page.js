"use client"
import Image from "next/image";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import React, { useState } from 'react';
import InterestFormModal from '@/components/InterestFormModal';

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-hidden">
      <SectionWithBackground
        title="Brain Up Summer"
        description="Investire oggi nel suo benessere scolastico<br /> significa costruire il suo successo di domani"
      />
      
      <div className="bg-[#F2F2F2]">
        <Container>
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex flex-col items-center justify-center">
                <Image src="/event/brain-up-summer.png" alt="Brain Up Summer" width={1000} height={1000} className="w-full h-auto" />
              </div>
              <div className="space-y-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  L'estate è un'occasione preziosa per aiutare tuo figlio a rafforzare le proprie competenze e prepararsi al nuovo anno scolastico. Troppo spesso, infatti, i mesi estivi portano a un calo degli apprendimenti, soprattutto nei momenti di passaggio tra cicli scolastici (elementari-medie, medie-superiori). L'Istituto Nazionale per la Valutazione del Sistema Educativo di Istruzione e di Formazione (INVALSI) sottolinea che le pause scolastiche, e in particolare la lunga interruzione estiva, contribuiscono ad acuire i divari esistenti nelle competenze, specialmente nei momenti di transizione tra ordini di scuola.
                </p>

                <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                  <p className="text-gray-700 leading-relaxed">
                    Con Brain Up Summer, il programma educativo estivo di Bloom, tuo figlio riceve un percorso personalizzato che potenzia le sue capacità scolastiche, emotive e cognitive, in un ambiente sereno, empatico e altamente qualificato.
                  </p>
                </div>

                {/* Features Section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold text-teal-700 mb-6 pb-2 border-b border-teal-200">
                    Cosa offriamo:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Valutazione iniziale personalizzata
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Piano educativo su misura
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Potenziamento scolastico per tutte le età
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Metodo di studio efficace
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Supporto a fragilità e disturbi dell'apprendimento (DSA, ADHD, ansia, ecc.)
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Laboratori creativi, public speaking, mindfulness, gioco di ruolo
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        Campus estivi in presenza e percorsi online
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Target Audience Section */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-teal-700 mb-2">Per chi:</h4>
                      <p className="text-gray-600">bambini e ragazzi dai 6 ai 18 anni</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-700 mb-2">Focus speciale:</h4>
                      <p className="text-gray-600">sui passaggi scolastici: elementari-medie e medie-superiori</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-700 mb-2">Genitori coinvolti:</h4>
                      <p className="text-gray-600">incontri, strumenti pratici, condivisione dei progressi</p>
                    </div>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 leading-relaxed text-lg italic">
                    Con Brain Up Summer tuo figlio tornerà a scuola più sicuro, motivato e preparato. E tu, genitore, avrai la serenità di avergli regalato un'estate davvero utile per il suo futuro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* <div className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md flex flex-col h-full min-h-[220px]">
              <div className="min-h-[120px]">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 leading-snug">Approccio pedagogico olistico</h3>
              </div>
              <p className="text-gray-600">Sviluppo completo del bambino attraverso un approccio integrato</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md flex flex-col h-full min-h-[220px]">
              <div className="min-h-[120px]">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 leading-snug">Creazioni da portare a casa</h3>
              </div>
              <p className="text-gray-600">Ricordi tangibili delle esperienze vissute</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md flex flex-col h-full min-h-[220px]">
              <div className="min-h-[120px]">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 leading-snug">Attività stimolanti</h3>
              </div>
              <p className="text-gray-600">Programma bilanciato tra apprendimento e divertimento</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md flex flex-col h-full min-h-[220px]">
              <div className="min-h-[120px]">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 leading-snug">Comunicazione costante</h3>
              </div>
              <p className="text-gray-600">Aggiornamenti regolari con le famiglie</p>
            </div>
          </div>
        </Container>
      </div> */}

      <div className="bg-white py-16">
        <Container>
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Per maggiori info e iscrizioni</h2>            
            <div className="space-y-4">
              <div className="text-gray-600">
                <p>Tel: <a href="tel:3382256056">338 225 6056</a></p>
                <p>Email: <a href="mailto:bloom@bloom-bi.it">bloom@bloom-bi.it</a></p>
                <p>Centro Pedagogico Bloom: <a href="https://maps.app.goo.gl/ewNGoiTtsHWMR1AH8" target="_blank">Via Torino 35B, Biella</a></p>
              </div>
              
              <button
                onClick={handleModalClick}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                Esprimi il tuo interesse
              </button>
            </div>
          </div>
        </Container>
      </div>

      <InterestFormModal 
        isOpen={isModalOpen} 
        interest="Brain Up Summer"
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default page;

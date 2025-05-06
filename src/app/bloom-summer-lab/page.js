"use client"
import Image from "next/image";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import React from "react";

const page = () => {
  return (
    <div className="overflow-hidden">
      <SectionWithBackground
        title="Bloom Summer Lab"
        description="Un'estate di natura, creatività e crescita"
      />
      
      <div className="bg-[#F2F2F2] py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Dal 9 giugno al 31 luglio, il Bloom Summer Lab accoglie bambini dai 6 ai 13 anni in un'esperienza educativa unica, dove gioco, consapevolezza e creatività si intrecciano ogni giorno.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ogni settimana un nuovo tema ispirato alla natura e all'educazione emozionale, con laboratori artistici, attività bilingue, mindfulness e momenti di scoperta pensati per nutrire mente, corpo e cuore.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/summer-lab.jpg"
                alt="Bloom Summer Lab Activities"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Approccio pedagogico olistico</h3>
              <p className="text-gray-600">Sviluppo completo del bambino attraverso un approccio integrato</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Creazioni da portare a casa</h3>
              <p className="text-gray-600">Ricordi tangibili delle esperienze vissute</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Attività stimolanti</h3>
              <p className="text-gray-600">Programma bilanciato tra apprendimento e divertimento</p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunicazione costante</h3>
              <p className="text-gray-600">Aggiornamenti regolari con le famiglie</p>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-teal-50 py-16">
        <Container>
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">I posti sono limitati!</h2>
            <p className="text-xl text-gray-600">Iscriviti ora e approfitta dello sconto early bird!</p>
            <div className="flex justify-center space-x-4">
              <a
                href="tel:3382256056"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Tel. 338 225 6056
              </a>
              <a
                href="mailto:info@bloom.it"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                info@bloom.it
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default page;

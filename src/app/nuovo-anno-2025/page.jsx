"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import InterestFormModal from "@/components/InterestFormModal";

const NuovoAnno2025 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const laboratoriData = {
    type: "laboratori",
    title: "SCOPRI I NUOVI LABORATORI BLOOM",
    subtitle: "Fai sbocciare il suo talento!",
    content: {
      description: "Pomeriggi per crescere, imparare e divertirsi! Laboratori per far sbocciare mente, cuore e creatività, rafforzando abilità scolastiche ed emotive.",
      laboratori: [
        {
          title: "Il Mosaico delle Emozioni",
          description: "Un percorso per conoscere, accogliere e comprendere le emozioni, sviluppando consapevolezza di sé e intelligenza emotiva.",
          icon: "💖"
        },
        {
          title: "Scrittori in Erba",
          description: "Leggi, inventa, disegna e scrivi i tuoi racconti, per stimolare fantasia, capacità narrative e competenze linguistiche divertendoti!",
          icon: "✍️"
        },
        {
          title: "Yoga del Cuore",
          description: "Un viaggio dolce per unire corpo, mente ed emozioni. Per bambini, adulti e famiglie: yoga, arteterapia e mindfulness per ritrovare connessione e serenità.",
          icon: "🧘"
        },
        {
          title: "La Navicella dei Bambini Curiosi",
          description: "Un viaggio appassionante tra storie incredibili per imparare divertendosi e sviluppare capacità cognitive, pensiero creativo e immaginazione.",
          icon: "🚀"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f0fdfa] via-white to-[#f0fdfa] py-16 lg:py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#00A59B] mb-6 leading-tight">
              Nuovo anno, nuove opportunità educative con Bloom
            </h1>
            <p className="text-lg lg:text-xl text-[#373737] leading-relaxed mb-8">
              Inizia un nuovo anno e con esso tante proposte pensate per accompagnare bambini, ragazzi, genitori e docenti in un cammino di crescita armoniosa.
            </p>
            <p className="text-base lg:text-lg text-[#555] leading-relaxed max-w-3xl mx-auto">
              In Bloom crediamo che ogni persona custodisca un potenziale unico e che la crescita autentica nasca dall'equilibrio tra mente, emozioni, corpo e relazioni.
            </p>
          </div>
        </Container>
      </section>

      {/* Educational Offerings Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#00A59B]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#008C95]/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#00A59B]/10 rounded-full blur-lg"></div>
        </div>
        
        <Container>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#00A59B] mb-6 relative">
                La nostra offerta educativa 2025
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#00A59B] to-[#008C95] rounded-full"></div>
              </h2>
              <p className="text-lg text-[#555] max-w-3xl mx-auto">
                Scopri tutti i nostri servizi pensati per accompagnare ogni fase della crescita
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Percorsi di studio e potenziamento
                      </h3>
                      <p className="text-[#555] text-sm leading-relaxed">Per studenti dai 6 ai 18 anni</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Valutazione iniziale personalizzata
                      </h3>
                      <p className="text-[#555] text-sm leading-relaxed">A cura di pedagogisti per individuare eventuali BES (ADHD, DSA, ecc.) e costruire metodi di studio su misura</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Attività di educazione emozionale
                      </h3>
                      <p className="text-[#555] text-sm leading-relaxed">Per bambini e ragazzi</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Laboratori esperienziali
                      </h3>
                      <p className="text-[#555] text-sm leading-relaxed">Di storytelling, ludopedagogia e creatività</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Percorsi di yoga e mindfulness
                      </h3>
                      <p className="text-[#555] text-sm leading-relaxed">Per bambini, ragazzi e adulti</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Spazi di dialogo e strumenti concreti
                      </h3>
                      <p className="text-[#555] text-sm leading-relaxed">Per genitori</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Aula dedicata allo studio in autonomia
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors duration-300">
                        Ambienti accoglienti e attrezzati
                      </h3>
                      <p className="text-[#555] text-sm leading-relaxed">Per attività, corsi e incontri</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Laboratori Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#f0fdfa] via-white to-[#f8fafc] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-[#00A59B]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#008C95]/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#00A59B]/10 rounded-full blur-lg"></div>
        </div>
        
        <Container>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#00A59B] mb-6 relative">
                {laboratoriData.title}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#00A59B] to-[#008C95] rounded-full"></div>
              </h2>
              <p className="text-xl text-[#008C95] font-semibold mb-4">{laboratoriData.subtitle}</p>
              <p className="text-lg text-[#555] max-w-3xl mx-auto">
                {laboratoriData.content.description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {laboratoriData.content.laboratori.map((laboratorio, index) => (
                <div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A59B]/20 hover:-translate-y-2"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {laboratorio.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#00A59B] mb-4 group-hover:text-[#008C95] transition-colors duration-300">
                      {laboratorio.title}
                    </h3>
                    <p className="text-[#555] text-sm leading-relaxed">
                      {laboratorio.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Free Resources Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#00A59B] to-[#008C95] text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Risorse gratuite per iniziare subito
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Scopri il nuovo calendario</h3>
                <p className="text-white/90 mb-6">Delle attività settimanali</p>
                <a 
                  href="/downloads/calendario_2025-26_250922_131426.pdf" 
                  download="calendario_2025-26_250922_131426.pdf"
                  className="inline-block"
                >
                  <Button className="!bg-white !text-[#00A59B] hover:!bg-white/90">
                    Visualizza Calendario
                  </Button>
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Scarica l'eBook gratuito</h3>
                <p className="text-white/90 mb-6">Con consigli pratici per crescere in armonia</p>
                <a 
                  href="https://designrr.page/?id=454069&token=2618866012&type=FP&h=7294" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="!bg-white !text-[#00A59B] hover:!bg-white/90">
                    Scarica eBook
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contattaci">
                <Button className="!bg-transparent !border-2 !border-white !text-white hover:!bg-white hover:!text-[#00A59B] px-8 py-3 text-lg">
                  Contattaci per informazioni
                </Button>
              </Link>
              <Link href="/siamo">
                <Button className="!bg-white/20 !text-white hover:!bg-white/30 px-8 py-3 text-lg">
                  Scopri di più su Bloom
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[#f0fdfa]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#00A59B] mb-6">
              Pronto a iniziare il tuo percorso di crescita?
            </h2>
            <p className="text-lg text-[#373737] mb-8">
              Unisciti alla comunità Bloom e scopri come possiamo accompagnarti nel tuo cammino di crescita personale ed educativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleOpenModal}
                className="bg-[#00A59B] hover:bg-[#008C95] text-white px-8 py-3 text-lg"
              >
                Prenota una consulenza
              </Button>
              <Link href="tel:+393382256056">
                <Button className="!bg-transparent !border-2 !border-[#00A59B] !text-[#00A59B] hover:!bg-[#00A59B] hover:!text-white px-8 py-3 text-lg">
                  Chiamaci: +39 338 225 6056
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Interest Form Modal */}
      <InterestFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        interest="Consulenza 2025"
      />
    </div>
  );
};

export default NuovoAnno2025;

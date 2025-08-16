"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Banner from "@/components/Banner";

const OpenDayPage = () => {
  return (
    <section className="bg-[#F2F2F2] min-h-screen">
      <SectionWithBackground
        title="UN ANNO SCOLASTICO FANTASTICO<br /> INIZIA DA QUI"
        description="Scopri le novità Bloom e fai sbocciare il talento!"
      />
      <Container>
        <OpenDaySection />
        <EventsCarousel />
        <StudentsSection />
        <WhyBloomSection />
      </Container>
      <Banner />
    </section>
  );
};

const EventsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      type: "summer-sprint",
      title: "SUMMER FINAL SPRINT",
      subtitle: "Lo Sprint di fine estate per iniziare l'anno scolastico da campioni!",
      content: {
        description: "Trasformate gli ultimi giorni di vacanza in un'occasione d'oro per offrire ai vostri figli un solido vantaggio scolastico e personale che li accompagnerà tutto l'anno.",
        features: [
          "Ripasso strategico per colmare lacune e finire i compiti",
          "Tecniche di studio personalizzate per memorizzare e organizzarsi meglio",
          "Metodo di gestione emotiva per affrontare verifiche e materie nuove con sicurezza"
        ],
        howWeWork: "Full immersion con docenti esperti, metodo personalizzato, supporto emotivo e risultati concreti.",
        whatYouGet: [
          "Voti più alti e maggiore fiducia",
          "Un rientro a scuola sereno e ben organizzato",
          "Meno stress per voi genitori e per i vostri figli"
        ],
        contact: "Si riparte con il piede giusto… e una marcia in più verso il successo scolastico!"
      }
    },
    {
      type: "laboratori",
      title: "SCOPRI I NUOVI LABORATORI BLOOM",
      subtitle: "Fai sbocciare il suo talento!",
      content: {
        description: "Pomeriggi per crescere, imparare e divertirsi! Laboratori per far sbocciare mente, cuore e creatività, rafforzando abilità scolastiche ed emotive.",
        laboratori: [
          {
            title: "Le Mie Mani Sono Magiche",
            description: "Colora, incolla, costruisci: le mani diventano bacchette magiche! Arte, pittura, riciclo creativo e materiali naturali per esprimersi sviluppando fantasia e manualità.",
            icon: "🎨"
          },
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
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="mb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 relative overflow-hidden">
        {/* Carousel Navigation */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-[#00A59B] text-white rounded-full flex items-center justify-center hover:bg-[#008C95] transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-[#00A59B] text-white rounded-full flex items-center justify-center hover:bg-[#008C95] transition-colors"
          >
            →
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#00A59B] w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Carousel Content */}
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 absolute top-0 left-0 translate-x-full'
              }`}
            >
              {slide.type === 'summer-sprint' ? (
                <SummerSprintContent slide={slide} />
              ) : (
                <LaboratoriContent slide={slide} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SummerSprintContent = ({ slide }) => {
  return (
    <div>
      <div className="text-center mb-8 relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00A59B]/20 rounded-full opacity-80 animate-bounce"></div>
        <div className="absolute -bottom-4 left-1/4 w-4 h-4 bg-orange-300 rounded-full opacity-70 animate-ping"></div>
        
        <div className="mb-4 relative">
          <div className="inline-block relative">
            <span className="text-4xl lg:text-6xl font-black text-orange-500 drop-shadow-lg">SUMMER</span>
          </div>
          <br />
          <span className="text-4xl lg:text-6xl font-black text-[#00A59B] drop-shadow-lg">FINAL SPRINT</span>
          <br />
          <p className="text-lg lg:text-xl font-medium text-gray-700 mt-4 leading-relaxed">
            {slide.content.description}
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <p className="text-xl font-medium text-gray-600">Dal 25 agosto</p>
          <div className="w-2 h-2 bg-[#00A59B] rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#00A59B]/10 to-[#008C95]/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#00A59B] mb-4">Cosa offriamo:</h3>
          <ul className="space-y-3">
            {slide.content.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#00A59B] text-xl">✔</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#00A59B]/20 rounded-xl p-6">
            <h4 className="font-semibold text-[#00A59B] mb-2">Come lavoriamo:</h4>
            <p className="text-gray-700">{slide.content.howWeWork}</p>
          </div>
          <div className="bg-white border border-[#00A59B]/20 rounded-xl p-6">
            <h4 className="font-semibold text-[#00A59B] mb-2">Cosa otterrete:</h4>
            <ul className="text-gray-700 space-y-1">
              {slide.content.whatYouGet.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-[#00A59B] to-[#008C95] text-white rounded-xl p-6">
          <p className="text-lg font-semibold mb-2">{slide.content.contact}</p>
          <p className="font-medium">Per maggiori info e iscrizioni chiamateci o scriveteci</p>
          <p className="text-xl font-bold">338 225 6056 - bloom@bloom-bi.it</p>
          <p className="text-red-200 font-bold mt-2">Posti limitati – Prenota ora</p>
        </div>
      </div>
    </div>
  );
};

const LaboratoriContent = ({ slide }) => {
  return (
    <div>
      <div className="text-center mb-8 relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-6 left-1/4 text-2xl animate-bounce">🌸</div>
        <div className="absolute -top-4 right-1/4 text-xl animate-pulse">✨</div>
        <div className="absolute top-1/2 -left-4 text-lg animate-spin">🌱</div>
        <div className="absolute top-1/2 -right-4 text-lg animate-pulse">🎨</div>
        
        <div className="relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 relative">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {slide.title}
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
          </h2>
          <p className="text-xl text-pink-500 font-semibold mb-2 animate-pulse">
            {slide.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
            <p className="text-gray-600">Da settembre - Per bambini dai 5 agli 11 anni</p>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {slide.content.description}
        </p>
        <div className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl p-4 mb-6 shadow-lg relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-2 left-2 text-2xl animate-bounce">🇬🇧</div>
            <div className="absolute bottom-2 right-2 text-xl animate-pulse">📚</div>
            <div className="absolute top-1/2 left-1/4 text-lg animate-spin">🎯</div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-2xl animate-pulse">🇬🇧</span>
            <p className="font-bold text-lg">Inglese integrato naturalmente in tutte le attività!</p>
            <span className="text-xl animate-bounce">✨</span>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {slide.content.laboratori.map((lab, index) => (
          <div key={index} className="group bg-gradient-to-br from-[#00A59B]/5 to-[#008C95]/5 rounded-xl p-6 border border-[#00A59B]/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#00A59B]/10 to-transparent rounded-bl-full"></div>
            
            {/* Animated icon */}
            <div className="text-3xl mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
              {lab.icon}
            </div>
            
            <h3 className="text-xl font-bold text-[#00A59B] mb-3 group-hover:text-[#008C95] transition-colors">
              {lab.title}
            </h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors">
              {lab.description}
            </p>
            
            {/* Hover effect line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00A59B] to-[#008C95] group-hover:w-full transition-all duration-300"></div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-[#00A59B] to-[#008C95] text-white rounded-xl p-6 text-center">
        <p className="text-lg font-semibold">In più: Tutti i giorni compiti e potenziamento cognitivo!</p>
      </div>
    </div>
  );
};

const StudentsSection = () => {
  return (
    <div className="mb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#00A59B] mb-6 text-center">
          PER STUDENTI DAGLI 11 AI 18 ANNI
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-[#00A59B]/10 to-[#008C95]/10 rounded-xl">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-[#00A59B] mb-3">Aula studio</h3>
            <p className="text-gray-700">Spazi accoglienti e supporto personalizzato durante tutto l'anno scolastico</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-[#00A59B]/10 to-[#008C95]/10 rounded-xl">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-[#00A59B] mb-3">Lezioni di gruppo e individuali</h3>
            <p className="text-gray-700">Potenziamento e approfondimenti mirati nelle diverse materie</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-[#00A59B]/10 to-[#008C95]/10 rounded-xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-[#00A59B] mb-3">Strategie di apprendimento</h3>
            <p className="text-gray-700">Metodo di studio su misura per ogni studente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OpenDaySection = () => {
  return (
    <div className="mb-16 animate-fade-in mt-10">
      <div className="bg-gradient-to-br from-[#00A59B] to-[#008C95] text-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">VIENI ALL'OPEN DAY!</h2>
        
        <div className="bg-white rounded-xl p-8 mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden border-l-4 border-[#00A59B]">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00A59B]/20 to-[#008C95]/20 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-[#008C95]/20 to-[#00A59B]/20 rounded-full translate-y-8 -translate-x-8"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-[#00A59B] rounded-full mr-3 animate-pulse"></div>
              <h3 className="text-4xl font-bold text-orange-500 text-center">AperiBloom Open Day!</h3>
              <div className="w-2 h-2 bg-[#008C95] rounded-full ml-3 animate-pulse"></div>
            </div>
            <p className="text-xl text-gray-700 mb-6 text-center font-semibold">Mercoledì 3 Settembre - ore 17:30</p>
            <div className="text-center">
              <a 
                href="https://bloom-one.odoo.com/event/open-day-bloom-bi-3/register" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-pink-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-[#008C95] transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl text-lg"
              >
                REGISTRATI QUI
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-lg mb-6 leading-relaxed">
          Un pomeriggio speciale per divertirti, scoprire le nostre attività e lasciarti sorprendere dalle novità che abbiamo preparato per te!
        </p>
        
        <div className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl p-4 mb-6 shadow-lg">
          <p className="font-bold text-lg">🎉 Partecipa all'Open Day e ricevi un buono sconto esclusivo da spendere sul tuo corso preferito!</p>
        </div>
        
        <p className="text-lg mb-6">
          Conferma la tua presenza scrivendoci nome e cognome via WhatsApp al 338 225 6056 oppure via email a bloom@bloom-bi.it
        </p>
        
        <p className="text-2xl font-bold">Ti aspettiamo!</p>
      </div>
    </div>
  );
};

const WhyBloomSection = () => {
  const services = [
    "Laboratori creativi",
    "Supporto e potenziamento nelle materie scolastiche per tutto l'anno",
    "Valutazioni e consulenze psicopedagogiche",
    "Metodo e supporto pedagogico per ADHD, DSA e BES",
    "Percorsi di mindfulness per adulti, individuali e di gruppo",
    "Progettazione di esperienze per scuole, associazioni e aziende"
  ];

  return (
    <div className="mb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#00A59B] mb-6 text-center">
          PERCHÉ SCEGLIERE BLOOM?
        </h2>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Cresciamo insieme con laboratori pensati per far sbocciare mente, cuore e creatività.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Spazi accoglienti dove studiare in autonomia, seguire lezioni di gruppo o percorsi personalizzati one-to-one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => (
            <div key={index} className="group p-6 bg-white border-2 border-[#00A59B]/20 rounded-xl hover:border-[#00A59B]/40 transition-all duration-300 hover:shadow-lg flex items-center justify-center min-h-[120px]">
              <p className="text-gray-700 leading-relaxed font-medium text-center">{service}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-xl font-medium text-[#00A59B]">
            Vola con noi verso un nuovo anno pieno di energia e scoperte!
          </p>
          <p className="text-lg font-bold text-[#00A59B]">
            Bloom, Fiorire nel tuo Spazio, col tuo Tempo
          </p>
          <p className="text-gray-700">
            Per info: 338 225 6056 - bloom@bloom-bi.it
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpenDayPage;

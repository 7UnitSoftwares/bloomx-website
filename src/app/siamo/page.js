"use client";
import Banner from "@/components/Banner";
import Collabration from "@/components/Collabration";
import Container from "@/components/Container";
import Eventcard from "@/components/Eventcard";
import SectionWithBackground from "@/components/SectionWithBackground";
import Teams from "@/components/Teams";
import { EventData } from "@/data/EventData";
import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';

const page = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToSection = () => {
      // Get the hash from the URL
      const hash = window.location.hash;
      console.log('Current hash:', hash);

      if (!hash) return;

      // Remove the # from the hash
      const id = hash.substring(1);
      console.log('Looking for element with id:', id);

      // Find the element
      const element = document.getElementById(id);
      console.log('Found element:', element);

      if (!element) return;

      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        console.log('Scrolling to element');
        const offset = 100; // Adjust this value to change the scroll offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    };

    // Scroll on initial load
    console.log('Initial load - pathname:', pathname);
    scrollToSection();

    // Scroll when the URL changes
    window.addEventListener('hashchange', (e) => {
      console.log('Hash changed:', e.newURL);
      scrollToSection();
    });

    return () => {
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, [pathname]); // Only re-run when pathname changes

  return (
    <section className="bg-[#F2F2F2] overflow-hidden">
      <SectionWithBackground
        title="Cosa è Bloom"
        description="Un luogo dove crescere e fiorire insieme. <br /> Percorsi educativi unici per valorizzare il potenziale di ognuno."
      />
      <div id="progetto">
        <Container>
          <div className="mt-16 lg:mt-10 mb-10">
            <h1 className="typography">Il progetto</h1>
            <div className="bg-[#F2F2F2]  flex flex-col-reverse lg:flex-row justify-center items-center lg:gap-16 mt-10">
              <span className="lg:text-xl text-[#373737] font- lg:leading-[1.5]">
                <p>Bloom è il Centro di Pedagogia Moderna che accompagna bambini, studenti, adulti e famiglie nel loro percorso di crescita personale e relazionale , dove si integra pedagogia, educazione emozionale e pratiche olistiche come mindfulness e YogaArt per creare esperienze di apprendimento profonde e trasformative. Ogni strumento che utilizziamo ha una forte valenza pedagogica, pensata per accompagnare le persone a riscoprire e attivare le proprie risorse interiori.</p>
                <br />
                <p>Aiutiamo i più piccoli a conoscersi, a gestire le emozioni e ad apprendere in modo efficace e sereno. Sosteniamo studenti nello studio e nell'autonomia, con strumenti pratici e motivanti. Affianchiamo gli adulti nel ritrovare i propri spazi, tempi e bisogni, attraverso percorsi di mindfulness e crescita intenzionale.</p>
                <br />
                <p>Siamo al fianco dei genitori con empatia e senza giudizio, offrendo uno spazio sicuro in cui sentirsi ascoltati, compresi e valorizzati nel loro ruolo educativo.</p>
                <br />
                <p><b>Ogni attività che proponiamo ha un solido fondamento pedagogico ed è pensata per aiutare le persone a riscoprire e attivare le proprie risorse interiori, in modo concreto, creativo e duraturo.</b></p>
              </span>
              <img src="/about/mission1.png" alt="" style={{ width: '30rem' }} />
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white ">
        <Container>
          <div className="flex p-5  py-10  items-center justify-center">
            {data.map((item, index) => (
              <div
                key={index}
                className="px-5 lg:px-28 flex flex-col justify-center items-center "
              >
                <div className="bg-[#EFFFFD] lg:p-3 p-1 rounded-full">
                  <img src={item.icon} className="max-w-24" alt="" />
                </div>
                <p className="lg:text-2xl font-normal text-[#00A59B] lg:leading-[40px]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div id="visione" className="mt-10 mb-10">
        <Container>
          <div>
            <h1 className="typography mt-10">La visione</h1>
            <div className="bg-[#F2F2F2]  flex flex-col mt-5 lg:flex-row justify-center items-center lg:gap-16 gap-5">
              <img src="/about/vision.png" alt="" style={{ width: '30rem' }} />

              <p className="lg:text-xl font-normal text-center lg:text-start text-[#373737] lg:leading-[1.5]">
              Un mondo dove <b>l’Apprendimento</b> diventa motore di trasformazione collettiva, dove ogni persona, bambino, studente, genitore o adulto, intraprende un viaggio di crescita autentica attraverso l’apprendimento condiviso e le esperienze che nutrono mente, cuore e talenti.<br /><br />
              Un percorso che guida ciascuno a realizzare pienamente il proprio potenziale, generando un impatto positivo che si espande dalla sfera personale a quella sociale.
              </p>
            </div>
          </div>
        </Container>
      </div>
      <div id="team">
        <Container>
          <Teams />
        </Container>
      </div>
      
      {/* NextGenerationEU Funding Section */}
      <div id="nextgenerationeu" className="bg-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header with EU Flag and Title */}
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0">
                <img 
                  src="/eu-logo.png" 
                  alt="Logo Unione Europea" 
                  className="h-20 w-auto"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">
                  Finanziato dall'Unione europea
                </h2>
                <p className="text-lg font-semibold text-[#1B1B1B] mb-1">
                  NextGenerationEU
                </p>
              </div>
            </div>

            {/* Beneficiary Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3">
                Nome del beneficiario
              </h3>
              <p className="text-2xl font-bold text-[#1B1B1B] mb-4">
                Giada Bono
              </p>
              
              <div className="mb-4">
                <p className="text-sm text-[#1B1B1B] mb-1">
                  <strong>Codice progetto:</strong> IFS0000002-0000419
                </p>
                <p className="text-sm text-[#1B1B1B] mb-1">
                  <strong>Bloom | Centro per l'apprendimento e la crescita</strong>
                </p>
                <p className="text-sm text-[#1B1B1B]">
                  <strong>Titolo del progetto:</strong> Fondo Impresa Femminile
                </p>
              </div>
            </div>

            {/* Project Objective */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1B1B1B] mb-4">
                Obiettivo principale dell'operazione
              </h3>
              <p className="text-[#1B1B1B] leading-relaxed">
                Promuovere la crescita e lo sviluppo di Bloom come centro di formazione e sostegno alla genitorialità, attraverso un sistema integrato di supporto digitale e fisico che accompagni i genitori nella crescita e nello sviluppo dei figli, potenziando l'impatto educativo e sociale mediante percorsi di formazione, mindfulness e supporto alla comunità.
              </p>
            </div>

            {/* European Commission Footer */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <img 
                src="/EuropeanCommission.jpg" 
                alt="European Commission" 
                className="h-20 w-auto"
              />
            </div>
          </div>
        </Container>
      </div>
      
      <Banner />
    </section>
  );
};

export default page;

const data = [
  {
    icon: "/about/icon1.png",
    title: "Ascolto",
  },
  {
    icon: "/about/icon2.png",
    title: "Valorizzazione",
  },
  {
    icon: "/about/icon3.png",
    title: "Accoglienza",
  },
];

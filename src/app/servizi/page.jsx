"use client";

import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function page() {
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

      // Function to attempt scrolling
      const attemptScroll = (attempts = 0) => {
        const element = document.getElementById(id);
        console.log('Found element:', element);
        
        if (!element) {
          // If element not found and we haven't tried too many times, try again
          if (attempts < 10) {
            console.log(`Attempt ${attempts + 1}: Element not found, retrying...`);
            setTimeout(() => attemptScroll(attempts + 1), 200);
          }
          return;
        }

        // Check if element is actually rendered and visible
        const rect = element.getBoundingClientRect();
        if (rect.height === 0) {
          if (attempts < 10) {
            console.log(`Attempt ${attempts + 1}: Element not rendered, retrying...`);
            setTimeout(() => attemptScroll(attempts + 1), 200);
          }
          return;
        }

        // Element is found and rendered, scroll to it
        console.log('Scrolling to element');
        const offset = 100;
        const elementPosition = rect.top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      };

      // Start the scroll attempt process
      attemptScroll();
    };

    // Scroll on initial load with a longer delay to ensure animations are complete
    console.log('Initial load - pathname:', pathname);
    setTimeout(scrollToSection, 500);

    // Scroll when the URL changes
    window.addEventListener('hashchange', (e) => {
      console.log('Hash changed:', e.newURL);
      scrollToSection();
    });

    return () => {
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, [pathname]);

  return (
    <section className="bg-[#F2F2F2]">
      <SectionWithBackground
        title="I Nostri Servizi"
        description="Trasformiamo l'apprendimento in un'esperienza viva e consapevole,<br /> dove ogni percorso è costruito su misura per valorizzare il potenziale unico di ciascuno."
      />
      <Container>
        <div className="lg:mt-10 mt-16 flex flex-col justify-center lg:gap-16 gap-5 items-center">
          {ServiceData.map((item, index) => (
            <div
              id={item.id}
              key={index}
              className={`flex justify-center items-center flex-col ${index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-5 lg:gap-20`}
            >
              <div className="bg-white p-3 border-[1px] rounded-3xl">
                <img src={item.icon} alt={item.title} style={{ width: '30rem' }} />
              </div>
              <div className="flex flex-col lg:w-1/2 lg:gap-7 gap-2">
                <p className="text-3xl font-semibold text-[#008C95] leading-[40px]">
                  {item.title}
                </p>
                <ul className="text-[#373737] space-y-2 list-disc pl-5">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc.replace("• ", "")}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto pt-16 ">
          <div className="mx-auto py-16 bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] rounded-2xl shadow-sm my-10">
            <div className="w-full flex flex-col items-center py-12 bg-white rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#008C95] mb-8 text-center">
              Il nostro processo di onboarding
              </h2>
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full max-w-5xl">
                {AccessData.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center relative w-64">
                    {/* Connector line */}
                    {idx !== 0 && (
                      <div className="hidden md:block absolute -left-8 top-8 w-8 h-1 bg-gradient-to-r from-[#008C95] to-[#00C2CB]"></div>
                    )}
                    {/* Step circle with icon/number */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg text-white font-bold text-2xl
                  ${idx === 0 ? 'bg-gradient-to-br from-[#F87171] to-[#FBBF24]' : ''}
                  ${idx === 1 ? 'bg-gradient-to-br from-[#34D399] to-[#3B82F6]' : ''}
                  ${idx === 2 ? 'bg-gradient-to-br from-[#FBBF24] to-[#F87171]' : ''}
                  ${idx === 3 ? 'bg-gradient-to-br from-[#3B82F6] to-[#34D399]' : ''}
                `}>
                      {idx + 1}
                    </div>
                    {/* Step content */}
                    <div className="bg-white rounded-xl p-4 shadow text-center border-l-4 border-[#008C95] flex-1 flex flex-col justify-start">
                      <h3 className="text-lg font-bold text-[#008C95] mb-1" dangerouslySetInnerHTML={{ __html: step.title }} />
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto pt-16 bg-gradient-to-b">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left Side - How it works */}
            <div className="md:w-1/2">
              <div className="sticky top-24">
                <h2 className="text-4xl font-bold text-[#008C95] mb-6 leading-tight">
                  Perché Scegliere Bloom
                </h2>

                <p className="text-[#333333] mb-10 text-lg">Con Bloom intraprendi un percorso formativo e trasformativo che mette al centro la tua unicità: un approccio personalizzato basato sulle neuroscienze, un supporto costante da parte di un team di esperti, e l'integrazione armoniosa di pedagogia e discipline olistiche. Un metodo pensato per guidarti verso una crescita consapevole, duratura e autentica.
                </p>

              </div>
            </div>

            {/* Right Side - Numbered Items */}
            <div className="md:w-2/3">
              {whyChooseBloom.map((item, index) => (
                <div key={index} className="flex mb-16 group">
                  <div className="mr-8 flex-shrink-0">
                    <div className="w-20 h-20 rounded-full border-3 border-[#008C95] bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
                      <span className="text-3xl font-bold text-[#008C95]">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#008C95] mb-3 group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h3>
                    <p className="text-[#454545] text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
      <Banner />
    </section>
  );
}

export default page;

const ServiceData = [
  {
    id: 'studio',
    title: "Percorsi di Studio",
    icon: "/service/service_1.jpg",
    description: [
      "• Metodo di Studio Individuale: Percorso personalizzato one-to-one per sviluppare il proprio metodo di studio efficace.",
      "• Metodo di Studio in Gruppo: Sessioni collaborative dove l'apprendimento si arricchisce attraverso il confronto.",
      "• Lezioni Individuali: Supporto mirato nelle materie specifiche, con approccio personalizzato.",
      "• Gruppi di Studio per Studenti: Spazi di apprendimento condiviso con tutor specializzati.",
    ],
  },
  {
    id: 'consulenza',
    title: "Consulenza e Assessment",
    icon: "/service/service_2.jpg",
    description: [
      "• Consulenza Pedagogica: Supporto professionale per genitori ed educatori.",
      "• Assessment: Valutazione completa dello stile di apprendimento e delle strategie di studio.",
    ],
  },
  {
    id: 'eventi',
    title: "Laboratori ed Eventi",
    icon: "/service/service_3.jpg",
    description: [
      "• Laboratori per Bambini (5-10 anni): Attività creative e sensoriali per sviluppare la curiosità, esplorare attraverso il gioco, scoprire il piacere dell'apprendimento, e coltivare mindfulness e consapevolezza.",
      "• Progettazione Custom: Eventi formativi per privati, percorsi dedicati per aziende, e programmi specifici per istituzioni scolastiche.",
    ],
  }
];

const AccessData = [
  {
    title: "Primo Incontro Conoscitivo",
    description:
      "Un momento dedicato per comprendere le tue esigenze e definire insieme il percorso più adatto.",
  },
  {
    title: "Flessibilità di Accesso",
    description:
      "Ingressi settimanali personalizzati con possibilità di scegliere tra 1, 2 o 3 incontri a settimana.",
  },
  {
    title: "Supporto <br /> Continuo",
    description:
      "Feedback costante sui progressi, rimandi periodici per monitorare l'andamento, comunicazione diretta con i genitori, e aggiornamenti regolari sul percorso.",
  },
  {
    title: "Modalità di Frequenza",
    description:
      "Percorsi continuativi per garantire risultati duraturi, pacchetti personalizzabili in base alle esigenze, e facilità di recupero lezioni perse.",
  },
];

const whyChooseBloom = [
  {
    title: "Approccio personalizzato basato sulle neuroscienze.",
    description:
      "Un metodo su misura che integra le neuroscienze per comprendere al meglio le tue esigenze, favorendo apprendimento e crescita consapevole attraverso strategie scientificamente validate.",
  },
  {
    title: "Team di professionisti specializzati.",
    description:
      "Un team di esperti qualificati, pronti a offrire competenze specializzate e un supporto mirato per guidarti con professionalità e dedizione nel tuo percorso di crescita.",
  },
  {
    title: "Supporto continuo nel percorso di apprendimento.",
    description:
      "Un accompagnamento costante con guide esperte e risorse dedicate per sostenerti in ogni fase del tuo percorso di apprendimento, garantendo crescita e sviluppo continuo.",
  },
  {
    title: "Le discipline olistiche, infuse di pedagogia, come strumenti di crescita consapevole.",
    description:
      "Un approccio che unisce discipline olistiche e pedagogia per favorire una crescita consapevole, armonizzando mente e corpo attraverso strumenti educativi e pratiche mirate.",
  },
];
const serviceImages = [
  { id: 1, src: "/service/image1.jpg", alt: "Servizio 1" },
  { id: 2, src: "/service/image2.jpg", alt: "Servizio 2" },
  { id: 3, src: "/service/image2.jpg", alt: "Servizio 3" },
  { id: 4, src: "/service/image2.jpg", alt: "Servizio 4" },
];

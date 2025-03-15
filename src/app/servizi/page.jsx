import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Apprendimento Personalizzato e Crescita Consapevole | Servizi di Bloom",
  description: "Scopri i servizi di Bloom: apprendimento personalizzato basato sulle neuroscienze, discipline olistiche e supporto continuo. Percorsi su misura per la tua crescita consapevole!",
};

function page() {
  return (
    <section className="bg-[#F2F2F2]">
      <SectionWithBackground
        title="I Nostri Servizi"
        description="Trasformiamo l'apprendimento in un'esperienza di crescita consapevole, <br /> dove ogni percorso è personalizzato per valorizzare il potenziale di ciascuno."
      />
      <Container>
        <div className="lg:mt-10 mt-16 flex flex-col justify-center lg:gap-16 gap-5 items-center">
          {ServiceData.map((item, index) => (
            <div
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
            <div className="mx-auto flex flex-col md:flex-row gap-12 px-6 max-w-7xl">
              {/* Left Side - Heading, Text and Image Grid */}
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#008C95] mb-4 relative">
                  Come Accedere ai Nostri Servizi
                  <span className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-[#008C95] to-[#00C2CB]"></span>
                </h2>

                <p className="text-gray-600 mb-8 max-w-md text-lg">
                  I nostri servizi sono progettati per essere accessibili e
                  personalizzati in base alle tue esigenze specifiche.
                </p>

                {/* Image Grid - 2x2 Layout */}
                <div className="grid grid-cols-2 gap-4 p-5">
                  {serviceImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative h-36 rounded-xl overflow-hidden shadow-md group transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Numbered Features */}
              <div className="md:w-1/2 mt-10 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {AccessData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#008C95] h-full"
                    >
                      <div className="flex  items-center mb-3">
                        <div className="flex  justify-center items-center w-12 h-12 rounded-full bg-gradient-to-r from-[#008C95] to-[#00C2CB] text-white shadow-md mr-3">
                          <span className="text-xl font-bold">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mt-2 pl-15">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
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

                <p className="text-[#333333] mb-10 text-lg">Approccio personalizzato basato sulle neuroscienze, discipline olistiche con pedagogia, supporto continuo e un team di esperti per una crescita consapevole.
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
    id: 1,
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
    id: 2,
    title: "Consulenza e Assessment",
    icon: "/service/service_2.jpg",
    description: [
      "• Consulenza Pedagogica: Supporto professionale per genitori ed educatori.",
      "• Assessment: Valutazione completa dello stile di apprendimento e delle strategie di studio.",
    ],
  },
  {
    id: 3,
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
    title: "Supporto Continuo",
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
    title: "Le discipline olistiche, infuse di pedagogia, come strumenti di crescita consapevole.",
    description:
      "Un approccio che unisce discipline olistiche e pedagogia per favorire una crescita consapevole, armonizzando mente e corpo attraverso strumenti educativi e pratiche mirate.",
  },
  {
    title: "Supporto continuo nel percorso di apprendimento.",
    description:
      "Un accompagnamento costante con guide esperte e risorse dedicate per sostenerti in ogni fase del tuo percorso di apprendimento, garantendo crescita e sviluppo continuo.",
  },
  {
    title: "Team di professionisti specializzati.",
    description:
      "Un team di esperti qualificati, pronti a offrire competenze specializzate e un supporto mirato per guidarti con professionalità e dedizione nel tuo percorso di crescita.",
  },
];
const serviceImages = [
  { id: 1, src: "/service/image1.jpg", alt: "Servizio 1" },
  { id: 2, src: "/service/image2.jpg", alt: "Servizio 2" },
  { id: 3, src: "/service/image2.jpg", alt: "Servizio 3" },
  { id: 4, src: "/service/image2.jpg", alt: "Servizio 4" },
];

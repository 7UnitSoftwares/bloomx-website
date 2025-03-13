import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Our Services",
  description: "Bloom Services",
};

function page() {
  return (
    <section className="bg-[#F2F2F2]">
      <SectionWithBackground
        title="I Nostri Servizi ✨"
        description="Trasformiamo l'apprendimento in un'esperienza di crescita consapevole, dove ogni percorso è personalizzato per valorizzare il potenziale di ciascuno."
      />
      <Container>
        <div className="lg:mt-10 mt-16 flex flex-col justify-center lg:gap-16 gap-5 items-center">
          {ServiceData.map((item, index) => (
            <div
              key={index}
              className={`flex justify-center items-center flex-col ${
                index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-5 lg:gap-20`}
            >
              <div className="bg-white p-3 border-[1px] rounded-3xl">
                <img src={item.icon} alt={item.title} />
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
          <div className="mx-auto py-16 bg-gradient-to-b from-[#f8fdfd] to-[#F2F2F2] rounded-2xl shadow-sm my-10">
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
      </Container>
      <Banner />
    </section>
  );
}

export default page;

const ServiceData = [
  {
    id: 1,
    title: "🎯 Percorsi di Studio",
    icon: "/service/icon1.png",
    description: [
      "• Metodo di Studio Individuale: Percorso personalizzato one-to-one per sviluppare il proprio metodo di studio efficace.",
      "• Metodo di Studio in Gruppo: Sessioni collaborative dove l'apprendimento si arricchisce attraverso il confronto.",
      "• Lezioni Individuali: Supporto mirato nelle materie specifiche, con approccio personalizzato.",
      "• Gruppi di Studio per Studenti: Spazi di apprendimento condiviso con tutor specializzati.",
    ],
  },
  {
    id: 2,
    title: "👥 Consulenza e Assessment",
    icon: "/service/icon2.png",
    description: [
      "• Consulenza Pedagogica: Supporto professionale per genitori ed educatori.",
      "• Assessment: Valutazione completa dello stile di apprendimento e delle strategie di studio.",
    ],
  },
  {
    id: 3,
    title: "🌟 Laboratori ed Eventi",
    icon: "/service/icon3.png",
    description: [
      "• Laboratori per Bambini (5-10 anni): Attività creative e sensoriali per sviluppare la curiosità, esplorare attraverso il gioco, scoprire il piacere dell'apprendimento, e coltivare mindfulness e consapevolezza.",
      "• Progettazione Custom: Eventi formativi per privati, percorsi dedicati per aziende, e programmi specifici per istituzioni scolastiche.",
    ],
  },
  {
    id: 4,
    title: "✨ Perché Scegliere Bloom",
    icon: "/service/icon4.png",
    description: [
      "• Approccio personalizzato basato sulle neuroscienze.",
      "• Le discipline olistiche, infuse di pedagogia, come strumenti di crescita consapevole.",
      "• Supporto continuo nel percorso di apprendimento.",
      "• Team di professionisti specializzati.",
    ],
  },
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
const serviceImages = [
  { id: 1, src: "/service/image1.jpg", alt: "Servizio 1" },
  { id: 2, src: "/service/image2.jpg", alt: "Servizio 2" },
  { id: 3, src: "/service/image2.jpg", alt: "Servizio 3" },
  { id: 4, src: "/service/image2.jpg", alt: "Servizio 4" },
];

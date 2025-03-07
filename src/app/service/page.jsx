import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
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
                <div className="text-[#373737] lg:text-xl space-y-2">
                  {item.description.map((desc, i) => (
                    <p key={i}>{desc}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center text-[#008C95]">
            📅 Come Accedere ai Nostri Servizi
          </h2>
          <div className="mt-6 space-y-4">
            {AccessData.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#008C95]">
                  {item.title}
                </h3>
                <p className="text-[#373737] mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-6 py-3 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Parliamone Insieme
          </a>
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

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
                <ul className="text-[#373737] lg:text-xl space-y-2 list-disc pl-5">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc.replace("• ", "")}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto pt-16 bg-gradient-to-b">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left Side - How it works */}
            <div className="md:w-1/2">
              <div className="sticky top-24">
                <h2 className="text-4xl font-bold text-[#008C95] mb-6 leading-tight">
                  Come Accedere ai Nostri Servizi
                </h2>

                <p className="text-[#333333] mb-10 text-lg">
                  I nostri servizi sono progettati per essere accessibili e
                  personalizzati in base alle tue esigenze specifiche.
                </p>

                <button className="bg-[#008C95] hover:bg-[#007A82] transition-colors text-white px-8 py-3 font-medium rounded-md shadow-md hover:shadow-lg flex items-center gap-2">
                  Scopri di più
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side - Numbered Items */}
            <div className="md:w-2/3">
              {AccessData.map((item, index) => (
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

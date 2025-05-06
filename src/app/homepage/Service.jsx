"use client";

import Container from "@/components/Container";
import Carousel from "@/components/CrouselR";

const Services = () => {
  return (
    <div
      id="service"
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-20"
    >
      <h1 className="typography text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
        I Nostri Servizi
      </h1>
      <p className="text-center mb-8 md:mb-12 text-base md:text-lg lg:text-xl font-medium text-[#808080] max-w-3xl mx-auto">
        Trasformiamo lo studio in un'esperienza di crescita personale e
        consapevole.
        <br className="hidden sm:block" /> Ogni percorso è pensato su misura per
        valorizzare davvero il potenziale unico di ogni persona.
      </p>
      <div className="w-full">
        <Carousel data={data} />
      </div>
    </div>
  );
};

export default Services;

const data = [
  {
    title: "Impara ad apprendere, scopri il tuo metodo.",
    image: "/service/service_1.jpg",
    description:
      "Offriamo percorsi personalizzati e collaborativi per sviluppare un metodo di studio efficace e duraturo. Scegli il supporto individuale o il lavoro in gruppo, in un ambiente stimolante e accogliente.",
  },
  {
    title: "Capire per guidare meglio. Crescere insieme.",
    image: "/service/service_2.jpg",
    description:
      "Offriamo supporto pedagogico mirato per genitori, educatori e insegnanti. Attraverso valutazioni personalizzate dello stile di apprendimento e delle strategie di studio, aiutiamo a individuare punti di forza, bisogni specifici e percorsi efficaci per favorire il successo scolastico ed educativo. <br/><br/><b>Perché ogni bambino ha bisogno di essere compreso, prima ancora che aiutato.</b>",
  },
  {
    title: "Laboratori ed Eventi",
    image: "/service/service_3.jpg",
    description:
      "<b>Esperienze che accendono la curiosità, la creatività e la crescita.</b> <br/><br/> Dai laboratori creativi per bambini ai percorsi formativi personalizzati per privati, aziende e scuole: ogni attività è progettata per stimolare l'apprendimento, favorire la consapevolezza e lasciare un segno positivo e duraturo. <br/><br/><b>Impara, esplora, crea. Con Bloom, ogni evento è un'occasione per crescere.</b>",
  },
];

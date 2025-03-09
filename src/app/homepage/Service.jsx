"use client";

import Container from "@/components/Container";
import Carousel from "@/components/CrouselR";

const Services = () => {
  return (
    <div id="service" className=" mx-5 lg:mx-28">
      <h1 className="typography lg:pt-20 mt-10">I Nostri Servizi</h1>
      <p className="text-center lg:mt-10 mt-2 lg:text-xl font-medium text-[#808080]">
      Trasformiamo l'apprendimento in un'esperienza di crescita consapevole,<br /> dove ogni percorso è personalizzato per valorizzare il potenziale di ciascuno.
      </p>
      <div className="px-28 mt-10">
       <Carousel data={data} />
      </div>
    </div>
  );
};

export default Services;

const data = [
  {
    title: "Percorsi di Studio",
    image: "/service/service_1.jpg",
    description:
      "Potenzia il tuo percorso accademico con risorse educative, mentoring e  attività che ti aiutano a scoprire nuove possibilità e a raggiungere i tuoi  obiettivi.",
  },
  {
    title: "Consulenza e Assessment",
    image: "/service/service_2.jpg",
    description:
      "Potenzia il tuo percorso accademico con risorse educative, mentoring e  attività che ti aiutano a scoprire nuove possibilità e a raggiungere i tuoi  obiettivi.",
  },
  {
    title: "Laboratori ed Eventi",
    image: "/service/service_3.jpg",
    description:
      "Potenzia il tuo percorso accademico con risorse educative, mentoring e  attività che ti aiutano a scoprire nuove possibilità e a raggiungere i tuoi  obiettivi.",
  },
];

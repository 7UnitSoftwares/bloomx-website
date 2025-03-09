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
    description: "Percorsi personalizzati e collaborativi per sviluppare un metodo di studio efficace, con supporto individuale o in gruppo.",
  },
  {
    title: "Consulenza e Assessment",
    image: "/service/service_2.jpg",
    description: "Supporto pedagogico per genitori ed educatori con valutazioni personalizzate sullo stile di apprendimento e le strategie di studio.",
  },
  {
    title: "Laboratori ed Eventi",
    image: "/service/service_3.jpg",
    description: "Attività creative per bambini e percorsi formativi personalizzati per privati, aziende e scuole, favorendo apprendimento e consapevolezza.",
  },
];

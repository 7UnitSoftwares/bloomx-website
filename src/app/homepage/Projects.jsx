import Container from "@/components/Container";
import React from "react";

const Data = [
  {
    icon: "/project/icon1.png",
    title: "Ascolto",
  },
  {
    icon: "/project/icon2.png",
    title: "Valorizzazione",
  },
  {
    icon: "/project/icon3.png",
    title: "Accoglienza",
  },
];
const Projects = () => {
  return (
    <div id="projects" className=" bg-[#F2F2F2] pb-16">
      <Container>
        <h1 className="typography pt-16"> Nostro Progetto</h1>
        <p className="text-center lg:mt-10 mt-2  lg:text-xl font-normal text-[#808080]">
          Bloom è un centro di pedagogia, un&apos;oasi dove persone di tutte le
          età possono <br /> fiorire attraverso esperienze trasformative di
          apprendimento, cocreazione, e comunità.
        </p>
        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center mt-7">
          <div className="lg:w-1/2">
            <span className="lg:text-xl text-[#373737] font- lg:leading-10">
              Nato per migliorare il dinamismo umano e ristabilire legami
              intergenerazionali, Bloom offre uno spazio sicuro per
              l&apos;esplorazione e la sperimentazione, libero da giudizi.
              Promuove la creazione di comunità e funge da catalizzatore per la
              co-creazione, supportando ogni Bloomer nel proprio percorso di
              crescita continua.
            </span>
          </div>
          <div className="flex justify-center items-center lg:w-1/2">
            <img src="/project/project.png" className="" alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Projects;
 

{
  /* <div className="flex flex-col lg:flex-row justify-cente gap-12 mt-10">
        <div className="lg:w-1/2">
          <h1 className="text-xl font-semibold">Missione: </h1>
          <div className="flex gap-10">
            {Data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 items-center mt-5"
              >
                <img src={item.icon} className="h-14" alt="" />
                <span className="text-xl font-semibold">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 text-2xl p-3 font-normal">
          <p>
            Bloom è una palestra per la mente e l'anima, dove ogni individuo può
            fiorire e raggiungere il suo pieno potenziale
          </p>
        </div>
      </div> */
}
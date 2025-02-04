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
        <h1 className="typography pt-16">Cosa è Bloom</h1>
        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center mt-7">
          <div className="lg:w-1/2">
            <span className="lg:text-xl text-[#373737] font- lg:leading-[1.5]">
              <p>Bloom è un centro di pedagogia moderna che accompagna le persone nel loro percorso di vita. Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e apprendere in modo efficace. Supportiamo gli adulti a riappropriarsi dei loro spazi e tempi, attraverso mindfulness e crescita intenzionale. Affianchiamo i genitori con comprensione e senza giudizio, creando uno spazio dove sentirsi accolti e supportati nel loro ruolo educativo.</p>
              <br/>
              <p>Bloom integra pedagogia, educazione emozionale e pratiche olistiche come mindfulness e YogaArt per creare esperienze di apprendimento profonde e trasformative. Ogni strumento che utilizziamo ha una forte valenza pedagogica, pensata per accompagnare le persone a riscoprire e attivare le proprie risorse interiori.</p>
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
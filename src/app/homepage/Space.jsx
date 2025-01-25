
"use client";
import Carousel from "@/components/Carousel";
import Container from "@/components/Container";
import React from "react";


const images = [
  {
    id: 1,
    src: "/space/icon1.jpg",
  },
  {
    id: 2,
    src: "/space/icon2.jpg",
  },
  {
    id: 3,
    src: "/space/icon3.jpg",
  },
  {
    id: 4,
    src: "/space/icon4.jpg",
  },
  {
    id: 5,
    src: "/space/icon5.jpg",
  },
  {
    id: 6,
    src: "/space/icon6.jpg",
  },
  {
    id: 7,
    src: "/space/icon7.jpg",
  },
  {
    id: 8,
    src: "/space/icon8.jpg",
  },
  {
    id: 9,
    src: "/space/icon9.jpg",
  },
];
const Space = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Container>
          <div id="space" className="px-5 md:px-28 pb-16">
            <h1 className="typography pt-16"> Nostro Spazio</h1>
            <p className="text-center  lg:mt-5 mt-2  lg:text-xl font-light text-[#808080] ">
              Un Rifugio per la Crescita e la Creatività
            </p>
            <p className="font- lg:text-xl text-[#373737] lg:leading-10 lg:text-center mt-3">
              Situato nel cuore di Biella, Bloom offre oltre 200 metri quadrati
              di spazio versatile e luminoso, progettato per ispirare e nutrire.
              Che tu sia qui per studiare, partecipare a workshop o attività
              olistiche, il nostro ambiente si adatta alle tue esigenze. Ogni
              stanza è dotata di materiali creativi, libri e giochi per
              stimolare l’esplorazione e la sperimentazione. A Bloom, lo spazio
              non è solo un contesto è un catalizzatore per la connessione,
              l’apprendimento e la crescita personale
            </p>
          </div>
          <div className="mt-16">
            <Carousel images={images} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Space;

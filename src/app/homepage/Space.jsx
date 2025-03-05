
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
            <h1 className="typography pt-16">Lo  Spazio</h1>
            <p className="text-center  lg:mt-5 mt-2  lg:text-xl font-light text-[#808080] ">
              Tutto ciò di cui hai bisogno per il tuo benessere e la tua crescita
            </p>
            <p className="font- lg:text-xl text-[#373737] leading-[1.5] lg:text-center mt-3">
            Un posto per tutti Bloom è il tuo spazio tra casa e impegni quotidiani: un ambiente accogliente dove puoi essere te stesso, rilassarti, imparare e crescere nei tuoi tempi e modi. Qui troverai tutto ciò di cui hai bisogno per nutrire la tua mente, il tuo corpo e la tua creatività, in un'atmosfera che ti fa sentire a casa.
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

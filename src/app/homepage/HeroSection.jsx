import React from "react";

const HeroSection = () => {
  return (
    <section className="flex lg:flex-row lg:min-h-screen 2xl:max-h-full mx-auto flex-col-reverse w-screen lg:justify-between justify-center items-center gap-5 lg:gap-0 xl:px-28 max-w-screen-2xl">
      <div className="lg:px-16 px-5 flex flex-col gap-5 lg:gap-10">
        <h1 className="text-[#00A59B] text-center lg:text-start text-2xl lg:text-6xl">
          FIORIRE NEL TUO <br/><b>SPAZIO</b>, <br/> COL TUO <br/><b>TEMPO</b>.
        </h1>
        <p className="text-[#1B1B1B] lg:text-2xl font-medium text-center lg:text-start">
          Bloom è un centro di pedagogia moderna che accompagna le persone nel loro percorso di vita. <br/>Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e apprendere in modo efficace. 
        </p>
        <div className="flex lg:gap-7 gap-5 justify-center lg:justify-start mb-10">
          <button className="bg-[#00A59B] text-white px-3 py-2 lg:px-6 lg:py-2 rounded-lg mt-4">
            Consultazione libri
          </button>
          <button className="bg-transparent border-[3px] border-[#8bc6c2] font-semibold text-[#005E64] px-3 py-2 lg:px-6 lg:py-2 rounded-lg mt-4">
            Scopri di più
          </button>
        </div>
      </div>

      <div className="lg:flex hidden">
        <img src="/home/hero1.png" alt="" />
      </div>
      <div className="block lg:hidden mt-10">
        <img src="/home/hero_mobile.png" alt="" />
      </div>
    </section>
  );
};

export default HeroSection;

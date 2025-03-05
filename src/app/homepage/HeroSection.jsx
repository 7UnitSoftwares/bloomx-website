import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex lg:flex-row lg:min-h-screen 2xl:max-h-full mx-auto flex-col-reverse w-full lg:justify-between justify-center items-center gap-5 lg:gap-0 xl:px-28 max-w-screen-2xl">
      <div className="lg:px-16 lg:w-1/2 px-5 flex flex-col gap-5 lg:gap-10 lg:max-w-[55%]">
        <h1 className="text-[#00A59B] text-center lg:text-start text-2xl lg:text-5xl font-medium">
          FIORIRE NEL TUO <br />
          <span className="font-bold">SPAZIO</span>, <br /> COL TUO <br />
          <span className="font-bold">TEMPO</span>.
        </h1>
        <p className="text-[#1B1B1B] lg:text-2xl font-medium text-center lg:text-start">
          Bloom è un centro di pedagogia moderna che accompagna le persone nel
          loro percorso di vita. <br className="hidden lg:block" />
          Aiutiamo bambini e studenti a conoscersi meglio, gestire le emozioni e
          apprendere in modo efficace.
        </p>
        <div className="flex lg:gap-7 gap-5 justify-center lg:justify-start mb-10">
          <Link href="/books">
            <button className="bg-[#00A59B] text-white px-5 py-3 lg:px-8 lg:py-3 rounded-lg font-medium transition-all hover:bg-[#008b82] active:scale-95">
              Consultazione libri
            </button>
          </Link>
          <Link href="/about">
            <button className="bg-transparent border-[3px] border-[#8bc6c2] font-semibold text-[#005E64] px-5 py-3 lg:px-8 lg:py-3 rounded-lg transition-all hover:bg-[#f0f9f8] active:scale-95">
              Scopri di più
            </button>
          </Link>
        </div>
      </div>

      <div className="lg:block hidden relative w-1/2 h-[85vh]">
        <Image
          src="/home/hero1.png"
          alt="Bloom - Centro di pedagogia moderna"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{
            objectFit: "contain",
            objectPosition: "right center",
          }}
        />
      </div>

      <div className="block lg:hidden mt-10 relative w-full h-[40vh]">
        <Image
          src="/home/hero_mobile.png"
          alt="Bloom - Centro di pedagogia moderna"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;

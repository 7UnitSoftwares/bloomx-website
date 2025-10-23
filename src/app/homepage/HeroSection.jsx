import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = ({ onBannerClick }) => {

  return (
    <section className="flex lg:flex-row lg:min-h-screen 2xl:max-h-full mx-auto flex-col-reverse w-full lg:justify-between justify-center items-center gap-5 lg:gap-0 xl:px-28 max-w-screen-2xl">
      <div className="lg:px-16 lg:w-1/2 px-5 flex flex-col gap-5 lg:gap-10 lg:max-w-[55%]">
        <h1 className="text-[#00A59B] text-center lg:text-start text-2xl lg:text-5xl font-medium">
          FIORIRE NEL TUO <br />
          <span className="font-bold">SPAZIO</span>, <br /> COL TUO <br />
          <span className="font-bold">TEMPO</span>.
        </h1>
        <p className="text-[#1B1B1B] lg:text-2xl font-medium text-center lg:text-start">Bloom è un centro dedicato alla crescita e all’apprendimento che accompagna bambini, ragazzi e famiglie nel loro percorso di sviluppo.
          <br className="hidden lg:block" /><br className="hidden lg:block" />
          Li aiutiamo a conoscersi meglio, a gestire le emozioni e ad apprendere in modo più sereno, efficace e consapevole.</p>
        {/* EU Funding Banner */}
        <div className="w-full flex justify-start">
          <div 
            className="relative w-full max-w-md h-16 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={onBannerClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onBannerClick();
              }
            }}
            aria-label="Clicca per visualizzare il documento di finanziamento EU"
          >
            <Image
              src="/NextGenerationEU.jpg"
              alt="Finanziato dall'Unione europea - NextGenerationEU"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </div>
        </div>
        <div className="flex lg:gap-7 gap-5 justify-center lg:justify-start mb-10">
          <Link href="/siamo">
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

import React from "react";

const HeroSection = () => {
  return (
    <section className="flex lg:flex-row lg:min-h-screen 2xl:max-h-full mx-auto flex-col-reverse w-screen lg:justify-between justify-center items-center gap-5 lg:gap-0 xl:px-28 max-w-screen-2xl">
      <div className="lg:px-16 px-5 flex flex-col gap-5 lg:gap-10">
        <h1 className="text-[#00A59B] text-center lg:text-start text-2xl lg:text-6xl font-bold ">
          Bloom in Your Space <br /> in Your Time
        </h1>
        <p className="text-[#1B1B1B] lg:text-2xl font-medium text-center lg:text-start">
          An oasis of pedagogy where you can <br /> flourish at any age through{" "}
          <br />
          transformative experiences of <br /> learning, co-creation, and
          community.
        </p>
        <div className="flex lg:gap-7 gap-5 justify-center lg:justify-start mb-10">
          <button className="bg-[#00A59B] text-white px-3 py-2 lg:px-6 lg:py-2 rounded-lg mt-4">
            Register Now
          </button>
          <button className="bg-transparent border-[3px] border-[#8bc6c2] font-semibold text-[#005E64] px-3 py-2 lg:px-6 lg:py-2 rounded-lg mt-4">
            Learn More
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

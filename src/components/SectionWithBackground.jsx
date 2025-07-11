import React from "react";

const SectionWithBackground = ({ title, description }) => {
  return (
    <section className="bg-[#F2F2F2]">
      <div className="relative bg-[#008C95] w-full overflow-hidden flex flex-col items-center justify-center lg:gap-10 pt-20 ">
        {/* Grid Lines */}
        <div className="absolute inset-0 z-0 bg-grid opacity-100"></div>

        {/* Main Content */}
        <div className="relative flex items-center px-8 py-4 mt-8 z-20">
          <img
            src="/main.png"
            alt="Decorative Lines"
            className="absolute w-10 -ml-1 lg:w-auto lg:left-2 mb-10 -translate-x-1/2 z-10"
          />
          <div className="flex flex-col z-30">
            <p className="heading" dangerouslySetInnerHTML={{ __html: title }}></p>
          </div>
        </div>

        {/* Subheading text with line breaks */}
        <div className="z-30 pb-20">
          <p className="sub-heading text-white">
            {description.split("<br />").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        {/* Bottom Triangle Effect */}
        <div
          className="absolute bottom-0 left-0 w-1/2 h-24 bg-[#F2F2F2]"
          style={{
            clipPath: "polygon(0% 0%, 100% 100%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-1/2 h-24 bg-[#F2F2F2]"
          style={{
            clipPath: "polygon(0% 100%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        ></div>
      </div>
    </section>
  );
};

export default SectionWithBackground;

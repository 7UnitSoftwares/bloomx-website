import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import { ServiceData } from "@/data/ServiceData";
import React from "react";


export const metadata = {
  title: "Our Services",
  description: "Bloom Services",
};
function page() {
  return (
    <section className="bg-[#F2F2F2] ">
      <SectionWithBackground
        title="Explore Our Services"
        description="We offer personalized services designed to help <br /> you grow,
            learn, and create"
      />
      <Container>
        <div className="lg:mt-10 mt-16  flex flex-col justify-center lg:gap-16 gap-5 items-center">
          {ServiceData.map((item, index) => (
            <div
              key={index}
              className={`flex justify-center items-center flex-col ${
                index % 2 == 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              }  gap-5 lg:gap-20`}
            >
              <div className="bg-white p-3 border-[1px] rounded-3xl">
                <img src={item.icon} alt="" />
              </div>
              <div className="flex flex-col lg:w-1/2 lg:gap-7 gap-2">
                <p className="text-3xl font-semibold text-[#008C95] leading-[40px]">
                  {item.title}
                </p>
                <span className="text-[#373737] lg:text-xl">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Banner />
    </section>
  );
}

export default page;

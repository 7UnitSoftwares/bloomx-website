import Banner from "@/components/Banner";
import Container from "@/components/Container";
import GlimpseSection from "@/components/GlimpseSection";
import SectionWithBackground from "@/components/SectionWithBackground";
import SpaceCard from "@/components/SpaceCard";
import { SpaceData, SpacewhyData } from "@/data/SpaceData";
import Image from "next/image";

export const metadata = {
  title: "Our Space",
  description: "Bloom Community",
};

const page = () => {
  return (
    <section className="bg-[#F2F2F2] overflow-hidden">
      <SectionWithBackground
        title="Our Space"
        description="Join us for exciting activities that promote growth,
            <br /> learning, and creativity"
      />
      <Container>
        <h1 className="lg:text-5xl text-2xl mt-5 font-semibold text-[#00A59B] lg:mt-10 text-start">
          Take a Look Inside👀
        </h1>
        <div className="flex flex-wrap mt-5 lg:mt-10 gap-5">
          {SpaceData.map((item, index) => {
            return <SpaceCard key={index} item={item} />;
          })}
        </div>
      </Container>
      <div className="bg-white mt-10">
        <h1 className="typography pt-10">Why Choose Our Space?</h1>
        <div className="flex flex-wrap lg:mt-16 mt-5 justify-center items-center lg:gap-10 gap-5 lg:px-36 mx-auto">
          {SpacewhyData.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-5"
              >
                <div className="bg-[#EFFFFD] lg:p-5 p-2 rounded-full w-12 lg:w-auto">
                  <Image src={item.src} alt="" height={50} width={50} />
                </div>
                <div className="flex mb-10">
                  <h1 className="lg:text-2xl text-sm font-normal text-[#00A59B]">
                    {item.title}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <GlimpseSection />
      <Banner />
    </section>
  );
};

export default page;

import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import { NetworkData } from "@/data/Network";
import Image from "next/image";

export const metadata = {
  title: "Bloom Network",
  description: "Bloom Network",
};

const page = () => {
  return (
    <section className="bg-[#F2F2F2] min-h-screen overflow-hidden">
      <SectionWithBackground
        title="Our Network"
        description="We collaborate with leading institutions,<br /> schools impactful projects."
      />
      <Container>
        <h1 className="typography mt-5 lg:mt-10">Our networks</h1>
        <p className="text-center lg:mt-10 mt-2 lg:text-xl font-normal text-[#808080]  ">
          We collaborate with leading institutions, schools, and companies to
          nurture creativity, inspire learning, and foster growth. Our
          partnerships create opportunities for shared knowledge and impactful
          projects.
        </p>
        <div className="grid lg:grid-cols-3 grid-cols-1 mt-10 lg:mt-16 gap-5 lg:gap-10">
          {NetworkData.map((item, index) => {
            return (
              <div
                key={index}
                className="flex bg-white rounded-xl flex-col justify-center items-center gap-5"
              >
                <div className="rounded-full w-full  ">
                  <Image src={item.icon} alt="" height={300} width={500} />
                </div>
                <div className="flex flex-col justify-center gap-5 items-start  p-3">
                  <h1 className="text-2xl font-semibold text-black ">
                    {item.title}
                  </h1>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col lg:flex-row gap-3 mt-10 lg:mt-16">
          <div className="lg:basis-2/3 flex justify-between p-3 bg-white rounded-xl items-center gap-5 lg:gap-0">
            <div className="flex  flex-col justify-center lg:p-10 lg:gap-10 gap-1">
              <p className="text-[#008C95] font-semibold">Bloom&apos;s Network</p>
              <h1 className="lg:text-4xl text-lg font-semibold ">
                Our network is a <br /> ecosystem of partnerships <br /> and
                collaborations
              </h1>
              <p className="font-medium text-sm lg:text-lg">
                Connecting Minds, Expanding Horizons
              </p>
            </div>

            <div>
              <Image
                src="/network/icon.png"
                alt="network"
                width={500}
                height={200}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl lg:basis-1/3 p-5 flex flex-col justify-center items-start gap-10 ">
            {Data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex  flex-col justify-center items-start gap-1"
                >
                  <h1 className="text-3xl font-semibold text-[#008C95] ">
                    {item.title}
                  </h1>
                  <p className="ml-3 text-lg font-medium">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <Banner />
    </section>
  );
};

export default page;

const Data = [
  {
    id: 1,
    title: "+150",
    desc: "Students benift",
  },
  {
    id: 2,
    title: "+50",
    desc: "Associations collaborated",
  },
  {
    id: 3,
    title: "+100",
    desc: "Companies partnered",
  },
];

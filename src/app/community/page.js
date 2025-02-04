import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import { CommunityData } from "@/data/CommunityData";
import Image from "next/image";

export const metadata = {
  title: "Bloom Community",
  description: "Bloom Community",
};

const page = () => {
  return (
    <section className="bg-[#F2F2F2] min-h-screen overflow-hidden">
      <SectionWithBackground
        title="Le nostre community"
        description="In Bloom trovi tutto ciò che serve per <br />il tuo benessere e la tua crescita"
      />
      <Container>
        <div class={`flex  flex-col mt-16 lg:mt-10 gap-16 justify-center items-center `}>
          {CommunityData.map((item, index) => {
            return (
              <div
                key={index}
                id={item.section}
                className={`flex ${
                  index % 2 == 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } lg:gap-20 gap-2 rounded-xl justify-center  flex-col items-center`}
              >
                <div
                  className={`flex flex-col justify-center items-start gap-5 p-7 `}
                >
                  <img
                    src={item.icon}
                    className="object-contain w-full h-full"
                    alt=""
                  />
                  <div>
                    <h1 className="text-3xl font-semibold text-[#00A896] text-center ">
                      {item.title}
                    </h1>
                  </div>
                </div>
                <div className="flex  justify-center items-start  gap-5  ">
                  <p className="text-[#373737] text-center lg:text-start  text-2xl font-normal ">
                    {item.desc}
                    <br/><br/>
                    {item.meeting?.length > 0? <p className="text-xl"><i>Quando ci Incontriamo:</i> <b>{item.meeting}</b></p>:<></>}
                    {item.howitworks?.length > 0? <p className="text-xl">
                    {item.section === "Women" && <i>Le Nostre Esperienze:</i>}
                    {item.section === "Parents" && <i>Cosa Offriamo:</i>}
                    {(item.section === "Buds" || item.section === "Students") && <i>Come Funziona:</i>}
                    <ul style={{listStyle:'disc', marginLeft:'20px'}}>
                      {item.howitworks?.map((i, index) => (
                        <li key={index} className="text-xl">{i}</li>
                      ))}
                    </ul>
                    </p>:<></>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <Banner />
    </section>
  );
};

export default page;

{
  /* <div
        style={{ backgroundImage: `url('/background.png')` }}
        className={` h-[59vh]  bg-no-repeat w-screen bg-cover  bg-top flex flex-col gap-10 items-center`}
      >
        <div className="pt-28 relative flex items-center px-8 py-4 mt-8">
          <img
            src="/main.png" // Replace with the actual path to your side image
            alt="Decorative Lines"
            className="absolute left-2 mb-10 -translate-x-1/2 "
          />
          <p className="heading"></p>
        </div>
        <div className="flex">
          <Image src="/sign.png" alt="sign" width={350} height={100} />
        </div>
      </div>*/
}

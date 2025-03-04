"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import { CommunityData } from "@/data/CommunityData";

// export const metadata = {
//   title: "Bloom Community",
//   description: "Bloom Community",
// };

const CommunityPage = () => {
  return (
    <section className="bg-[#F2F2F2] min-h-screen overflow-hidden">
      <SectionWithBackground
        title="Le nostre community"
        description="In Bloom trovi tutto ciò che serve per <br />il tuo benessere e la tua crescita"
      />
      <Container>
        <CommunityContent />
      </Container>
      <Banner />
    </section>
  );
};

const CommunityContent = () => {
  return (
    <div className="flex flex-col mt-16 lg:mt-10 gap-16 justify-center items-center">
      {CommunityData.map((item, index) => (
        <CommunityItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const CommunityItem = ({ item, index }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px 0px" });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      ref={itemRef}
      id={item.section}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className={`flex ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } lg:gap-20 gap-6 rounded-xl justify-center flex-col items-center
      bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-8`}
    >
      {/* Image and Title Section */}
      <div className="flex flex-col justify-center items-center lg:items-start gap-6 lg:w-2/5">
        <div className="w-full max-w-md h-64 relative rounded-xl overflow-hidden shadow-md group">
          <Image
            src={item.icon}
            alt={item.title || "Community image"}
            fill
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-semibold text-[#00A896] text-center lg:text-left">
            {item.title}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="flex justify-center items-start gap-5 lg:w-3/5">
        <div className="text-[#373737] text-center lg:text-start text-xl lg:text-2xl font-normal space-y-6">
          <p>{item.desc}</p>

          {item.meeting?.length > 0 && (
            <div className="p-4 bg-[#f8f9fa] rounded-lg border-l-4 border-[#00A896] mt-6">
              <p className="text-xl flex flex-wrap gap-2 items-center">
                <span className="italic text-[#00A896]">
                  Quando ci Incontriamo:
                </span>
                <span className="font-semibold">{item.meeting}</span>
              </p>
            </div>
          )}

          {item.howitworks?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-medium italic text-[#00A896] mb-4 text-left">
                {item.section === "Women" && "Le Nostre Esperienze:"}
                {item.section === "Parents" && "Cosa Offriamo:"}
                {(item.section === "Buds" || item.section === "Students") &&
                  "Come Funziona:"}
              </h3>

              <ul className="space-y-3 text-left">
                {item.howitworks?.map((point, idx) => (
                  <li key={idx} className="flex items-start text-xl">
                    <span className="inline-block w-4 h-4 mt-2 mr-3 rounded-full bg-[#00A896] flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityPage;


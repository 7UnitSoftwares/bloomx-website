"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import GlimpseSection from "@/components/GlimpseSection";
import { SpacewhyData } from "@/data/SpaceData";

const SpacePage = () => {
  return (
    <section className="bg-[#F2F2F2] min-h-screen overflow-hidden">
      <SectionWithBackground
        title="Lo Spazio"
        description="Un Luogo per Tutti Bloom è il tuo spazio tra casa e impegni quotidiani, <br /> un ambiente accogliente dove puoi essere te stesso"
      />
      <Container>
        <SpaceContent />
      </Container>
      <Banner />
    </section>
  );
};

const SpaceContent = () => {
  return (
    <div className="flex flex-col mt-16 lg:mt-10 gap-16 justify-center items-center">
      {SpaceData.map((item, index) => (
        <SpaceItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const SpaceItem = ({ item, index }) => {
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
    <>
      <motion.div
        ref={itemRef}
        id={item.section}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInVariants}
        className={`flex ${
          index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
        } lg:gap-20 gap-6 rounded-xl bg-black justify-center flex-col items-center
      bg-white/80 w-full backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 p-8`}
      >
        {/* Image and Title Section */}
        <div className="flex flex-col justify-center items-center lg:items-start gap-6 lg:w-2/5">
          <div className="w-full max-w-md h-64 relative rounded-xl overflow-hidden shadow-md group">
            <Image
              src={item.icon}
              alt={item.title || "Space image"}
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
            {item.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SpacePage;

const SpaceData = [
  {
    section: "Relax",
    title: "Aree Relax e Comfort",
    icon: "/space/image1.jpg",
    description: [
      "• Zone morbide con cuscini e tappeti",
      "• Angoli silenziosi per la lettura",
      "• Spazi per la meditazione",
      "• Aree per pause rigeneranti",
    ],
  },
  {
    section: "Creativity",
    title: "Strumenti per la Creatività",
    icon: "/space/image2.jpg",
    description: [
      "• Art supply sempre disponibili",
      "• Mandala e materiali per colorare",
      "• Giochi di ingegno e logica",
      "• Materiali per attività artistiche",
    ],
  },
  {
    section: "Learning",
    title: "Spazi di Apprendimento",
    icon: "/space/image3.jpg",
    description: [
      "• Aree studio confortevoli",
      "• Libri e risorse educative",
      "• Giochi per il team building",
      "• Strumenti pedagogici innovativi",
    ],
  },
  {
    section: "Everyone",
    title: "Un Luogo per Tutti",
    icon: "/space/image1.jpg",
    description: [
      "Bloom è il tuo spazio tra casa e impegni quotidiani: un ambiente accogliente dove puoi essere te stesso, rilassarti, imparare e crescere nei tuoi tempi e modi. Qui trovi tutto ciò che serve per nutrire mente, corpo e creatività, in un'atmosfera che ti fa sentire a casa.",
    ],
  },
];

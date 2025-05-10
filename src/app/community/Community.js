"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Banner from "@/components/Banner";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import { CommunityData } from "@/data/CommunityData";
import { usePathname } from 'next/navigation';

// export const metadata = {
//   title: "Le nostre community",
//   description: "In Bloom trovi tutto ciò che serve per il tuo benessere e la tua crescita",
// };

const CommunityPage = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToSection = () => {
      // Get the hash from the URL
      const hash = window.location.hash;
      console.log('Current hash:', hash);
      
      if (!hash) return;

      // Remove the # from the hash
      const id = hash.substring(1);
      console.log('Looking for element with id:', id);

      // Function to attempt scrolling
      const attemptScroll = (attempts = 0) => {
        const element = document.getElementById(id);
        console.log('Found element:', element);
        
        if (!element) {
          // If element not found and we haven't tried too many times, try again
          if (attempts < 10) {
            console.log(`Attempt ${attempts + 1}: Element not found, retrying...`);
            setTimeout(() => attemptScroll(attempts + 1), 200);
          }
          return;
        }

        // Check if element is actually rendered and visible
        const rect = element.getBoundingClientRect();
        if (rect.height === 0) {
          if (attempts < 10) {
            console.log(`Attempt ${attempts + 1}: Element not rendered, retrying...`);
            setTimeout(() => attemptScroll(attempts + 1), 200);
          }
          return;
        }

        // Element is found and rendered, scroll to it
        console.log('Scrolling to element');
        const offset = 100;
        const elementPosition = rect.top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      };

      // Start the scroll attempt process
      attemptScroll();
    };

    // Scroll on initial load with a longer delay to ensure animations are complete
    console.log('Initial load - pathname:', pathname);
    setTimeout(scrollToSection, 500);

    // Scroll when the URL changes
    window.addEventListener('hashchange', (e) => {
      console.log('Hash changed:', e.newURL);
      scrollToSection();
    });

    return () => {
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, [pathname]);

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
        <div className="w-full flex justify-center items-center relative rounded-xl p-2 group">
          <Image
            src={item.icon}
            alt={item.title || "Community image"}
            height={300}
            width={300}
            priority={index < 2}
            className="object-cover transition-transform duration-500 group-hover:scale-95"
          />
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-semibold text-[#00A896] text-center">
            {item.title}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="flex justify-center items-start gap-5 lg:w-3/5">
        <div className="text-[#373737] text-center lg:text-start font-normal space-y-6">
          <p dangerouslySetInnerHTML={{ __html: item.desc }} />

          {item.meeting?.length > 0 && (
            <div className="p-4 bg-[#f8f9fa] rounded-lg border-l-4 border-[#00A896] mt-6">
              <p className="flex flex-wrap gap-2 items-center">
                <span className="italic text-[#00A896]">
                  Quando ci Incontriamo:
                </span>
                <span className="font-semibold">{item.meeting}</span>
              </p>
            </div>
          )}

          {item.howitworks?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium italic text-[#00A896] mb-4 text-left">
                {item.section === "Women" && "Le Nostre Esperienze:"}
                {item.section === "Parents" && "Cosa Offriamo:"}
                {(item.section === "Buds" || item.section === "Students") &&
                  "Come Funziona:"}
              </h3>

              <ul className="space-y-3 text-left">
                {item.howitworks?.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-[#00A896] flex-shrink-0"></span>
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


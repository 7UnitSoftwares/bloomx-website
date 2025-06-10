"use client";
import Contact from "@/components/Contact";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <section className="bg-[#F2F2F2] min-h-screen overflow-hidden">
        <SectionWithBackground
          title="Contattaci"
          description="Siamo qui per aiutarti. <br /> Contattaci per qualsiasi domanda."
        />
        <Container>
          {/* Map section */}
          <div className="w-full h-[400px] rounded-xl mt-16 lg:mt-10 overflow-hidden shadow-lg mb-16 relative group">
            <a 
              href="https://www.google.com/maps/place/Bloom+Biella/@45.559556,8.0605891,17z/data=!3m1!4b1!4m6!3m5!1s0x4786212d8e4611d3:0xe158b1e297d7794c!8m2!3d45.559556!4d8.0605891!16s%2Fg%2F11c5m8j8_4?entry=ttu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 z-10" />
              <div className="w-full h-full relative">
                <Image
                  src="/map-preview.png"
                  alt="Bloom Biella Location Map"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Bloom Biella</p>
                      <p className="text-gray-600 text-sm">Via Torino 35B, Biella, Italia</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="grid mt-16 lg:mt-10 grid-cols-1 lg:grid-cols-3 gap-10">
            {ContactData.map((item, index) => {
              // Detect if the item is an email or a phone number
              const isEmail = item.type === 'email';
              const isPhone = item.type === 'phone';

              // For WhatsApp, use the international format without spaces or dashes
              const whatsappNumber = item.value.replace(/\D/g, '');

              return (
                <div
                  key={index}
                  className="flex bg-white shadow-lg rounded-xl flex-col justify-center p-5 gap-5"
                >
                  <div className="rounded-2xl bg-[#EFFFFD]  w-fit p-2 ">
                    <Image src={item.icon} alt="" height={10} width={25} />
                  </div>
                  <div className="flex flex-col justify-center gap-3 items-start ">
                    <h1 className="text-2xl font-semibold text-black ">
                      {item.title}
                    </h1>
                    <p className="font-extralight">{item.desc}</p>
                    {isEmail && (
                      <a
                        href={`mailto:${item.value}`}
                        className="text-teal-600 underline"
                        dangerouslySetInnerHTML={{ __html: item.additional }}
                      />
                    )}
                    {isPhone && (
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 underline"
                        dangerouslySetInnerHTML={{ __html: item.additional }}
                      />
                    )}
                    {!isEmail && !isPhone && (
                      <p dangerouslySetInnerHTML={{ __html: item.additional }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <Suspense fallback={<div>Caricamento...</div>}>
          <Contact />
        </Suspense>
      </section>
    </div>
  );
};

export default page;

const ContactData = [
  {
    icon: "/contact/icon1.png",
    title: "Chatta con il supporto",
    desc: "Siamo qui per aiutarti.",
    additional: "+39 3382256056",
    type: 'phone',
    value: '+39 3382256056',
  },
  {
    icon: "/contact/icon2.png",
    title: "Visita la nostra sede",
    desc: "Vieni a trovarci in ufficio",
    additional: "VIA TORINO 35B, BIELLA, ITALIA 13900",
    type: '',
    value: '',
  },
  {
    icon: "/contact/icon3.png",
    title: "Contattaci",
    desc: "Lun-Ven 9:00 - 18:00",
    additional: "bloom@bloom-bi.it",
    type: 'email',
    value: 'bloom@bloom-bi.it',
  },
];

"use client";
import Contact from "@/components/Contact";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";
import React, { Suspense } from "react";

const page = () => {
  return (
    <section className="bg-[#F2F2F2] min-h-screen overflow-hidden">
      <SectionWithBackground
        title="Contact Us"
        description="We are here to help you. <br /> Contact us for any queries."
      />
      <Container>
        {/* Google maps frame  */}
        <div className="w-full h-[400px] rounded-xl mt-16 lg:mt-10 overflow-hidden shadow-lg mb-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.5411141188!2d8.060589100000001!3d45.559556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786212d8e4611d3%3A0xe158b1e297d7794c!2sBloom%20Biella!5e0!3m2!1sen!2sin!4v1746258917683!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="grid mt-16 lg:mt-10 grid-cols-1 lg:grid-cols-3 gap-10">
          {ContactData.map((item, index) => {
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
                  <p>{item.additional}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
    </section>
  );
};

export default page;

const ContactData = [
  {
    icon: "/contact/icon1.png",
    title: "Chat to support",
    desc: "We are here to help.",
    additional: "bloom@bloom-bi.it",
  },
  {
    icon: "/contact/icon2.png",
    title: "Visit Us",
    desc: "Visit our office",
    additional: "1234 Street Name, City Name",
  },
  {
    icon: "/contact/icon3.png",
    title: "Contact Us",
    desc: "Mor-Fri 9am-12pm",
    additional: "+123 456 7890",
  },
];

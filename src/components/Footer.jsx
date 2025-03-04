"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { Link as ScrollLink } from "react-scroll";


const data = [
  { title: "Chi siamo", to: "/about" },
  {
    title: "Comunità",
    to: "/community",
    items: [
      { title: "Buds", to: "Buds" },
      { title: "Students", to: "Students" },
      { title: "Parents", to: "Parents" },
      { title: "Bloomher", to: "Women" },
      { title: "Creators", to: "Creators" },
    ],
  },
  {
    title: "Servizio",
    to: "/service",
    items: [
      { title: "One to one tutoring", to: "tutoring" },
      { title: "Consulans pedagogica", to: "pedagogica" },
      { title: "Organize events", to: "events" },
      { title: "Projectzione", to: "projection" },
    ],
  },
  {
    title: "Network",
    to: "/network",
    items: [
      { title: "Bloom e Scuole", to: "schools" },
      { title: "Bloom e ISTITUZIONI ASSOCIAZIONI", to: "associations" },
      { title: "Bloom e Aziende", to: "companies" },
    ],
  },
  { title: "Eventi", to: "/events" },
  { title: "Spazio", to: "/space" },
];

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures that `react-scroll` only runs on the client side
    setIsClient(true);
  }, []);

  return (
    <div className="bg-[#F2F2F2] pt-16">
      <div className="flex flex-col justify-center items-center p-3 gap-5 bg-white pt-16">
        <Image
          src="/logo/logo.png"
          alt="Logo"
          width={100}
          height={48}
          className=""
        />
        <p className="text-center text-sm lg:text-base">FIORIRE NEL TUO SPAZIO COL TUO TEMPO</p>
        <div className="lg:flex flex-col hidden lg:flex-row items-start justify-start gap-5">
          {isClient &&
            data.map((item, index) => (
              <Link
                key={index}
                href={item.to}
                // activeClass="active-link"
                className="font-normal cursor-pointer"
              >
                {item.title}
              </Link>
            ))}
        </div>
        <div className="flex gap-3">
          <Image
            src="/footer/insta.png"
            alt="Instagram"
            width={24}
            height={24}
          />
          <Image
            src="/footer/facebook.png"
            alt="Facebook"
            width={24}
            height={24}
          />
          <Image
            src="/footer/linkedin.png"
            alt="LinkedIn"
            width={24}
            height={24}
          />
        </div>
        <div className="h-0.5 w-[90vw] lg:w-[60vw] bg-gray-300"></div>
        <div className="flex flex-col justify-start items-start font-normal lg:flex-row gap-1 lg:gap-5">
          <p>© 2024 Bloom All rights reserved</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

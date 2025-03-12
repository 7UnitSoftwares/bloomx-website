"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Button from "./Button";

const data = [
  { title: "Chi siamo", to: "/about" },
  {
    title: "Community",
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
    title: "I Nostri Servizi",
    to: "/service",
    items: [
      { title: "One to one tutoring", to: "tutoring" },
      { title: "Consulans pedagogica", to: "pedagogica" },
      { title: "Organize events", to: "events" },
      { title: "Projectzione", to: "projection" },
    ],
  },
  {
    title: "Products",
    to: "/products",
    items: [
      { title: "intùiti", to: "intùiti Creative Cards" },
      { title: "Favula Deck", to: "Fabula Deck" },
      {
        title: "intùitifweq Cards",
        to: "intùitifweq Creative Cards",
      },
      {
        title: "Fabulafwe Deck",
        to: "Fabulafwe Deck",
      },
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
  { title: "Blog", to: "/blog" },
];

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      console.log("Subscribing:", email);
      setSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-[#F2F2F2] pt-10">
      <div className="bg-white pt-12 pb-6">
        <Container>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-4 mb-10">
            {/* Logo and Info Section */}
            <div className="md:col-span-4">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                width={120}
                height={60}
                className="mb-4"
              />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Address: VIA DELLE ROSE, 2 13900 BIELLA <br />
                Codice Fiscale: BNOGDI79P62D938B <br />
                Partita Iva: 02708900028
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="transform hover:scale-110 transition-transform"
                >
                  <Image
                    src="/footer/insta.png"
                    alt="Instagram"
                    width={28}
                    height={28}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="#"
                  className="transform hover:scale-110 transition-transform"
                >
                  <Image
                    src="/footer/facebook.png"
                    alt="Facebook"
                    width={28}
                    height={28}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="#"
                  className="transform hover:scale-110 transition-transform"
                >
                  <Image
                    src="/footer/linkedin.png"
                    alt="LinkedIn"
                    width={28}
                    height={28}
                    className="hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>

            {/* Navigation Links - Updated with proper spacing */}
            <div className="md:col-span-4">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col space-y-3">
                  {isClient &&
                    data
                      .filter((_, i) => i % 2 === 0)
                      .map((item, index) => (
                        <div key={index} className="flex flex-col">
                          <Link
                            href={item.to}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-semibold mb-1"
                          >
                            {item.title}
                          </Link>

                          {/* Display submenu items if they exist */}
                          {item.items && (
                            <div className="flex flex-col pl-2 space-y-1 mb-2">
                              {item.items.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.to || subItem.link || "#"}
                                  className="text-gray-500 hover:text-blue-500 transition-colors text-xs"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                </div>

                <div className="flex flex-col space-y-3">
                  {isClient &&
                    data
                      .filter((_, i) => i % 2 === 1)
                      .map((item, index) => (
                        <div key={index} className="flex flex-col">
                          <Link
                            href={item.to}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-semibold mb-1"
                          >
                            {item.title}
                          </Link>

                          {/* Display submenu items if they exist */}
                          {item.items && (
                            <div className="flex flex-col pl-2 space-y-1 mb-2">
                              {item.items.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.to || subItem.link || "#"}
                                  className="text-gray-500 hover:text-blue-500 transition-colors text-xs"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="md:col-span-4 rounded-lg shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Newsletter Bloom
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Iscriviti per ricevere aggiornamenti su eventi, risorse e
                  novità dal mondo Bloom.
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email"
                    className="px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <Button
                    className="w-full bg-[#008C95] hover:bg-[#006A70] text-white py-2 px-4 rounded-lg transition-colors duration-200"
                    type="submit"
                  >
                    Iscriviti
                  </Button>
                </form>
                {subscribed && (
                  <p className="mt-3 text-green-600 font-medium flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Grazie per l'iscrizione!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2024 Bloom All rights reserved
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link
                  href="/privacy"
                  className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

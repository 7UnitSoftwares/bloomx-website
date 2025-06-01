"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Button from "./Button";
import { subscribeToNewsletter } from "../utils/api";
import Toast from './Toast';
import Spinner from "./Spinner";

const data = [
  { title: "Perchè scegliere Bloom", to: "/perche-bloom" },
  { title: "Chi siamo", to: "/siamo",
    items: [
      { title: "Il progetto", to: "/siamo/#progetto" },
      { title: "La visione", to: "/siamo/#visione" },
      { title: "Il nostro team", to: "/siamo/#team" }
    ]
   },
  {
    title: "Community",
    to: "/community",
    items: [
      { title: "Studenti", to: "/community#Studenti" },
      { title: "Buds", to: "/community#Buds" },
      { title: "Genitori", to: "/community#Genitori" },
      { title: "BloomHer", to: "/community#BloomHer" },
      { title: "Creators", to: "/community#Creators" }
    ],
  },
  {
    title: "I Nostri Servizi",
    to: "/servizi",
    items: [
      { title: "Percorsi di Studio", to: "/servizi#studio" },
      { title: "Consulenza e Assessment", to: "/servizi#consulenza" },
      { title: "Laboratori ed Eventi", to: "/servizi#eventi" }
    ],
  },
  // {
  //   title: "Network",
  //   to: "/network",
  //   items: [
  //     { title: "Bloom e Scuole", to: "schools" },
  //     { title: "Bloom e ISTITUZIONI ASSOCIAZIONI", to: "associations" },
  //     { title: "Bloom e Aziende", to: "companies" },
  //   ],
  // },
];

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Campo obbligatorio");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Inserisci un indirizzo email valido");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validate both email and consent
    if (!email || !hasConsent) {
      if (!email) {
        setEmailError("Campo obbligatorio");
      }
      return;
    }
    
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log(process.env.NEXT_PUBLIC_API_KEY);

    if (email && email.includes("@")) {
      try {
        await subscribeToNewsletter(email);
        setToast({
          show: true,
          message: 'Grazie per l\'iscrizione!',
          type: 'success'
        });
        setEmail(""); // Reset form
      } catch (error) {
        setToast({
          show: true,
          message: 'Si è verificato un errore. Riprova più tardi.',
          type: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <footer className="bg-[#F2F2F2] pt-10">
      <div className="bg-white pt-12 pb-6">
        <Container>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-4 mb-10">
            {/* Logo and Info Section */}
            <div className="md:col-span-4">
              <Image
                src="/logo/bloom_logo.svg"
                alt="Logo"
                width={120}
                height={60}
                className="mb-4"
              />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Address: VIA TORINO 35B, BIELLA, ITALIA 13900 <br />
                Codice Fiscale: BNOGDI79P62D938B <br />
                Partita Iva: 02708900028
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.instagram.com/bloom_biella"
                  className="transform hover:scale-110 transition-transform"
                  target="_blank"
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
                  href="https://www.facebook.com/profile.php?id=61560352317391"
                  className="transform hover:scale-110 transition-transform"
                  target="_blank"
                >
                  <Image
                    src="/footer/facebook.png"
                    alt="Facebook"
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
                            className="text-gray-700 hover:text-teal-600 transition-colors font-semibold mb-1"
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
                                  className="text-gray-500 hover:text-teal-500 transition-colors text-xs"
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
                            className="text-gray-700 hover:text-teal-600 transition-colors font-semibold mb-1"
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
                                  className="text-gray-500 hover:text-teal-500 transition-colors text-xs"
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    placeholder="La tua email"
                    className={`px-4 py-3 rounded-lg border ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    } w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    required
                  />
                  {emailError && (
                    <label className="text-red-500 text-sm mt-1">{emailError}</label>
                  )}
                  <div className="text-xs text-gray-600 space-y-3">
                    <p className="leading-relaxed">
                      Dichiaro di avere preso attenta visione dell'
                      <a 
                        href="https://www.iubenda.com/privacy-policy/52750623" 
                        className="text-[#008C95] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        informativa sulla privacy
                      </a>
                      {' '}e presto il consenso al trattamento dei miei dati personali per le finalità al suo interno ex. Artt. 13-14 Reg.to UE 2016/679.
                    </p>
                    
                    <p className="leading-relaxed">
                      Vi informiamo inoltre che i Vostri dati anagrafici saranno trattati solo ed esclusivamente da Bloom Centro Pedagogico o da soggetti espressamente incaricati per l'esecuzione di alcuni dei servizi richiesti e non verranno ceduti a terzi senza un Vostro previo consenso in osservanza Reg.to UE 2016/679.
                    </p>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="newsletter-consent"
                        checked={hasConsent}
                        onChange={(e) => setHasConsent(e.target.checked)}
                        className="mt-0.5 h-3 w-3 text-[#008C95] border-gray-300 rounded focus:ring-[#008C95]"
                        required
                      />
                      <label htmlFor="newsletter-consent" className="text-xs text-gray-600">
                        ACCONSENTO alla ricezione della newsletter
                      </label>
                    </div>
                  </div>
                  <Button
                    className={`w-full ${
                      email && hasConsent 
                        ? 'bg-[#008C95] hover:bg-[#006A70]' 
                        : 'bg-gray-300'
                    } text-white py-2 px-4 rounded-lg transition-colors duration-200`}
                    type="submit"
                    disabled={!email || !hasConsent || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Spinner size="sm" className="text-white" />
                        <span>Invio in corso...</span>
                      </div>
                    ) : (
                      'Iscriviti'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                ©2025 Bloom Tutti i diritti riservati
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://www.iubenda.com/privacy-policy/52750623" className="text-gray-500 text-sm hover:text-gray-700 transition-colors" title="Privacy Policy " target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="https://www.iubenda.com/privacy-policy/52750623/cookie-policy" className="text-gray-500 text-sm hover:text-gray-700 transition-colors" title="Cookie Policy " target="_blank" rel="noopener noreferrer">Cookie Policy</a>
                {/* <Link
                  href="/privacy"
                  className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Privacy
                </Link> */}
                {/* <Link
                  href="/terms"
                  className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Trasparenza
                </Link> */}
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Replace the existing success message with Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </footer>
  );
};

export default Footer;

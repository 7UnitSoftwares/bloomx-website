"use client";
import Link from "next/link";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
const Navbar = () => {
  // const [show, setShow] = useState(false);
  // const [dropdown, setDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [dropdown, setDropdown] = useState(null);
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const data = [
    { title: "Chi siamo", to: "/siamo" },
    { title: "Perchè scegliere Bloom", to: "/perche-bloom" },
    {
      title: "Community",
      to: "/community",
      items: [
        { title: "Studenti", to: "Studenti" },
        { title: "Piccoli Bloom", to: "Buds" },
        { title: "Genitori", to: "Genitori" },
        { title: "Creators", to: "Creators" },
      ],
    },
    {
      title: "I Nostri Servizi",
      to: "/servizi",
      items: [
        { title: "Percorsi di Studio", to: "studio" },
        { title: "Consulenza e Assessment", to: "consulenza" },
        { title: "Laboratori ed Eventi", to: "eventi" }
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
    
    { title: "Spazio", to: "/spazio" },
    { title: "Eventi", to: "/eventi" },
    { title: "Risorse gratuite", to: "/risorse-gratuite" },
    { title: "Novità Educative", to: "/novita-educative" },
    // { title: "HeyBloom", to: "/heybloom", isNew: true },
    // { title: "Bloom Summer Lab", to: "/bloom-summer-lab" },
    // { title: "Brain Up Summer", to: "/brain-up-summer" },
    // {
    //   title: "Risorse",
    //   to: "/risorse",
    //   items: [
    //     { title: "intùiti", to: "intùiti Creative Cards" },
    //     { title: "Favula Deck", to: "Fabula Deck" },
    //     {
    //       title: "intùitifweq Cards",
    //       to: "intùitifweq Creative Cards",
    //     },
    //     {
    //       title: "Fabulafwe Deck",
    //       to: "Fabulafwe Deck",
    //     },
    //     { title: "risorse gratuite", link: "/free-resources" },
    //   ],
    // },
  ];

  const handleMenuClick = (index) => {
    setDropdown((prevDropdown) => (prevDropdown === index ? null : index));
  };

  return (
    <>
      <nav className="flex lg:px-32 px-5 bg-white/90 fixed py-3 z-50 backdrop-blur-2xl border-b border-gray-200 w-full justify-between items-center">
        <div>
          <Link href="/">
            <img className="h-10 lg:w-auto" src="/logo/bloom_logo.svg" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden text-sm lg:flex gap-5">
          {data.map((item, index) => (
            <div
              key={index}
              ref={(el) => (dropdownRefs.current[index] = el)}
              onMouseEnter={() => item.items && setDropdown(index)}
              onMouseLeave={() => item.items && setDropdown(null)}
              className={`relative group cursor-pointer py-2 px-1`}
            >
              <div className="flex items-center gap-1">
                <Link
                  href={item.to || "/"}
                  className={`relative transition-colors duration-200 ${
                    pathname === item.to
                      ? "text-[#008C95] font-semibold"
                      : "text-gray-700 hover:text-[#008C95]"
                  }`}
                >
                  {item.title}
                  {item.isNew && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-[#00A59B] rounded-full">
                      nuovo
                    </span>
                  )}
                </Link>

                {item.items && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      dropdown === index
                        ? "rotate-180 text-[#008C95]"
                        : "text-gray-500"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(index);
                    }}
                  />
                )}
              </div>

              {/* Active indicator */}
              {pathname === item.to && (
                <span className="h-0.5 bg-[#008C95] absolute bottom-0 left-0 right-0"></span>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.items && dropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 min-w-48 overflow-hidden"
                  >
                    <div className="py-1">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={
                            subItem.link
                              ? subItem.link
                              : `${item.to || ""}#${subItem.to || ""}`
                          }
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#008C95] transition-colors duration-200"
                          onClick={() => setDropdown(null)}
                        > 
                         {subItem.link ? `${subItem.title}` : `--${subItem.title}`}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex gap-10 justify-center items-center">
          <Button className="bg-[#008C95] hover:bg-[#006A70] text-white py-2 px-4 rounded-lg transition-colors duration-200">
            <Link href="/contattaci">Contattaci</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex gap-5">
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="flex h-8 w-8"
          >
            <img
              src={show ? "/Navbar/close.svg" : "/Navbar/open.svg"}
              alt="Menu Toggle"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200"
            >
              <div className="flex flex-col py-4 px-6">
                {data.map((item, index) => (
                  <div key={index} className="py-2">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => item.items && handleMenuClick(index)}
                    >
                      <Link
                        href={item.to || "/"}
                        className={`text-base ${
                          pathname === item.to
                            ? "text-[#008C95] font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {item.title}
                        {item.isNew && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-[#00A59B] rounded-full">
                            nuovo
                          </span>
                        )}
                      </Link>
                      {item.items && (
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            dropdown === index
                              ? "rotate-180 text-[#008C95]"
                              : "text-gray-500"
                          }`}
                        />
                      )}
                    </div>

                    {/* Mobile Dropdown */}
                    <AnimatePresence>
                      {item.items && dropdown === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 mt-2 border-l-2 border-gray-100">
                            {item.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={`${item.to || ""}#${subItem.to || ""}`}
                                className="block py-2 text-sm text-gray-600 hover:text-[#008C95]"
                                onClick={() => setShow(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button className="w-full bg-[#008C95] hover:bg-[#006A70] text-white py-2 px-4 rounded-lg transition-colors duration-200">
                    <Link href="/contattaci" onClick={() => setShow(false)}>
                      Contattaci
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Navigation Menu */}
      {show && (
        <div className="bg-white lg:hidden rounded-lg w-full right-0 border shadow-lg fixed mt-14 z-40">
          <div className="pt-4 flex flex-col">
            {data.map((item, index) => (
              <div key={index} className="w-full">
                {item.items ? (
                  <>
                    <button
                      className="flex justify-between items-center w-full px-4 py-2 font-semibold text-black text-lg border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === index ? null : index
                        )
                      }
                    >
                      {item.title}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeDropdown === index && (
                      <div className="pl-6 bg-gray-50">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={`${item.to || ""}#${subItem.to || ""}`}
                            className="block font-medium text-black text-sm py-2 px-4 hover:text-blue-500 hover:bg-gray-100 transition duration-300"
                            onClick={() => setShow(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.to || "/"}
                    className="font-semibold text-black text-lg px-4 py-2 block border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                    onClick={() => setShow(false)}
                  >
                    {item.title}
                    {item.isNew && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-[#00A59B] rounded-full">
                        nuovo
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
            <div className="p-4 w-full">
              <Button>
                <Link
                  href="/contattaci"
                  onClick={() => setShow(false)}
                  className="text-white"
                >
                  Contattaci
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

"use client";
import Link from "next/link";
import Button from "./Button";
import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const pathname = usePathname();

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

  const handleMenuClick = (index) => {
    setDropdown((prevDropdown) => (prevDropdown === index ? null : index));
  };

  return (
    <>
      <nav className="flex lg:px-32 px-5 bg-white fixed py-3 z-50 backdrop-blur-2xl border-b-[3px] w-full justify-between items-center">
        <div>
          <Link href="/">
            <img className="h-10 lg:w-auto" src="/logo/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden text-md lg:flex gap-5">
          {data.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setDropdown(index)}
              onMouseLeave={() => setDropdown(null)}
              className={`relative group cursor-pointer dropdown-container ${
                pathname === item.to ? "font-bold text-[#008C95]" : ""
              }`}
            >
              <span
                className={`h-0.5 ${
                  pathname === item.to ? "w-full" : ""
                } bg-[#008C95] absolute bottom-0  ease-in-out duration-300`}
              ></span>

              {item.items ? (
                <span
                  className="flex justify-center items-center"
                  onClick={() => handleMenuClick(index)}
                >
                  <Link href={item.to || "/"}>{item.title}</Link>
                  <RiArrowDropDownLine className="text-xl" />
                </span>
              ) : (
                <Link href={item.to || "/"}>{item.title}</Link>
              )}
              {/* Dropdown Menu */}
              {item.items && dropdown === index && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md">
                  {item.items.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={`${item.to || ""}#${subItem.to || ""}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex gap-10 justify-center items-center">
          <Button>
            <Link href="/contact">Contattaci</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex gap-5">
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="flex h-8 w-8"
          >
            <img
              src={show ? "/Navbar/close.svg" : "/Navbar/open.svg"}
              alt="Menu Toggle"
            />
          </button>
        </div>
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
                  </Link>
                )}
              </div>
            ))}
            <div className="p-4 w-full">
              <Button>
                <Link
                  href="/contact"
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

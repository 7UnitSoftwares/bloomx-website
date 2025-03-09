"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import { FaGift } from "react-icons/fa";
import { products } from "@/data/ProductData";
import Link from "next/link";

// Free Resources Component
const FreeResources = () => {
  return (
    <div className="bg-[#F2F2F2]">
      <div className=" mx-auto px-4 mt-5 sm:px-8 md:px-16 lg:px-28 xl:px-36 py-12">
        <h2 className="text-xl font-semibold mb-6">
          This is what we came up till now:
        </h2>
        <div className="space-y-8">
          {resources.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-32 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={220}
                  height={220}
                  className="rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  👉 {item.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const handleBuyNow = (productName) => {
    const phoneNumber = "919876543210"; // Replace with your WhatsApp number
    const message = `I want to buy ${productName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      id={product.name}
      className="flex max-w-screen-xl mx-auto flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="md:w-1/2 flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover"
        />
      </div>
      <div className="text-center md:w-1/2 md:text-left">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-lg text-pink-600 font-semibold">
          🚀 {product.tagline}
        </p>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
          <Link
            href={product.discoverLink}
            className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600"
          >
            Discover {product.name.split(" ")[0]}
          </Link>
          <button
            onClick={() => handleBuyNow(product.name)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ label, active, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded transition duration-200 ${
        active
          ? "bg-green-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const ProductPage = () => {
  const [filters, setFilters] = useState({
    ageGroup: "All ages",
    resourceType: "All",
    showFreeResources: false,
  });

  const ageGroups = ["All ages", "Ages 4-6", "Ages 7-10", "Ages 11+", "Adults"];
  const resourceTypes = [
    "All",
    "Journals",
    "Cards",
    "Videos & Audio",
    "Printables",
    "Parenting",
    "Teaching Guides",
    "Posters",
  ];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (
      filters.ageGroup !== "All ages" &&
      !product.ageGroups?.includes(filters.ageGroup)
    ) {
      return false;
    }
    if (
      filters.resourceType !== "All" &&
      !product.resourceTypes?.includes(filters.resourceType)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-100  min-h-screen">
      <SectionWithBackground
        title="Our Products"
        description="Discover our products for your creative growth."
      />

      {/* Filters Section */}
      <Container>
        <div className="my-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Age Group</h3>
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((age) => (
                <FilterButton
                  key={age}
                  label={age}
                  active={filters.ageGroup === age}
                  onClick={() => setFilters({ ...filters, ageGroup: age })}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Resource Type</h3>
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <FilterButton
                  key={type}
                  label={type}
                  active={filters.resourceType === type}
                  onClick={() => setFilters({ ...filters, resourceType: type })}
                />
              ))}
            </div>
          </div>

          <div>
            <FilterButton
              label={
                <span className="flex items-center">
                  <FaGift className="mr-2" /> Free Resources
                </span>
              }
              active={filters.showFreeResources}
              onClick={() =>
                setFilters({
                  ...filters,
                  showFreeResources: !filters.showFreeResources,
                })
              }
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white border-0 shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </Container>

      {/* Display Free Resources when selected */}
      {filters.showFreeResources && <FreeResources />}

      {/* Products List */}
      <div className="mt-5 w-full lg:px-28 px-5 flex flex-col gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;


const resources = [
  {
    title: "Nebula",
    description: "our tool to spot and analyse Fake News.",
    link: "https://example.com/nebula",
    linkText: "Download it now",
    image: "/free-resources/icon1.png",
  },
  {
    title: "Sefirot’s Vademecum for presenting a creative project",
    description:
      "an effective framework that you can use to propose an idea to investors, accelerators (and even other Publishers!)",
    link: "https://example.com/sefirot",
    linkText: "Google Doc version",
    image: "/free-resources/icon2.png",
  },
  {
    title: "The Complete Manual of Intùiti",
    description:
      "in PDF format: it's very useful for inspiring your creativity even if you don't own the cards",
    link: "https://example.com/manual",
    linkText: "Read the manual",
    image: "/free-resources/icon3.png",
  },
  {
    title: "UXBox",
    description:
      "Il corso online di UX design gratuito più completo in Italia. Per chiunque voglia ampliare le proprie conoscenze in ambito di User Experience Design.",
    link: "https://example.com/uxbox",
    linkText: "Il sito ufficiale del corso",
    image: "/free-resources/icon1.png",
  },
];
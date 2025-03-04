"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";

import { products } from "@/data/ProductData";

const ProductCard = ({ product }) => {
  return (
    <div
    id={product.name}
    className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-lg shadow-md">
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
          <a
            href={product.discoverLink}
            className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600"
          >
            Discover {product.name.split(" ")[0]}
          </a>
          <a
            href={product.buyLink}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};
const ProductPage = () => {
  return (
    <div className="bg-gray-100 ">
      <SectionWithBackground
        title="Our Products"
        description="Discover our products for your creative growth."
      />
      <div className="mt-5 flex flex-col gap-6">
        {products.map((product) => (
          <Container>
            <ProductCard key={product.id} product={product} />
          </Container>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

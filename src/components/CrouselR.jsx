import Link from "next/link";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container relative max-w-7xl mx-auto">
      {/* Navigation Arrows for larger screens */}
      <button
        className="absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2 text-[#00A59B] hover:text-[#008C83] bg-white rounded-full shadow-md p-1 sm:p-2 z-10 hidden sm:flex items-center justify-center"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 text-[#00A59B] hover:text-[#008C83] bg-white rounded-full shadow-md p-1 sm:p-2 z-10 hidden sm:flex items-center justify-center"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <div className="carousel-wrapper overflow-hidden rounded-xl shadow-sm">
        <div
          className="carousel-content flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-full flex flex-col md:flex-row items-center bg-white rounded-xl p-4 sm:p-6 md:p-8 gap-4 md:gap-8"
            >
              <div className="w-full md:w-2/5 flex justify-center mb-4 md:mb-0">
                <img
                  src={item.image}
                  className="w-full max-w-[220px] md:max-w-[280px] h-auto rounded-lg shadow-md object-cover aspect-square"
                  alt={item.title}
                />
              </div>
              <div className="w-full md:w-3/5 flex flex-col gap-3 items-start">
                <h2 className="text-xl md:text-2xl font-bold text-[#333] mb-2">
                  {item.title}
                </h2>
                <div
                  className="text-sm md:text-base text-[#4a4a4a] leading-relaxed mb-3"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="flex gap-5 w-full sm:w-auto">
                  <Link href="/servizi" className="w-full sm:w-auto">
                    <button className="bg-[#00A59B] text-white hover:bg-[#008C83] transition-all duration-300 w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#00A59B] focus:ring-opacity-50">
                      Scopri di più
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-between mt-4 sm:hidden px-4">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center bg-[#00A59B] text-white w-10 h-10 rounded-full"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center justify-center bg-[#00A59B] text-white w-10 h-10 rounded-full"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="carousel-indicators flex justify-center mt-4">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-[#00A59B] w-5"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

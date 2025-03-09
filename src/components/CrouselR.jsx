import React, { useState } from "react";

const Carousel = ({data}) => {
  const [activeIndex, setActiveIndex] = useState(0); // To track the current active item

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
    <div className="carousel-container bg-white relative max-w-7xl mx-auto">
      <div className="carousel-wrapper  overflow-hidden">
        {/* The div container for the carousel */}
        <div
          className="carousel-content flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-full justify-center flex flex-col lg:flex-row items-center shadow-xl  bg-wite rounded-xl p-3 gap-10"
            >
              <div>
                <img src={item.image} className="bg-cover w-[20vw] max-w-[300px] lg:max-w-[50vw] object-contain aspect-auto" alt="" />
              </div>
              <div className="flex justify-start flex-col gap-3 items-start">
                <h1 className="text-xl font-semibold text-black">
                  {item.title}
                </h1>
                <p className="text-start text-sm font-normal">
                  {item.description}
                </p>
                <div className="flex gap-5">
                  <button className="bg-[#00A59B] text-white hover:scale-110 duration-300 ease-in-out px-4 py-2 rounded-lg mt-4">
                    Contattaci
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="carousel-indicators flex justify-center mt-4">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 mx-2 rounded-full ${
              index === activeIndex ? "bg-[#00A59B]" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Navigation Arrows 
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full"
        onClick={handleNext}
      >
        Next
      </button>
      */}
    </div>
  );
};

export default Carousel;


import React, { useEffect, useRef } from "react";

const Carousel = ({ images }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let startPosition = 0;

    const moveCarousel = () => {
      if (carousel) {
        startPosition -= 1; // Adjust the speed of the scroll here
        carousel.style.transform = `translateX(${startPosition}px)`;

        // Reset the position when it scrolls past half of the items (since it's duplicated)
        if (Math.abs(startPosition) >= carousel.scrollWidth / 2) {
          startPosition = 0; // Reset to start without a gap
        }
      }
    };

    const interval = setInterval(moveCarousel, 10); // Adjust the interval for smoother or faster scrolling

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="overflow-hidden w-full relative">
      <div
        ref={carouselRef}
        className="flex w-max"
        style={{ display: "flex", gap: 10 }}
      >
        {/* Duplicate images for the seamless infinite loop */}
        {[...images, ...images].map((image, index) => (
          <div key={index} className="min-w-[350px] flex-shrink-0">
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-96 object-cover rounded-lg ${index % 2 === 0 ? "mt-16" : "rounded-l-lg"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

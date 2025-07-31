"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SpecialEventData } from "@/data/SpecialEventData";

const SpecialEventsBanner = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Auto-change banner every 5 seconds if there are multiple events
  useEffect(() => {
    if (SpecialEventData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => 
        (prevIndex + 1) % SpecialEventData.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Don't render if no special events
  if (SpecialEventData.length === 0) return null;

  const currentEvent = SpecialEventData[currentEventIndex];

  return (
    <div className="w-full bg-gradient-to-r from-[#00A59B] to-[#8bc6c2] text-white py-3 px-4 lg:px-8">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg lg:text-xl">⭐</span>
            <span className="text-sm lg:text-base font-medium">Evento Speciale</span>
          </div>
          <div className="hidden lg:block w-px h-6 bg-white/30"></div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
            <h3 className="text-sm lg:text-base font-semibold">
              {currentEvent.title}
            </h3>
            <span className="text-xs lg:text-sm opacity-90">
              {currentEvent.date}
            </span>
          </div>
        </div>
        
        <Link href={currentEvent.link}>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs lg:text-sm font-medium px-3 lg:px-4 py-1 lg:py-2 rounded-lg transition-all duration-200 border border-white/30 hover:border-white/50">
            Scopri di più
          </button>
        </Link>
      </div>

      {/* Dots indicator for multiple events */}
      {SpecialEventData.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {SpecialEventData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentEventIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentEventIndex 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialEventsBanner; 
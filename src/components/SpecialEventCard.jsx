import React from "react";
import Image from "next/image";
import Link from "next/link";

const SpecialEventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <span className="bg-[#00A59B] px-3 py-1 rounded-full text-sm font-medium">
            {event.badge}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#00A59B] font-medium">
            {event.date}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {event.duration}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {event.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {event.features.map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-[#f0f9f8] text-[#005E64] px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <Link href={event.link}>
          <button className="w-full bg-[#00A59B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#008f85] transition-colors duration-200">
            Scopri di più
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SpecialEventCard; 
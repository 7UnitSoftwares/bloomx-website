// components/TeamCard.js
import React from "react";
import Image from "next/image";

const TeamCard = ({ member }) => {
  return (
    <div className="flex rounded-lg border p-3 shadow-xl flex-col items-center mt-10 h-full bg-white">
      <div className="flex flex-col items-center min-h-[120px]">
        <div className="w-[200px] h-[200px] flex items-center justify-center overflow-hidden">
          <Image
            src={member.img}
            alt={member.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-2xl text-center font-semibold mt-4">{member.name}</h1>
        <h2 className="text-lg text-[#00A59B] text-center font-bold mt-1">
          {member.position}
        </h2>
      </div>
      <p className="text-center mb-1" dangerouslySetInnerHTML={{ __html: member.desc }}></p>
    </div>
  );
};

export default TeamCard;

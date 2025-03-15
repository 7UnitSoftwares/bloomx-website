// components/TeamCard.js
import React from "react";
import Image from "next/image";

const TeamCard = ({ member }) => {
  return (
    <div className="flex rounded-lg border p-3 shadow-xl flex-col justify-center items-center gap-7 mt-10" style={{backgroundColor:'#FFFFFF'}}>
      <div>
        <Image src={member.img} alt={member.name} width={100} height={100} style={{width:'200px'}} />
      </div>
      <div>
        <h1 className="text-2xl text-center font-semibold">{member.name}</h1>
        <h2 className="text-lg text-[#00A59B] text-center font-medium font-bold">
          {member.position}
        </h2>
        <p className="text-center mb-3 mt-5">{member.desc}</p>
        {/* <div className="flex justify-center mt-3 mb-3 gap-3">
          <a href={member.insta} target="_blank" rel="noopener noreferrer">
            <Image
              src="/footer/insta.png"
              alt="Instagram"
              width={24}
              height={24}
            />
          </a>
          <a href={member.facebook} target="_blank" rel="noopener noreferrer">
            <Image
              src="/footer/facebook.png"
              alt="Facebook"
              width={24}
              height={24}
            />
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <Image
              src="/footer/linkedin.png"
              alt="LinkedIn"
              width={24}
              height={24}
            />
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default TeamCard;

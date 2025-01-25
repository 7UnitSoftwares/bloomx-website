// components/Teams.js
"use client";
import React, { useState } from "react";
import TeamCard from "./TeamCard";
import { Bloom, Creator } from "../data/TeamData";

const Teams = () => {
  const [team, setTeam] = useState("bloom");
  const data = team === "bloom" ? Bloom : Creator;

  return (
    <div id="teams" className="  bg-[#F2F2F2] pb-16">
      <h1 className="text-4xl text-[#00A59B] font-semibold text-center pt-16">
        Meet Our Team
      </h1>

      <div className="flex justify-center gap-10 mt-5">
        <button
          className={`${
            team === "bloom" ? "bg-[#00A59B] text-white" : ""
          } hover:scale-110 ease-in-out px-4 py-2 rounded-lg border-black mt-4`}
          onClick={() => setTeam("bloom")}
        >
          Bloom Team
        </button>
        <button
          className={`${
            team === "creator" ? "bg-[#00A59B] text-white" : ""
          } hover:scale-110 ease-in-out px-4 py-2 rounded-lg mt-4 border-2`}
          onClick={() => setTeam("creator")}
        >
          Creator Team
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {data.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Teams;

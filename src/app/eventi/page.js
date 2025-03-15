"use client"
import CalendarView from "@/components/CalendarView";
import Container from "@/components/Container";
import Eventcard from "@/components/Eventcard";
import SectionWithBackground from "@/components/SectionWithBackground";
import TestimonialCard from "@/components/Testimonial";
import EventsSection from "@/components/trial";
import { EventData } from "@/data/EventData";
import { TestimonialData } from "@/data/Testimonial";
import React from "react";

// export const metadata = {
//   title: "Events",
//   description: "Bloom Events",
// };
const page = () => {
  return (
    <div className="overflow-hidden">
      <SectionWithBackground
        title="Events"
        description="Join us for exciting activities that promote growth,
            <br /> learning, and creativity"
      />
      <div className="bg-[#F2F2F2]">
        <Container>
          <CalendarView />
          <h1 className="typography pt-10 lg:pt-16">What customer says</h1>

          <div className=" bg-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-16 p-4">
            {TestimonialData.map((data, index) => {
              return <TestimonialCard data={data} key={index} />;
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default page;

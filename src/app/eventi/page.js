"use client"
import CalendarView from "@/components/CalendarView";
import Container from "@/components/Container";
import Eventcard from "@/components/Eventcard";
import SectionWithBackground from "@/components/SectionWithBackground";
import TestimonialCard from "@/components/Testimonial";
import EventsSection from "@/components/trial";
import { EventData } from "@/data/EventData";
import { TestimonialData } from "@/data/Testimonial";
import React, { useState, useCallback } from "react";
import Spinner from "@/components/Spinner";
import { sendEnquiry } from "@/utils/api";
import InterestFormModal from "@/components/InterestFormModal";

// export const metadata = {
//   title: "Events",
//   description: "Bloom Events",
// };
const EventiPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleModalClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setShowForm(false);
  }, []);

  return (
    <div className="overflow-hidden">
      <SectionWithBackground
        title="Events"
        description="Partecipa ai nostri eventi per vivere attività stimolanti<br /> che favoriscono la crescita, l'apprendimento e la creatività."
      />
      <div className="bg-[#F2F2F2]">
        <Container>
          <CalendarView />
          <h1 className="typography pt-10 lg:pt-16">Le voci di chi ci ha scelto</h1>

          <div className="bg-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-16 p-4">
            {TestimonialData.map((data, index) => {
              return <TestimonialCard data={data} key={index} />;
            })}
          </div>
        </Container>
      </div>

      {/* Interest Form Modal */}
      <InterestFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        interest="ESTATE FELICE – Aperitivo Educativo per Genitori"
      />
    </div>
  );
};

export default EventiPage;

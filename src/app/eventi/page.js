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
          <div className="flex flex-col gap-10">
            {/* Decorative Banner */}
            <button
              type="button"
              className="mt-10 cursor-pointer bg-gradient-to-r from-[#008C95] via-[#F9A1BC] to-[#A7E8E5] rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-4 border-[#008C95] hover:scale-105 transition-transform duration-200 w-full"
              onClick={handleModalClick}
            >
              <h2 className="text-2xl font-extrabold text-white mb-2 drop-shadow">
                ESTATE FELICE – Aperitivo Educativo per Genitori
              </h2>
              <p className="text-lg text-white font-medium">
                19 Giugno – Ore 18.00 | I Faggi, Biella
              </p>
              <span className="mt-2 text-sm text-[#008C95] font-semibold animate-pulse bg-white bg-opacity-80 px-2 py-1 rounded">
                Clicca per saperne di più!
              </span>
            </button>

            {/* Modal Popup */}
            {showModal && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                onClick={handleModalClose}
              >
                <div 
                  className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                    onClick={handleModalClose}
                    aria-label="Chiudi"
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-bold text-yellow-700 mb-2">
                    ESTATE FELICE – Aperitivo Educativo per Genitori
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Quando:</strong> 22 Maggio – Ore 18.00<br />
                    <strong>Dove:</strong> I Faggi, Biella
                  </p>
                  <p className="text-gray-600 mb-4">
                    Unisciti a noi per un aperitivo educativo pensato per mamme e papà di bambini e ragazzi dai 6 ai 14 anni. Un momento informale ma ricco di strumenti concreti per affrontare con serenità l'estate in famiglia.<br /><br />
                    <strong>PROGRAMMA DELLA SERATA</strong><br />
                    <ul className="list-disc list-inside">
                      <li>Come organizzare le vacanze con i bambini</li>
                      <li>Gestire i compiti estivi senza stress</li>
                      <li>Affrontare con consapevolezza il cambio di ordine scolastico</li>
                    </ul>
                    <br />
                    Durante l'incontro sarà offerto un aperitivo leggero in un clima accogliente e rilassato.<br /><br/>
                    <strong>Obiettivo?</strong> Fornire ai genitori idee, strategie e risorse pratiche per vivere al meglio il tempo libero estivo, rafforzare il legame con i figli e accompagnarli nella crescita con fiducia.<br />
                    <br />
                    <strong>Posti limitati – Prenota il tuo spazio per un'estate più felice!</strong>
                  </p>
                  {!showForm && (
                    <button
                      type="button"
                      className="bg-[#008C95] hover:bg-[#006C73] text-white font-bold py-2 px-4 rounded-lg w-full transition"
                      onClick={() => setShowForm(true)}
                    >
                      Esprimi Interesse
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
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

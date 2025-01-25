import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { dummyEvents } from "@/data/dummyEvents";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="typography mt-10 mb-10 ">Events Calendar</h1>
      <div className="bg-white shadow-lg rounded-xl p-4">
        <Calendar
          localizer={localizer}
          events={dummyEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          toolbar={false}
          defaultView="month"
          views={["month", "week", "day"]}
          eventPropGetter={(event) => {
            const typeColors = {
              "Student Event": "#F87171", // Red
              "Community Event": "#FBBF24", // Yellow
              Workshop: "#34D399", // Green
            };
            return {
              style: {
                backgroundColor: typeColors[event.type] || "#93C5FD", // Default Blue
                color: "white",
              },
            };
          }}
          onSelectEvent={handleEventClick} // Trigger modal on event click
        />
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-2xl w-11/12 md:w-2/3 lg:w-1/3 p-6 overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {selectedEvent.title}
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              {selectedEvent.type}
            </p>

            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">{selectedEvent.description}</p>
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedEvent.location}
                </p>
                <p>
                  <span className="font-semibold">Start:</span>{" "}
                  {moment(selectedEvent.start).format("LLL")}
                </p>
                <p>
                  <span className="font-semibold">End:</span>{" "}
                  {moment(selectedEvent.end).format("LLL")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;

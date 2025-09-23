import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/it";
import "moment-timezone";
moment.locale("it");
moment.tz.setDefault("Europe/Rome");
import "react-big-calendar/lib/css/react-big-calendar.css";
import { sendEnquiry } from "@/utils/api";
import Spinner from "./Spinner";
import InterestFormModal from "./InterestFormModal";

// --- BEGIN: JSON DATA PLACEHOLDER ---
const jsonData = {
  periodic_until: "2025-06-08",
  weekly_events: [
    {
      day: "Lunedì",
      events: [
        { name: "Buds CreAttività", time: "16:00-18:00" },
        { name: "Studenti: Studio di Gruppo", time: "14:00-17:00" },
      ],
    },
    {
      day: "Martedì",
      events: [
        { name: "Buds: Educazione Emozionale", time: "16:00-18:00" },
      ],
    },
    {
      day: "Mercoledì",
      events: [
        { name: "Studenti: Studio di Gruppo", time: "14:00-17:00" },
      ],
    },
    {
      day: "Giovedì",
      events: [
        { name: "Buds: Yoga Bimbi", time: "16:00-18:00" },
      ],
    },
    {
      day: "Venerdì",
      events: [
        { name: "Buds: Yogart", time: "16:00-18:00" },
        { name: "Buds: Potenziamento-Compiti", time: "16:00-18:00" },
      ],
    }
  ],
  specific_events: [
    {
      name: "Corso Animatori Centri Estivi",
      dates: ["2025-05-12", "2025-05-19", "2025-05-26", "2025-06-03"],
      time: "20:30-22:00",
      description: "Preparati all'estate! Corso pratico per formare animatori pronti a gestire i centri estivi con creatività e responsabilità. Imparerai tecniche di animazione, gestione dei gruppi e attività educative per bambini e ragazzi."
    },
    {
      name: "Corso Educazione Emozionale – Docenti",
      dates: ["2025-06-09", "2025-06-16", "2025-06-23", "2025-06-30"],
      time: "18:00-20:00",
    },
    {
      name: "Aperitivo in Villa",
      date: "2025-06-19",
      time: "18:00-20:00",
    },
    {
      name: "ESTATE FELICE – Aperitivo Educativo per Genitori",
      date: "2025-06-19",
      time: "18:00-20:00",
    },
    {
      name: "Bloom Summer Lab",
      dates: ["2025-06-09", "2025-06-10", "2025-06-11", "2025-06-12", "2025-06-13", "2025-06-16", "2025-06-17", "2025-06-18", "2025-06-19", "2025-06-20", "2025-06-23", "2025-06-24", "2025-06-25", "2025-06-26", "2025-06-27", "2025-06-30"],
      time: "18:00-20:00",
    },
    {
      name: "Mindfulness tra le righe",
      dates: ["2025-10-02", "2025-10-09", "2025-10-16", "2025-10-23", "2025-10-30", "2025-11-06", "2025-11-13", "2025-11-20", "2025-11-27", "2025-12-04", "2025-12-11", "2025-12-18", "2025-12-25"],
      time: "20:30-22:00",
      description: "Edizione autunnale: un percorso di lettura consapevole e pratiche di presenza per rallentare, ascoltarsi e vivere il presente con maggiore chiarezza e serenità.",
    },
    {
      name: "Pausa Mindful",
      dates: ["2025-10-01", "2025-10-08", "2025-10-15", "2025-10-22", "2025-10-29", "2025-11-05", "2025-11-12", "2025-11-19", "2025-11-26", "2025-12-03", "2025-12-10", "2025-12-17", "2025-12-24"],
      time: "13:15-14:15",
      description: "Prenditi un’ora tutta per te con Pausa Mindful, la camminata guidata che ti aiuta a rallentare, respirare e ritrovare presenza. <br /><br />Ogni mercoledì, dalle 13:15 alle 14:15, partenza da <b>Piazza Gaudenzio Sella</b>. <br /><br />Un momento speciale per staccare dal lavoro, ridurre lo stress e ricaricare energia e chiarezza.<br /><br />In caso di maltempo, l’esperienza si sposta indoor con semplici pratiche di mindfulness.",
    },
    {
      name: "Mindfulness in classe – Gestire emozioni e relazioni con consapevolezza",
      dates: ["2025-10-06"],
      time: "18:00-20:00",
      description: "Un incontro dedicato agli insegnanti per scoprire strumenti di educazione emozionale utili a gestire meglio le dinamiche di classe. Attraverso la mindfulness e pratiche esperienziali, i docenti impareranno a riconoscere e regolare le proprie emozioni, creando un clima sereno e costruttivo che favorisca l’apprendimento e il benessere degli studenti.",
    },
  ],
};
// --- END: JSON DATA PLACEHOLDER ---

const dayMap = {
  "Lunedì": 1,
  "Martedì": 2,
  "Mercoledì": 3,
  "Giovedì": 4,
  "Venerdì": 5,
  "Sabato": 6,
  "Domenica": 0,
};

function generateCalendarEvents(jsonData) {
  const events = [];
  const startDate = moment().tz("Europe/Rome");
  const endDate = moment(jsonData.periodic_until).tz("Europe/Rome");

  // Weekly recurring events
  jsonData.weekly_events.forEach(weekEvent => {
    const weekday = dayMap[weekEvent.day];
    let current = startDate.clone().day(weekday);
    if (current.isBefore(startDate)) current.add(7, 'days');
    while (current.isSameOrBefore(endDate)) {
      weekEvent.events.forEach(ev => {
        const [startH, startM] = ev.time.split('-')[0].split(':');
        const [endH, endM] = ev.time.split('-')[1].split(':');
        const start = current.clone().hour(startH).minute(startM);
        const end = current.clone().hour(endH).minute(endM);
        let type = "Buds";
        if (ev.name.toLowerCase().includes("studenti")) type = "Studenti";
        if (ev.name.toLowerCase().includes("mindfulness")) type = "Speciale";
        events.push({
          title: ev.name,
          start: start.toDate(),
          end: end.toDate(),
          type,
          recurring: true,
          originalDay: weekEvent.day,
        });
      });
      current.add(7, 'days');
    }
  });

  // Specific events
  jsonData.specific_events.forEach(ev => {
    if (ev.dates) {
      ev.dates.forEach(dateStr => {
        const [startH, startM] = ev.time ? ev.time.split('-')[0].split(':') : ['10', '00'];
        const [endH, endM] = ev.time ? ev.time.split('-')[1].split(':') : ['12', '00'];
        const start = moment.tz(dateStr, "Europe/Rome").hour(startH).minute(startM);
        const end = moment.tz(dateStr, "Europe/Rome").hour(endH).minute(endM);
        events.push({
          title: ev.name,
          start: start.toDate(),
          end: end.toDate(),
          type: "Speciale",
          recurring: false,
          description: ev.description || "",
        });
      });
    } else if (ev.date) {
      const [startH, startM] = ev.time ? ev.time.split('-')[0].split(':') : ['18', '00'];
      const [endH, endM] = ev.time ? ev.time.split('-')[1].split(':') : ['20', '00'];
      const start = moment.tz(ev.date, "Europe/Rome").hour(startH).minute(startM);
      const end = moment.tz(ev.date, "Europe/Rome").hour(endH).minute(endM);
      events.push({
        title: ev.name,
        start: start.toDate(),
        end: end.toDate(),
        type: "Speciale",
        recurring: false,
        description: ev.description || "",
      });
    }
  });

  return events;
}

const localizer = momentLocalizer(moment);

// Custom Event Component
const CustomEvent = ({ event }) => (
  <div
    className={`rounded-lg px-2 py-1 shadow-sm flex items-center gap-2 ${
      event.type === 'Buds'
        ? 'bg-green-200 text-green-900'
        : event.type === 'Studenti'
        ? 'bg-blue-200 text-blue-900'
        : 'bg-orange-200 text-orange-900'
    }`}
    style={{ minHeight: 32 }}
  >
    <span className="font-bold text-xs">
      {event.type === 'Buds' && '🌱'}
      {event.type === 'Studenti' && '📚'}
      {event.type === 'Speciale' && '⭐'}
    </span>
    <span className="truncate">{event.title}</span>
  </div>
);

// Custom Toolbar Component
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const label = () => {
    const date = toolbar.date;
    return moment(date).format('MMMM YYYY');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goToBack}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008C95] focus:ring-offset-2 transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goToCurrent}
          className="px-4 py-2 bg-[#008C95] text-white border border-[#008C95] rounded-lg hover:bg-[#006C73] focus:outline-none focus:ring-2 focus:ring-[#008C95] focus:ring-offset-2 transition-colors"
        >
          Oggi
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008C95] focus:ring-offset-2 transition-colors"
        >
          ›
        </button>
      </div>
      <div className="text-xl font-semibold text-gray-800">
        {label()}
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = generateCalendarEvents(jsonData);

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="typography mt-10 mb-10 ">Calendario Eventi</h1>
      {/* Legend */}
      <div className="flex gap-4 mb-4">
        <span className="flex items-center"><span className="w-4 h-4 bg-green-400 rounded-full mr-2"></span>Buds</span>
        <span className="flex items-center"><span className="w-4 h-4 bg-blue-400 rounded-full mr-2"></span>Studenti</span>
        <span className="flex items-center"><span className="w-4 h-4 bg-orange-400 rounded-full mr-2"></span>Speciale</span>
      </div>
      <div className="bg-white shadow-lg rounded-xl p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          date={currentDate}
          onNavigate={handleNavigate}
          defaultView="month"
          views={["month", "week", "day"]}
          eventPropGetter={(event) => {
            const typeColors = {
              Buds: "#34D399", // Green
              Studenti: "#3B82F6", // Blue
              Speciale: "#F59E42", // Orange
            };
            return {
              style: {
                backgroundColor: typeColors[event.type] || "#93C5FD",
                color: "white",
              },
            };
          }}
          onSelectEvent={setSelectedEvent}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar
          }}
        />
      </div>
      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-2xl w-11/12 md:w-2/3 lg:w-1/3 p-6 overflow-hidden">
            <button
              onClick={() => { setSelectedEvent(null); setShowInterestForm(false); }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Chiudi Modale"
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
              {selectedEvent.recurring && (
                <span> · Ricorrente ogni {selectedEvent.originalDay} fino al {moment(jsonData.periodic_until).format("LL")}</span>
              )}
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="text-sm text-center">
                <p>
                  <span className="font-semibold">Inizio:</span>{" "}
                  {moment(selectedEvent.start).format("LLL")}
                </p>
                <p>
                  <span className="font-semibold">Fine:</span>{" "}
                  {moment(selectedEvent.end).format("LLL")}
                </p>
              </div>
              
              {selectedEvent.description && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Descrizione</h3>
                  <div 
                    className="text-sm text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                  />
                </div>
              )}
            </div>

            {/* Interest Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowInterestForm(true)}
                className="px-6 py-2 bg-[#008C95] text-white font-medium text-sm rounded-md hover:bg-[#006C73] focus:outline-none focus:ring-2 focus:ring-[#008C95] focus:ring-offset-2"
              >
                Esprimi interesse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interest Form Modal */}
      <InterestFormModal
        isOpen={showInterestForm}
        onClose={() => setShowInterestForm(false)}
        interest={selectedEvent?.title}
      />
    </div>
  );
};

export default CalendarView;

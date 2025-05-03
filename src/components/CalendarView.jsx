import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/it";
moment.locale("it");
import "react-big-calendar/lib/css/react-big-calendar.css";

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
    },
  ],
  specific_events: [
    {
      name: "Corso Animatori Centri Estivi",
      dates: ["2025-05-12", "2025-05-19", "2025-05-26", "2025-06-03"],
    },
    {
      name: "Corso Educazione Emozionale – Docenti",
      dates: ["2025-06-09", "2025-06-16", "2025-06-23", "2025-06-30"],
    },
    {
      name: "Aperitivo in Villa",
      date: "2025-06-19",
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
  const startDate = moment();
  const endDate = moment(jsonData.periodic_until);

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
        events.push({
          title: ev.name,
          start: moment(dateStr + "T10:00").toDate(),
          end: moment(dateStr + "T12:00").toDate(),
          type: "Speciale",
          recurring: false,
        });
      });
    } else if (ev.date) {
      events.push({
        title: ev.name,
        start: moment(ev.date + "T18:00").toDate(),
        end: moment(ev.date + "T20:00").toDate(),
        type: "Speciale",
        recurring: false,
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

const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [interestData, setInterestData] = useState({ nome: '', cognome: '', telefono: '' });
  const [submitted, setSubmitted] = useState(false);
  const events = generateCalendarEvents(jsonData);

  const handleInterestChange = (e) => {
    setInterestData({ ...interestData, [e.target.name]: e.target.value });
  };

  const handleInterestSubmit = (e) => {
    e.preventDefault();
    console.log('Interesse evento:', { evento: selectedEvent.title, ...interestData });
    setSubmitted(true);
    setTimeout(() => {
      setShowInterestForm(false);
      setSubmitted(false);
      setInterestData({ nome: '', cognome: '', telefono: '' });
    }, 2000);
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
          toolbar={false}
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
              {/* <p className="leading-relaxed">{selectedEvent.description}</p> */}
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
            </div>

            {/* Interest Button and Form */}
            {!showInterestForm && !submitted && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowInterestForm(true)}
                  className="px-6 py-2 bg-green-600 text-white font-medium text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Esprimi interesse
                </button>
              </div>
            )}
            {showInterestForm && !submitted && (
              <form className="mt-6 flex flex-col gap-3" onSubmit={handleInterestSubmit}>
                <input
                  type="text"
                  name="nome"
                  value={interestData.nome}
                  onChange={handleInterestChange}
                  placeholder="Nome e Cognome"
                  className="px-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="tel"
                  name="telefono"
                  value={interestData.telefono}
                  onChange={handleInterestChange}
                  placeholder="Telefono"
                  className="px-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Invia
                </button>
              </form>
            )}
            {submitted && (
              <div className="mt-6 text-green-600 text-center font-semibold">
                Grazie per il tuo interesse! Ti ricontatteremo presto.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;

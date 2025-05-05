"use client"
import CalendarView from "@/components/CalendarView";
import Container from "@/components/Container";
import Eventcard from "@/components/Eventcard";
import SectionWithBackground from "@/components/SectionWithBackground";
import TestimonialCard from "@/components/Testimonial";
import EventsSection from "@/components/trial";
import { EventData } from "@/data/EventData";
import { TestimonialData } from "@/data/Testimonial";
import React, { useState } from "react";

// export const metadata = {
//   title: "Events",
//   description: "Bloom Events",
// };
const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: "", cellulare: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Replace '/api/interesse' with your actual endpoint
      const res = await fetch("/api/interesse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Errore nell'invio. Riprova.");
      setSuccess(true);
      setForm({ nome: "", cellulare: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <div
              className="mt-10 cursor-pointer bg-gradient-to-r from-[#008C95] via-[#F9A1BC] to-[#A7E8E5] rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-4 border-[#008C95] hover:scale-105 transition-transform duration-200"
              onClick={() => setShowModal(true)}
            >
              <h2 className="text-2xl font-extrabold text-white mb-2 drop-shadow">
                ESTATE FELICE – Aperitivo Educativo per Genitori
              </h2>
              <p className="text-lg text-white font-medium">
                22 Maggio – Ore 18.00 | I Faggi, Biella
              </p>
              <span className="mt-2 text-sm text-[#008C95] font-semibold animate-pulse bg-white bg-opacity-80 px-2 py-1 rounded">
                Clicca per saperne di più!
              </span>
            </div>

            {/* Modal Popup */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative">
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                    onClick={() => {
                      setShowModal(false);
                      setShowForm(false);
                      setSuccess(false);
                      setError("");
                    }}
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
                  {!showForm && !success && (
                    <button
                      className="bg-[#008C95] hover:bg-[#006C73] text-white font-bold py-2 px-4 rounded-lg w-full transition"
                      onClick={() => setShowForm(true)}
                    >
                      Esprimi Interesse
                    </button>
                  )}
                  {showForm && !success && (
                    <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nome e Cognome
                        </label>
                        <input
                          type="text"
                          required
                          className="px-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          value={form.nome}
                          onChange={e => setForm({ ...form, nome: e.target.value })}
                          placeholder="Inserisci il tuo nome e cognome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cellulare
                        </label>
                        <input
                          type="tel"
                          required
                          pattern="^[0-9\s\+\-]{7,15}$"
                          className="px-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          value={form.cellulare}
                          onChange={e => setForm({ ...form, cellulare: e.target.value })}
                          placeholder="Inserisci il tuo numero di cellulare"
                        />
                      </div>
                      {error && <div className="text-red-600 text-sm">{error}</div>}
                      <button
                        type="submit"
                        className="bg-[#008C95] hover:bg-[#006C73] text-white font-bold py-2 px-4 rounded-lg w-full transition disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? "Invio in corso..." : "Invia"}
                      </button>
                    </form>
                  )}
                  {success && (
                    <div className="mt-6 text-center text-[#008C95] font-semibold">
                      Grazie per il tuo interesse! Ti ricontatteremo presto.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <CalendarView />
          <h1 className="typography pt-10 lg:pt-16">Le voci di chi ci ha scelto</h1>

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

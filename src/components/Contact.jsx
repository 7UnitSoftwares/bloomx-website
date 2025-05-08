"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "../components/Button";
import Container from "./Container";
import { submitContactForm } from "@/utils/api";
import Toast from "./Toast";
import Spinner from './Spinner';

const data = [
  {
    id: 1,
    title: "BIELLAVIA TORINO 35, BIELLA",
    icon: "/contact/icon1.svg",
  },
  {
    id: 2,
    title: "bloom@bloom-bi.it",
    icon: "/contact/icon2.svg",
  },
  {
    id: 3,
    title: "(+39) 338 225 6056",
    icon: "/contact/icon3.svg",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    nomecognome: "",
    email: "",
    subject: "",
    mobile: "",
    body: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_YOUR_SERVICE_ID;
  const YOUR_TEMPLATE_ID = process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID;
  const YOUR_USER_ID = process.env.NEXT_PUBLIC_YOUR_USER_ID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      setShowToast(true);
      setFormData({
        nomecognome: "",
        email: "",
        subject: "",
        mobile: "",
        body: "",
      });
    } catch (error) {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setShowToast(false);
    setShowError(false);
  };

  return (
    <section
      id="contact"
      className="lg:px-32 pb-16 px-5 bg-white mt-10 pt-10  "
    >
      <Container>
        <div className="overflow-hidden">
          <h1 className="text-4xl font-bold text-[#00A59B]">
            Hai domande? <br />Contattaci! 👋{" "}
          </h1>
          <p className="mt-3  text-lg font-light text-[#808080]">
            Siamo qui per rispondere a qualsiasi domanda tu possa avere su Bloom o sui nostri
            programmi. Non esitare a <br /> contattarci tramite il modulo qui sotto,
            e ti risponderemo il prima possibile!
          </p>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
                <div className="">
                  <label
                    htmlFor="name"
                    className="block font-semibold text-gray-700"
                  >
                    Nome e Cognome
                  </label>
                  <input
                    type="text"
                    id="nomecognome"
                    required
                    name="nomecognome"
                    value={formData.nomecognome}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="email"
                    className="block font-semibold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="mobile"
                    className="block font-semibold text-gray-700"
                  >
                    Numero di telefono
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="subject"
                    className="block font-semibold text-gray-700"
                  >
                    Oggetto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                  >
                    <option value="">Seleziona un oggetto</option>
                    <option value="Buds">Buds</option>
                    <option value="Studenti">Studenti</option>
                    <option value="Genitori">Genitori</option>
                    <option value="BloomHer">BloomHer</option>
                    <option value="Creator">Creator</option>
                    <option value="Altro">Altro</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="body"
                  className="block font-semibold text-gray-700"
                >
                  Messaggio
                </label>
                <textarea
                  id="body"
                  name="body"
                  required
                  value={formData.body}
                  onChange={handleChange}
                  className="mt-1 p-2 min-h-24 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-center lg:justify-start">
                <Button
                  type="submit"
                  className="px-4 py-2 bg-[#00A59B] text-white rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.nomecognome || !formData.email || !formData.mobile || !formData.subject || !formData.body || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" className="text-white justify-center" />
                      <span>Invio in corso...</span>
                    </>
                  ) : (
                    'Contattaci'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>

      {showToast && (
        <Toast
          message="Messaggio inviato con successo!"
          type="success"
          onClose={closeToast}
        />
      )}
      {showError && (
        <Toast
          message="Errore nell'invio del messaggio!"
          type="error"
          onClose={closeToast}
        />
      )}
    </section>
  );
};

export default Contact;

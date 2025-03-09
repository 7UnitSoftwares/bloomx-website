"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "../components/Button";
import Container from "./Container";

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
    name: "",
    email: "",
    companyName: "",
    phone: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);

  const YOUR_SERVICE_ID = process.env.NEXT_PUBLIC_YOUR_SERVICE_ID;
  const YOUR_TEMPLATE_ID = process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID;
  const YOUR_USER_ID = process.env.NEXT_PUBLIC_YOUR_USER_ID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, formData, YOUR_USER_ID)
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setShowToast(true);
          setFormData({
            name: "",
            email: "",
            companyName: "",
            message: "",
            phone: "",
          });
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        },
        (error) => {
          console.error("Email sending failed:", error);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        }
      );
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
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    name="name"
                    value={formData.name}
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
                    htmlFor="phone"
                    className="block font-semibold text-gray-700"
                  >
                    Phone no
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="companyName"
                    className="block font-semibold text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 p-2 min-h-24 w-full border focus:outline-none border-gray-300 rounded-md bg-[#F3F3F3]"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-center lg:justify-start">
                <Button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Contact Us
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>

      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-lg">
          Message sent successfully!
        </div>
      )}
      {showError && (
        <div className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-lg">
          Message sending failed!
        </div>
      )}
    </section>
  );
};

export default Contact;

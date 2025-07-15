import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaFacebook, FaMap, FaYoutube } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import Loading from "../components/Loading";
import axios from "axios";
import HeroSection from "../components/HeroSection";

export default function Contact() {
  const [showButton, setShowButton] = useState(false);
  const [contact, setContact] = useState(null);
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(""); // To track form submission status
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchValue = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/pages/contact`);
        const res = await axios.get(`${api}/contact/`);
        if (res.status === 200) {
          setPage(response.data.data);
          setContact(res.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching contact: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchValue();
  }, [api]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");

    try {
      const response = await axios.post(`${api}/sendMail`, formData);
      if (response.status === 200) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
      } else {
        setFormStatus("Error sending message. Please try again.");
      }
    } catch (error) {
      setFormStatus("Error sending message. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Nav />
      {/* Hero Section */}
      {page && (
        <HeroSection
          title={page.heroSection.title}
          image={page.heroSection.image}
          body={page.heroSection.body}
        />
      )}
      {/* Main content wrapper - apply animation once here */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="min-h-screen bg-blue-50 p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center py-16"
      >
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-5xl">
          {/* Left Form Section */}
          <div className="flex flex-col justify-center items-left text-left w-full lg:w-1/2 space-y-4 md:space-y-5 text-white bg-primary p-6 sm:p-8 md:p-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-secondary">
                Get in touch
              </h1>
              <div className="border-2 border-accent w-[100px]"></div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4 md:space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Email"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Phone"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="border-b-2 bg-transparent text-white focus:outline-none focus:border-b-accent p-2"
                placeholder="Message"
              ></textarea>
              <button
                type="submit"
                className="bg-accent p-2 rounded-sm mt-8 font-bold hover:bg-opacity-90 transition-colors"
              >
                Submit
              </button>
            </form>
            {formStatus && (
              <p className="mt-4 text-white">{formStatus}</p>
            )}
          </div>

          {/* Right Info Section */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 bg-white text-black flex flex-col justify-between">
            <div className="space-y-4 md:space-y-5">
              <p className="font-bold text-sm md:text-base">
                Feel free to reach out using the contact information
              </p>

              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>

              {/* Contact info */}
              <div className="flex flex-col sm:flex-row text-xs sm:text-sm gap-5 sm:gap-3">
                <div className="space-y-2 sm:w-1/3">
                  <p className="font-bold mb-1 md:mb-2">MAILING ADDRESS</p>
                  <div>
                    {contact?.mailingAddress?.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-bold mb-1 md:mb-2">PHYSICAL ADDRESS</p>
                  <div>
                    {contact?.physicalAddress?.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-bold mb-1 md:mb-2">REACH US</p>
                  <div>
                    {contact?.reachUs?.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex space-x-5 text-xl md:text-2xl mt-5 text-primary items-center">
              <a
                href="https://www.facebook.com/profile.php?id=100064789866065#"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com/channel/UC4850z46i9u0mvs8SnWIEqQ/featured"
                className="hover:text-accent transition-colors text-2xl md:text-3xl"
                aria-label="Youtube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.google.com/maps/contrib/..."
                className="hover:text-accent transition-colors"
                aria-label="Map"
              >
                <FaMap />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer with animation */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>

      {/* Scroll to top button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} className="md:text-3xl" />
        </button>
      )}
    </div>
  );
}

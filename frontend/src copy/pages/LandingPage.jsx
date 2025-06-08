import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import DonateButton from "../components/DonateButton";
import { motion } from "framer-motion";
import {
  FaArrowCircleUp,
  FaUserInjured,
  FaProcedures,
  FaHospital,
  FaEye,
} from "react-icons/fa";
import heroImage from "../assets/Landing frame.png";
import mapImage from "../assets/map.png";
import profileImage from "../assets/profile.png";
import CoreValues from "../components/CoreValues";

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    // The "overflow-x-hidden" class was removed from this div to fix the double scrollbar.
    <div>
      <Nav />

      <main>
        <div
          className="relative h-[40vh] sm:h-[50vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center px-4 space-y-4 sm:space-y-6 md:space-y-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary leading-tight">
              Let There Be Sight.
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary">
              Bringing vision and hope to the people of Nepal through quality
              eye care services
            </p>
            <DonateButton />
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary"
          >
            One Vision at a Time.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]"
          >
            Our vision is a Nepal where no one is blind from avoidable causes,
            and everyone can access the eye care they need to live a full and
            dignified life.
          </motion.p>
        </motion.div>

        <CoreValues />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen py-10 sm:py-12 md:py-16 flex flex-col items-center justify-center px-4"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary mb-6 sm:mb-8 md:mb-10"
          >
            Our Services
          </motion.h2>
          <motion.img
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            src={mapImage}
            className="w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] h-auto max-h-[30vh] sm:max-h-[40vh] md:max-h-[50vh] lg:max-h-[75vh] object-contain"
            alt="Map of services offered"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-10 bg-primary text-white py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-20"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary"
          >
            Our Impacts
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full">
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-xl sm:text-2xl font-bold text-center"
            >
              <FaUserInjured className="mb-2 text-3xl sm:text-4xl text-support inline-block" />
              <h1>46,868,060</h1>
              <h2>OPD Visits</h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-xl sm:text-2xl font-bold text-center"
            >
              <FaProcedures className="mb-2 text-3xl sm:text-4xl text-support inline-block" />
              <h1>5,392,224</h1>
              <h2>Surgeries</h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-xl sm:text-2xl font-bold text-center"
            >
              <FaHospital className="mb-2 text-3xl sm:text-4xl text-support inline-block" />
              <h1>150+</h1>
              <h2>Hospitals</h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-xl sm:text-2xl font-bold text-center"
            >
              <FaEye className="mb-2 text-3xl sm:text-4xl text-support inline-block" />
              <h1>300+</h1>
              <h2>Eye Care Centers</h2>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen py-12 sm:py-16 md:py-20 flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10 justify-center"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary"
          >
            Success Stories
          </motion.h2>
          <motion.section
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row items-center w-[90%] sm:w-[85%] md:w-[80%] lg:w-3/4 justify-between px-4 sm:px-6 py-6 sm:py-8 md:py-12 bg-grey rounded-md shadow-sm"
          >
            <div className="md:w-1/2 flex justify-center">
              <img
                src={profileImage}
                alt="Profile of Bishal Dhami"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="w-full text-center md:text-left mt-6 md:mt-0 px-2 sm:px-4">
              <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl italic font-semibold text-gray-800">
                "I'm thankful for this glass- it's allowing me to perceive the
                world in an entirely different way. Thank You."
              </blockquote>
              <cite className="block mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">
                — Bishal Dhami
              </cite>
            </div>
          </motion.section>
        </motion.div>
      </main>
      
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </motion.div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </button>
      )}
    </div>
  );
}
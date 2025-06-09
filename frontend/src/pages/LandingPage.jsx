import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
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
import Impacts from "../components/Impacts";
import Stories from "../components/Stories";

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div>
      <Nav />
      <main>
        <HeroSection
          image={heroImage}
          heading="Let There Be Sight."
          subheading="Bringing vision and hope to the people of Nepal through quality eye care services"
        />

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

        <Impacts />

        <Stories />
      </main>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
        <Footer />
      </motion.div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full shadow-lg hover:bg-support transition"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} />
        </button>
      )}
    </div>
  );
}

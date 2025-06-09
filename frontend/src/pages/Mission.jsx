import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import mission from "../assets/mission.jpg";
import MissionSection from "../components/MissionSection";
import ObjectivesSection from "../components/ObjectivesSection";
import SpecificObjectives from "../components/SpecificObjectives";
import CoreValues from "../components/CoreValues";
import Footer from "../components/Footer";
import Commitments from "../components/Commitments";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";

export default function Mission() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <div
        className="relative h-[40vh] sm:h-[90vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${mission})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center px-4 sm:px-6 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-secondary leading-tight">
            Our Mission & Objectives
          </h1>
        </div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="items-center justify-center flex flex-col text-center py-8 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-6"
      >
        <motion.h2
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="font-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-bold p-2 sm:p-3 md:p-5"
        >
          One Vision At a Time
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-bold w-full max-w-prose sm:max-w-2xl md:max-w-3xl lg:max-w-4xl font-primary mt-2 sm:mt-3 md:mt-4"
        >
          Our vision is a Nepal where no one is blind from avoidable causes, and
          everyone can access the eye care they need to live a full and
          dignified life.
        </motion.p>
      </motion.div>

      <MissionSection />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center mb-6 sm:mb-8 py-8 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-6"
      >
        <motion.h2
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="font-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary font-bold p-2 sm:p-3 md:p-5"
        >
          About NNJS
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl font-primary px-2 sm:px-8 md:px-12 lg:px-20 text-center max-w-4xl mx-auto"
        >
          The Nepal Netra Jyoti Sangh (NNJS) is the central coordinating body
          for eye care in Nepal. It liaises with eye hospitals, the Government
          of Nepal, and national and international organizations to support eye
          health programs and ensure quality standards. NNJS plays a key role in
          program evaluation, resource mobilization, community engagement, and
          promoting self-reliance.
        </motion.p>
      </motion.div>

      <ObjectivesSection />
      <SpecificObjectives />
      <CoreValues />
      <Commitments />
      <Footer />

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp
            size={20}
            className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          />
        </button>
      )}
    </div>
  );
}

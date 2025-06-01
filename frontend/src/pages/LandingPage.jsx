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
    <div>
      <Nav />

      <main>
        <div
          className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-10">
            <h1 className="text-6xl font-bold font-secondary">
              Let There Be Sight.
            </h1>
            <p className="text-xl font-bold font-primary">
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
          className="flex flex-col items-center justify-center h-[50vh] text-center space-y-5"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl font-bold text-primary font-secondary"
          >
            One Vision at a Time.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-xl font-bold font-primary w-[55vw]"
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
          className="h-screen flex flex-col items-center justify-center"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl font-bold text-primary font-secondary"
          >
            Our Services
          </motion.h2>
          <motion.img
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            src={mapImage}
            className="h-[75vh]"
            alt="Map of services offered"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center justify-center space-y-10 bg-primary text-white p-20"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl font-bold font-secondary"
          >
            Our Impacts
          </motion.h2>
          <div className="flex justify-evenly w-full flex-wrap gap-8">
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-2xl font-bold text-center"
            >
              <FaUserInjured className="mb-2 text-4xl text-support inline-block" />
              <h1>46,868,060</h1>
              <h2>OPD Visits</h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-2xl font-bold text-center"
            >
              <FaProcedures className="mb-2 text-4xl text-support inline-block" />
              <h1>5,392,224</h1>
              <h2>Surgeries</h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-2xl font-bold text-center"
            >
              <FaHospital className="mb-2 text-4xl text-support inline-block" />
              <h1>150+</h1>
              <h2>Hospitals</h2>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              className="font-secondary text-2xl font-bold text-center"
            >
              <FaEye className="mb-2 text-4xl text-support inline-block" />
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
          className="h-screen flex flex-col items-center space-y-10 justify-center"
        >
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl font-bold text-primary font-secondary"
          >
            Success Stories
          </motion.h2>
          <motion.section
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row items-center w-3/4 justify-between px-6 py-12 bg-grey rounded-md"
          >
            <div className="md:w-1/2 flex justify-center">
              <img
                src={profileImage}
                alt="Profile of Bishal Dhami"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="w-full text-center md:text-left mt-6 md:mt-0">
              <blockquote className="text-xl italic font-semibold text-gray-800 font-italic">
                “I’m thankful for this glass- it’s allowing me to perceive the
                world in an entirely different way. Thank You.”
              </blockquote>
              <cite className="block mt-4 text-gray-500">— Bishal Dhami</cite>
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
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={30} />
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowCircleUp,
  FaUserInjured,
  FaProcedures,
  FaHospital,
  FaEye,
} from "react-icons/fa";

export default function Impacts() {
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

  // Data arrays
  const impactsData = [
    { Icon: FaUserInjured, value: "46,868,060", label: "OPD Visits" },
    { Icon: FaProcedures, value: "5,392,224", label: "Surgeries" },
    { Icon: FaHospital, value: "150+", label: "Hospitals" },
    { Icon: FaEye, value: "300+", label: "Eye Care Centers" },
  ];

  return (
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
        {impactsData.map(({ Icon, value, label }, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="text-center font-bold font-secondary text-xl"
          >
            <Icon className="mb-2 text-support text-4xl inline-block" />
            <h1>{value}</h1>
            <h2>{label}</h2>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

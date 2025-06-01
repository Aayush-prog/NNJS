import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import mission from "../assets/mission.jpg";
import MissionSection from "../components/MissionSection";
import ObjectivesSection from "../components/ObjectivesSection";
import SpecificObjectives from "../components/SpecificObjectives";
import CoreValues from "../components/CoreValues";
import Footer from "../components/Footer";
import Commitments from "../components/Commitments";
import { motion } from "motion/react";
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
    <div>
      <Nav />
      <div
        className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${mission})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center space-y-10">
          <h1 className="text-6xl font-bold font-secondary ">
            Our Mission & Objectives
          </h1>
        </div>
      </div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="items-center justify-center flex flex-col text-center h-[50vh]"
      >
        <motion.h2
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="font-secondary text-4xl text-primary font-bold p-5"
        >
          One Vision At a Time
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-xl font-bold w-[55vw] font-primary"
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
        className="flex flex-col items-center mb-8 py-30"
      >
        <motion.h2
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="font-secondary text-4xl text-primary font-bold p-5"
        >
          About NNJS
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-xl font-primary px-24 text-center"
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
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
        >
          <FaArrowCircleUp size={30} />
        </button>
      )}
    </div>
  );
}

import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import team from "../assets/team.jpg";
import { motion } from "motion/react";
import FounderCaraousel from "../components/FounderCaraousel";
import PastChairpersons from "../components/PastChairperson";
import Board from "../components/Board";
import StaffSection from "../components/StaffSection";
import { FaArrowCircleUp } from "react-icons/fa";

export default function Team() {
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
      <main>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative h-[40vh] sm:h-[50vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${team})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center px-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary">
              Meet Our Team
            </h1>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="items-center justify-center flex flex-col text-center py-8 sm:py-12 md:py-16"
        >
          <h1 className="font-secondary text-2xl sm:text-3xl md:text-4xl text-primary font-bold p-3 sm:p-4 md:p-5">
            The Eyes Behind the Vision
          </h1>
          <div className="text-sm sm:text-base md:text-lg font-primary max-w-6xl mx-auto px-4 space-y-4 sm:space-y-5 md:space-y-6">
            <p>
              Nepal Netra Jyoti Sangh began as the shared dream of a few
              passionate individuals — but it is the strength, compassion, and
              unity of an incredible team that carries that dream forward every
              day.
            </p>

            <p>
              From the doctors, nurses, and technicians who restore sight, to
              the outreach workers and volunteers who bring care to the most
              remote corners of Nepal — every hand plays a vital role. From the
              support staff who keep our centers running smoothly, to the
              visionary leaders guiding our mission, NNJS is powered by people
              committed to making a difference.
            </p>

            <p>
              With board members, partners, and dedicated staff across the
              country, our team reflects the spirit of service and the heart of
              the communities we serve. Together, we are building a future where
              no one has to live in the dark.
            </p>

            <p className="text-primary font-bold">
              We are NNJS — united by purpose, driven by care.
            </p>
          </div>
        </motion.div>

        <FounderCaraousel />
        <PastChairpersons />
        <Board />
        <StaffSection />
      </main>

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

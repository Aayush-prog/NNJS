import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import mission from "../assets/mission.jpg";
import eye_hospital from "../assets/eye_hospital.png";
import { motion } from "motion/react";
import Footer from "../components/Footer.jsx";
import DonateButton from "../components/DonateButton";

export default function Locations() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate(); 

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
    hidden: { opacity: 0 },
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
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
        <DonateButton />
      </div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${mission})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center space-y-10">
          <h1 className="text-6xl font-bold font-secondary ">
            Hospitals and Eye Care Centers
          </h1>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <img src={eye_hospital} alt="Eye Hospital" />
      </div>
      <Footer />
    </div>
  );
}

import { React, useState, useEffect } from "react";
import { Outlet, useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import for_location_page from "../assets/Locations.png";
import eye_hospital from "../assets/eye_hospital.png";
import { motion } from "motion/react";
import Footer from "../components/Footer.jsx";
import { FaArrowCircleUp } from "react-icons/fa";
import AllBranches from "../components/AllBranches.jsx";
import HospitalDetail from "../components/HospitalDetail";
import CenterDetail from "../components/CenterDetail";
import BranchDetail from "../components/BranchDetail";

export default function WhatWeDo() {
  const [selectedLists, setSelectedLists] = useState(["hospital"]);
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

  // Toggle selection for a list
  const toggleList = (list) => {
    setSelectedLists((prev) =>
      prev.includes(list)
        ? prev.filter((item) => item !== list)
        : [...prev, list]
    );
  };

  // Detect if a detail route is active
  const matchHospital = useMatch("/what_we_do/hospital/:id");
  const matchCare = useMatch("/what_we_do/care/:id");
  const matchBranch = useMatch("/what_we_do/branch/:id");

  return (
    <div className="w-full overflow-x-hidden">
      <Nav />
      {/* Conditionally render detail overlays */}
      {matchHospital && <HospitalDetail />}
      {matchCare && <CenterDetail />}
      {matchBranch && <BranchDetail />}

      {/* Keep rendering the rest of the page */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50"></div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[40vh] sm:h-[90vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${for_location_page})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center px-4 space-y-5 sm:space-y-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-secondary">
            Hospitals and Eye Care Centers
          </h1>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 mt-14">
        <img src={eye_hospital} alt="Eye Hospital" className="w-full h-auto" />
      </div>

      
      <div className="px-4 sm:px-6 md:px-8">
        <AllBranches />
      </div>

      <Footer />

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

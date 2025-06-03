import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import for_location_page from "../assets/Locations.png";
import eye_hospital from "../assets/eye_hospital.png";
import { motion } from "motion/react";
import Footer from "../components/Footer.jsx";
import DonateButton from "../components/DonateButton";
import EyeHospitalList from "../components/EyeHospitalList";
import EyeCareCenterList from "../components/EyeCareCenterList";
import DistrictPresidentList from "../components/DistrictPresidentList";
import BranchList from "../components/BranchList";
import AllBranches from "../components/AllBranches";



export default function Locations() {
  const [selectedLists, setSelectedLists] = useState(["hospital"]); // array for multiple selections
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

  return (
    <div>
      <Nav />
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
       
      </div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${for_location_page})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center space-y-10">
          <h1 className="text-6xl font-bold font-secondary ">
            Hospitals and Eye Care Centers
          </h1>
          
        </div>
        
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 py-5">
        <img src={eye_hospital} alt="Eye Hospital" />
      </div>

      {/* Selection Buttons */}
      {/* <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${selectedLists.includes("hospital") ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => toggleList("hospital")}
        >
          Eye Hospitals
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedLists.includes("care") ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => toggleList("care")}
        >
          Eye Care Centers
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedLists.includes("president") ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => toggleList("president")}
        >
          District Presidents
        </button>
      </div> */}

      {/* Conditionally Render Lists */}
      {/* {selectedLists.includes("hospital") && <EyeHospitalList />}
      {selectedLists.includes("care") && <EyeCareCenterList />}
      {selectedLists.includes("president") && <DistrictPresidentList />} */}
      <AllBranches />
      <Footer />
    </div>
  );  
}

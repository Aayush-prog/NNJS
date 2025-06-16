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
import axios from "axios";
import HeroSection from "../components/HeroSection.jsx";
import SubSection from "../components/SubSection.jsx";
export default function WhatWeDo() {
  const [selectedLists, setSelectedLists] = useState(["hospital"]);
  const [showButton, setShowButton] = useState(false);
  const [ecc, setEcc] = useState();
  const [branches, setBranches] = useState();
  const [hospitals, setHospitals] = useState();
  const [whatWeDo, setWhatWeDo] = useState();
  const api = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/whatWeDo`);
        const res1 = await axios.get(`${api}/branches/`);
        const res2 = await axios.get(`${api}/eyeCareCenters/`);
        const res3 = await axios.get(`${api}/eyeHospitals/`);
        console.log(res.data);
        if (res.status === 200) {
          setWhatWeDo(res.data.data);
          setEcc(res2.data.data);
          setBranches(res1.data.data);
          setHospitals(res3.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching page: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchPage();
  }, [api]);
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
      {whatWeDo && (
        <HeroSection
          title={whatWeDo.heroSection.title}
          image={whatWeDo.heroSection.image}
          body={whatWeDo.heroSection.body}
        />
      )}

      {whatWeDo && (
        <SubSection
          title={whatWeDo.subSection1.title}
          image={whatWeDo.subSection1.image}
          body={whatWeDo.subSection1.body}
        />
      )}

      {hospitals && ecc && branches && (
        <div className="px-4 sm:px-6 md:px-8">
          <AllBranches
            hospitals={hospitals}
            centers={ecc}
            presidents={branches}
          />
        </div>
      )}

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

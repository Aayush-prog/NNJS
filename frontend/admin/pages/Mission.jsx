import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import MissionSection from "../components/MissionSection";
import ObjectivesSection from "../components/ObjectivesSection";
import SpecificObjectives from "../components/SpecificObjectives";
import CoreValues from "../components/CoreValues";
import Footer from "../components/Footer";
import Commitments from "../components/Commitments";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
import Loading from "../components/Loading";
import axios from "axios";
export default function Mission() {
  const [showButton, setShowButton] = useState(false);
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/mission`);
        console.log(res.data);
        if (res.status === 200) {
          setMission(res.data.data);
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
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="overflow-x-hidden">
      <Nav />
      {mission && (
        <main>
          {mission.heroSection && (
            <HeroSection
              image={mission.heroSection.image}
              title={mission.heroSection.title}
              body={mission.heroSection.body}
              id={mission.heroSection._id}
            />
          )}
          {mission.subSection1 && (
            <SubSection
              title={mission.subSection1.title}
              image={mission.subSection1.image}
              body={mission.subSection1.body}
              id={mission.subSection1._id}
            />
          )}

          <MissionSection />

          {mission.subSection2 && (
            <SubSection
              title={mission.subSection2.title}
              image={mission.subSection2.image}
              body={mission.subSection2.body}
              id={mission.subSection2._id}
            />
          )}

          <ObjectivesSection />
          <SpecificObjectives />
          <CoreValues />
          <Commitments />
        </main>
      )}
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

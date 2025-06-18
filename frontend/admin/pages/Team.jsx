import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import FounderCaraousel from "../components/FounderCaraousel";
import PastChairpersons from "../components/PastChairperson";
import Board from "../components/Board";
import StaffSection from "../components/StaffSection";
import { FaArrowCircleUp } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
import Loading from "../components/Loading";
import axios from "axios";
export default function Team() {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState();
  const [people, setPeople] = useState();
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/team`);
        const response = await axios.get(`${api}/person`);
        console.log(res.data.data);
        console.log(response.data);
        if (res.status === 200) {
          setTeam(res.data.data);
          setPeople(response.data);
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
  if (loading) return <Loading />;
  return (
    <div className="overflow-x-hidden">
      <Nav />
      {team && (
        <main>
          <HeroSection
            title={team?.heroSection.title}
            body={team?.heroSection.body}
            image={team?.heroSection.image}
            id={team?.heroSection._id}
          />

          <SubSection
            title={team?.subSection1.title}
            body={team?.subSection1.body}
            image={team?.subSection1.image}
            id={team?.subSection1._id}
          />

          <FounderCaraousel person={people.founder} />
          <PastChairpersons person={people.past} />
          <Board person={people.board} />
          <StaffSection person={people.staff} />
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

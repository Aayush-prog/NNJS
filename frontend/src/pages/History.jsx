import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import TimelineCarousel from "../components/TimelineCarousel";
import { FaArrowCircleUp } from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
export default function History() {
  const [showButton, setShowButton] = useState(false);
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/history`);
        if (res.status === 200) {
          setHistory(res.data.data);
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  if (loading) return <Loading />;
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <main>
        {history && (
          <HeroSection
            title={history.heroSection.title}
            body={history.heroSection.body}
            image={history.heroSection.image}
          />
        )}
        {history && (
          <SubSection
            title={history.subSection1.title}
            body={history.subSection1.body}
            image={history.subSection1.image}
          />
        )}
        <TimelineCarousel />
        {history && (
          <SubSection
            title={history.subSection2.title}
            body={history.subSection2.body}
            image={history.subSection2.image}
          />
        )}
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

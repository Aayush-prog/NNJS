import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";
import CoreValues from "../components/CoreValues";
import Impacts from "../components/Impacts";
import Stories from "../components/Stories";
import SubSection from "../components/SubSection";
import axios from "axios";
import Loading from "../components/Loading";
import HospitalSlider from "../components/HospitalSlider";
export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);
  const [landing, setLanding] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/landing`);
        console.log(res.data);
        if (res.status === 200) {
          setLanding(res.data.data[0]);
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
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Nav />
      {landing && (
        <main>
          {landing.heroSection && (
            <HeroSection
              image={landing.heroSection.image}
              title={landing.heroSection.title}
              body={landing.heroSection.body}
            />
          )}
          {landing.subSection1 && (
            <SubSection
              title={landing.subSection1.title}
              image={landing.subSection1.image}
              body={landing.subSection1.body}
            />
          )}
          <CoreValues />
          {landing.subSection2 && (
            <SubSection
              title={landing.subSection2.title}
              image={landing.subSection2.image}
              body={landing.subSection2.body}
            />
          )}
          <HospitalSlider/>
          <Impacts />
          
          <Stories />
        </main>
      )}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </motion.div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-10 bg-accent text-white p-2 rounded-full shadow-lg hover:bg-support transition"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} />
        </button>
      )}
    </div>
  );
}

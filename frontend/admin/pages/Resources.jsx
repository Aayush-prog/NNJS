import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import { FaArrowCircleUp } from "react-icons/fa";
import ResourcesSection from "../components/ResourceSection";
import axios from "axios";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
export default function Resources() {
  const [showButton, setShowButton] = useState(false);
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/resources`);
        console.log(res.data);
        if (res.status === 200) {
          setResource(res.data.data);
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Nav />
      <main>
        {resource && (
          <HeroSection
            image={resource?.heroSection.image}
            title={resource?.heroSection.title}
            body={resource?.heroSection.body}
          />
        )}
        <ResourcesSection />
      </main>
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

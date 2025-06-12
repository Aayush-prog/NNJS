import { React, useState, useEffect } from "react";
import partnerImage from "../assets/partners.png";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";
import LogoSlider from "../components/LogoSlider";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
import axios from "axios";
export default function Partners() {
  const [showButton, setShowButton] = useState(false);
  const api = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  const [partner, setPartner] = useState();
  const [logos, setLogos] = useState();
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/partners`);
        const response = await axios.get(`${api}/partners`);
        console.log(res.data.data);
        console.log(response.data);
        if (res.status === 200) {
          setPartner(res.data.data);
          setLogos(response.data);
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
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div>
      <Nav />

      {partner && (
        <main>
          <HeroSection
            title={partner?.heroSection.title}
            body={partner?.heroSection.body}
            image={partner?.heroSection.image}
          />
          <SubSection
            title={partner?.subSection1.title}
            body={partner?.subSection1.body}
            image={partner?.subSection1.image}
          />
          <div className="py-12 md:py-0 md:h-screen flex flex-col justify-center items-center space-y-12 md:space-y-30 px-4">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary mb-6">
                Partner Organizations
              </h2>
              <div className="w-full flex justify-center items-center">
                <LogoSlider logos={logos.current} />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary mb-6">
                Past Supporters
              </h2>
              <div className="w-full flex justify-center items-center">
                <LogoSlider logos={logos.past} />
              </div>
            </div>
            {/* <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-secondary mb-6">
              Special Thanks
            </h2>
            <div className="w-full flex justify-center items-center py-8 md:py-10">
              <LogoSlider logos={special} />
            </div>
          </div> */}
          </div>
        </main>
      )}
      <Footer />
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full shadow-lg hover:bg-support transition z-10"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} />
        </button>
      )}
    </div>
  );
}

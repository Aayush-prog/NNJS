import { React, useState, useEffect } from "react";
import partnerImage from "../assets/partners.png";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";
import LogoSlider from "../components/LogoSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import proctor from "../assets/Proctor Foundation.png";
import ranzco from "../assets/ranzco foundation.png";
import restoring from "../assets/restoring visio foundation.png";
import ridley from "../assets/ridley eye foundation.png";
import see from "../assets/see foundation.png";
import norges from "../assets/norges foundation.png";
import nihr from "../assets/nihr.png";
import peekvision from "../assets/peekvision.png";
import qatarcharity from "../assets/qatarcharity.png";
import seva from "../assets/seva.png";
import sightlife from "../assets/sightlife.png";
import socialeye from "../assets/socialeye.png";
import johnhopkins from "../assets/johnhopkins.png";
import cbm from "../assets/cbm.png";
import champalimaud from "../assets/champalimaud.png";
import disvi from "../assets/disvi.png";
import helenkeller from "../assets/helenkeller.png";
import helpage from "../assets/helpage.png";
import helpmesee from "../assets/helpmesee.png";
import iris from "../assets/iris.png";
import iti from "../assets/iti.png";
import jica from "../assets/jica.png";
import lightfortheworld from "../assets/lightfortheworld.png";
import nippontv from "../assets/nippontv.png";
import opcfoundation from "../assets/opcfoundation.png";
import openeyes from "../assets/openeyes.png";
import redcross from "../assets/redcross.png";
import usaid from "../assets/usaid.png";
import nepal from "../assets/nepal.png";
import india from "../assets/india.png";
import pakistan from "../assets/pakistan.png";
import japan from "../assets/japan.png";
export default function Partners() {
  const [showButton, setShowButton] = useState(false);
  const special = [nepal, india, pakistan, japan];
  const past = [
    champalimaud,
    disvi,
    helenkeller,
    helpage,
    helpmesee,
    iris,
    iti,
    jica,
    lightfortheworld,
    nippontv,
    opcfoundation,
    openeyes,
    redcross,
    usaid,
  ];
  const partners = [
    ridley,
    see,
    restoring,
    ranzco,
    proctor,
    qatarcharity,
    seva,
    sightlife,
    socialeye,
    johnhopkins,
    cbm,
    norges,
    nihr,
  ];

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
  return (
    <div>
      <Nav />

      <main>
        <div
          className="relative h-[40vh] sm:h-[90vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${partnerImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-6 md:space-y-10 px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-secondary">
              Partners
            </h1>
          </div>
        </div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center justify-center py-12 md:h-[60vh] text-center space-y-4 bg-blue-50 px-4"
        >
          <motion.h1
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-primary font-secondary"
          >
            Together, We Bring Vision to Life
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-base font-primary w-full md:w-[75vw] lg:w-[55vw] leading-relaxed md:leading-loose"
          >
            We've always believed that lasting change happens when we work
            together.
            <br></br> Our partners help us reach more communities, deliver
            critical eye care services, and share our story with the world.
            <br></br> From local clinics to global supporters, every partnership
            brings us one step closer to a Nepal where no one is blind from
            avoidable causes.
            <br></br> To all our partners — thank you. Your support, trust, and
            collaboration make this journey possible.
          </motion.p>
        </motion.div>
        <div className="py-12 md:py-0 md:h-screen flex flex-col justify-center items-center space-y-12 md:space-y-30 px-4">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-secondary mb-6">
              Partner Organizations
            </h2>
            <div className="w-full flex justify-center items-center">
              <LogoSlider logos={partners} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-secondary mb-6">
              Past Supporters
            </h2>
            <div className="w-full flex justify-center items-center">
              <LogoSlider logos={past} />
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
      <Footer />
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-primary text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} md:size={30} />
        </button>
      )}
    </div>
  );
}

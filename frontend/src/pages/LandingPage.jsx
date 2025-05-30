import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import HeroImage from "../assets/Landing frame.png";
import DonateButton from "../components/DonateButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Map from "../assets/map.png";
import Banner from "../assets/banner.png";
import Profile from "../assets/profile.png";
import Integrity from "../assets/integrity.png";
import { motion } from "motion/react";
export default function LandingPage() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
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
  return (
    <div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Nav />
      </motion.div>

      <main>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-10">
            <h1 className="text-6xl font-bold font-secondary ">
              Let There Be Sight.
            </h1>
            <p className="text-xl font-bold font-primary">
              Bringing vision and hope to the people of Nepal through quality
              eye care services
            </p>
            <DonateButton />
          </div>
        </motion.div>
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-5">
          <h1 className="text-6xl font-bold text-primary font-secondary">
            One Vision at a Time.
          </h1>
          <p className="text-xl font-bold font-primary w-[55vw]">
            Our vision is a Nepal where no one is blind from avoidable causes,
            and everyone can access the eye care they need to live a full and
            dignified life.
          </p>
        </div>
        <div className="h-screen flex flex-col items-center justify-center bg-support space-y-10">
          <h1 className="text-6xl font-bold text-primary font-secondary ">
            Our Values
          </h1>
          <div className="flex items-center justify-center pl-10 bg-white">
            <div className="flex flex-col md:flex-row items-center  max-w-5xl">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                <h1 className="text-6xl font-bold text-primary font-secondary mb-4">
                  Integrity
                </h1>
                <p className="text-xl font-primary">
                  We demonstrate honesty, trust, and mutual respect in all our
                  interactions. We accept responsibility for our actions and the
                  resulting outcomes. Our team is consistently transparent,
                  open, and fair without prejudice in dealing with others. We
                  encourage everyone to speak up when something appears wrong or
                  inappropriate, fostering a culture of ethical practice.
                </p>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <img
                  src={Integrity}
                  alt="Integrity"
                  className="w-100 h-100 object-cover "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-primary font-secondary">
            Our Services
          </h1>
          <img src={Map} className="h-[75vh]" />
        </div>
        <div className="h-screen flex flex-col items-center space-y-10">
          <h1 className="text-6xl font-bold text-primary font-secondary">
            Our Impacts
          </h1>
          <div className="flex justify-evenly w-full">
            <div className="font-secondary text-primary text-4xl font-bold text-center">
              <h1>46,868,060</h1>
              <h2>OPD Visits</h2>
            </div>
            <div className="font-secondary text-primary text-4xl font-bold text-center">
              <h1>5,392,224</h1>
              <h2>Surgeries</h2>
            </div>
          </div>
          <img src={Banner} className="h-[50vh]" />
        </div>
        <div className="h-screen flex flex-col items-center space-y-10 justify-center">
          <h1 className="text-6xl font-bold text-primary font-secondary">
            Success Stories
          </h1>
          <section className="flex flex-col md:flex-row items-center w-3/4 justify-between px-6 py-12 bg-grey rounded-md">
            <div className="md:w-1/2 flex justify-center">
              <img
                src={Profile}
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="w-full text-center md:text-left ">
              <blockquote className="text-2xl font-semibold text-gray-800 font-italic">
                "Vision is the art of seeing what is invisible to others."
              </blockquote>
              <cite className="block mt-4 text-gray-500">— Bishal Dhami</cite>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

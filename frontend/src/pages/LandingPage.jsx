import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import DonateButton from "../components/DonateButton";
import { motion } from "framer-motion";
import {
  FaArrowCircleUp,
  FaUserInjured,
  FaProcedures,
  FaHospital,
  FaEye,
} from "react-icons/fa";
import heroImage from "../assets/Landing frame.png";
import mapImage from "../assets/map.png";
import integrityImage from "../assets/integrity.png";
import profileImage from "../assets/profile.png";
import governance from "../assets/governance.jpg";
import togetherness from "../assets/togetherness.jpg";
import transparency from "../assets/transparency.jpg";
import excellence from "../assets/excellence.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);

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
          className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-10">
            <h1 className="text-6xl font-bold font-secondary">
              Let There Be Sight.
            </h1>
            <p className="text-xl font-bold font-primary">
              Bringing vision and hope to the people of Nepal through quality
              eye care services
            </p>
            <DonateButton />
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="flex flex-col items-center justify-center h-[50vh] text-center space-y-5"
        >
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="text-6xl font-bold text-primary font-secondary"
          >
            One Vision at a Time.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="text-xl font-bold font-primary w-[55vw]"
          >
            Our vision is a Nepal where no one is blind from avoidable causes,
            and everyone can access the eye care they need to live a full and
            dignified life.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="h-screen flex flex-col items-center justify-center bg-support space-y-10"
        >
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-6xl font-bold text-primary font-secondary"
          >
            Our Values
          </motion.h1>
          <Swiper
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 1,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Mousewheel]}
            className="mySwiper"
            style={{ width: "75%" }}
          >
            <SwiperSlide>
              <div className="flex items-center justify-center pl-10 bg-white h-full">
                <div className="flex flex-col md:flex-row items-center max-w-5xl">
                  <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                    <h1 className="text-6xl font-bold text-primary font-secondary mb-4">
                      Integrity
                    </h1>
                    <p className="text-xl font-primary">
                      We demonstrate honesty, trust, and mutual respect in all
                      our interactions. We accept responsibility for our actions
                      and the resulting outcomes. Our team is consistently
                      transparent, open, and fair without prejudice in dealing
                      with others. We encourage everyone to speak up when
                      something appears wrong or inappropriate, fostering a
                      culture of ethical practice.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src={integrityImage}
                      alt="Illustration representing integrity"
                      className="w-100 h-100 object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center pl-10 bg-white h-full">
                <div className="flex flex-col md:flex-row items-center max-w-5xl">
                  <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                    <h1 className="text-6xl font-bold text-primary font-secondary mb-4">
                      Togetherness
                    </h1>
                    <p className="text-xl font-primary">
                      We believe in the power of unity and collaboration to
                      achieve shared goals. Our community thrives on mutual
                      support, respect, and inclusivity where every voice is
                      valued. Togetherness means working side by side,
                      overcoming challenges as a team, and celebrating
                      collective successes. By fostering strong relationships
                      and teamwork, we create an environment where everyone
                      feels connected and empowered to contribute their best.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src={togetherness}
                      alt="Illustration representing integrity"
                      className="w-100 h-[300px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center pl-10 bg-white h-full">
                <div className="flex flex-col md:flex-row items-center max-w-5xl">
                  <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                    <h1 className="text-6xl font-bold text-primary font-secondary mb-4">
                      Transparency
                    </h1>
                    <p className="text-xl font-primary">
                      We commit to openness and clarity in all our
                      communications and decisions. By sharing information
                      honestly and promptly, we build trust within our community
                      and stakeholders. Transparency empowers everyone to
                      understand how and why decisions are made, creating an
                      environment of accountability and confidence. We encourage
                      openness at every level, ensuring no information is
                      hidden, fostering a culture where questions are welcomed
                      and clarity is prioritized.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src={transparency}
                      alt="Illustration representing integrity"
                      className="w-100 h-[300px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center pl-10 bg-white h-full">
                <div className="flex flex-col md:flex-row items-center max-w-5xl">
                  <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                    <h1 className="text-6xl font-bold text-primary font-secondary mb-4">
                      Excellence
                    </h1>
                    <p className="text-xl font-primary">
                      We strive for the highest standards in everything we do,
                      continuously improving to deliver exceptional outcomes.
                      Excellence drives our commitment to quality, innovation,
                      and professionalism. By embracing challenges with
                      determination and a growth mindset, we inspire each other
                      to go beyond expectations. Our dedication to excellence
                      ensures that we consistently meet and exceed the needs of
                      those we serve.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src={excellence}
                      alt="Illustration representing integrity"
                      className="w-100 h-[300px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center pl-10 bg-white h-full">
                <div className="flex flex-col md:flex-row items-center max-w-5xl">
                  <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                    <h1 className="text-6xl font-bold text-primary font-secondary mb-4">
                      Governance
                    </h1>
                    <p className="text-xl font-primary">
                      Our governance framework is built on accountability,
                      integrity, and responsible leadership. We adhere strictly
                      to policies and regulations that guide our operations to
                      ensure fairness and justice. Through effective oversight
                      and clear structures, we safeguard the interests of all
                      stakeholders and maintain the highest ethical standards.
                      Our leaders serve as role models, ensuring that decisions
                      are transparent and aligned with our mission and values.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src={governance}
                      alt="Illustration representing integrity"
                      className="w-100 h-[300px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="h-screen flex flex-col items-center justify-center"
        >
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="text-6xl font-bold text-primary font-secondary"
          >
            Our Services
          </motion.h1>
          <motion.img
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            src={mapImage}
            className="h-[75vh]"
            alt="Map of services offered"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="flex flex-col items-center justify-center space-y-10 bg-primary text-white p-20"
        >
          <h1 className="text-6xl font-bold font-secondary">Our Impacts</h1>
          <div className="flex justify-evenly w-full flex-wrap gap-8">
            <div className="font-secondary text-4xl font-bold text-center">
              <FaUserInjured className="mb-2 text-support inline-block" />
              <h1>46,868,060</h1>
              <h2>OPD Visits</h2>
            </div>
            <div className="font-secondary text-4xl font-bold text-center">
              <FaProcedures className="mb-2 text-support inline-block" />
              <h1>5,392,224</h1>
              <h2>Surgeries</h2>
            </div>
            <div className="font-secondary text-4xl font-bold text-center">
              <FaHospital className="mb-2 text-support inline-block" />
              <h1>150+</h1>
              <h2>Hospitals</h2>
            </div>
            <div className="font-secondary text-4xl font-bold text-center">
              <FaEye className="mb-2 text-support inline-block" />
              <h1>300+</h1>
              <h2>Eye Care Centers</h2>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="h-screen flex flex-col items-center space-y-10 justify-center"
        >
          <h1 className="text-6xl font-bold text-primary font-secondary">
            Success Stories
          </h1>
          <section className="flex flex-col md:flex-row items-center w-3/4 justify-between px-6 py-12 bg-grey rounded-md">
            <div className="md:w-1/2 flex justify-center">
              <img
                src={profileImage}
                alt="Profile of Bishal Dhami"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="w-full text-center md:text-left mt-6 md:mt-0">
              <blockquote className="text-2xl italic font-semibold text-gray-800 font-italic">
                “I’m thankful for this glass- it’s allowing me to perceive the
                world in an entirely different way. Thank You.”
              </blockquote>
              <cite className="block mt-4 text-gray-500">— Bishal Dhami</cite>
            </div>
          </section>
        </motion.div>
      </main>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
      >
        <Footer />
      </motion.div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-primary text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={30} />
        </button>
      )}
    </div>
  );
}

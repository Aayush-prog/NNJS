import { React, useState, useEffect } from "react";
import partners from "../assets/partners.png";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";
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
import seva from "../assets/qatarcharity.png";
import sightlife from "../assets/sightlife.png";
import socialeye from "../assets/socialeye.png";
import johnhopkins from "../assets/johnhopkins.png";
import cbm from "../assets/cbm.png";
export default function Partners() {
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
          style={{ backgroundImage: `url(${partners})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-10">
            <h1 className="text-6xl font-bold font-secondary">Partners</h1>
          </div>
        </div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="flex flex-col items-center justify-center h-[70vh] text-center space-y-5"
        >
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="text-6xl font-bold text-primary font-secondary"
          >
            Together, We Bring Vision to Life
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="text-xl font-bold font-primary w-[55vw] leading-loose"
          >
            We’ve always believed that lasting change happens when we work
            together.<br></br> Our partners help us reach more communities,
            deliver critical eye care services, and share our story with the
            world.<br></br> From local clinics to global supporters, every
            partnership brings us one step closer to a Nepal where no one is
            blind from avoidable causes.<br></br>
            To all our partners — thank you. Your support, trust, and
            collaboration make this journey possible.
          </motion.p>
        </motion.div>
        <div>
          <h2>Partner Organizations</h2>
          <Swiper
            direction="horizontal"
            slidesPerView={5}
            spaceBetween={100}
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
              <img src={ridley} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={see} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={restoring}
                className="h-[150px] w-[150px] object-fill"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img src={ranzco} className="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={proctor} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={peekvision} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={qatarcharity} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={seva} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={sightlife} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={socialeye} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={johnhopkins} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={cbm} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={norges} className="h-[150px] w-[150px]" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={nihr} className="h-[150px] w-[150px]" />
            </SwiperSlide>
          </Swiper>
        </div>
      </main>
      <Footer />
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

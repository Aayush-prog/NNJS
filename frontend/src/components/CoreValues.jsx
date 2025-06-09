import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, EffectFade } from "swiper/modules";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

export default function CoreValues() {
  const [isMobile, setIsMobile] = useState(false);
  const [values, setValues] = useState(null);
  const api = import.meta.env.VITE_URL;
  // Check screen size on mount and resize for responsive Swiper effects
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  useEffect(() => {
    const fetchValue = async () => {
      try {
        console.log(api);
        const res = await axios.get(`${api}/values/`);
        console.log(res.data);
        if (res.status === 200) {
          setValues(res.data.data);
        } else {
          console.error("Error fetching value: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching value:", error);
      }
    };

    fetchValue();
  }, [api]);
  // Framer Motion variant for a simple fade-in-up animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const aspectRatio = "1 / 1";

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="min-h-[70vh] sm:min-h-[80vh] md:min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center bg-support space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
    >
      <motion.h2
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary px-4 text-center"
      >
        Our Values
      </motion.h2>

      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Swiper
          direction="horizontal"
          slidesPerView={1}
          spaceBetween={30}
          effect={isMobile ? "fade" : "slide"}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[EffectFade, Autoplay, Pagination, Mousewheel]}
          className="mySwiper w-full h-[580px] sm:h-[520px] md:h-[450px]"
        >
          {values?.map((value, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-start md:items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 bg-white py-6 sm:py-8 md:py-10 lg:py-12 rounded-lg shadow-sm h-full">
                <div className="flex flex-col-reverse md:flex-row items-center max-w-5xl gap-6 sm:gap-8">
                  <div className="md:w-1/2 text-center md:text-left md:mr-4 lg:mr-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary mb-2 sm:mb-3 md:mb-4">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-primary text-justify p-3">
                      {value.body}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={`${api}/images/${value.image}`}
                      alt={`Illustration representing ${value.image}`}
                      className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px] h-[260px] sm:h-[280px] md:h-[300px] lg:h-[350px] rounded-md object-cover object-center"
                      style={{ aspectRatio: aspectRatio }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
}

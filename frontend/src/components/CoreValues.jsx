import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, EffectFade } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import Loading from "./Loading";

export default function CoreValues() {
  const [isMobile, setIsMobile] = useState(false);
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;

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
        setLoading(true);
        const res = await axios.get(`${api}/values/`);
        if (res.status === 200) {
          setValues(res.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching value: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching value:", error);
      }
    };

    fetchValue();
  }, [api]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const aspectRatio = "1 / 1";
  if (loading) return <Loading />;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="min-h-[80vh] sm:min-h-[80vh] py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center bg-primary space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
    >
      <motion.h2
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-secondary px-4 text-center"
      >
        Our Core Values
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
          className="mySwiper w-full h-auto sm:h-[520px] md:h-[400px] md:w-[100%]"
        >
          {values?.map((value, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 h-full">
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-[20px] overflow-hidden shadow-md sm:shadow-lg md:shadow-xl flex flex-col md:flex-row w-full max-w-5xl h-[590px] sm:h-full">
                  <div className="w-full md:w-1/2 h-64 aspect-[4/3] md:aspect-auto md:h-auto max-h-[400px]">
                    <img
                      src={`${api}/images/${value.image}`}
                      alt={`Illustration representing ${value.image}`}
                      className="w-full h-full object-cover md:rounded-r-[20px]"
                      loading="lazy"
                    />
                  </div>

                  {/* Text Section (Below image on mobile, left on large) */}
                  <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex items-start justify-center">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary font-secondary mb-3 sm:mb-4">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-justify font-primary leading-relaxed">
                        {value.body}
                      </p>
                    </div>
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

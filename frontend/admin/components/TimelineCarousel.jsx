import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../components/Loading";

const TimelineCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchTimestone = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/timeStone/`);
        if (res.status === 200) {
          setData(res.data.data);
        } else {
          console.error("Error fetching timestone:", res.status);
        }
      } catch (error) {
        console.error("Error fetching timestone:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimestone();
  }, [api]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 px-4 max-w-7xl mx-auto"
    >
      <motion.h2
        variants={childVariants}
        className="text-4xl font-secondary font-bold text-center text-primary mb-12"
      >
        Our Journey Through Time
      </motion.h2>

      <motion.div variants={childVariants} className="relative">
        {/* Unbroken Horizontal Line (behind dots) */}
        <div className="absolute top-7 md:top-8 left-0 right-0 h-1 bg-primary z-0" />

        {/* Navigation Buttons - Positioned far from carousel */}
        <button
          ref={prevRef}
          className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-blue-200 text-primary p-2 rounded-full shadow hover:bg-primary hover:text-white transition-colors"
        >
          <FaArrowLeft />
        </button>
        <button
          ref={nextRef}
          className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-blue-200 text-primary p-2 rounded-full shadow hover:bg-primary hover:text-white transition-colors"
        >
          <FaArrowRight />
        </button>

        <Swiper
          direction="horizontal"
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Mousewheel, Navigation]}
          className="mySwiper w-full "
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                variants={childVariants}
                className="flex flex-col items-center text-center p-4 relative z-10 pb-10"
              >
                {/* Timeline Dot and Year */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary border-4 border-white shadow-lg" />
                  <div className="mt-2 text-sm sm:text-xl font-semibold text-primary">
                    {item.year}
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 w-full max-w-sm mx-auto h-90">
                  <img
                    src={`${api}/images/${item.image}`}
                    loading="lazy"
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold font-secondary text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-primary">
                      {item.description ?? item.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default TimelineCarousel;

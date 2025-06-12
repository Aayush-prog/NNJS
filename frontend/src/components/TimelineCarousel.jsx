import { React, useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { motion } from "motion/react";
import axios from "axios";
import Loading from "../components/Loading";

const TimelineCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchTimestone = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/timeStone/`);
        if (res.status === 200) {
          const getGroupedSlides = (data) => {
            let itemsPerSlide = 3;

            const grouped = [];
            for (let i = 0; i < data.length; i += itemsPerSlide) {
              grouped.push(data.slice(i, i + itemsPerSlide));
            }
            return grouped;
          };

          const groupedSlides = getGroupedSlides(res.data.data);
          console.log(groupedSlides);
          setData(groupedSlides);
          setLoading(false);
        } else {
          console.error("Error fetching timestone: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching timestone:", error);
      }
    };

    fetchTimestone();
  }, [api]);
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  // Adjust grouped slides based on screen size

  if (loading) return <Loading />;
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="py-8 sm:py-12 md:py-16 px-4 max-w-7xl mx-auto"
    >
      <motion.h2
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.05 }}
        className="text-2xl sm:text-3xl md:text-4xl font-secondary font-bold text-center text-primary mb-6 sm:mb-8 md:mb-12"
      >
        Our Journey Through Time
      </motion.h2>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.05 }}
        className="relative"
      >
        <button
          className="hidden md:block absolute left-0 sm:left-4 md:-left-6 top-4 -translate-y-1/2 z-10 bg-blue-200 text-primary p-2 sm:p-3 rounded-full shadow hover:bg-primary hover:text-white transition-colors duration-300"
          ref={prevRef}
          aria-label="Previous slide"
        >
          <FaArrowLeft className="text-sm sm:text-base" />
        </button>

        <button
          className="hidden md:block absolute right-0 sm:right-8 md:-right-6 top-4 -translate-y-1/2 z-10 bg-blue-200 text-primary p-2 sm:p-3 rounded-full shadow hover:bg-primary hover:text-white transition-colors duration-300"
          ref={nextRef}
          aria-label="Next slide"
        >
          <FaArrowRight className="text-sm sm:text-base" />
        </button>

        <Swiper
          direction="horizontal"
          slidesPerView={1}
          spaceBetween={30}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
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
          modules={[Autoplay, Pagination, Mousewheel, Navigation]}
          className="mySwiper"
          style={{ width: "100%", maxWidth: "100%" }}
        >
          {data?.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="px-4 sm:px-8 md:px-12">
                <div className="relative mb-6 sm:mb-10">
                  <div className="h-1 bg-primary absolute top-3 left-0 right-0 sm:top-4"></div>
                  <div className="flex relative z-10">
                    {group?.map((item, i) => (
                      <div
                        key={i}
                        className="text-center w-full sm:w-1/2 lg:w-1/3"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary border-4 border-white mx-auto shadow-lg"></div>
                        <div className="mt-1 sm:mt-2 font-semibold text-sm sm:text-lg md:text-xl text-primary">
                          {item.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-1 md:gap-6 md:mb-10">
                  {group.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-lg rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200"
                    >
                      <img
                        src={`${api}/images/${item.image}`}
                        alt={item.title}
                        className="w-full object-cover"
                      />
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold font-secondary text-primary mb-1 sm:mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default TimelineCarousel;

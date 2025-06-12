import { React, useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import timelineImage from "../assets/history-pic.webp";
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

  if (loading) return <Loading />;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 px-4 max-w-7xl mx-auto min-h-screen"
    >
      <motion.h2
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl font-secondary font-bold text-center text-primary mb-12"
      >
        Our Journey Through Time
      </motion.h2>

      <motion.div variants={fadeInUp} className="relative">
        {/* nav hidden on mobile, shown md+ */}
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="hidden md:block md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2 z-10 bg-blue-200 text-primary p-2 rounded-full shadow hover:bg-primary hover:text-white transition-colors"
        >
          <FaArrowLeft />
        </button>
        <button
          ref={nextRef}
          aria-label="Next slide"
          className="hidden md:block md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 z-10 bg-blue-200 text-primary p-2 rounded-full shadow hover:bg-primary hover:text-white transition-colors"
        >
          <FaArrowRight />
        </button>

        <Swiper
          direction="horizontal"
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 40 }, // tablet
            768: { slidesPerView: 1, spaceBetween: 60 },
            1024: { slidesPerView: 1, spaceBetween: 100 }, // desktop
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
          className="mySwiper w-full md:w-3/4 mx-auto"
        >
          {data?.map((group, index) => (
            <SwiperSlide key={index}>
              <div>
                {/* timeline dots & years */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="h-1 bg-primary absolute top-4 left-0 right-0"></div>
                  <div className="flex justify-between md:justify-around relative z-10 px-4 md:px-0">
                    {group.map((item, i) => (
                      <div key={i} className="text-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary border-4 border-white mx-auto shadow-lg"></div>
                        <div className="mt-2 text-sm sm:text-xl font-semibold text-primary">
                          {item.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
                  {group.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 min-h-[340px]"
                    >
                      <img
                        src={timelineImage}
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

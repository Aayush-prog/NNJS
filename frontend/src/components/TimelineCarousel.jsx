import { React, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import timelineImage from "../assets/history-pic.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { motion } from "motion/react";
const data = [
  {
    year: "1978",
    title: "Founded",
    description:
      "NNJS was formed by nine visionary individuals with the goal to tackle preventable blindness.",
  },
  {
    year: "1980",
    title: "NGO Strengthening",
    description:
      "Became a full-fledged NGO, coordinating with the Social Welfare Council.",
  },
  {
    year: "1990",
    title: "Regional Outreach",
    description:
      "Expanded operations into various regions, ensuring access to eye care services across Nepal.",
  },
  {
    year: "2000",
    title: "Training Programs",
    description:
      "Started eye health training programs to build local capacity and medical expertise.",
  },
  {
    year: "2005",
    title: "Surgical Milestone",
    description:
      "Achieved 100,000 cataract surgeries milestone through mobile and fixed centers.",
  },
  {
    year: "2010",
    title: "Hospital Expansion",
    description:
      "Opened additional eye hospitals to serve underserved areas more efficiently.",
  },
  {
    year: "2015",
    title: "Tech Integration",
    description:
      "Integrated telemedicine and modern diagnostic tools to improve outreach effectiveness.",
  },
  {
    year: "2020",
    title: "Pandemic Response",
    description:
      "Adapted to COVID-19 by ensuring remote consultation and limited in-person services.",
  },
  {
    year: "2023",
    title: "Sustainability Focus",
    description:
      "Focused on sustainable models and environmental responsibility in healthcare delivery.",
  },
];

// Adjust grouped slides based on screen size
const getGroupedSlides = () => {
  // For mobile, show 1 per slide, for tablet 2, for desktop 3
  if (typeof window !== "undefined" && window.innerWidth < 640) {
    return data.map((item) => [item]);
  } else if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return [
      data.slice(0, 2),
      data.slice(2, 4),
      data.slice(4, 6),
      data.slice(6, 8),
      data.slice(8),
    ];
  } else {
    return [data.slice(0, 3), data.slice(3, 6), data.slice(6, 9)];
  }
};

const TimelineCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const groupedSlides = getGroupedSlides();

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
          {groupedSlides.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="px-4 sm:px-8 md:px-12">
                <div className="relative mb-6 sm:mb-10">
                  <div className="h-1 bg-primary absolute top-3 left-0 right-0 sm:top-4"></div>
                  <div className="flex justify-around relative z-10">
                    {group.map((item, i) => (
                      <div key={i} className="text-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary border-4 border-white mx-auto shadow-lg"></div>
                        <div className="mt-1 sm:mt-2 font-semibold text-sm sm:text-lg md:text-xl text-primary">
                          {item.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 mb-10 h-[260px] sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 sm:mb-10 sm:h-[350px]">
                  {group.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-lg rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200"
                    >
                      <img
                        src={timelineImage}
                        alt={item.title}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover"
                      />
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold font-secondary text-primary mb-1 sm:mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
                          {item.description}
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

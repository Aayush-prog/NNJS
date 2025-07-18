import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { AiOutlineClose } from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StaffSection(props) {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [groupSize, setGroupSize] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const person = props.person;
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
        setGroupSize(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(1);
        setGroupSize(2);
      } else {
        setSlidesPerView(1);
        setGroupSize(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 text-center relative">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-6 sm:mb-8 md:mb-12">
        Our Staff
      </h2>

      <div className="max-w-6xl mx-auto relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          slidesPerGroup={groupSize}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10 sm:pb-12"
        >
          {person.map((staff, idx) => (
            <SwiperSlide
              key={idx}
              className={`bg-white border border-gray-200 shadow-md rounded-lg p-4 mb-10 sm:p-6 text-center hover:shadow-lg transition h-auto w-full sm:w-[300px] md:w-[350px] ${
                staff.body ? "cursor-pointer" : ""
              }`}
              onClick={() => staff.body && setSelectedStaff(staff)}
            >
              <img
                src={`${api}/images/${staff.image}`}
                alt={staff.name}
                loading="lazy"
                className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full mx-auto mb-3 sm:mb-4 border-2 border-gray-300 shadow-sm"
              />
              <h3 className="text-base sm:text-lg font-bold text-primary font-secondary mb-1">
                {staff.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">
                {staff.designation}
              </p>
              <p className="text-xs sm:text-sm text-primary break-words">
                {staff.email}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          ref={prevRef}
          className="hidden lg:flex swiper-button-prev-custom absolute top-36 -translate-y-1/2 left-0 sm:-left-4 md:-left-18 p-1 sm:p-2 md:p-3 bg-blue-50 rounded-full shadow-md z-10 cursor-pointer"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div
          ref={nextRef}
          className="hidden lg:flex swiper-button-prev-custom absolute md:top-36 -translate-y-1/2 right-0 sm:-right-4 md:-right-18 p-1 md:p-3 bg-blue-50 rounded-full shadow-md z-10 cursor-pointer"
          aria-label="Next slide"
        >
          <svg
            className="md:w-6 md:h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full rounded-lg shadow-lg relative p-6 text-left">
            <button
              onClick={() => setSelectedStaff(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <AiOutlineClose size={24} />
            </button>
            <h3 className="text-lg sm:text-xl font-bold text-primary font-secondary mb-2">
              {selectedStaff.name}
            </h3>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              {selectedStaff.designation}
            </p>
            <p className="text-sm text-primary mb-3">{selectedStaff.email}</p>
            <div className="text-sm text-gray-700 whitespace-pre-line">
              {selectedStaff.body}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

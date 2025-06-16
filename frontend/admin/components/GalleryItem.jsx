import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IoMdClose } from "react-icons/io";

const fadeInUP = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const GalleryItem = ({ item, images }) => {
  const [showGallery, setShowGallery] = useState(false);
  const api = import.meta.env.VITE_URL;

  const handleImageClick = () => {
    setShowGallery(true);
  };

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  return (
    <>
      <motion.div
        variants={fadeInUP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="rounded-lg overflow-hidden cursor-pointer relative group"
        onClick={handleImageClick}
      >
        <img
          src={`${api}/images/${images[0]}`} // First image as thumbnail
          alt={item.title}
          loading="lazy"
          className="object-cover w-full"
          style={{ height: "150px", width: "300px" }} // Fixed no space in px
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center p-2">
          <span className="text-white text-center text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold font-secondary">
            {item.title}
          </span>
        </div>
      </motion.div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-auto">
            <button
              onClick={handleCloseGallery}
              aria-label="Close gallery"
              className="absolute top-2 right-2 text-white text-2xl cursor-pointer z-10"
            >
              <IoMdClose />
            </button>

            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${api}/images/${image}`}
                    loading="lazy"
                    alt={`${item.title} image ${index + 1}`}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "70vh" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryItem;

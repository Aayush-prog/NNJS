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
  console.log(images[0]);
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
        key={item._id}
        variants={fadeInUP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="rounded-lg overflow-hidden cursor-pointer relative group"
        onClick={handleImageClick} // Open gallery on click
      >
        <img
          src={`${api}/images/${images[0]}`} // Display the first image initially
          alt={item.title}
          className="object-cover" // Make sure the image fills the container
          style={{ height: "150 px", width: "300px" }} // Adjust the max height as needed
        />
        <div className="absolute inset-0  bg-black opacity-0  group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center p-2">
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
              className="absolute top-2 right-2 text-white text-2xl cursor-pointer z-10"
            >
              <IoMdClose className="text-white" />
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
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${api}/images/${image}`}
                    alt={`Image ${index + 1}`}
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

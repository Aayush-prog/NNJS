import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaHospital } from "react-icons/fa";
import axios from "axios";
import {Link} from "react-router-dom";

const HospitalSlider = () => {
  const [hospitals, setHospitals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const api = import.meta.env.VITE_URL;

  // Fetch hospitals data
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${api}/eyeHospitals`);
        if (response.status === 200) {
          setHospitals(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || hospitals.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= hospitals.length - 3 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, hospitals.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= hospitals.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, hospitals.length - 3) : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, Math.max(0, hospitals.length - 3)));
  };

  // Get current three hospitals to display
  const getCurrentHospitals = () => {
    if (hospitals.length <= 3) return hospitals;
    return hospitals.slice(currentIndex, currentIndex + 3);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl sm:rounded-2xl mt-4 sm:mt-6 md:mt-10 mb-4 sm:mb-6 md:mb-10 mx-2 sm:mx-4 lg:mx-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    );
  }

  if (!hospitals.length) {
    return (
      <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl mx-2 sm:mx-4 lg:mx-0">
        <div className="text-center px-4">
          <FaHospital className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-base sm:text-lg font-primary">No hospitals available</p>
        </div>
      </div>
    );
  }

  const currentHospitals = getCurrentHospitals();
  const totalSlides = Math.max(1, hospitals.length - 2);

  return (
    <div className="mb-8 sm:mb-12 md:mb-15 px-2 sm:px-4 lg:px-0"> 
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full max-w-6xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-secondary flex items-center justify-center sm:justify-start">
                <FaHospital className="mr-2 md:mr-3 text-base sm:text-lg md:text-xl" />
                Our Partner Hospitals
              </h2>
            </div>
            <div className="text-center sm:text-right">
              <Link 
                to="what_we_do" 
                className="text-blue-100 hover:text-white cursor-pointer transition-colors duration-200 text-sm sm:text-base"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Main Slider Content */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] overflow-hidden">
          <AnimatePresence mode="wait" custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Three Hospital Cards Layout */}
              <div className="w-full h-full flex gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6">
                {currentHospitals.map((hospital, index) => (
                  <div 
                    key={`${currentIndex}-${index}`}
                    className="flex-1 relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 group"
                  >
                    {hospital.image ? (
                      <img
                        src={`${api}/images/${hospital.image}`}
                        alt={hospital.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaHospital className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-300" />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Hospital Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white font-secondary leading-tight drop-shadow-lg text-center">
                        {hospital.title}
                      </h3>
                    </div>
                  </div>
                ))}
                
                {/* Fill empty slots if less than 3 hospitals */}
                {currentHospitals.length < 3 && [...Array(3 - currentHospitals.length)].map((_, index) => (
                  <div 
                    key={`empty-${index}`}
                    className="flex-1 relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                  >
                    <FaHospital className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400" />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Only show if more than 3 hospitals */}
          {hospitals.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 backdrop-blur-sm"
                aria-label="Previous hospitals"
              >
                <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 backdrop-blur-sm"
                aria-label="Next hospitals"
              >
                <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator - Only show if more than 3 hospitals */}
        {hospitals.length > 3 && (
          <div className="bg-gray-50 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
            <div className="flex justify-center space-x-1.5 sm:space-x-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-blue-600 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar - Only show if more than 3 hospitals */}
        {hospitals.length > 3 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex + 1) / totalSlides) * 100}%`,
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HospitalSlider;
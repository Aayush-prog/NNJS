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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const api = import.meta.env.VITE_URL;

  // Check for screen sizes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Auto-play functionality - adjusted for different screen sizes
  useEffect(() => {
    const getMaxSlides = () => {
      if (isMobile) return hospitals.length;
      if (isTablet) return hospitals.length <= 2 ? 1 : hospitals.length - 1;
      return hospitals.length <= 3 ? 1 : hospitals.length - 2;
    };

    if (!autoPlay || getMaxSlides() <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = getMaxSlides() - 1;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, isMobile ? 4000 : 5000);

    return () => clearInterval(interval);
  }, [autoPlay, hospitals.length, isMobile, isTablet]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const getMaxIndex = () => {
        if (isMobile) return hospitals.length - 1;
        if (isTablet) return hospitals.length <= 2 ? 0 : hospitals.length - 2;
        return hospitals.length <= 3 ? 0 : hospitals.length - 3;
      };
      const maxIndex = getMaxIndex();
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const getMaxIndex = () => {
        if (isMobile) return hospitals.length - 1;
        if (isTablet) return hospitals.length <= 2 ? 0 : hospitals.length - 2;
        return hospitals.length <= 3 ? 0 : hospitals.length - 3;
      };
      const maxIndex = getMaxIndex();
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToSlide = (index) => {
    const getMaxIndex = () => {
      if (isMobile) return hospitals.length - 1;
      if (isTablet) return Math.max(0, hospitals.length - 2);
      return Math.max(0, hospitals.length - 3);
    };
    setCurrentIndex(Math.min(index, getMaxIndex()));
  };

  // Get current hospitals to display - responsive for mobile, tablet, desktop
  const getCurrentHospitals = () => {
    if (isMobile) {
      return hospitals.length > 0 ? [hospitals[currentIndex]] : [];
    }
    if (isTablet) {
      if (hospitals.length <= 2) return hospitals;
      return hospitals.slice(currentIndex, currentIndex + 2);
    }
    // Desktop
    if (hospitals.length <= 3) return hospitals;
    return hospitals.slice(currentIndex, currentIndex + 3);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? (isMobile ? 300 : isTablet ? 600 : 1000) : (isMobile ? -300 : isTablet ? -600 : -1000),
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? (isMobile ? 300 : isTablet ? 600 : 1000) : (isMobile ? -300 : isTablet ? -600 : -1000),
      opacity: 0,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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
      <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg sm:rounded-xl md:rounded-2xl mt-4 mb-4 mx-3 sm:mx-4 lg:mx-0">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    );
  }

  if (!hospitals.length) {
    return (
      <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl md:rounded-2xl mx-3 sm:mx-4 lg:mx-0">
        <div className="text-center px-4">
          <FaHospital className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-primary">No hospitals available</p>
        </div>
      </div>
    );
  }

  const currentHospitals = getCurrentHospitals();
  const getTotalSlides = () => {
    if (isMobile) return hospitals.length;
    if (isTablet) return hospitals.length <= 2 ? 1 : hospitals.length - 1;
    return hospitals.length <= 3 ? 1 : hospitals.length - 2;
  };
  const totalSlides = getTotalSlides();
  
  const getShowNavigation = () => {
    if (isMobile) return hospitals.length > 1;
    if (isTablet) return hospitals.length > 2;
    return hospitals.length > 3;
  };
  const showNavigation = getShowNavigation();

  return (
    <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-15 px-3 sm:px-4 lg:px-0"> 
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full max-w-6xl mx-auto bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden"
        onMouseEnter={() => !isMobile && setAutoPlay(false)}
        onMouseLeave={() => !isMobile && setAutoPlay(true)}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold font-secondary flex items-center">
                <FaHospital className="mr-2 text-sm sm:text-base md:text-lg lg:text-xl" />
                Our Hospitals
              </h2>
            </div>
            <div>
              <Link 
                to="what_we_do" 
                className="text-blue-100 hover:text-white cursor-pointer transition-colors duration-200 text-xs sm:text-sm md:text-base font-medium underline-offset-2 hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Main Slider Content */}
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[400px] overflow-hidden">
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
              {/* Hospital Cards Layout - Responsive */}
              <div className={`w-full h-full flex p-3 sm:p-4 md:p-6 ${
                isMobile ? '' : isTablet ? 'gap-3' : 'gap-2 sm:gap-3 md:gap-4'
              }`}>
                {currentHospitals.map((hospital, index) => (
                  <div 
                    key={`${currentIndex}-${index}`}
                    className={`${
                      isMobile ? 'w-full' : 'flex-1'
                    } relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 group`}
                  >
                    {hospital.image ? (
                      <img
                        src={`${api}/images/${hospital.image}`}
                        alt={hospital.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaHospital className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-blue-300" />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Hospital Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white font-secondary leading-tight drop-shadow-lg text-center line-clamp-2">
                        {hospital.title}
                      </h3>
                    </div>
                  </div>
                ))}
                
                {/* Fill empty slots if less than required cards on desktop/tablet */}
                {!isMobile && currentHospitals.length < (isTablet ? 2 : 3) && 
                  [...Array((isTablet ? 2 : 3) - currentHospitals.length)].map((_, index) => (
                    <div 
                      key={`empty-${index}`}
                      className="flex-1 relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                    >
                      <FaHospital className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-gray-400" />
                    </div>
                  ))
                }
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Responsive */}
          {showNavigation && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 backdrop-blur-sm touch-manipulation"
                aria-label="Previous hospitals"
              >
                <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 backdrop-blur-sm touch-manipulation"
                aria-label="Next hospitals"
              >
                <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator - Responsive */}
        {showNavigation && (
          <div className="bg-gray-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
            <div className="flex justify-center space-x-1 sm:space-x-1.5 md:space-x-2 overflow-x-auto pb-1">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 touch-manipulation ${
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

        {/* Progress Bar - Responsive */}
        {showNavigation && (
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
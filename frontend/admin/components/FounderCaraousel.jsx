import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function FoundersCarousel(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const api = import.meta.env.VITE_URL;
  const person = props.person;
  const goToIndex = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? person.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === person.length - 1 ? 0 : prev + 1));

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 bg-blue-50 text-left">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-6 sm:mb-8 md:mb-10">
        Our Founders
      </h2>

      {/* Navigation buttons for small screens */}
      <div className="flex justify-between items-center mb-4 sm:hidden">
        <button
          onClick={prevSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Previous founder"
        >
          <FaArrowLeft />
        </button>
        <span className="text-sm font-medium">
          {currentIndex + 1} / {person.length}
        </span>
        <button
          onClick={nextSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Next founder"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-7 md:mb-9 justify-center sm:justify-start">
        {person.map((founder, index) => (
          <img
            key={founder.id}
            src={`${api}/images/${founder.image}`}
            alt={founder.name}
            loading="lazy"
            className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full cursor-pointer border-4 transition-transform duration-300 ${
              currentIndex === index
                ? "border-primary scale-110"
                : "border-transparent"
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>

      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={`${api}/images/${person[currentIndex].image}`}
            loading="lazy"
            alt={person[currentIndex].name}
            className="w-full sm:w-48 md:w-64 lg:w-72 h-64 sm:h-auto object-cover object-top"
          />
          <div className="p-4 sm:p-8 md:p-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 font-secondary">
              {person[currentIndex].name}
            </h3>
            <p className="text-md sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-4 font-primary">
              {person[currentIndex].designation}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
              {person[currentIndex].body}
            </p>
          </div>
        </div>
      </div>

      {/* Pagination dots for mobile */}
      <div className="flex justify-center mt-4 sm:hidden">
        {person.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

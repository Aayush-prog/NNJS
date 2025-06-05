import { useState } from "react";
import chet from "../assets/chet.png";
import shyam from "../assets/shyam.jpg";
import chakra from "../assets/chakra.jpg";
import sagar from "../assets/sagar.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const founders = [
  {
    id: 1,
    name: "Prof. Dr. Chet Raj Pant",
    position: "Chaiperson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${chet}`,
  },
  {
    id: 2,
    name: "Mr. Shyam Kumar Pokhrel",
    position: "Senior Vice Chairperson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${shyam}`,
  },
  {
    id: 3,
    name: "Mr. Chakra Bahadur Singh",
    position: "Vice Chairperson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${chakra}`,
  },
  {
    id: 4,
    name: "Mr. Sagar Pratap Rana",
    position: "Vice Chairperson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${sagar}`,
  },
];

export default function BoardMembers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToIndex = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? founders.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === founders.length - 1 ? 0 : prev + 1));

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 bg-blue-50 text-left">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-6 sm:mb-8 md:mb-10">
        Meet Our Board Members
      </h2>

      {/* Navigation buttons for small screens */}
      <div className="flex justify-between items-center mb-4 sm:hidden">
        <button
          onClick={prevSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Previous board member"
        >
          <FaArrowLeft />
        </button>
        <span className="text-sm font-medium">
          {currentIndex + 1} / {founders.length}
        </span>
        <button
          onClick={nextSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Next board member"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Member thumbnails */}
      <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-7 md:mb-9 justify-center sm:justify-start">
        {founders.map((founder, index) => (
          <img
            key={founder.id}
            src={founder.image}
            alt={founder.name}
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
            src={founders[currentIndex].image}
            alt={founders[currentIndex].name}
            className="w-full sm:w-48 md:w-64 lg:w-72 h-64 sm:h-auto object-cover object-top"
          />
          <div className="p-4 sm:p-8 md:p-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 font-secondary">
              {founders[currentIndex].name}
            </h3>
            <p className="text-md sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-4 font-primary">
              {founders[currentIndex].position}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
              {founders[currentIndex].description}
            </p>
          </div>
        </div>
      </div>

      {/* Pagination dots for mobile */}
      <div className="flex justify-center mt-4 sm:hidden">
        {founders.map((_, index) => (
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

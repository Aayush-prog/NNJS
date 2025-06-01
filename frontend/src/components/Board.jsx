import { useState } from "react";
import chet from "../assets/chet.png";
import shyam from "../assets/shyam.jpg";
import chakra from "../assets/chakra.jpg";
import sagar from "../assets/sagar.jpg";

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

export default function FoundersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToIndex = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? founders.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === founders.length - 1 ? 0 : prev + 1));

  return (
    <div className="py-16 px-48 bg-blue-50 text-left">
      <h2 className="text-4xl font-bold font-secondary text-primary mb-10">
        Meet Our Board Members
      </h2>

      <div className="flex flex-wrap gap-4 mb-9">
        {founders.map((founder, index) => (
          <img
            key={founder.id}
            src={founder.image}
            alt={founder.name}
            className={`h-14 w-14 rounded-full cursor-pointer border-4 transition-transform duration-300 ${
              currentIndex === index
                ? "border-primary scale-110"
                : "border-transparent"
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>

      <div className="mx-auto flex flex-col md:flex-row items-start gap-10">
        <div className="flex bg-white shadow-lg rounded-lg w-full min-h-[320px] overflow-hidden">
          <img
            src={founders[currentIndex].image}
            alt={founders[currentIndex].name}
            className="w-72 object-cover"
          />
          <div className="p-12">
            <h3 className="text-3xl font-bold text-primary mb-2 font-secondary">
              {founders[currentIndex].name}
            </h3>
            <p className="text-lg font-semibold text-gray-600 mb-4 font-primary">
              {founders[currentIndex].position}
            </p>
            <p className="text-base text-gray-700 leading-relaxed font-primary">
              {founders[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

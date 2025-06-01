import { useState } from "react";
import rabi from "../assets/rabi.png";
import pokhrel from "../assets/R.P.png";
import Mani from "../assets/mani.png";
import badri from "../assets/badri.png";
import anang from "../assets/anang.png";
import banwari from "../assets/banwari.png";
import tola from "../assets/tola.png";
import raj from "../assets/raj.png";
import kamal from "../assets/kamal.png";

const founders = [
  {
    id: 1,
    name: "Late General Rabi Shamsher Rana",
    position: "Chaiperson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${rabi}`,
  },
  {
    id: 2,
    name: "Dr. R. P. Pokhrel",
    position: "Secretary General",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${pokhrel}`,
  },
  {
    id: 3,
    name: "Late Mr. Mani Harsh Jyoti",
    position: "Treasurer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${Mani}`,
  },
  {
    id: 4,
    name: "Late Mr. Badri Bikram Thapa",
    position: "Member",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${badri}`,
  },
  {
    id: 5,
    name: "Late Mr. Anang Man Sherchan",
    position: "Member",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${anang}`,
  },
  {
    id: 6,
    name: "Late Mr. Banwari Lal Mittal",
    position: "Member",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${banwari}`,
  },
  {
    id: 7,
    name: "Late Mr. Tola Ram Duggar",
    position: "Member",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${tola}`,
  },
  {
    id: 8,
    name: "Late Mr. Raj Krishna Shrestha",
    position: "Member",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${raj}`,
  },
  {
    id: 9,
    name: "Late Mr. Kamal Mani Dixit",
    position: "Member",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in purus sed odio dignissim volutpat. Sed bibendum, lorem nec tincidunt vehicula, justo sem tristique eros, nec ullamcorper felis sapien vitae est. Curabitur vel lacus ut erat luctus pretium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: `${kamal}`,
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
        Our Founders
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

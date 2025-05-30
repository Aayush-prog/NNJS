import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import timelineImage from "../assets/history-pic.webp";

const data = [
  {
    year: "1978",
    title: "Founded",
    description:
      "NNJS was formed by nine visionary individuals with the goal to tackle preventable blindness through structured national efforts.",
  },
  {
    year: "1980",
    title: "NGO Strengthening",
    description:
      "Became a full-fledged NGO, coordinating with the Social Welfare Council to represent Nepal in eye care services.",
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

const groupedSlides = [data.slice(0, 3), data.slice(3, 6), data.slice(6, 9)];

const TimelineCarousel = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-secondary font-bold text-center text-primary mb-12">
        Our Journey Through Time
      </h2>

      <div className="relative">
        <button
          className="absolute -left-14 z-10 bg-blue-200 text-primary p-3 rounded-full shadow hover:bg-primary hover:text-white transition-colors duration-300"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <FaArrowLeft />
        </button>

        <button
          className="absolute -right-14 z-10 bg-blue-200 text-primary p-3 rounded-full shadow hover:bg-primary hover:text-white transition-colors duration-300"
          onClick={() => sliderRef.current.slickNext()}
        >
          <FaArrowRight />
        </button>

        <Slider ref={sliderRef} {...settings}>
          {groupedSlides.map((group, index) => (
            <div key={index}>
              <div className="relative mb-8">
                <div className="h-1 bg-primary absolute top-4 left-0 right-0"></div>
                <div className="flex justify-around relative z-10">
                  {group.map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-8 h-8 rounded-full bg-primary border-4 border-white mx-auto shadow-lg"></div>
                      <div className="mt-2 font-semibold text-lg text-primary">
                        {item.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {group.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 min-h-[340px]"
                  >
                    <img
                      src={timelineImage}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-secondary text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-primary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TimelineCarousel;

import React from "react";
import { FaChartLine, FaEye, FaGlobeAmericas, FaUsers, FaCogs, FaNetworkWired } from "react-icons/fa";

const objectives = [
  {
    icon: <FaChartLine className="text-blue-600 text-xl" />,
    bg: "bg-blue-100",
    title: "Reduce Blindness Prevalence",
    description:
      "Lower severe visual impairment (VA <3/60) from 0.35% to below 0.2%, and economic blindness (VA <6/60) from 0.8% to 0.4% by 2022."
  },
  {
    icon: <FaEye className="text-green-600 text-xl" />,
    bg: "bg-green-100",
    title: "Prevent Avoidable Blindness",
    description:
      "Promote awareness and improve health-seeking behavior related to eye health through community engagement and education."
  },
  {
    icon: <FaGlobeAmericas className="text-purple-600 text-xl" />,
    bg: "bg-purple-100",
    title: "Ensure Accessibility",
    description:
      "Provide primary eye care services at the local government level to make eye care accessible to all communities."
  },
  {
    icon: <FaUsers className="text-yellow-600 text-xl" />,
    bg: "bg-yellow-100",
    title: "Strengthen Human Resources",
    description:
      "Train and deploy skilled professionals across all levels of eye care to ensure quality service delivery nationwide."
  },
  {
    icon: <FaCogs className="text-red-600 text-xl" />,
    bg: "bg-red-100",
    title: "Enhance Systems & Quality",
    description:
      "Develop policies, support research and surveillance, and implement quality assurance in service delivery."
  },
  {
    icon: <FaNetworkWired className="text-teal-600 text-xl" />,
    bg: "bg-teal-100",
    title: "Expand Service Coverage",
    description:
      "Deliver comprehensive eye care in all eye hospitals and basic ear care at all levels of care."
  }
];

export default function ObjectivesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-secondary">Our Strategic Objectives</h2>
          <p className="text-xl max-w-3xl mx-auto font-secondary">
            Comprehensive goals to transform eye care and eliminate preventable blindness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((obj, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4 ">
                <div className={`icon-wrapper ${obj.bg} rounded-full flex items-center justify-center w-[50px] h-[50px]`}>
                  {obj.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 font-secondary">
                  {obj.title}
                </h3>
              </div>
              <p className="text-gray-600 pl-14 font-primary">{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
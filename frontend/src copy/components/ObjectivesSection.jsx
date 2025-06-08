import React from "react";
import {
  FaChartLine,
  FaEye,
  FaGlobeAmericas,
  FaUsers,
  FaCogs,
  FaNetworkWired,
} from "react-icons/fa";
import { motion } from "motion/react";

const objectives = [
  {
    icon: <FaChartLine className="text-blue-600 text-lg sm:text-xl" />,
    bg: "bg-blue-100",
    title: "Reduce Blindness Prevalence",
    description:
      "Lower severe visual impairment (VA <3/60) from 0.35% to below 0.2%, and economic blindness (VA <6/60) from 0.8% to 0.4% by 2022.",
  },
  {
    icon: <FaEye className="text-green-600 text-lg sm:text-xl" />,
    bg: "bg-green-100",
    title: "Prevent Avoidable Blindness",
    description:
      "Promote awareness and improve health-seeking behavior related to eye health through community engagement and education.",
  },
  {
    icon: <FaGlobeAmericas className="text-purple-600 text-lg sm:text-xl" />,
    bg: "bg-purple-100",
    title: "Ensure Accessibility",
    description:
      "Provide primary eye care services at the local government level to make eye care accessible to all communities.",
  },
  {
    icon: <FaUsers className="text-yellow-600 text-lg sm:text-xl" />,
    bg: "bg-yellow-100",
    title: "Strengthen Human Resources",
    description:
      "Train and deploy skilled professionals across all levels of eye care to ensure quality service delivery nationwide.",
  },
  {
    icon: <FaCogs className="text-red-600 text-lg sm:text-xl" />,
    bg: "bg-red-100",
    title: "Enhance Systems & Quality",
    description:
      "Develop policies, support research and surveillance, and implement quality assurance in service delivery.",
  },
  {
    icon: <FaNetworkWired className="text-teal-600 text-lg sm:text-xl" />,
    bg: "bg-teal-100",
    title: "Expand Service Coverage",
    description:
      "Deliver comprehensive eye care in all eye hospitals and basic ear care at all levels of care.",
  },
];

export default function ObjectivesSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-10 sm:py-18 px-4 sm:px-6 lg:px-8 bg-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4 font-secondary"
          >
            Our Strategic Objectives
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-secondary"
          >
            Comprehensive goals to transform eye care and eliminate preventable
            blindness
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {objectives.map((obj, index) => (
            <motion.div
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.2 }}
              key={index}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className={`icon-wrapper ${obj.bg} rounded-full flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex-shrink-0`}
                >
                  {obj.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold font-secondary">
                  {obj.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 pl-12 sm:pl-14 mt-2 font-primary">
                {obj.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

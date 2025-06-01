import React from "react";
import {
  FaGlobeAsia,
  FaAward,
  FaHandsHelping,
  FaShieldAlt,
  FaBalanceScale,
} from "react-icons/fa";
import { motion } from "motion/react";
const principles = [
  {
    title: "UHC & SDG Alignment",
    description:
      "We align with the principles of Universal Health Coverage (UHC), the Sustainable Development Goals (SDGs), and Nepal’s National Health Policy 2076. Our goal is to integrate eye health services into mainstream healthcare through strategic collaboration and system strengthening.",
    color: "indigo",
    icon: <FaGlobeAsia className="text-3xl text-blue-600" />,
  },
  {
    title: "Quality",
    description:
      "We are dedicated to delivering high-quality services and achieving optimal outcomes across all aspects of eye health care.",
    color: "emerald",
    icon: <FaAward className="text-3xl text-yellow-500" />,
  },
  {
    title: "Diversity & Inclusion",
    description:
      "We promote diversity, equity, and inclusion by ensuring impartiality and non-discrimination in all our operations and partnerships.",
    color: "amber",
    icon: <FaHandsHelping className="text-3xl text-green-700" />,
  },
  {
    title: "Safeguarding",
    description:
      "We uphold the safety, dignity, and rights of the communities we serve and the people who work with us, regardless of context.",
    color: "red",
    icon: <FaShieldAlt className="text-3xl" />,
  },
];

const Commitments = () => {
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
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-primary"
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-primary mb-4 font-secondary"
        >
          Our Commitments
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-xl"
        >
          The fundamental principles that guide our work in eye healthcare:
        </motion.p>
      </div>

      <motion.div
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {principles.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-md p-5 border-t-4 border-primary hover:shadow-lg transition-all`}
          >
            <div className={`text-${item.color}-600 mb-4`}>{item.icon}</div>
            <h3 className="text-xl font-bold text-primary font-secondary mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Commitments;

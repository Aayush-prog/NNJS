import React, { useState, useEffect } from "react";
import * as ReactIcons from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "./Loading";

export default function ObjectivesSection() {
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState(null);
  const api = import.meta.env.VITE_URL;

  // Variants for container to stagger children animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconMap = {
    ...ReactIcons,
  };

  function IconRenderer({ iconName, color }) {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) {
      return <span>Icon not found: {iconName}</span>;
    }
    return <IconComponent className={`${color} text-2xl sm:text-3xl`} />;
  }

  useEffect(() => {
    const fetchObjective = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/strategicObjectives/`);
        if (res.status === 200) {
          setObjectives(res.data.data);
        } else {
          console.error("Error fetching objectives: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching objectives:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchObjective();
  }, [api]);

  if (loading) {
    return <Loading />;
  }

  if (!objectives) {
    return null; // Or some placeholder if needed
  }

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
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-primary"
          >
            Comprehensive goals to transform eye care and eliminate preventable
            blindness
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {objectives.map((obj, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-lg sm:rounded-xl p-6 shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className={`icon-wrapper ${obj.bg} rounded-full flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex-shrink-0`}
                >
                  <IconRenderer color={obj.color} iconName={obj.icon} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold font-secondary">
                  {obj.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 pl-10 sm:pl-14 font-primary">
                {obj.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

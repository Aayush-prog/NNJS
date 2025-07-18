import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../components/Loading";

export default function SpecificObjectives() {
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState(null);
  const api = import.meta.env.VITE_URL;

  // Variants for staggered container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Common fadeInUp variant
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchObjective = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/specificObjectives/`);
        if (res.status === 200) {
          // Sort alphabetically by title
          const sortedData = [...res.data.data].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setObjectives(sortedData);
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
    return null;
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-primary"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4 font-secondary"
          >
            Specific Objectives Timeline
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-primary"
          >
            Our roadmap for eliminating preventable blindness and improving eye
            care services
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full border-l-4 border-primary"></div>

          {/* Container with staggerChildren */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8 sm:space-y-12"
          >
            {objectives.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex flex-col md:flex-row ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  } relative`}
                >
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 md:px-8 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <motion.div
                      variants={fadeInUp}
                      viewport={{ once: true, amount: 0.2 }}
                      className="bg-white shadow-xl rounded-xl p-4 md:p-6 border border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FaCheckCircle className="text-green-500 text-lg md:text-xl flex-shrink-0" />
                        <h3 className="text-lg md:text-xl font-bold text-primary font-secondary">
                          {item.title}
                        </h3>
                      </div>
                      <ul className="list-disc ml-5 md:ml-6 space-y-1 md:space-y-2 text-sm md:text-base text-gray-700">
                        {item.objectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-center absolute left-2 md:left-1/2 transform md:-translate-x-1/2 top-4 z-10">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border-4 border-primary rounded-full"></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

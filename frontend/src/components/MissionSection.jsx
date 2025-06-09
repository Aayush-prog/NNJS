import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function MissionSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const [mission, setMission] = useState(null);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchMission = async () => {
      try {
        console.log(api);
        const res = await axios.get(`${api}/mission/`);
        console.log(res.data);
        if (res.status === 200) {
          setMission(res.data.data);
        } else {
          console.error("Error fetching mission: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching mission:", error);
      }
    };

    fetchMission();
  }, [api]);

  return (
    mission && (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-primary py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 font-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10"
          >
            Our Mission
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded-lg sm:rounded-xl md:rounded-[20px] overflow-hidden max-w-7xl mx-auto flex flex-col lg:flex-row shadow-md sm:shadow-lg md:shadow-xl mb-8 sm:mb-12 md:mb-16"
          >
            <div className="lg:w-1/2 w-full flex-shrink-0 h-[200px] sm:h-[250px] md:h-[300px] lg:h-auto">
              <img
                src={`${api}/images/${mission.image}`}
                alt="Team working together"
                className="w-full h-full object-cover lg:rounded-l-[20px]"
              />
            </div>

            <div className="lg:w-1/2 w-full p-4 sm:p-6 md:p-8 lg:p-10 flex items-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-primary">
                {mission.body}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  );
}

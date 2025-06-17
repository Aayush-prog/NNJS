import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "./Loading";
import * as FaIcons from "react-icons/fa";

export default function MissionSection() {
  const [loading, setLoading] = useState(false);
  const [missions, setMissions] = useState([]);
  const api = import.meta.env.VITE_URL;

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchMission = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/mission/`);
        if (res.status === 200) {
          const data = Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data];
          setMissions(data);
        }
      } catch (error) {
        console.error("Error fetching mission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, [api]);

  if (loading) return <Loading />;
  if (!missions || missions.length === 0) return null;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-blue-100 py-12 px-4 sm:px-6 md:px-10 font-secondary"
    >
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
          Our Mission
        </h2>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {missions.map((item, index) => {
          const IconComponent = FaIcons[item.icon];
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white p-6 sm:p-7 md:p-8 rounded-xl shadow-md flex flex-col items-center text-center lg:mb-10"
            >
              <div className="bg-primary text-white p-4 rounded-full mb-5 shadow-sm mt-4">
                {IconComponent && (
                  <IconComponent className="text-3xl sm:text-4xl" />
                )}
              </div>
              <h3 className="text-primary text-lg sm:text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-black text-sm sm:text-base leading-relaxed mb-4">
                {item.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

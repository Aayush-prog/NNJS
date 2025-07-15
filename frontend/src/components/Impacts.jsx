import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import Loading from "./Loading";

export default function Impacts() {
  const [loading, setLoading] = useState(false);
  const [impacts, setImpacts] = useState([]);
  const api = import.meta.env.VITE_URL;
  const iconMap = {
    ...ReactIcons,
  };

  function IconRenderer({ iconName }) {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return <span>Icon not found</span>;
    return (
      <IconComponent className="mb-2 text-support text-4xl inline-block" />
    );
  }

  useEffect(() => {
    const fetchImpacts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/impacts/`);
        if (res.status === 200) {
          setImpacts(res.data.data);
        } else {
          console.error("Error fetching impacts: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching impacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImpacts();
  }, [api]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-10 bg-primary text-white py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-20"
    >
      <motion.h2
        variants={childVariants}
        className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary"
      >
        Our Impacts
      </motion.h2>
      
      <div className="w-full space-y-6">
        {/* Till Now section above first two cards */}
        <motion.p 
          variants={childVariants}
          className="text-center text-lg font-semibold"
        >
          Till Now
        </motion.p>
        
        {/* First two impact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {impacts?.slice(0, 2).map((impact, i) => (
            <motion.div
              key={i}
              variants={childVariants}
              className="text-center font-bold font-secondary text-xl"
            >
              <IconRenderer iconName={impact.icon} />
              <h1>{impact.count}</h1>
              <h2>{impact.title}</h2>
            </motion.div>
          ))}
        </div>

        {/* In current year section above next two cards */}
        {impacts?.length > 2 && (
          <>
            <motion.p 
              variants={childVariants}
              className="text-center text-lg font-semibold pt-4"
            >
              In {new Date().getFullYear()-1}
            </motion.p>
            
            {/* Next two impact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {impacts?.slice(2, 4).map((impact, i) => (
                <motion.div
                  key={i + 2}
                  variants={childVariants}
                  className="text-center font-bold font-secondary text-xl"
                >
                  <IconRenderer iconName={impact.icon} />
                  <h1>{impact.count}</h1>
                  <h2>{impact.title}</h2>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Any remaining cards */}
        {impacts?.length > 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 pt-4">
            {impacts?.slice(4).map((impact, i) => (
              <motion.div
                key={i + 4}
                variants={childVariants}
                className="text-center font-bold font-secondary text-xl"
              >
                <IconRenderer iconName={impact.icon} />
                <h1>{impact.count}</h1>
                <h2>{impact.title}</h2>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

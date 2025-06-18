import { React, useState, useEffect } from "react";
import * as ReactIcons from "react-icons/fa";
import { motion } from "motion/react";
import axios from "axios";
import Loading from "../components/Loading";

const Commitments = () => {
  const [loading, setLoading] = useState(false);
  const [commitments, setCommitments] = useState(null);

  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchCommitments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/commitments`);
        if (res.status === 200) {
          setCommitments(res.data.data);
        } else {
          console.error("Error fetching commitments: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching commitments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitments();
  }, [api]);

  if (loading) {
    return <Loading />;
  }

  const iconMap = { ...ReactIcons };

  function IconRenderer({ iconName, color }) {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) {
      return <span>Icon not found: {iconName}</span>;
    }
    return (
      <IconComponent
        className={`${color} text-2xl sm:text-3xl mb-3 sm:mb-4`}
        aria-hidden="true"
      />
    );
  }

  // Animation variants for container with stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Animation variants for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-primary"
    >
      <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4 font-secondary"
        >
          Our Commitments
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="font-secondary sm:text-lg md:text-xl px-2"
        >
          The fundamental principles that guide our work in eye healthcare:
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
      >
        {commitments?.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 border-t-4 border-primary hover:shadow-lg transition-all"
          >
            <IconRenderer iconName={item.icon} color={item.color} />
            <h3 className="text-lg sm:text-xl font-bold text-primary font-secondary mb-1 sm:mb-2">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">{item.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Commitments;

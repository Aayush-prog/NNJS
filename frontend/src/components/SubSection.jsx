import React from "react";
import { motion } from "framer-motion";

export default function SubSection({ title, body, image }) {
  const api = import.meta.env.VITE_URL;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5"
    >
      {title && (
        <motion.h2
          variants={childVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary"
        >
          {title}
        </motion.h2>
      )}
      {body && (
        <motion.p
          variants={childVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]"
        >
          {body}
        </motion.p>
      )}
      {image && (
        <motion.img
          variants={childVariants}
          src={`${api}/images/${image}`}
          loading="lazy"
          className="w-full sm:w-[110vw] md:w-[100vw] lg:w-[60vw]"
          alt={image}
        />
      )}
    </motion.div>
  );
}

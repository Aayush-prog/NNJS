import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SubSection(props) {
  const { title, body, image } = props;
  const api = import.meta.env.VITE_URL;

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
      className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5"
    >
      {title && (
        <motion.h2
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary"
        >
          {title}
        </motion.h2>
      )}
      {body && (
        <motion.p
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]"
        >
          {body}
        </motion.p>
      )}
      {image && (
        <motion.img
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          src={`${api}/images/${image}`}
          className="w-full sm:w-[110vw] md:w-[100vw] lg:w-[60vw] "
          alt={`${image}`}
        />
      )}
    </motion.div>
  );
}

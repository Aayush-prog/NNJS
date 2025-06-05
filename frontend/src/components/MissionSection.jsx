import React from "react";
import eye from "../assets/eye.jpg";
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
  return (
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
              src={eye}
              alt="Team working together"
              className="w-full h-full object-cover lg:rounded-l-[20px]"
            />
          </div>

          <div className="lg:w-1/2 w-full p-4 sm:p-6 md:p-8 lg:p-10 flex items-center">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-primary">
              To develop and provide high quality, sustainable, comprehensive
              and affordable eye care service network in the country by
              identifying and mobilizing local, national and international
              resources, and to attain multi-sectoral partnership, basic and
              clinical research into eye diseases, human resource development in
              eye care, product development in order to provide eye care
              services to all segments of population without any discrimination,
              by maintaining equity, efficiency, and excellence and
              rehabilitation for those with incurable visual and deafness
              disability through the effective mobilization of volunteers.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

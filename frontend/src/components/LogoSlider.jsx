import React from "react";
import { motion } from "motion/react";
export default function LogoSlider(props) {
  const { logos } = props;
  console.log(logos);
  const duplicatedSlides = [...logos, ...logos];

  return (
    <div className="relative h-full overflow-hidden mx-auto">
      <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:filter after:blur-3"></div>

      <motion.div
        className="flex gap-10"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 15,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${100 / logos.length}%` }}
          >
            <div className="flex items-center justify-center h-full">
              <img src={slide}></img>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

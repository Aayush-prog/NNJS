import React from "react";
import { motion } from "motion/react";
export default function LogoSlider(props) {
  const { logos } = props;
  const api = import.meta.env.VITE_URL;
  const duplicatedSlides = [...logos];

  return (
    <div className="relative h-full overflow-hidden mx-auto">
      <div className="absolute inset-0 z-1 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r pointer-events-none before:from-white before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:filter after:blur-3"></div>

      <motion.div
        className="flex gap-10"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 60,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => {
              console.log(slide.link);
              if (slide.link) {
                window.open(slide.link, "_blank", "noopener,noreferrer");
              }
            }}
            className="flex-shrink-0"
          >
            <div className="flex items-center justify-center h-full">
              <img
                src={`${api}/images/${slide.image}`}
                loading="lazy"
                width="160"
                height="161"
                alt={`${slide.name}`}
              />
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

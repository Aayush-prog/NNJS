import { FaCheckCircle } from "react-icons/fa";
import { motion } from "motion/react";
export default function SpecificObjectives() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const timeline = [
    {
      year: "By 2022",
      objectives: [
        "Increase the national CSR from 4300 to 6000",
        "Establish a cataract audit system to monitor quality and quantity",
        "Achieve WHO visual outcome benchmarks (PVA ≥ 80%, BCVA ≥ 90%)",
      ],
    },
    {
      year: "By 2023",
      objectives: [
        "Raise community awareness of eye diseases and services to over 90%",
        "Reduce vision impairment from URE below 2% and increase spectacle coverage above 80%",
        "Ensure 90% awareness of IEC materials among the target population",
      ],
    },
    {
      year: "By 2024",
      objectives: [
        "Establish at least 100 district-level ear care centres",
        "Train at least 70 additional ophthalmologists with sub-specialty training",
        "Establish 350 vision centres at the local government level",
        "Upgrade 33 ECCs to surgical eye hospitals",
        "Upgrade tertiary eye hospitals into Centres of Excellence in each province",
        "Provide Eye Banking and cornea harvesting facilities in all Centres of Excellence",
      ],
    },
    {
      year: "By 2030",
      objectives: ["Eliminate corneal blindness"],
    },
  ];

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
            className="text-3xl sm:text-4xl font-bold text-primary mb-3 sm:mb-4 font-secondary"
          >
            Specific Objectives Timeline
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto font-secondary"
          >
            Our roadmap for eliminating preventable blindness and improving eye
            care services
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full border-l-4 border-primary"></div>

          <motion.div
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8 sm:space-y-12"
          >
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
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
                          {item.year}
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
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

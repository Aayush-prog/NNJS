import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "./Loading";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [storiesData, setStoriesData] = useState(null);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/story/`);
        if (res.status === 200) {
          setStoriesData(res.data.data);
        } else {
          console.error("Error fetching story: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 flex flex-col items-center space-y-8"
    >
      <motion.h2
        variants={childVariants}
        className="text-4xl font-bold text-primary font-secondary"
      >
        Success Stories
      </motion.h2>

      {storiesData?.map((story, i) => (
        <motion.section
          key={i}
          variants={childVariants}
          className="flex flex-col md:flex-row items-center bg-grey rounded-md shadow p-8 w-3/4"
        >
          <div className="md:w-1/2 flex justify-center">
            <img
              src={`${api}/images/${story.image}`}
              loading="lazy"
              alt={story.author}
              className="rounded-full w-40 h-40 object-cover shadow-lg"
            />
          </div>
          <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
            <blockquote className="italic font-semibold text-lg">
              {story.text}
            </blockquote>
            <cite className="block mt-4 text-gray-500">— {story.author}</cite>
          </div>
        </motion.section>
      ))}
    </motion.div>
  );
}

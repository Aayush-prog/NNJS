import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import history from "../assets/history-pic.webp";
import { motion } from "motion/react";
import TimelineCarousel from "../components/TimelineCarousel";

export default function History() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <div>
      <Nav />
      <main>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${history})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-10">
            <h1 className="text-6xl font-bold font-secondary ">
              Milestones in Sight
            </h1>
          </div>
        </motion.div>
        <div className="items-center justify-center flex flex-col text-center py-24 bg-blue-50">
          <h1 className="font-secondary text-4xl text-primary font-bold p-5">
            Our History
          </h1>
          <p className="text-lg font-primary max-w-6xl mx-auto px-4">
            Motivated by the urgent need to address preventable blindness and
            improve access to quality eye care, a group of nine committed
            individuals — including social workers, physicians, industrialists,
            and traders — came together in Kathmandu to pursue a shared vision.
            Recognizing the lack of structured eye health services in Nepal,
            they initiated focused discussions on how to contribute meaningfully
            to a national cause. These efforts culminated in the establishment
            of the Nepal Netra Jyoti Sangh (NNJS), a dedicated non-governmental,
            welfare oriented social organization committed to promoting
            comprehensive eye care and supporting national efforts to improve
            eye health through coordinated, community-driven initiatives.
          </p>
        </div>
        <TimelineCarousel />
        <div className="flex flex-col items-start py-24 bg-blue-50 px-4 md:px-34">
          <h1 className="font-secondary text-4xl text-primary font-bold mb-6">
            Our story is still unfolding.
          </h1>
          <p className="text-lg font-primary text-left">
            What began as a vision among a few compassionate pioneers in 1978
            has grown into Nepal Netra Jyoti Sangh (NNJS) — a nationwide
            movement to restore sight and bring hope. From a humble beginning,
            NNJS has become a leading force in eye care across Nepal, reaching
            thousands through hospitals, eye care centers, and community
            programs. Our journey is a testament to what's possible when
            dedication meets purpose. And we're just getting started. Together,
            we can light the path ahead and ensure that no one in Nepal is left
            in the dark.{" "}
            <span className="font-bold text-primary">
              Join us, and be part of this vision.
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

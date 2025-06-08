import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import donate from "../assets/donate.png";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaArrowCircleUp, FaHeart, FaUniversity } from "react-icons/fa";

export default function Donate() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div>
      <Nav />
      <motion.div
        className="relative h-[40vh] sm:h-[90vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${donate})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary">
            Donate
          </h1>
        </div>
      </motion.div>

      <div className="bg-primary py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 font-primary"
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 flex-1 space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex justify-center">
              <FaHeart className="text-red-600 text-2xl sm:text-3xl md:text-4xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary font-secondary text-center">
              Every Donation Brings Someone Closer to Sight.
            </h2>
            <h3 className="text-center font-semibold text-sm sm:text-base">
              You Have the Power to Restore Sight and Transform Lives.
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              By supporting our mission, you're doing more than funding
              treatments — you're giving children the chance to learn, elders
              the dignity to live independently, and families the joy of seeing
              each other clearly again.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Across Nepal, thousands live in darkness caused by preventable
              blindness. With your help, we provide free eye exams,
              life-changing surgeries, and essential vision care to those who
              need it most.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Together, we can build a Nepal where no one is blind from
              avoidable causes, and everyone has the opportunity to live a full,
              healthy, and dignified life.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Your generosity brings light to those who need it most.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              If you would like to talk to us about your donation, please
              contact Nepal Netra Jyoti Sangh central office by calling{" "}
              <strong>977-1-5361921 / 5361066</strong>. You can also send an
              email to{" "}
              <a
                className="text-primary underline"
                href="mailto:nnjs@mos.com.np"
              >
                nnjs@mos.com.np
              </a>
              .
            </p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-full md:w-1/3 flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaUniversity className="text-primary text-xl sm:text-2xl md:text-3xl" />
              <h2 className="text-xl sm:text-2xl font-bold text-primary font-secondary">
                Bank Details
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-gray-700 text-sm sm:text-base">
              <div>
                <p className="font-semibold">Account Name:</p>
                <p>Nepal Netra Jyoti Sangh</p>
              </div>
              <div>
                <p className="font-semibold">Account Number:</p>
                <p className="break-words">05-0012211-54</p>
              </div>
              <div>
                <p className="font-semibold">Bank:</p>
                <p>Standard Chartered Bank Nepal</p>
              </div>
              <div>
                <p className="font-semibold">SWIFT Code:</p>
                <p>SCBLNPKA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </motion.div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp
            size={20}
            className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          />
        </button>
      )}
    </div>
  );
}

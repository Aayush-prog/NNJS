import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import coveringEyes from "../assets/covering eyes.png";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
export default function Contact() {
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
    hidden: { opacity: 0, y: 50 },
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
      <motion.div
        className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${coveringEyes})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center space-y-10">
          <h1 className="text-6xl font-bold font-secondary ">Contact</h1>
        </div>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="h-screen bg-grey p-20 flex items-center justify-center"
      >
        <motion.div
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="flex bg-white rounded-2xl overflow-hidden shadow-lg"
        >
          {/* Left Form */}
          <div className="flex flex-col justify-center items-left text-left w-[500px] space-y-5 text-white bg-primary p-10">
            <div>
              <h1 className="text-4xl font-bold font-secondary">
                Get in touch
              </h1>
              <div className="border-2 border-accent w-[100px]"></div>
            </div>

            <form className="flex flex-col w-full space-y-5">
              <input
                className="border-b-2 bg-transparent text-white"
                placeholder="Name"
              />
              <input
                className="border-b-2 bg-transparent text-white"
                placeholder="Email"
              />
              <input
                className="border-b-2 bg-transparent text-white"
                placeholder="Phone"
              />
              <input
                className="border-b-2 bg-transparent text-white"
                placeholder="Message"
              />
              <button className="bg-accent p-2 rounded-sm mt-3 font-bold">
                Submit
              </button>
            </form>
          </div>

          {/* Right Info */}
          <div className="w-[500px] p-10 bg-white text-black flex flex-col justify-between">
            <div className="space-y-5">
              <p className="font-bold">
                Feel free to reach out using the contact information
              </p>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8064616406664!2d85.3115335749225!3d27.69237602615263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b2b6d87343%3A0x2d6c2814b031114b!2sNepal%20Netra%20Jyoti%20Sangh%2C%20Tripureshwor!5e0!3m2!1sen!2snp!4v1748617431017!5m2!1sen!2snp"
                width="100%"
                height="200"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div className="flex gap-10 text-sm">
                <div className="space-y-3">
                  <p className="font-bold mb-2">MAILING ADDRESS</p>
                  <div>
                    <p>P.O. Box 335</p>
                    <p>Netra Jyoti Bhawan</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold mb-2">PHYSICAL ADDRESS</p>
                  <div>
                    <p>Netra Jyoti Bhawan</p>
                    <p>Tripureshwor, Kathmandu</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold mb-2">REACH US</p>
                  <div>
                    <p>+977-1-5361921 / 5361066</p>
                    <p>nnjs@mos.com.np</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex space-x-5 text-2xl mt-5 text-primary">
              <FaFacebook />
              <FaLinkedin />
              <RiTwitterXLine />
            </div>
          </div>
        </motion.div>
      </motion.div>
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
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
        >
          <FaArrowCircleUp size={30} />
        </button>
      )}
    </div>
  );
}

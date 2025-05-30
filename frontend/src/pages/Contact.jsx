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
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${coveringEyes})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center space-y-10">
          <h1 className="text-6xl font-bold font-secondary ">Contact</h1>
        </div>
      </motion.div>
      <div className="h-screen bg-grey p-20 ">
        <div className="flex ">
          <div className="flex flex-col justify-center items-center text-left w-1/2 space-y-5 text-white bg-primary rounded-l-2xl">
            <h1 className="text-4xl font-bold font-secondary ">Get in touch</h1>
            <div className="border-4 border-accent w-[150px]"></div>
            <form className="flex flex-col w-1/2 text-2xl space-y-5">
              <input
                className="border-b-2 text-white"
                placeholder="Name"
              ></input>
              <input
                className="border-b-2 text-white"
                placeholder="Email"
              ></input>
              <input
                className="border-b-2 text-white"
                placeholder="Phone"
              ></input>
              <input
                className="border-b-2 text-white"
                placeholder="Message"
              ></input>
              <button className="bg-accent w-1/2 rounded-sm">Submit</button>
            </form>{" "}
          </div>
          <div className="rounded-r-2xl p-10 bg-white">
            <div className=" flex flex-col  space-y-5">
              <p className="w-full font-bold">
                Feel free to reach out using the contact information
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8064616406664!2d85.3115335749225!3d27.69237602615263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b2b6d87343%3A0x2d6c2814b031114b!2sNepal%20Netra%20Jyoti%20Sangh%2C%20Tripureshwor!5e0!3m2!1sen!2snp!4v1748617431017!5m2!1sen!2snp"
                width="500"
                height="250"
                style={{ border: "0" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="flex gap-10 ">
                <div className="space-y-3">
                  <p className="font-bold mb-2">MAILING ADDRESS</p>
                  <div className="space-y-1 ">
                    <p>P.O. Box 335</p>
                    <p>Netra Jyoti Bhawan</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold mb-2">PHYSICAL ADDRESS</p>
                  <div className="space-y-1 ">
                    <p>Netra Jyoti Bhawan</p>
                    <p>
                      Tripureshwor, <br></br>Kathmandu
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold mb-2">REACH US</p>
                  <div className="space-y-1 ">
                    <p>
                      +977-1-5361921 / <br></br>5361066
                    </p>
                    <p>nnjs@mos.com.np</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-5 text-3xl">
                <FaFacebook />
                <FaLinkedin />
                <RiTwitterXLine />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-primary text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300"
        >
          <FaArrowCircleUp size={30} />
        </button>
      )}
    </div>
  );
}

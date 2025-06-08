import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import integrityImage from "../assets/integrity.png";
import governance from "../assets/governance.jpg";
import togetherness from "../assets/togetherness.jpg";
import transparency from "../assets/transparency.jpg";
import excellence from "../assets/excellence.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import {
  FaImage
} from "react-icons/fa";

export default function CoreValues() {
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);        // <-- new state

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      viewport={{ once: true, amount: 0.1 }}
      className="min-h-[70vh] sm:min-h-[80vh] md:min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center bg-support space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
    >
      <div className="w-full px-4 flex items-center justify-center space-x-4">
        <motion.h2
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center"
        >
          Our Values
        </motion.h2>
        <button
          onClick={() => setShowForm(true)}               // <-- open form
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Add Our Values
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          {/* White modal container */}
          <div className="relative bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <form
              onSubmit={e => {
                e.preventDefault();
                // TODO: handle upload logic
                setShowForm(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <label
                  htmlFor="image-upload"
                  className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 space-x-2"
                >
                  <FaImage className="w-6 h-6 flex-shrink-0" />
                  <span>Choose Image</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded"
                  placeholder="Enter value title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded"
                  rows={4}
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Swiper
          direction="horizontal"
          slidesPerView={1}
          spaceBetween={30}
          effect={isMobile ? "fade" : "slide"}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          modules={[EffectFade, Autoplay, Pagination, Mousewheel]}
          className="mySwiper w-full h-auto"
        >
          {/* Integrity Slide */}
          <SwiperSlide>
            <div className="flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 bg-white py-6 sm:py-8 md:py-10 lg:py-12 rounded-lg shadow-sm h-full">
              <div className="flex flex-col md:flex-row items-center max-w-5xl gap-4 sm:gap-6 md:gap-8">
                <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0 md:mr-4 lg:mr-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary mb-2 sm:mb-3 md:mb-4">
                    Integrity
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-primary">
                    We demonstrate honesty, trust, and mutual respect in all our
                    interactions. We accept responsibility for our actions and the
                    resulting outcomes. Our team is consistently transparent,
                    open, and fair without prejudice in dealing with others. We
                    encourage everyone to speak up when something appears wrong or
                    inappropriate, fostering a culture of ethical practice.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center mt-2 md:mt-0">
                  <img
                    src={integrityImage}
                    alt="Illustration representing integrity"
                    className="w-full max-w-[200px] sm:max-w-[225px] md:max-w-[300px] lg:max-w-[350px] h-auto md:h-[250px] lg:h-[300px] rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          {/* Other slides with same structure */}
          <SwiperSlide>
            <div className="flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 bg-white py-6 sm:py-8 md:py-10 lg:py-12 rounded-lg shadow-sm h-full">
              <div className="flex flex-col md:flex-row items-center max-w-5xl gap-4 sm:gap-6 md:gap-8">
                <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0 md:mr-4 lg:mr-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary mb-2 sm:mb-3 md:mb-4">
                    Togetherness
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-primary">
                    We believe in the power of unity and collaboration to achieve
                    shared goals. Our community thrives on mutual support,
                    respect, and inclusivity where every voice is valued.
                    Togetherness means working side by side, overcoming challenges
                    as a team, and celebrating collective successes. By fostering
                    strong relationships and teamwork, we create an environment
                    where everyone feels connected and empowered to contribute
                    their best.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center mt-2 md:mt-0">
                  <img
                    src={togetherness}
                    alt="Illustration representing togetherness"
                    className="w-full max-w-[200px] sm:max-w-[225px] md:max-w-[300px] lg:max-w-[350px] h-auto md:h-[250px] lg:h-[300px] rounded-md object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 bg-white py-6 sm:py-8 md:py-10 lg:py-12 rounded-lg shadow-sm h-full">
              <div className="flex flex-col md:flex-row items-center max-w-5xl gap-4 sm:gap-6 md:gap-8">
                <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0 md:mr-4 lg:mr-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary mb-2 sm:mb-3 md:mb-4">
                    Transparency
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-primary">
                    We commit to openness and clarity in all our communications
                    and decisions. By sharing information honestly and promptly,
                    we build trust within our community and stakeholders.
                    Transparency empowers everyone to understand how and why
                    decisions are made, creating an environment of accountability
                    and confidence. We encourage openness at every level, ensuring
                    no information is hidden, fostering a culture where questions
                    are welcomed and clarity is prioritized.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center mt-2 md:mt-0">
                  <img
                    src={transparency}
                    alt="Illustration representing transparency"
                    className="w-full max-w-[200px] sm:max-w-[225px] md:max-w-[300px] lg:max-w-[350px] h-auto md:h-[250px] lg:h-[300px] rounded-md object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 bg-white py-6 sm:py-8 md:py-10 lg:py-12 rounded-lg shadow-sm h-full">
              <div className="flex flex-col md:flex-row items-center max-w-5xl gap-4 sm:gap-6 md:gap-8">
                <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0 md:mr-4 lg:mr-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary mb-2 sm:mb-3 md:mb-4">
                    Excellence
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-primary">
                    We strive for the highest standards in everything we do,
                    continuously improving to deliver exceptional outcomes.
                    Excellence drives our commitment to quality, innovation, and
                    professionalism. By embracing challenges with determination
                    and a growth mindset, we inspire each other to go beyond
                    expectations. Our dedication to excellence ensures that we
                    consistently meet and exceed the needs of those we serve.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center mt-2 md:mt-0">
                  <img
                    src={excellence}
                    alt="Illustration representing excellence"
                    className="w-full max-w-[200px] sm:max-w-[225px] md:max-w-[300px] lg:max-w-[350px] h-auto md:h-[250px] lg:h-[300px] rounded-md object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 bg-white py-6 sm:py-8 md:py-10 lg:py-12 rounded-lg shadow-sm h-full">
              <div className="flex flex-col md:flex-row items-center max-w-5xl gap-4 sm:gap-6 md:gap-8">
                <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0 md:mr-4 lg:mr-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary mb-2 sm:mb-3 md:mb-4">
                    Governance
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-primary">
                    Our governance framework is built on accountability,
                    integrity, and responsible leadership. We adhere strictly to
                    policies and regulations that guide our operations to ensure
                    fairness and justice. Through effective oversight and clear
                    structures, we safeguard the interests of all stakeholders and
                    maintain the highest ethical standards. Our leaders serve as
                    role models, ensuring that decisions are transparent and
                    aligned with our mission and values.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center mt-2 md:mt-0">
                  <img
                    src={governance}
                    alt="Illustration representing governance"
                    className="w-full max-w-[200px] sm:max-w-[225px] md:max-w-[300px] lg:max-w-[350px] h-auto md:h-[250px] lg:h-[300px] rounded-md object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </motion.div>
  );
}

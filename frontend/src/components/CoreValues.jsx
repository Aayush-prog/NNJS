import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import integrityImage from "../assets/integrity.png";
import governance from "../assets/governance.jpg";
import togetherness from "../assets/togetherness.jpg";
import transparency from "../assets/transparency.jpg";
import excellence from "../assets/excellence.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

export default function CoreValues() {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize for responsive Swiper effects
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Framer Motion variant for a simple fade-in-up animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // An array to hold the data for each slide, making the component cleaner
  const slides = [
    {
      title: "Integrity",
      text: `We demonstrate honesty, trust, and mutual respect in all our interactions. We accept responsibility for our actions and the resulting outcomes. Our team is consistently transparent, open, and fair without prejudice in dealing with others. We encourage everyone to speak up when something appears wrong or inappropriate, fostering a culture of ethical practice.`,
      image: integrityImage,
      alt: "Illustration representing integrity",
    },
    {
      title: "Togetherness",
      text: `We believe in the power of unity and collaboration to achieve shared goals. Our community thrives on mutual support, respect, and inclusivity where every voice is valued. Togetherness means working side by side, overcoming challenges as a team, and celebrating collective successes. By fostering strong relationships and teamwork, we create an environment where everyone feels connected and empowered to contribute their best.`,
      image: togetherness,
      alt: "Illustration representing togetherness",
    },
    {
      title: "Transparency",
      text: `We commit to openness and clarity in all our communications and decisions. By sharing information honestly and promptly, we build trust within our community and stakeholders. Transparency empowers everyone to understand how and why decisions are made, creating an environment of accountability and confidence. We encourage openness at every level, ensuring no information is hidden, fostering a culture where questions are welcomed and clarity is prioritized.`,
      image: transparency,
      alt: "Illustration representing transparency",
    },
    {
      title: "Excellence",
      text: `We strive for the highest standards in everything we do, continuously improving to deliver exceptional outcomes. Excellence drives our commitment to quality, innovation, and professionalism. By embracing challenges with determination and a growth mindset, we inspire each other to go beyond expectations. Our dedication to excellence ensures that we consistently meet and exceed the needs of those we serve.`,
      image: excellence,
      alt: "Illustration representing excellence",
    },
    {
      title: "Governance",
      text: `Our governance framework is built on accountability, integrity, and responsible leadership. We adhere strictly to policies and regulations that guide our operations to ensure fairness and justice. Through effective oversight and clear structures, we safeguard the interests of all stakeholders and maintain the highest ethical standards. Our leaders serve as role models, ensuring that decisions are transparent and aligned with our mission and values.`,
      image: governance,
      alt: "Illustration representing governance",
    },
  ];

  // Assuming a common aspect ratio for the images, adjust if needed
  const aspectRatio = "1 / 1";

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="min-h-[70vh] sm:min-h-[80vh] md:min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center bg-support space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
    >
      <motion.h2
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary px-4 text-center"
      >
        Our Values
      </motion.h2>

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
            dynamicBullets: true,
          }}
          modules={[EffectFade, Autoplay, Pagination, Mousewheel]}
          className="mySwiper w-full h-[580px] sm:h-[520px] md:h-[450px]"
        >
          {slides.map(({ title, text, image, alt }, index) => (
            <SwiperSlide key={title}>
              <div className="flex items-start md:items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 bg-white py-6 sm:py-8 md:py-10 lg:py-12 rounded-lg shadow-sm h-full">
                <div className="flex flex-col-reverse md:flex-row items-center max-w-5xl gap-6 sm:gap-8">
                  <div className="md:w-1/2 text-center md:text-left md:mr-4 lg:mr-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary mb-2 sm:mb-3 md:mb-4">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-primary text-justify p-3">
                      {text}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    {/* Image with fixed height, width and aspect ratio */}
                    <img
                      src={image}
                      alt={alt}
                      className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px] h-[260px] sm:h-[280px] md:h-[300px] lg:h-[350px] rounded-md object-cover object-center"
                      style={{ aspectRatio: aspectRatio }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
}
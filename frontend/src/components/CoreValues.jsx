import { motion } from "framer-motion";
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

export default function CoreValues() {
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
      viewport={{ once: true, amount: 0.2 }}
      className="h-screen flex flex-col items-center justify-center bg-support space-y-10"
    >
      <motion.h2
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl font-bold text-primary font-secondary"
      >
        Our Values
      </motion.h2>
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 1,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Autoplay, Pagination, Mousewheel]}
        className="mySwiper"
        style={{ width: "75%" }}
      >
        <SwiperSlide>
          <div className="flex items-center justify-center pl-10 bg-white h-full">
            <div className="flex flex-col md:flex-row items-center max-w-5xl">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                <h3 className="text-3xl font-bold text-primary font-secondary mb-4">
                  Integrity
                </h3>
                <p className="text-xl font-primary">
                  We demonstrate honesty, trust, and mutual respect in all our
                  interactions. We accept responsibility for our actions and the
                  resulting outcomes. Our team is consistently transparent,
                  open, and fair without prejudice in dealing with others. We
                  encourage everyone to speak up when something appears wrong or
                  inappropriate, fostering a culture of ethical practice.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={integrityImage}
                  alt="Illustration representing integrity"
                  className="w-100 h-100 object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center pl-10 bg-white h-full">
            <div className="flex flex-col md:flex-row items-center max-w-5xl">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                <h3 className="text-3xl font-bold text-primary font-secondary mb-4">
                  Togetherness
                </h3>
                <p className="text-lg font-primary">
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
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={togetherness}
                  alt="Illustration representing integrity"
                  className="w-100 h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center pl-10 bg-white h-full">
            <div className="flex flex-col md:flex-row items-center max-w-5xl">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                <h3 className="text-3xl font-bold text-primary font-secondary mb-4">
                  Transparency
                </h3>
                <p className="text-lg font-primary">
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
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={transparency}
                  alt="Illustration representing integrity"
                  className="w-100 h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center pl-10 bg-white h-full">
            <div className="flex flex-col md:flex-row items-center max-w-5xl">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                <h3 className="text-3xl font-bold text-primary font-secondary mb-4">
                  Excellence
                </h3>
                <p className="text-lg font-primary">
                  We strive for the highest standards in everything we do,
                  continuously improving to deliver exceptional outcomes.
                  Excellence drives our commitment to quality, innovation, and
                  professionalism. By embracing challenges with determination
                  and a growth mindset, we inspire each other to go beyond
                  expectations. Our dedication to excellence ensures that we
                  consistently meet and exceed the needs of those we serve.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={excellence}
                  alt="Illustration representing integrity"
                  className="w-100 h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center pl-10 bg-white h-full">
            <div className="flex flex-col md:flex-row items-center max-w-5xl">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
                <h3 className="text-3xl font-bold text-primary font-secondary mb-4">
                  Governance
                </h3>
                <p className="text-lg font-primary">
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
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={governance}
                  alt="Illustration representing integrity"
                  className="w-100 h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </motion.div>
  );
}

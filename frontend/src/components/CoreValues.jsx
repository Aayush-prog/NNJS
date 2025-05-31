import { motion } from "framer-motion";
import integrityImage from "../assets/integrity.png";
import governance from "../assets/governance.jpg";
import togetherness from "../assets/togetherness.jpg";
import transparency from "../assets/transparency.jpg";
import excellence from "../assets/excellence.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function CoreValues() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="min-h-screen flex flex-col items-center justify-center bg-support space-y-10"
    >
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-6xl font-bold text-primary font-secondary"
      >
        Our Values
      </motion.h1>

      <Swiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={30}
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
        modules={[Autoplay, Pagination, Mousewheel]}
        className="mySwiper"
        style={{ width: "75%" }}
      >
        {/* Slide 1 - Integrity */}
        <SwiperSlide>
          <SlideContent
            title="Integrity"
            image={integrityImage}
            alt="Illustration representing integrity"
            description="We demonstrate honesty, trust, and mutual respect in all our interactions. We accept responsibility for our actions and the resulting outcomes..."
          />
        </SwiperSlide>

        {/* Slide 2 - Togetherness */}
        <SwiperSlide>
          <SlideContent
            title="Togetherness"
            image={togetherness}
            alt="Illustration representing togetherness"
            description="We believe in the power of unity and collaboration to achieve shared goals. Our community thrives on mutual support, respect, and inclusivity..."
          />
        </SwiperSlide>

        {/* Slide 3 - Transparency */}
        <SwiperSlide>
          <SlideContent
            title="Transparency"
            image={transparency}
            alt="Illustration representing transparency"
            description="We commit to openness and clarity in all our communications and decisions. By sharing information honestly and promptly, we build trust..."
          />
        </SwiperSlide>

        {/* Slide 4 - Excellence */}
        <SwiperSlide>
          <SlideContent
            title="Excellence"
            image={excellence}
            alt="Illustration representing excellence"
            description="We strive for the highest standards in everything we do, continuously improving to deliver exceptional outcomes. Excellence drives our commitment..."
          />
        </SwiperSlide>

        {/* Slide 5 - Governance */}
        <SwiperSlide>
          <SlideContent
            title="Governance"
            image={governance}
            alt="Illustration representing governance"
            description="Our governance framework is built on accountability, integrity, and responsible leadership. We adhere strictly to policies and regulations..."
          />
        </SwiperSlide>
      </Swiper>
    </motion.div>
  );
}

function SlideContent({ title, image, alt, description }) {
  return (
    <div className="flex items-center justify-center pl-10 bg-white h-full">
      <div className="flex flex-col md:flex-row items-center max-w-5xl">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-8">
          <h2 className="text-6xl font-bold text-primary font-secondary mb-4">
            {title}
          </h2>
          <p className="text-xl font-primary">{description}</p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={image}
            alt={alt}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

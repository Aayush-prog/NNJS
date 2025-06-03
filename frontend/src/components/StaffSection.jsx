import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sailesh from "../assets/sailesh.jpg";
import sabita from "../assets/sabita.jpg";
import sailendra from "../assets/sailendra.jpg";
import ranjan from "../assets/ranjan.jpg";
import manish from "../assets/manish.jpg";
import man from "../assets/man.jpeg";

const staffMembers = [
  {
    name: "Dr. Sailesh Kumar Mishra",
    title: "Executive Director",
    email: "smishra@nnjs.org.np",
    image: sailesh,
  },
  {
    name: "Mrs. Sabita K.C.",
    title: "Board Secretary",
    email: "sabita@nnjs.org.np",
    image: sabita,
  },
  {
    name: "Mr. Sailendra Man Singh",
    title: "IT Officer",
    email: "sailendra@nnjs.org.np",
    image: sailendra,
  },
  {
    name: "Mr. Ranjan Shah",
    title: "Program Manager",
    email: "ranjan_shah@nnjs.org.np",
    image: ranjan,
  },
  {
    name: "Mr. Manish Sharma",
    title: "Finance Officer",
    email: "manish@nnjs.org.np",
    image: manish,
  },
  {
    name: "Mr. Man Bahadur Kunwar",
    title: "Project Manager",
    email: "manbahadurk@nnjs.org.np",
    image: man,
  },
];

export default function StaffSection() {
  const groupedStaff = [];
  for (let i = 0; i < staffMembers.length; i += 3) {
    groupedStaff.push(staffMembers.slice(i, i + 3));
  }

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 px-6 text-center relative">
      <h2 className="text-4xl font-bold font-secondary text-primary mb-12">
        Our Staff
      </h2>

      <div className="max-w-6xl mx-auto relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
        >
          {groupedStaff.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-12">
                {group.map((staff, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition 
                    h-[300px]" 
                  >
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="h-32 w-32 object-cover rounded-full mx-auto mb-4 border-2 border-gray-300 shadow-sm"
                    />
                    <h3 className="text-lg font-bold text-primary font-secondary mb-1">
                      {staff.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      {staff.title}
                    </p>
                    <p className="text-sm text-primary">{staff.email}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          ref={prevRef}
          className="swiper-button-prev-custom absolute top-1/2 -left-25 -translate-y-1/2 p-2 md:p-4 bg-blue-50 rounded-full shadow-md z-10 cursor-pointer"
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div
          ref={nextRef}
          className="swiper-button-next-custom absolute top-1/2 -right-25 -translate-y-1/2 p-2 md:p-4 bg-blue-50 rounded-full shadow-md z-10 cursor-pointer"
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function PastChairpersons(props) {
  const person = props.person;
  const api = import.meta.env.VITE_URL;
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 bg-white text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-2 sm:mb-3 md:mb-4">
        Past Chairpersons
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 font-primary">
        The vision and legacy of our past chairpersons have shaped Nepal Netra
        Jyoti Sangh into a leading force for eye care in Nepal. We honor their
        dedication and contributions.
      </p>

      <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {person.map((chair, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center text-center transition duration-300 hover:shadow-lg"
          >
            <img
              src={`${api}/images/${chair.image}`}
              alt={chair.name}
              loading="lazy"
              className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 object-cover rounded-full mb-4 sm:mb-5 md:mb-6"
            />
            <h3 className="text-lg sm:text-xl font-bold text-primary font-secondary mb-1">
              {chair.name}
            </h3>
            <p className="text-sm sm:text-md font-semibold text-gray-600 font-primary mb-1">
              {chair.designation}
            </p>
            <p className="text-xs sm:text-sm font-primary text-gray-500 mb-2 sm:mb-3 md:mb-4">
              {chair.duration}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-primary leading-relaxed">
              {chair.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

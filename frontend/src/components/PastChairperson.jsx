import React from "react";
import gen from "../assets/gen.jpg";
import ram from "../assets/R.P.png";
import tirtha from "../assets/tirtha.jpg";

const pastChairpersons = [
  {
    name: "Lt Bri Gen Ravi Shamsher JBR",
    title: "First Chairperson",
    term: "From 2035-12-13 to 2048-06-16",
    image: gen,
    description:
      "He laid the foundational vision of Nepal Netra Jyoti Sangh and worked tirelessly to establish eye care services across the country.",
  },
  {
    name: "Prof Dr Ram Prasad Pokhrel",
    title: "Second Chairperson",
    term: "From 2048-06-17 to 2070-02-10",
    image: ram,
    description:
      "Under his leadership, NNJS expanded its outreach and infrastructure, helping millions gain access to affordable eye care.",
  },
  {
    name: "Prof Dr Tirtha Prasad Mishra",
    title: "Third Chairperson",
    term: "From 2070-02-11 to 2076-07-30",
    image: tirtha,
    description:
      "He modernized operations and enhanced collaborations with international eye care institutions during his tenure.",
  },
];

export default function PastChairpersons() {
  return (
    <section className="py-16 px-32 bg-white text-center">
      <h2 className="text-4xl font-bold font-secondary text-primary mb-4">
        Past Chairpersons
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg font-primary">
        The vision and legacy of our past chairpersons have shaped Nepal Netra
        Jyoti Sangh into a leading force for eye care in Nepal. We honor their
        dedication and contributions.
      </p>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {pastChairpersons.map((chair, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-10 flex flex-col items-center text-center transition duration-300 hover:shadow-lg"
          >
            <img
              src={chair.image}
              alt={chair.name}
              className="h-40 w-40 object-cover rounded-full mb-6"
            />
            <h3 className="text-xl font-bold text-primary font-secondary mb-1">
              {chair.name}
            </h3>
            <p className="text-md font-semibold text-gray-600 font-primary mb-1">
              {chair.title}
            </p>
            <p className="text-sm font-primary text-gray-500 mb-4">
              {chair.term}
            </p>
            <p className="text-gray-700 font-primary leading-relaxed">
              {chair.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

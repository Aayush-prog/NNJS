import React from "react";

const staffMembers = [
  {
    name: "Dr. Sailesh Kumar Mishra",
    title: "Executive Director",
    email: "smishra@nnjs.org.np",
  },
  {
    name: "Mrs. Sabita K.C.",
    title: "Board Secretary",
    email: "sabita@nnjs.org.np",
  },
  {
    name: "Mr. Sailendra Man Singh",
    title: "IT Officer",
    email: "sailendra@nnjs.org.np",
  },
  {
    name: "Mr. Ranjan Shah",
    title: "Program Manager",
    email: "ranjan_shah@nnjs.org.np",
  },
  {
    name: "Mr. Manish Sharma",
    title: "Finance Officer",
    email: "manish@nnjs.org.np",
  },
  {
    name: "Mr. Man Bahadur Kunwar",
    title: "Project Manager",
    email: "manbahadurk@nnjs.org.np",
  },
];

export default function StaffSection() {
  return (
    <section className="py-16 px-6 bg-blue-50 text-center">
      <h2 className="text-4xl font-bold font-secondary text-primary mb-12">
        Our Staff
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {staffMembers.map((staff, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            {/* <img
              src={staff.image}
              alt={staff.name}
              className="h-32 w-32 object-cover rounded-full mx-auto mb-4 border-4 border-primary"
            /> */}
            <h3 className="text-lg font-bold text-gray-800 font-secondary mb-1">
              {staff.name}
            </h3>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              {staff.title}
            </p>
            <p className="text-sm text-primary">{staff.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

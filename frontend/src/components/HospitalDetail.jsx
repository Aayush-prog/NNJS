import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyHospitals } from "./AllBranches";

export default function HospitalDetail() {
  // disable background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const { id } = useParams();
  const index = parseInt(id, 10);
  const hospital = dummyHospitals[index];
  if (!hospital) return <p>Hospital not found</p>;

  return (
    <div className="fixed inset-0 z-50  bg-primary bg-opacity-10 backdrop-blur-md flex justify-center items-start overflow-auto p-4">
      <div className="bg-white rounded-lg overflow-auto max-w-2xl w-full space-y-4 p-6 relative border border-gray-200 shadow-lg">
        <Link to="/what_we_do" className="absolute top-4 right-4 text-gray-500 text-2xl">×</Link>
        <h1 className="text-3xl font-bold">{hospital.name}</h1>
        {hospital.images && (
          <img src={hospital.images} alt={hospital.name} className="w-full h-64 object-cover rounded" />
        )}
        <p><strong>Address:</strong> {hospital.address}</p>
        <p><strong>Phone:</strong> {hospital.phone}</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${hospital.email}`} className="text-sky-600 underline">
            {hospital.email}
          </a>
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={hospital.website.startsWith("http") ? hospital.website : `https://${hospital.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline"
          >
            {hospital.website}
          </a>
        </p>
      </div>
    </div>
  );
}
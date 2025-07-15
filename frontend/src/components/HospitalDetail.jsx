import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
export default function HospitalDetail() {
  // disable background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const { id } = useParams();
  const [hospital, setHospital] = useState();
  const api = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHospital = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/eyeHospitals/${id}`);
        console.log(res.data);
        if (res.status === 200) {
          setHospital(res.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching page: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchHospital();
  }, [api]);
  if (loading) return <Loading />;
  if (!hospital) return <p>Hospital not found</p>;

  return (
    <div className="fixed inset-0 z-50  bg-primary/50 backdrop-blur-md flex justify-center items-start overflow-auto p-4">
      <div className="bg-white rounded-lg overflow-auto max-w-4xl w-full space-y-4 p-6 relative border border-gray-200 shadow-lg">
        <Link
          to="/what_we_do"
          className="absolute top-4 right-4 text-gray-500 text-2xl"
        >
          ×
        </Link>
        <h1 className="text-3xl font-bold">{hospital.title}</h1>
        {hospital.image && (
          <img
            loading="lazy"
            src={`${api}/images/${hospital.image}`}
            alt={hospital.title}
            className="w-full h-64 object-cover rounded"
          />
        )}
        {hospital.address && (
          <div>
            <strong>Address:</strong> {hospital.address}
          </div>
        )}
        {hospital.phone && (
          <div>
            <strong>Phone:</strong> {hospital.phone}
          </div>
        )}
        {hospital.email && (
          <div>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${hospital.email}`}
              className="text-sky-600 underline"
            >
              {hospital.email}
            </a>
          </div>
        )}
        {hospital.website && (
          <div>
            <strong>Website:</strong>{" "}
            <a
              href={
                hospital.website.startsWith("http")
                  ? hospital.website
                  : `https://${hospital.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 underline"
            >
              {hospital.website}
            </a>
          </div>
        )}
        <p className="whitespace-pre-wrap">{hospital.body}</p>
      </div>
    </div>
  );
}

import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
export default function CenterDetail() {
  const { id } = useParams();
  const [center, setCenter] = useState();
  const api = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCenter = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/eyeCareCenters/${id}`);
        console.log(res.data);
        if (res.status === 200) {
          setCenter(res.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching page: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchCenter();
  }, [api]);
  if (loading) return <Loading />;
  if (!center) return <p>Center not found</p>;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-auto p-4">
      <div className="bg-white rounded-lg overflow-auto max-w-2xl w-full space-y-4 p-6 relative">
        <Link
          to="/what_we_do"
          className="absolute top-4 right-4 text-gray-500 text-2xl"
        >
          ×
        </Link>
        <h1 className="text-3xl font-bold">{center.name}</h1>
        <p>
          <strong>District:</strong> {center.district}
        </p>
        {center.contactPerson && (
          <p>
            <strong>Contact Person:</strong> {center.contactPerson}
          </p>
        )}
        {center.contactNumber && (
          <p>
            <strong>Contact Number:</strong> {center.contactNumber}
          </p>
        )}
      </div>
    </div>
  );
}

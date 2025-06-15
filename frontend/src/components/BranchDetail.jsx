import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
export default function BranchDetail() {
  const { id } = useParams();
  const [branch, setBranch] = useState();
  const api = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBranch = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/branches/${id}`);
        console.log(res.data);
        if (res.status === 200) {
          setBranch(res.data.data);
          setLoading(false);
        } else {
          console.error("Error fetching page: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchBranch();
  }, [api]);
  if (loading) return <Loading />;
  if (!branch) return <p>Branch not found</p>;
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-xs flex justify-center items-start overflow-auto p-4">
      <div className="bg-white rounded-lg overflow-auto max-w-2xl w-full space-y-4 p-6 relative border border-gray-200 shadow-lg">
        <Link
          to="/what_we_do"
          className="absolute top-4 right-4 text-gray-500 text-2xl"
        >
          ×
        </Link>
        <h1 className="text-3xl font-bold">Branch: {branch.district}</h1>
        <p>
          <strong>Contact Person:</strong> {branch.contactPerson}
        </p>
        <p>
          <strong>Committee:</strong> {branch.committee}
        </p>
      </div>
    </div>
  );
}

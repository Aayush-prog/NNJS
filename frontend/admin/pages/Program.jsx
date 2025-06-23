import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaDownload, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../AuthContext";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Program() {
  const [files, setFiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/program`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const sheets = res.data?.data ?? [];
      setFiles(sheets);
      setFiltered(sheets);
    } catch (err) {
      console.error("Error fetching files", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileName) => {
    if (!window.confirm(`Are you sure you want to delete ${fileName}?`)) return;
    try {
      await axios.delete(`${api}/program/`, {
        data: { fileName },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setFiles(files.filter((file) => file !== fileName));
      setFiltered(filtered.filter((file) => file !== fileName));
    } catch (err) {
      console.error("Error deleting file", err);
    }
  };

  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `${api}/sheets/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFiltered(files.filter((file) => file.toLowerCase().includes(keyword)));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Nav />
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Program Sheets</h1>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search files..."
          className="w-full p-2 mb-6 border rounded-md shadow"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered && filtered.length > 0 ? (
            filtered.map((file, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
              >
                <p className="font-medium break-all mb-2">{file}</p>

                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => handleDownload(file)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  >
                    <FaDownload /> Download
                  </button>

                  <button
                    onClick={() => handleDelete(file)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No files found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

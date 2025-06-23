import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaFilePdf, FaPlus, FaPen, FaTrash } from "react-icons/fa";
import axios from "axios";
import Pagination from "../components/Pagination";
import { AuthContext } from "../../AuthContext";
import Loading from "./Loading";

const PressReleasesSection = ({
  pressReleases,
  setPressReleases,
  api,
  activeFilter,
  setActiveFilter,
  releaseCurrentPage,
  setReleaseCurrentPage,
  releasesPerPage,
  handleReleasePageChange,
  AVAILABLE_YEARS,
}) => {
  const { authToken } = useContext(AuthContext);
  const[loading,setLoading]=useState(false)
  // State for press release management
  const [isAddingRelease, setIsAddingRelease] = useState(false);
  const [editingReleaseId, setEditingReleaseId] = useState(null);
  const [newRelease, setNewRelease] = useState({
    title: "",
    body: "",
    type: "Press Releases",
    link: "",
    file: null,
  });
  const [editedRelease, setEditedRelease] = useState({
    title: "",
    body: "",
    type: "Press Releases",
    link: "",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Calculate pagination for press releases
  const filteredReleases =
    activeFilter === "all"
      ? pressReleases
      : pressReleases.filter(
          (release) =>
            format(new Date(release.createdAt), "yyyy") === activeFilter
        );

  const indexOfLastRelease = releaseCurrentPage * releasesPerPage;
  const indexOfFirstRelease = indexOfLastRelease - releasesPerPage;
  const currentReleases = filteredReleases.slice(
    indexOfFirstRelease,
    indexOfLastRelease
  );
  const totalReleasePages = Math.ceil(
    filteredReleases.length / releasesPerPage
  );
const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/media`);
      if (res.status === 200) {
        setPressReleases(res.data.press || []);
      } else {
        console.error("Error fetching news: Status code", res.status);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  // CRUD Functions
  const handleAddRelease = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newRelease.title);
      formData.append("body", newRelease.body);
      formData.append("type", newRelease.type);
      formData.append("link", newRelease.link);
      
      if (newRelease.file) {
        formData.append("file", newRelease.file);
      }

      const response = await axios.post(`${api}/media/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("New press release added:", response.data);
      
      // Reset form state first
      setIsAddingRelease(false);
      setNewRelease({
        title: "",
        body: "",
        type: "Press Releases",
        link: "",
        file: null,
      });

     fetchMedia()
    } catch (error) {
      console.error("Error adding new press release:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRelease = (release) => {
    setEditingReleaseId(release._id);
    setEditedRelease({
      title: release.title || "",
      body: release.body || "",
      type: release.type || "Press Releases",
      link: release.link || "",
      file: null,
    });
  };

  const handleUpdateRelease = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedRelease.title);
      formData.append("body", editedRelease.body);
      formData.append("type", editedRelease.type);
      formData.append("link", editedRelease.link);

      if (editedRelease.file) {
        formData.append("file", editedRelease.file);
      }

      const response = await axios.patch(
        `${api}/media/edit/${editingReleaseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Press release updated:", response.data);
      
      // Reset editing state first
      setEditingReleaseId(null);

      fetchMedia()
    } catch (error) {
      console.error("Error updating press release:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleDeleteRelease = async (releaseId) => {
    if (window.confirm("Are you sure you want to delete this press release?")) {
      try {
        await axios.delete(`${api}/media/del/${releaseId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log("Press release deleted");
        fetchMedia()
      } catch (error) {
        console.error("Error deleting press release:", error);
      }
    }
  };

  const handleNewReleaseChange = (e) => {
    const { name, value } = e.target;
    setNewRelease(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditedReleaseChange = (e) => {
    const { name, value } = e.target;
    setEditedRelease(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewReleaseFileChange = (e) => {
    const file = e.target.files[0];
    setNewRelease(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleEditedReleaseFileChange = (e) => {
    const file = e.target.files[0];
    setEditedRelease(prev => ({
      ...prev,
      file: file
    }));
  };
  if(loading)return <Loading/>

  return (
    <section id="releases-section" className="py-10 sm:py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-secondary">
              Press Releases
            </h2>
            <button
              onClick={() => setIsAddingRelease(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <FaPlus /> Add Press Release
            </button>
          </div>
        </motion.div>

        {/* Filter controls */}
        <motion.div
          className="flex justify-center mb-8 overflow-x-auto py-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => {
                setActiveFilter("all");
                setReleaseCurrentPage(1);
              }}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium font-secondary rounded-l-lg border ${
                activeFilter === "all"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {AVAILABLE_YEARS.map((year, index) => (
              <button
                key={`year-${year}-${index}`}
                onClick={() => {
                  setActiveFilter(year);
                  setReleaseCurrentPage(1);
                }}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium font-secondary border-t border-b border-r ${
                  index === AVAILABLE_YEARS.length - 1 ? "rounded-r-lg" : ""
                } ${
                  activeFilter === year
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Add Press Release Modal */}
        {isAddingRelease && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Add Press Release</h3>

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newRelease.title}
                onChange={handleNewReleaseChange}
                className="w-full border rounded-lg p-2 mb-3"
              />

              <textarea
                name="body"
                placeholder="Description"
                value={newRelease.body}
                onChange={handleNewReleaseChange}
                className="w-full border rounded-lg p-2 mb-3"
                rows="3"
              />

              <input
                type="url"
                name="link"
                placeholder="External Link (optional)"
                value={newRelease.link}
                onChange={handleNewReleaseChange}
                className="w-full border rounded-lg p-2 mb-3"
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleNewReleaseFileChange}
                className="w-full border rounded-lg p-2 mb-3"
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleAddRelease}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddingRelease(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Press Release Modal */}
        {editingReleaseId && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Edit Press Release</h3>

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editedRelease.title}
                onChange={handleEditedReleaseChange}
                className="w-full border rounded-lg p-2 mb-3"
              />

              <textarea
                name="body"
                placeholder="Description"
                value={editedRelease.body}
                onChange={handleEditedReleaseChange}
                className="w-full border rounded-lg p-2 mb-3"
                rows="3"
              />

              <input
                type="url"
                name="link"
                placeholder="External Link (optional)"
                value={editedRelease.link}
                onChange={handleEditedReleaseChange}
                className="w-full border rounded-lg p-2 mb-3"
              />
                onChange={handleEditedReleaseFileChange}
                className="w-full border rounded-lg p-2 mb-3"
              

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleUpdateRelease}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingReleaseId(null)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {pressReleases.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading press releases...</p>
          </div>
        ) : filteredReleases.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">
              No press releases found for this year.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentReleases.map((release) => (
                <motion.div
                  key={release._id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative group bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  {/* Edit/Delete buttons */}
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditRelease(release)}
                        className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-xs"
                      >
                        <FaPen size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteRelease(release._id)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-secondary">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 mt-1 font-primary">
                      {release.createdAt &&
                        format(new Date(release.createdAt), "MMMM dd, yyyy")}
                    </p>
                    {release.body && (
                      <p className="text-gray-700 mt-2 font-primary">
                        {release.body}
                      </p>
                    )}
                    {release.link && (
                      <a
                        href={release.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-2"
                      >
                        Link to the article
                      </a>
                    )}
                  </div>
                  {release.file && (
                    <a
                      href={`${api}/files/${release.file}`}
                      className="flex items-center text-primary hover:text-accent transition-colors duration-300 mt-2 sm:mt-0 font-secondary"
                    >
                      <FaFilePdf className="mr-2" />
                      <span className="text-sm sm:text-base font-secondary">
                        Download PDF
                      </span>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Add Pagination for press releases */}
            {filteredReleases.length > releasesPerPage && (
              <Pagination
                currentPage={releaseCurrentPage}
                totalPages={totalReleasePages}
                onPageChange={handleReleasePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PressReleasesSection;
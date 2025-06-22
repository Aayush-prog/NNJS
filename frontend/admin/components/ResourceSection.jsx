import React, { useState, useEffect, useContext } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import Loading from "./Loading";
import { AuthContext } from "../../AuthContext";

const categories = [
  {
    group: "Notice & Reports",
    includes: ["Notice & Reports"],
    stateKey: "notice",
  },
  {
    group: "Guidelines & Protocols",
    includes: ["Guidelines & Protocols"],
    stateKey: "guidelines",
  },
  {
    group: "Media & Bulletins",
    includes: ["Media & Bulletins"],
    stateKey: "media",
  },
  {
    group: "Publications",
    includes: ["Publications"],
    stateKey: "publications",
  },
  {
    group: "CMEs & Conference",
    includes: ["CMEs & Conference"],
    stateKey: "cmes",
  },
  {
    group: "RAAB Survey",
    includes: ["RAAB Survey"],
    stateKey: "raab",
  },
];

const ResourcesSection = () => {
  const [activeGroup, setActiveGroup] = useState("Notice & Reports");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [media, setMedia] = useState([]);
  const [publications, setPublications] = useState([]);
  const [cmes, setCMEs] = useState([]);
  const [raab, setRAAB] = useState([]);
  const [fileDeleted, setfileDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [newResource, setNewResource] = useState({
    title: "",
    body: "",
    link: "",
    file: null,
    type: "Notice & Reports", // Default type
  });
  const { authToken } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const api = import.meta.env.VITE_URL; // Define api here

  const fetchResource = async () => {
    setLoading(true);
    try {
      console.log(api);
      const res = await axios.get(`${api}/resource`);
      console.log(res.data);
      if (res.status === 200) {
        setNotice(res.data.notice || []); // Initialize to empty array if undefined
        setGuidelines(res.data.guidelines || []);
        setMedia(res.data.media || []);
        setPublications(res.data.publications || []);
        setCMEs(res.data.cmes || []);
        setRAAB(res.data.raab || []);
        setLoading(false);
      } else {
        console.error("Error fetching page: Status code", res.status);
        setLoading(false); // Ensure loading is set to false even on error
      }
    } catch (error) {
      console.error("Error fetching page:", error);
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

  useEffect(() => {
    fetchResource();
  }, [api]);

  // Determine which state array corresponds to the active category.
  const getActiveCategoryData = () => {
    const activeCategoryObject = categories.find(
      (cat) => cat.group === activeGroup
    );
    if (!activeCategoryObject) return [];

    switch (activeCategoryObject.stateKey) {
      case "notice":
        return notice;
      case "guidelines":
        return guidelines;
      case "media":
        return media;
      case "publications":
        return publications;
      case "cmes":
        return cmes;
      case "raab":
        return raab;
      default:
        return [];
    }
  };

  const activeCategoryData = getActiveCategoryData();

  // Function to handle category selection and close dropdown on mobile
  const handleCategorySelect = (group) => {
    setActiveGroup(group);
    setMenuOpen(false);
    setNewResource((prev) => ({ ...prev, type: group })); // Update newResource type
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setNewResource((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  // Handle Add Resource
  const handleAddResource = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newResource.title);
      formData.append("body", newResource.body);
      formData.append("link", newResource.link);
      formData.append("type", newResource.type);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await axios.post(`${api}/resource/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 201) {
        // Update the appropriate state array based on the new resource's type
        fetchResource(); // Refresh all resources
        setNewResource({
          title: "",
          body: "",
          link: "",
          file: null,
          type: "Notice & Reports",
        });
        setSelectedFile(null);
        setIsAdding(false);
      } else {
        console.log(res.data);
        console.error("Error creating resource:", res.status);
      }
    } catch (error) {
      console.error("Error creating resource:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Resource
  const handleEditResource = (resourceId) => {
    setEditingResourceId(resourceId);
    // Find the resource being edited and populate the newResource state
    const resourceToEdit = activeCategoryData.find(
      (item) => item._id === resourceId
    );
    if (resourceToEdit) {
      setNewResource({
        title: resourceToEdit.title,
        body: resourceToEdit.body,
        link: resourceToEdit.link,
        file: resourceToEdit.file || null,
        type: activeGroup,
        _id: resourceToEdit._id,
      });
    }
  };

  // Handle Update Resource
  const handleUpdateResource = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newResource.title);
      formData.append("body", newResource.body);
      formData.append("link", newResource.link);
      formData.append("type", newResource.type);
      formData.append("fileDeleted", fileDeleted);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await axios.patch(
        `${api}/resource/edit/${newResource._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        // Update the appropriate state array based on the updated resource's type
        fetchResource(); // Refresh all resources
        setNewResource({
          title: "",
          body: "",
          link: "",
          file: null,
          type: "Notice & Reports",
        });
        setSelectedFile(null);
        setEditingResourceId(null);
      } else {
        console.error("Error updating resource:", res.status);
      }
    } catch (error) {
      console.error("Error updating resource:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Resource
  const handleDeleteResource = async (resourceId, type) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${api}/resource/del/${resourceId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 200) {
        // Update the appropriate state array based on the deleted resource's type
        fetchResource(); // Refresh all resources
      } else {
        console.error("Error deleting resource:", res.status);
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 mt-1 mx-auto relative">
      {" "}
      {/* Added relative positioning */}
      {/* Mobile view - Dropdown for categories */}
      <div className="md:hidden pt-8">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-left"
        >
          <span className="font-secondary font-semibold text-primary">
            {activeGroup}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              menuOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {categories.map(({ group }) => (
              <button
                key={group}
                onClick={() => handleCategorySelect(group)}
                className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                  activeGroup === group ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Desktop view - Tabs for categories */}
      <div className="hidden md:flex md:flex-wrap gap-20 border-b border-gray-300 mb-4 justify-evenly">
        {categories.map(({ group }) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`py-3 md:py-6 text-xs md:text-sm border-b-2 transition font-secondary font-semibold ${
              activeGroup === group
                ? "text-blue-600 border-blue-600 pb-[11px]"
                : "text-gray-700 border-transparent hover:text-blue-600 pb-3"
            }`}
          >
            {group}
          </button>
        ))}
      </div>
      {/* Add New Resource Button - Below Tabs */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-50 hover:bg-blue-600 text-primary hover:text-white rounded-full p-4 transition duration-300 shadow-md hover:shadow-lg"
        >
          <FaPlus />
        </button>
      </div>
      <div className="grid grid-cols-1 mb-6 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 sm:p-4 md:p-8">
        {activeCategoryData && activeCategoryData.length > 0 ? (
          activeCategoryData.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md md:shadow-lg rounded-xl p-4 md:p-5 hover:shadow-xl transition h-auto md:h-[200px] flex flex-col"
            >
              <div className="flex justify-end gap-2">
                {" "}
                {/* Edit/Delete Container */}
                <button
                  onClick={() => handleEditResource(item._id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold p-2 rounded-full"
                >
                  <FaPen className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteResource(item._id, activeGroup)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-1 md:gap-2 mb-2 mt-2">
                  {" "}
                  {/* Added mt-2 to shift content down slightly */}
                  <FaRegFileLines className="w-5 h-5 md:w-7 md:h-7 text-blue-500 flex-shrink-0" />
                  <h3 className="text-base md:text-lg font-semibold text-primary font-secondary line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-primary line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {item.body}
                </p>
              </div>
              {item.link && (
                <a
                  href={`${item.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs md:text-sm font-primary flex items-center hover:underline mt-2 md:mt-4"
                >
                  Visit Resource
                </a>
              )}
              {item.file && (
                <a
                  href={`${api}/files/${item.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs md:text-sm font-primary flex items-center hover:underline mt-2 md:mt-4"
                >
                  <GoDownload className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Download Resource
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-8">
            No resources available in this category.
          </p>
        )}
      </div>
      {/* Resource Form Overlay */}
      {isAdding && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} //  Slightly Darker Overlay
        >
          <div className="bg-white p-6 rounded-xl shadow-md text-center relative w-full max-w-md">
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full"
            >
              <RxCross2 className="inline-block h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Resource</h3>
            <input
              type="text"
              name="title"
              value={newResource.title}
              onChange={handleInputChange}
              className="w-full border mb-2 p-2"
              placeholder="Title"
            />
            <textarea
              name="body"
              value={newResource.body}
              onChange={handleInputChange}
              className="w-full border mb-2 p-2"
              placeholder="Body"
            />
            <input
              type="text"
              name="link"
              value={newResource.link}
              onChange={handleInputChange}
              className="w-full border mb-2 p-2"
              placeholder="Link"
            />
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="w-full border mb-2 p-2"
            />
            <select
              name="type"
              value={newResource.type}
              onChange={handleInputChange}
              className="w-full border mb-4 p-2"
            >
              {categories.map((cat) => (
                <option key={cat.group} value={cat.group}>
                  {cat.group}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddResource}
              className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Resource
            </button>
          </div>
        </div>
      )}
      {/* Resource Form Overlay for Editing */}
      {editingResourceId && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} //  Slightly Darker Overlay
        >
          <div className="bg-white p-6 rounded-xl shadow-md text-center relative w-full max-w-md">
            <button
              onClick={() => setEditingResourceId(null)}
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full"
            >
              <RxCross2 className="inline-block h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Resource</h3>
            <input
              type="text"
              name="title"
              value={newResource.title}
              onChange={handleInputChange}
              className="w-full border mb-2 p-2"
              placeholder="Title"
            />
            <textarea
              name="body"
              value={newResource.body}
              onChange={handleInputChange}
              className="w-full border mb-2 p-2"
              placeholder="Body"
            />
            <input
              type="text"
              name="link"
              value={newResource.link}
              onChange={handleInputChange}
              className="w-full border mb-2 p-2"
              placeholder="Link"
            />
            {newResource.file && (
              <button
                className="p-3 bg-accent"
                onClick={() => {
                  setfileDeleted(true);
                  newResource.file = null;
                  console.log("deleted");
                }}
              >
                {" "}
                Delete file
              </button>
            )}
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="w-full border mb-2 p-2"
            />
            <select
              name="type"
              value={newResource.type}
              onChange={handleInputChange}
              className="w-full border mb-4 p-2"
            >
              {categories.map((cat) => (
                <option key={cat.group} value={cat.group}>
                  {cat.group}
                </option>
              ))}
            </select>
            <button
              onClick={handleUpdateResource}
              className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FaPen /> Update Resource
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesSection;

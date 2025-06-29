import React, { useState, useEffect, useContext } from "react";
import SortSelect from "./Sort";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

// Define the fadeInUp animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Improved sort function that handles different data types
const sortByProperty = (array, property, direction = "asc") => {
  return [...array].sort((a, b) => {
    // Handle missing values
    const valueA = a[property] === undefined ? "" : a[property];
    const valueB = b[property] === undefined ? "" : b[property];

    // Sort by number if both values are numeric
    if (!isNaN(valueA) && !isNaN(valueB)) {
      return direction === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }

    // Otherwise sort alphabetically (case-insensitive)
    const compResult = String(valueA).localeCompare(String(valueB), undefined, {
      sensitivity: "base", // case-insensitive
      numeric: true, // enables natural sorting for strings with numbers
    });

    return direction === "asc" ? compResult : -compResult;
  });
};

const hospitalSortOptions = [
  { value: "title", label: "Name" },
  { value: "address", label: "Address" },
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" }
];

const centerSortOptions = [
  { value: "title", label: "Title" },
  { value: "district", label: "District" },
  { value: "contactPerson", label: "Contact Person" },
  { value: "contactNum", label: "Contact Number" }
];

const presidentSortOptions = [
  { value: "district", label: "District" },
  { value: "president", label: "President" },
  { value: "committee", label: "Committee" },
  { value: "phone", label: "Phone" }
];

export default function NNJSCombinedList({ hospitals = [], centers = [], presidents = [], onDataUpdate }) {
  const { authToken } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const api = import.meta.env.VITE_URL;
  
  // Replace keywords with category filter
  const [activeCategory, setActiveCategory] = useState("all"); // "all", "hospitals", "centers", "presidents"

  const [hospitalSortBy, setHospitalSortBy] = useState("title");
  const [hospitalSortDirection, setHospitalSortDirection] = useState("asc");
  const [hospitalPage, setHospitalPage] = useState(1);

  const [centerSortBy, setCenterSortBy] = useState("title");
  const [centerSortDirection, setCenterSortDirection] = useState("asc");
  const [centerPage, setCenterPage] = useState(1);

  const [presidentSortBy, setPresidentSortBy] = useState("district");
  const [presidentSortDirection, setPresidentSortDirection] = useState("asc");
  const [presidentPage, setPresidentPage] = useState(1);

  const itemsPerPage = 3;
  useEffect(() => {
    const fetchHospital = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/eyeHospitals`);
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

  // State for adding/editing
  const [isAddingHospital, setIsAddingHospital] = useState(false);
  const [newHospital, setNewHospital] = useState({
    title: "",
    body: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    image: null,
  });
  
  const [editingHospitalId, setEditingHospitalId] = useState(null);
  const [editedHospital, setEditedHospital] = useState({
    title: "",
    body: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    image: null,
  });

  const [isAddingCenter, setIsAddingCenter] = useState(false);
  const [newCenter, setNewCenter] = useState({
    title: "",
    body: "",
    district: "",
    contactPerson: "",
    contactNum: "",
    image: null,
  });

  const [editingCenterId, setEditingCenterId] = useState(null);
  const [editedCenter, setEditedCenter] = useState({
    title: "",
    body: "",
    district: "",
    contactPerson: "",
    contactNum: "",
    image: null,
  });

  const [isAddingPresident, setIsAddingPresident] = useState(false);
  const [newPresident, setNewPresident] = useState({
    district: "",
    president: "",
    committee: "",
    phone: "",
    contactPerson: "",
    image: null,
  });

  const [editingPresidentId, setEditingPresidentId] = useState(null);
  const [editedPresident, setEditedPresident] = useState({
    district: "",
    president: "",
    committee: "",
    phone: "",
    contactPerson: "",
    image: null,
  });

  // useEffect for managing body scroll (like GalleryItem)
  useEffect(() => {
    if (editingHospitalId || editingCenterId || editingPresidentId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editingHospitalId, editingCenterId, editingPresidentId]);

  // Hospital handlers with proper data refreshing
  const handleAddHospital = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newHospital.title);
      formData.append("body", newHospital.body);
      formData.append("address", newHospital.address);
      formData.append("phone", newHospital.phone);
      formData.append("email", newHospital.email);
      formData.append("website", newHospital.website);
      if (newHospital.image) {
        formData.append("image", newHospital.image);
      }

      const response = await axios.post(`${api}/eyeHospitals/create`, formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data" 
        },
      });

      console.log("New hospital added:", response.data);
      
      // Refresh data after successful addition
      if (onDataUpdate) {
        await onDataUpdate();
      }
      
      // Reset form and close modal
      setIsAddingHospital(false);
      setNewHospital({
        title: "",
        body: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding new hospital:", error);
    }
  };

  const handleUpdateHospital = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedHospital.title);
      formData.append("body", editedHospital.body);
      formData.append("address", editedHospital.address);
      formData.append("phone", editedHospital.phone);
      formData.append("email", editedHospital.email);
      formData.append("website", editedHospital.website);
      if (editedHospital.image && typeof editedHospital.image === 'object') {
        formData.append("image", editedHospital.image);
      }

      const response = await axios.patch(
        `${api}/eyeHospitals/edit/${editingHospitalId}`,
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data" 
          },
        }
      );
      console.log("Hospital updated:", response.data);
      
      // Refresh data after successful update
      if (onDataUpdate) {
        await onDataUpdate();
      }
      
      // Close modal
      setEditingHospitalId(null);
    } catch (error) {
      console.error("Error updating hospital data:", error);
    }
  };

  const handleDeleteHospital = async (hospitalId) => {
    if (!confirm("Are you sure you want to delete this hospital?")) {
      return;
    }

    try {
      const response = await axios.delete(`${api}/eyeHospitals/del/${hospitalId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      console.log("Hospital deleted:", response.data);
      
      // Refresh data after successful deletion
      if (onDataUpdate) {
        await onDataUpdate();
      }
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  // Center handlers with proper data refreshing
  const handleAddCenter = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newCenter.title);
      formData.append("body", newCenter.body || "");
      formData.append("district", newCenter.district);
      formData.append("contactPerson", newCenter.contactPerson);
      formData.append("contactNum", newCenter.contactNum);
      if (newCenter.image) {
        formData.append("image", newCenter.image);
      }

      const response = await axios.post(`${api}/eyeCareCenters/create`, formData, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data" 
        },
      });

      console.log("New center added:", response.data);
      
      // Refresh data after successful addition
      if (onDataUpdate) {
        await onDataUpdate();
      }
      
      // Reset form and close modal
      setIsAddingCenter(false);
      setNewCenter({
        title: "",
        body: "",
        district: "",
        contactPerson: "",
        contactNum: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding new center:", error);
    }
  };

  const handleUpdateCenter = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedCenter.title);
      formData.append("body", editedCenter.body || "");
      formData.append("district", editedCenter.district);
      formData.append("contactPerson", editedCenter.contactPerson);
      formData.append("contactNum", editedCenter.contactNum);
      if (editedCenter.image && typeof editedCenter.image === 'object') {
        formData.append("image", editedCenter.image);
      }

      const response = await axios.patch(
        `${api}/eyeCareCenters/edit/${editingCenterId}`,
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data" 
          },
        }
      );
      console.log("Center updated:", response.data);
      
      // Refresh data after successful update
      if (onDataUpdate) {
        await onDataUpdate();
      }
      
      // Close modal
      setEditingCenterId(null);
    } catch (error) {
      console.error("Error updating center:", error);
    }
  };

  const handleDeleteCenter = async (centerId) => {
    if (!confirm("Are you sure you want to delete this center?")) {
      return;
    }

    try {
      const response = await axios.delete(`${api}/eyeCareCenters/del/${centerId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      console.log("Center deleted:", response.data);
      
      // Refresh data after successful deletion
      if (onDataUpdate) {
        await onDataUpdate();
      }
    } catch (error) {
      console.error("Error deleting center:", error);
    }
  };

  // President handlers with proper data refreshing
  const handleAddPresident = async () => {
    try {
      const formData = new FormData();
      formData.append("district", newPresident.district);
      formData.append("president", newPresident.president);
      formData.append("committee", newPresident.committee);
      formData.append("phone", newPresident.phone);
      formData.append("contactPerson", newPresident.contactPerson);
      if (newPresident.image) {
        formData.append("image", newPresident.image);
      }

      const response = await axios.post(`${api}/branches/create`, formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data" 
        },
      });

      console.log("New branch added:", response.data);
      
      // Refresh data after successful addition
      if (onDataUpdate) {
        await onDataUpdate();
      }
      
      // Reset form and close modal
      setIsAddingPresident(false);
      setNewPresident({
        district: "",
        president: "",
        committee: "",
        phone: "",
        contactPerson: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding new branch:", error);
    }
  };

  const handleUpdatePresident = async () => {
    try {
      const formData = new FormData();
      formData.append("district", editedPresident.district);
      formData.append("president", editedPresident.president);
      formData.append("committee", editedPresident.committee);
      formData.append("phone", editedPresident.phone);
      formData.append("contactPerson", editedPresident.contactPerson);
      if (editedPresident.image && typeof editedPresident.image === 'object') {
        formData.append("image", editedPresident.image);
      }

      const response = await axios.patch(
        `${api}/branches/edit/${editingPresidentId}`,
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data" 
          },
        }
      );
      console.log("Branch updated:", response.data);
      
      // Refresh data after successful update
      if (onDataUpdate) {
        await onDataUpdate();
      }
      
      // Close modal
      setEditingPresidentId(null);
    } catch (error) {
      console.error("Error updating branch:", error);
    }
  };

  const handleDeletePresident = async (presidentId) => {
    if (!confirm("Are you sure you want to delete this branch?")) {
      return;
    }

    try {
      const response = await axios.delete(`${api}/branches/del/${presidentId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      console.log("Branch deleted:", response.data);
      
      // Refresh data after successful deletion
      if (onDataUpdate) {
        await onDataUpdate();
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  // Add missing handler functions
  const handleNewHospitalChange = (e) => {
    const { name, value } = e.target;
    setNewHospital(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewHospitalImageChange = (e) => {
    setNewHospital(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleEditedHospitalChange = (e) => {
    const { name, value } = e.target;
    setEditedHospital(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditedHospitalImageChange = (e) => {
    setEditedHospital(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleEditHospital = (hospital) => {
    setEditedHospital({
      title: hospital.title || "",
      body: hospital.body || "",
      address: hospital.address || "",
      phone: hospital.phone || "",
      email: hospital.email || "",
      website: hospital.website || "",
      image: hospital.image || null,
    });
    setEditingHospitalId(hospital._id);
  };

  const handleNewCenterChange = (e) => {
    const { name, value } = e.target;
    setNewCenter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewCenterImageChange = (e) => {
    setNewCenter(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleEditedCenterChange = (e) => {
    const { name, value } = e.target;
    setEditedCenter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditedCenterImageChange = (e) => {
    setEditedCenter(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleEditCenter = (center) => {
    setEditedCenter({
      title: center.title || "",
      body: center.body || "",
      district: center.district || "",
      contactPerson: center.contactPerson || "",
      contactNum: center.contactNum || "",
      image: center.image || null,
    });
    setEditingCenterId(center._id);
  };

  const handleNewPresidentChange = (e) => {
    const { name, value } = e.target;
    setNewPresident(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewPresidentImageChange = (e) => {
    setNewPresident(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleEditedPresidentChange = (e) => {
    const { name, value } = e.target;
    setEditedPresident(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditedPresidentImageChange = (e) => {
    setEditedPresident(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleEditPresident = (president) => {
    setEditedPresident({
      district: president.district || "",
      president: president.president || "",
      committee: president.committee || "",
      phone: president.phone || "",
      contactPerson: president.contactPerson || "",
      image: president.image || null,
    });
    setEditingPresidentId(president._id);
  };

  // Add filtering and pagination logic
  const filteredHospitals = hospitals.filter((h) =>
    search === "" ||
    h.title?.toLowerCase().includes(search.toLowerCase()) ||
    h.address?.toLowerCase().includes(search.toLowerCase()) ||
    h.phone?.toLowerCase().includes(search.toLowerCase()) ||
    h.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCenters = centers.filter((c) =>
    search === "" ||
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.district?.toLowerCase().includes(search.toLowerCase()) ||
    c.contactPerson?.toLowerCase().includes(search.toLowerCase()) ||
    c.contactNum?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPresidents = presidents.filter((p) =>
    search === "" ||
    p.district?.toLowerCase().includes(search.toLowerCase()) ||
    p.president?.toLowerCase().includes(search.toLowerCase()) ||
    p.committee?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.toLowerCase().includes(search.toLowerCase()) ||
    p.contactPerson?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedHospitals = sortByProperty(filteredHospitals, hospitalSortBy, hospitalSortDirection);
  const sortedCenters = sortByProperty(filteredCenters, centerSortBy, centerSortDirection);
  const sortedPresidents = sortByProperty(filteredPresidents, presidentSortBy, presidentSortDirection);

  const hospitalTotalPages = Math.ceil(sortedHospitals.length / itemsPerPage);
  const centerTotalPages = Math.ceil(sortedCenters.length / itemsPerPage);
  const presidentTotalPages = Math.ceil(sortedPresidents.length / itemsPerPage);

  const paginatedHospitals = sortedHospitals.slice(
    (hospitalPage - 1) * itemsPerPage,
    hospitalPage * itemsPerPage
  );

  const paginatedCenters = sortedCenters.slice(
    (centerPage - 1) * itemsPerPage,
    centerPage * itemsPerPage
  );

  const paginatedPresidents = sortedPresidents.slice(
    (presidentPage - 1) * itemsPerPage,
    presidentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 font-primary">
      {/* Category Filter and Search/Sort Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-full max-w-2xl mx-auto bg-white p-5 rounded-2xl shadow-lg space-y-5">
          {/*** 1. SCROLLING CATEGORY FILTER ***/}
          <div className="relative">
            <div className="overflow-x-auto pb-1 hide-scrollbar pr-12">
              <div className="flex flex-nowrap items-center gap-3 font-primary">
                {["all", "hospitals", "centers", "presidents"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setHospitalPage(1);
                        setCenterPage(1);
                        setPresidentPage(1);
                      }}
                      className={`flex-shrink-0 px-5 py-2 text-sm font-secondary rounded-lg transition-colors duration-200 ${
                        activeCategory === category
                          ? "bg-sky-500 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {
                        {
                          all: "All",
                          hospitals: "Hospitals",
                          centers: "Centers",
                          presidents: "Branches",
                        }[category]
                      }
                    </button>
                  )
                )}
              </div>
            </div>
            {/* gradient fade */}
            <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white pointer-events-none" />
          </div>

          {/*** 2. SEARCH + SORT ***/}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative md:flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHospitalPage(1);
                  setCenterPage(1);
                  setPresidentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-800
                           focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none shadow-sm font-primary"
              />
            </div>

            {/* Sort */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <span className="text-slate-700 font-secondary">Sort:</span>
              <select
                value={
                  activeCategory === "centers"
                    ? centerSortBy
                    : activeCategory === "presidents"
                    ? presidentSortBy
                    : hospitalSortBy
                }
                onChange={(e) => {
                  const v = e.target.value;
                  if (activeCategory === "centers") setCenterSortBy(v);
                  else if (activeCategory === "presidents")
                    setPresidentSortBy(v);
                  else setHospitalSortBy(v);
                }}
                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800
                           focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                {(activeCategory === "centers"
                  ? centerSortOptions
                  : activeCategory === "presidents"
                  ? presidentSortOptions
                  : hospitalSortOptions
                ).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  if (activeCategory === "centers")
                    setCenterSortDirection((d) =>
                      d === "asc" ? "desc" : "asc"
                    );
                  else if (activeCategory === "presidents")
                    setPresidentSortDirection((d) =>
                      d === "asc" ? "desc" : "asc"
                    );
                  else
                    setHospitalSortDirection((d) =>
                      d === "asc" ? "desc" : "asc"
                    );
                }}
                className="flex-shrink-0 bg-white border border-slate-200 rounded-lg w-10 h-10
                           flex items-center justify-center text-slate-700 hover:bg-slate-50
                           focus:ring-2 focus:ring-sky-500 outline-none"
                aria-label="Toggle sort direction"
              >
                <span className="text-xl font-semibold leading-none align-middle">
                  {(activeCategory === "centers"
                    ? centerSortDirection
                    : activeCategory === "presidents"
                    ? presidentSortDirection
                    : hospitalSortDirection) === "asc"
                    ? "↑"
                    : "↓"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conditional rendering based on active category */}
      {/* Hospitals Section */}
      {(activeCategory === "all" || activeCategory === "hospitals") && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-secondary">Eye Hospitals</h2>
            <button
              onClick={() => setIsAddingHospital((prev) => !prev)}
              className=" p-2 bg-blue-200 text-primary rounded-full"
            >
              <FaPlus />
            </button>
          </div>

          {isAddingHospital && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Add New Hospital</h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newHospital.title}
                onChange={handleNewHospitalChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="body"
                placeholder="Body"
                value={newHospital.body}
                onChange={handleNewHospitalChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newHospital.address}
                onChange={handleNewHospitalChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newHospital.phone}
                onChange={handleNewHospitalChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newHospital.email}
                onChange={handleNewHospitalChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="website"
                placeholder="Website"
                value={newHospital.website}
                onChange={handleNewHospitalChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="file"
                name="image"
                onChange={handleNewHospitalImageChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <button
                onClick={handleAddHospital}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsAddingHospital(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          )}

          {editingHospitalId && (
            <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto m-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Edit Hospital</h3>
                  <button
                    onClick={() => setEditingHospitalId(null)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editedHospital.title}
                  onChange={handleEditedHospitalChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <textarea
                  name="body"
                  placeholder="Body"
                  value={editedHospital.body}
                  onChange={handleEditedHospitalChange}
                  className="w-full border rounded-lg p-2 mb-2"
                  rows="3"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={editedHospital.address}
                  onChange={handleEditedHospitalChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={editedHospital.phone}
                  onChange={handleEditedHospitalChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editedHospital.email}
                  onChange={handleEditedHospitalChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="website"
                  placeholder="Website"
                  value={editedHospital.website}
                  onChange={handleEditedHospitalChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleEditedHospitalImageChange}
                  className="w-full border rounded-lg p-2 mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingHospitalId(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateHospital}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedHospitals.length > 0 ? (
              paginatedHospitals.map((h, i) => (
                <motion.div
                  key={i}
                  onClick={() => {
                    navigate(`hospital/${h._id}`);
                  }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                >
                  {h.image && (
                    <img
                      src={`${api}/images/${h.image}`}
                      alt={h.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}

                  <div className="p-6 ">
                    <h3 className="text-xl font-bold mb-2 font-secondary text-primary">
                      {h.title}
                    </h3>
                    {h.address && (
                      <p className="text-sm text-gray-600 mb-3 font-primary">
                        {h.address}
                      </p>
                    )}
                    <div className="text-gray-700 mb-4 font-primary">
                      {h.phone && (
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {h.phone}
                        </p>
                      )}
                      {h.email && (
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {h.email}
                        </p>
                      )}
                    </div>
                    {h.website && (
                      <a
                        className="text-primary font-secondary hover:text-accent transition-colors duration-colors inline-flex items-center"
                        href={
                          h.website.startsWith("http")
                            ? h.website
                            : `http://${h.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website <span className="ml-1">→</span>
                      </a>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleEditHospital(h);
                    }}
                    className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteHospital(h._id);
                    }}
                    className="absolute top-2 left-2 p-2 bg-red-200 rounded-full hover:bg-red-300"
                  >
                    <FaTrash/>
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No Hospitals found</p>
              </div>
            )}
          </div>
          {sortedHospitals.length > itemsPerPage && (
            <Pagination
              currentPage={hospitalPage}
              totalPages={hospitalTotalPages}
              onPageChange={setHospitalPage}
            />
          )}
        </section>
      )}

      {/* Eye Care Centers Section */}
      {(activeCategory === "all" || activeCategory === "centers") && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-4 font-secondary">
              Eye Care Centers
            </h2>
            <button
              onClick={() => setIsAddingCenter((prev) => !prev)}
              className="p-2 bg-blue-200 text-primary rounded-full"
            >
              <FaPlus />
            </button>
          </div>

          {isAddingCenter && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Add New Eye Care Center</h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newCenter.title}
                onChange={handleNewCenterChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="body"
                placeholder="Body/Description"
                value={newCenter.body}
                onChange={handleNewCenterChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={newCenter.district}
                onChange={handleNewCenterChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="contactPerson"
                placeholder="Contact Person"
                value={newCenter.contactPerson}
                onChange={handleNewCenterChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="contactNum"
                placeholder="Contact Number"
                value={newCenter.contactNum}
                onChange={handleNewCenterChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="file"
                name="image"
                onChange={handleNewCenterImageChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <button
                onClick={handleAddCenter}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsAddingCenter(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          )}

          {editingCenterId && (
            <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto m-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Edit Eye Care Center</h3>
                  <button
                    onClick={() => setEditingCenterId(null)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editedCenter.title}
                  onChange={handleEditedCenterChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="body"
                  placeholder="Body/Description"
                  value={editedCenter.body}
                  onChange={handleEditedCenterChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={editedCenter.district}
                  onChange={handleEditedCenterChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Contact Person"
                  value={editedCenter.contactPerson}
                  onChange={handleEditedCenterChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="contactNum"
                  placeholder="Contact Number"
                  value={editedCenter.contactNum}
                  onChange={handleEditedCenterChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleEditedCenterImageChange}
                  className="w-full border rounded-lg p-2 mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingCenterId(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCenter}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedCenters.length > 0 ? (
              paginatedCenters.map((center, i) => (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  key={i}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2 items-center hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCenter(center);
                    }}
                    className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCenter(center._id);
                    }}
                    className="absolute top-2 left-2 p-2 bg-red-200 rounded-full hover:bg-red-300"
                  >
                    <FaTrash/>
                  </button>
                  <h2 className="text-xl font-bold text-blue-900 font-secondary">
                    {center.title}
                  </h2>
                  <p className="text-gray-700 font-primary">
                    <span className="font-semibold">District:</span>{" "}
                    {center.district}
                  </p>
                  {center.contactPerson && (
                    <p className="text-gray-700 font-primary">
                      <span className="font-semibold">Contact Person:</span>{" "}
                      {center.contactPerson}
                    </p>
                  )}
                  {center.contactNum && (
                    <p className="text-gray-700 font-primary">
                      <span className="font-semibold">Contact Number:</span>{" "}
                      {center.contactNum}
                    </p>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No eye care centers found</p>
              </div>
            )}
          </div>
          {sortedCenters.length > itemsPerPage && (
            <Pagination
              currentPage={centerPage}
              totalPages={centerTotalPages}
              onPageChange={setCenterPage}
            />
          )}
        </section>
      )}

      {/* District Presidents Section */}
      {(activeCategory === "all" || activeCategory === "presidents") && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-4 font-secondary">Branches</h2>
            <button
              onClick={() => setIsAddingPresident((prev) => !prev)}
              className="p-2 bg-blue-200 text-primary rounded-full"
            >
              <FaPlus />
            </button>
          </div>

          {isAddingPresident && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Add New Branch</h3>
              <input
                type="text"
                name="district"
                placeholder="District"
                value={newPresident.district}
                onChange={handleNewPresidentChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="president"
                placeholder="President"
                value={newPresident.president}
                onChange={handleNewPresidentChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="committee"
                placeholder="Committee"
                value={newPresident.committee}
                onChange={handleNewPresidentChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newPresident.phone}
                onChange={handleNewPresidentChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                name="contactPerson"
                placeholder="Contact Person"
                value={newPresident.contactPerson}
                onChange={handleNewPresidentChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <input
                type="file"
                name="image"
                onChange={handleNewPresidentImageChange}
                className="w-full border rounded-lg p-2 mb-2"
              />
              <button
                onClick={handleAddPresident}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsAddingPresident(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          )}

          {editingPresidentId && (
            <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto m-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Edit Branch</h3>
                  <button
                    onClick={() => setEditingPresidentId(null)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={editedPresident.district}
                  onChange={handleEditedPresidentChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="president"
                  placeholder="President"
                  value={editedPresident.president}
                  onChange={handleEditedPresidentChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="committee"
                  placeholder="Committee"
                  value={editedPresident.committee}
                  onChange={handleEditedPresidentChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={editedPresident.phone}
                  onChange={handleEditedPresidentChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Contact Person"
                  value={editedPresident.contactPerson}
                  onChange={handleEditedPresidentChange}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleEditedPresidentImageChange}
                  className="w-full border rounded-lg p-2 mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingPresidentId(null)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdatePresident}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedPresidents.length > 0 ? (
              paginatedPresidents.map((president, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  onClick={() => {
                    navigate(`branch/${i}`);
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2 items-center hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPresident(president);
                    }}
                    className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePresident(president._id);
                    }}
                    className="absolute top-2 left-2 p-2 bg-red-200 rounded-full hover:bg-red-300"
                  >
                    <FaTrash></FaTrash>
                  </button>
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    {president.image && (
                      <img
                        src={`${api}/images/${president.image}`}
                        alt={president.president}
                        loading="lazy"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}
                  </div>
                  {president.district && (
                    <h2 className="text-xl font-bold text-blue-900 font-secondary">
                      {president.district}
                    </h2>
                  )}
                  {president.president && (
                    <p className="text-gray-700 font-primary">
                      <span className="font-semibold">President:</span>{" "}
                      {president.president}
                    </p>
                  )}
                  {president.committee && (
                    <p className="text-gray-700 font-primary">
                      <span className="font-semibold">Committee:</span>{" "}
                      {president.committee}
                    </p>
                  )}
                  {president.phone && (
                    <p className="text-gray-700 font-primary">
                      <span className="font-semibold">Contact:</span>{" "}
                      {president.phone}
                    </p>
                  )}
                  {president.contactPerson && (
                    <p className="text-gray-700 font-primary">
                      <span className="font-semibold">Contact Person:</span>{" "}
                      {president.contactPerson}
                    </p>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No Branches found</p>
              </div>
            )}
          </div>
          {sortedPresidents.length > itemsPerPage && (
            <Pagination
              currentPage={presidentPage}
              totalPages={presidentTotalPages}
              onPageChange={setPresidentPage}
            />
          )}
        </section>
      )}
    </div>
  );
}
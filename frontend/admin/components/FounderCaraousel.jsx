import React, { useState, useEffect, useContext } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaCamera, // Add Camera icon
} from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import { AuthContext } from "../../AuthContext";

export default function FoundersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [founders, setFounders] = useState([]); // Initialize with empty array to avoid undefined issues
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { authToken } = useContext(AuthContext);
  const [newFounder, setNewFounder] = useState({
    name: "",
    designation: "",
    body: "",
    image: null,
    type: "Founder", // Store file object
  });

  const api = import.meta.env.VITE_URL;

  const fetchFounders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/person/founder`);
      if (res.status === 200) {
        setFounders(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching mission:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounders();
  }, [api, isAdding]);

  // Local state for editing
  const [editingFounder, setEditingFounder] = useState({});

  useEffect(() => {
    // Use optional chaining to prevent errors when founders is initially empty
    setEditingFounder(founders?.[currentIndex] || {});
  }, [currentIndex, founders]);

  const goToIndex = (index) => setCurrentIndex(index);

  const prevSlide = () => {
    if (!founders || founders.length === 0) return; // Prevent errors if founders is empty
    setCurrentIndex((prev) => (prev === 0 ? founders.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (!founders || founders.length === 0) return; // Prevent errors if founders is empty
    setCurrentIndex((prev) => (prev === founders.length - 1 ? 0 : prev + 1));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editingFounder.name);
      formData.append("designation", editingFounder.designation);
      formData.append("body", editingFounder.body);

      // Append the new image to the form data if a new image was selected.
      if (editingFounder.newImage) {
        formData.append("image", editingFounder.newImage);
      } else if (editingFounder.image) {
        // If there's no new image, append existing image filename to keep it
        formData.append("image", editingFounder.image);
      }

      const res = await axios.patch(
        `${api}/person/edit/${editingFounder._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        // Update the founders array after successful save
        setFounders((prevFounders) => {
          return prevFounders.map((founder) => {
            if (founder._id === editingFounder._id) {
              // Update the founder object with the new data
              return {
                ...founder,
                ...editingFounder,
                image: res.data.data.image,
              };
            }
            return founder;
          });
        });
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error saving founder:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/person/del/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setFounders((prev) => prev.filter((founder) => founder._id !== id));
      setCurrentIndex(0); // Reset to the first founder after deletion
    } catch (error) {
      console.error("Error deleting founder:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newFounder.name);
      formData.append("designation", newFounder.designation);
      formData.append("body", newFounder.body);
      formData.append("type", newFounder.type);
      if (newFounder.image) {
        formData.append("image", newFounder.image);
      }

      const res = await axios.post(`${api}/person/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 201) {
        setFounders((prevFounders) => [...prevFounders, res.data.data]); // Append the new founder to the list
        setIsAdding(false);
        setNewFounder({
          name: "",
          designation: "",
          body: "",
          image: null,
          type: "Founder",
        });
        fetchFounders(); // Re-fetch founders to update the list
      }
    } catch (error) {
      console.error("Error adding founder:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditingFounder((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewFounderChange = (field, value) => {
    setNewFounder({ ...newFounder, [field]: value });
  };

  const handleImageChange = (index, file) => {
    setEditingFounder((prev) => ({ ...prev, newImage: file }));
  };

  const handleNewImageChange = (file) => {
    setNewFounder({ ...newFounder, image: file });
  };

  if (loading) {
    return <Loading />; // Or your loading indicator
  }

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 bg-blue-50 text-left">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-6 sm:mb-8 md:mb-10">
        Our Founders
      </h2>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-blue-200 text-primary rounded-full"
        >
          {isAdding ? <FaTimes /> : <FaPlus />}
        </button>
      </div>

      {isAdding && (
        <div className="max-w-lg mx-auto bg-white p-4 rounded-xl shadow mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Add New Founder
          </h3>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newFounder.name}
              onChange={(e) => handleNewFounderChange("name", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="designation"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Designation:
            </label>
            <input
              type="text"
              id="designation"
              placeholder="Designation"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newFounder.designation}
              onChange={(e) =>
                handleNewFounderChange("designation", e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="body"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Body:
            </label>
            <textarea
              id="body"
              placeholder="Body"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newFounder.body}
              onChange={(e) => handleNewFounderChange("body", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => handleNewImageChange(e.target.files[0])}
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            <FaPlus className="inline mr-2" />
            Add Founder
          </button>
        </div>
      )}

      {/* Navigation buttons for small screens */}
      <div className="flex justify-between items-center mb-4 sm:hidden">
        <button
          onClick={prevSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Previous founder"
        >
          <FaArrowLeft />
        </button>
        <span className="text-sm font-medium">
          {founders.length > 0
            ? `${currentIndex + 1} / ${founders.length}`
            : "No founders"}
        </span>
        <button
          onClick={nextSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Next founder"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-7 md:mb-9 justify-center sm:justify-start">
        {founders.map((founder, index) => (
          <img
            key={founder._id}
            src={`${api}/images/${founder.image}`}
            alt={founder.name}
            loading="lazy"
            className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full cursor-pointer border-4 transition-transform duration-300 ${
              currentIndex === index
                ? "border-primary scale-110"
                : "border-transparent"
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>

      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {founders.length > 0 ? (
            <>
              <div className="relative">
                <img
                  src={
                    editingIndex === currentIndex && editingFounder.newImage
                      ? URL.createObjectURL(editingFounder.newImage)
                      : `${api}/images/${
                          founders[currentIndex]?.image || "default_image.jpg"
                        }`
                  }
                  loading="lazy"
                  alt={founders[currentIndex]?.name}
                  className="w-full sm:w-48 md:w-64 lg:w-72 h-64 sm:h-auto object-cover object-top"
                  style={{ height: "100%" }} // Set height to 100%
                />
                {editingIndex === currentIndex && (
                  <label
                    htmlFor={`image-${currentIndex}`}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer hover:bg-opacity-75"
                  >
                    <FaCamera />
                    <input
                      type="file"
                      id={`image-${currentIndex}`}
                      className="hidden"
                      onChange={(e) =>
                        handleImageChange(currentIndex, e.target.files[0])
                      }
                    />
                  </label>
                )}
              </div>

              <div className="p-4 sm:p-8 md:p-12 w-full">
                {editingIndex === currentIndex ? (
                  <div className="w-full">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 font-secondary">
                      <input
                        type="text"
                        value={editingFounder.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Name"
                        className="w-full border p-2 mb-2 rounded"
                      />
                    </h3>
                    <p className="text-md sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-4 font-primary">
                      <input
                        type="text"
                        value={editingFounder.designation || ""}
                        onChange={(e) =>
                          handleChange("designation", e.target.value)
                        }
                        placeholder="Designation"
                        className="w-full border p-2 mb-2 rounded"
                      />
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
                      <textarea
                        value={editingFounder.body || ""}
                        onChange={(e) => handleChange("body", e.target.value)}
                        placeholder="Body"
                        className="w-full border p-2 mb-2 rounded"
                      />
                    </p>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 font-secondary">
                      {founders[currentIndex]?.name}
                    </h3>
                    <p className="text-md sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-4 font-primary">
                      {founders[currentIndex]?.designation}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
                      {founders[currentIndex]?.body}
                    </p>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setEditingIndex(currentIndex)}
                        className="bg-yellow-300 text-black p-2 rounded-full hover:bg-yellow-400"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => handleDelete(founders[currentIndex]._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>No founders to display.</div>
          )}
        </div>
      </div>

      {/* Pagination dots for mobile */}
      <div className="flex justify-center mt-4 sm:hidden">
        {founders.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

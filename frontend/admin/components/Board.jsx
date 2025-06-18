import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading"; // Ensure Loading component is available

export default function BoardMembers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boardMembers, setBoardMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingBoardMember, setEditingBoardMember] = useState({});

  const [newBoardMember, setNewBoardMember] = useState({
    name: "",
    designation: "",
    body: "",
    image: null,
    type: "Board",
  });

  const api = import.meta.env.VITE_URL;

  const fetchBoardMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/person/board`);
      if (res.status === 200) {
        setBoardMembers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching board members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardMembers();
  }, [api, isAdding]);

  useEffect(() => {
    setEditingBoardMember(boardMembers?.[currentIndex] || {});
  }, [currentIndex, boardMembers]);

  const goToIndex = (index) => setCurrentIndex(index);

  const prevSlide = () => {
    if (!boardMembers || boardMembers.length === 0) return; // Prevent errors if boardMembers is empty
    setCurrentIndex((prev) =>
      prev === 0 ? boardMembers.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    if (!boardMembers || boardMembers.length === 0) return; // Prevent errors if boardMembers is empty
    setCurrentIndex((prev) =>
      prev === boardMembers.length - 1 ? 0 : prev + 1
    );
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editingBoardMember.name);
      formData.append("designation", editingBoardMember.designation);
      formData.append("body", editingBoardMember.body);

      if (editingBoardMember.newImage) {
        formData.append("image", editingBoardMember.newImage);
      } else if (editingBoardMember.image) {
        formData.append("image", editingBoardMember.image);
      }

      const res = await axios.patch(
        `${api}/person/edit/${editingBoardMember._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        // Update the boardMembers array after successful save
        setBoardMembers((prevBoardMembers) => {
          return prevBoardMembers.map((member) => {
            if (member._id === editingBoardMember._id) {
              // Update the board member object with the new data
              return {
                ...member,
                ...editingBoardMember,
                image: res.data.data.image,
              };
            }
            return member;
          });
        });
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error saving board member:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/person/del/${id}`);
      setBoardMembers((prev) => prev.filter((member) => member._id !== id));
      setCurrentIndex(0); // Reset to the first member after deletion
    } catch (error) {
      console.error("Error deleting board member:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newBoardMember.name);
      formData.append("designation", newBoardMember.designation);
      formData.append("body", newBoardMember.body);
      formData.append("type", newBoardMember.type);

      if (newBoardMember.image) {
        formData.append("image", newBoardMember.image);
      }

      const res = await axios.post(`${api}/person/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setBoardMembers((prevBoardMembers) => [
          ...prevBoardMembers,
          res.data.data,
        ]);
        setIsAdding(false);
        setNewBoardMember({ name: "", designation: "", body: "", image: null });
        fetchBoardMembers(); // Re-fetch
      }
    } catch (error) {
      console.error("Error adding board member:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditingBoardMember((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewBoardMemberChange = (field, value) => {
    setNewBoardMember((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (index, file) => {
    setEditingBoardMember((prev) => ({ ...prev, newImage: file }));
  };

  const handleNewImageChange = (file) => {
    setNewBoardMember((prev) => ({ ...prev, image: file }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 bg-blue-50 text-left">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-6 sm:mb-8 md:mb-10">
        Meet Our Board Members
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
            Add New Board Member
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
              value={newBoardMember.name}
              onChange={(e) =>
                handleNewBoardMemberChange("name", e.target.value)
              }
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
              value={newBoardMember.designation}
              onChange={(e) =>
                handleNewBoardMemberChange("designation", e.target.value)
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
              value={newBoardMember.body}
              onChange={(e) =>
                handleNewBoardMemberChange("body", e.target.value)
              }
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
            Add Board Member
          </button>
        </div>
      )}

      {/* Navigation buttons for small screens */}
      <div className="flex justify-between items-center mb-4 sm:hidden">
        <button
          onClick={prevSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Previous board member"
        >
          <FaArrowLeft />
        </button>
        <span className="text-sm font-medium">
          {boardMembers.length > 0
            ? `${currentIndex + 1} / ${boardMembers.length}`
            : "No members"}
        </span>
        <button
          onClick={nextSlide}
          className="bg-primary text-white p-2 rounded-full shadow-md"
          aria-label="Next board member"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Member thumbnails */}
      <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-7 md:mb-9 justify-center sm:justify-start">
        {boardMembers.map((member, index) => (
          <img
            key={member._id}
            src={`${api}/images/${member.image}`}
            loading="lazy"
            alt={member.name}
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
          {boardMembers.length > 0 ? (
            <>
              <div className="relative">
                <img
                  src={
                    editingIndex === currentIndex && editingBoardMember.newImage
                      ? URL.createObjectURL(editingBoardMember.newImage)
                      : `${api}/images/${
                          boardMembers[currentIndex]?.image ||
                          "default_image.jpg"
                        }`
                  }
                  alt={boardMembers[currentIndex]?.name}
                  loading="lazy"
                  className="w-full sm:w-48 md:w-64 lg:w-72 h-64 sm:h-auto object-cover object-top"
                  style={{ objectFit: "cover", height: "100%" }} // Keep image size consistent
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
                {" "}
                {/* Make the div take full width */}
                {editingIndex === currentIndex ? (
                  <div className="w-full">
                    {" "}
                    {/* Make the div take full width */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 font-secondary">
                      <input
                        type="text"
                        value={editingBoardMember.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Name"
                        className="w-full border p-2 mb-2 rounded" // Take full width of parent
                      />
                    </h3>
                    <p className="text-md sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-4 font-primary">
                      <input
                        type="text"
                        value={editingBoardMember.designation || ""}
                        onChange={(e) =>
                          handleChange("designation", e.target.value)
                        }
                        placeholder="Designation"
                        className="w-full border p-2 mb-2 rounded" // Take full width of parent
                      />
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
                      <textarea
                        value={editingBoardMember.body || ""}
                        onChange={(e) => handleChange("body", e.target.value)}
                        placeholder="Body"
                        className="w-full border p-2 mb-2 rounded" // Take full width of parent
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
                      {boardMembers[currentIndex]?.name}
                    </h3>
                    <p className="text-md sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-4 font-primary">
                      {boardMembers[currentIndex]?.designation}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-primary">
                      {boardMembers[currentIndex]?.body}
                    </p>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setEditingIndex(currentIndex)}
                        className="bg-yellow-300 text-black p-2 rounded-full hover:bg-yellow-400"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(boardMembers[currentIndex]._id)
                        }
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
            <div>No board members to display.</div>
          )}
        </div>
      </div>

      {/* Pagination dots for mobile */}
      <div className="flex justify-center mt-4 sm:hidden">
        {boardMembers.map((_, index) => (
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

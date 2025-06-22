import React, { useState, useEffect } from "react";
import {
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import { AuthContext } from "../../AuthContext";

export default function PastChairpersons() {
  const [chairpersons, setChairpersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const { authToken } = useState(AuthContext);
  const [newChairperson, setNewChairperson] = useState({
    name: "",
    designation: "",
    body: "",
    duration: "",
    image: null,
    type: "Past", // Store file object
  });

  const [editingChairperson, setEditingChairperson] = useState({});

  const api = import.meta.env.VITE_URL;

  const fetchChairpersons = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/person/past`); // Corrected endpoint
      if (res.status === 200) {
        setChairpersons(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching chairpersons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChairpersons();
  }, [api, isAdding]);

  useEffect(() => {
    setEditingChairperson(chairpersons?.[editingIndex] || {});
  }, [editingIndex, chairpersons]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editingChairperson.name);
      formData.append("designation", editingChairperson.designation);
      formData.append("body", editingChairperson.body);
      formData.append("duration", editingChairperson.duration);

      if (editingChairperson.newImage) {
        formData.append("image", editingChairperson.newImage);
      } else if (editingChairperson.image) {
        formData.append("image", editingChairperson.image);
      }

      const res = await axios.patch(
        `${api}/person/edit/${editingChairperson._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        // Update the chairpersons array after successful save
        setChairpersons((prevChairpersons) => {
          return prevChairpersons.map((chair) => {
            if (chair._id === editingChairperson._id) {
              // Update the chair object with the new data
              return {
                ...chair,
                ...editingChairperson,
                image: res.data.data.image,
              };
            }
            return chair;
          });
        });
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error saving chairperson:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/person/del/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setChairpersons((prev) => prev.filter((chair) => chair._id !== id));
    } catch (error) {
      console.error("Error deleting chairperson:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newChairperson.name);
      formData.append("designation", newChairperson.designation);
      formData.append("body", newChairperson.body);
      formData.append("duration", newChairperson.duration);
      formData.append("type", newChairperson.type); // Add the type field
      if (newChairperson.image) {
        formData.append("image", newChairperson.image);
      }

      const res = await axios.post(`${api}/person/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 201) {
        setChairpersons((prevChairpersons) => [
          ...prevChairpersons,
          res.data.data,
        ]); // Append the new chair to the list
        setIsAdding(false);
        setNewChairperson({
          name: "",
          designation: "",
          body: "",
          duration: "",
          image: null,
        });
        fetchChairpersons();
      }
    } catch (error) {
      console.error("Error adding chairperson:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditingChairperson((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewChairpersonChange = (field, value) => {
    setNewChairperson({ ...newChairperson, [field]: value });
  };

  const handleImageChange = (index, file) => {
    setEditingChairperson((prev) => ({ ...prev, newImage: file }));
  };

  const handleNewImageChange = (file) => {
    setNewChairperson({ ...newChairperson, image: file });
  };

  if (loading) {
    return <Loading />; // Or your loading indicator
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 bg-white text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-2 sm:mb-3 md:mb-4">
        Past Chairpersons
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 font-primary">
        The vision and legacy of our past chairpersons have shaped Nepal Netra
        Jyoti Sangh into a leading force for eye care in Nepal. We honor their
        dedication and contributions.
      </p>

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
            Add New Chairperson
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
              value={newChairperson.name}
              onChange={(e) =>
                handleNewChairpersonChange("name", e.target.value)
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
              value={newChairperson.designation}
              onChange={(e) =>
                handleNewChairpersonChange("designation", e.target.value)
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="duration"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Duration:
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newChairperson.duration}
              onChange={(e) =>
                handleNewChairpersonChange("duration", e.target.value)
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
              value={newChairperson.body}
              onChange={(e) =>
                handleNewChairpersonChange("body", e.target.value)
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
            Add Chairperson
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {chairpersons.map((chair, index) => (
          <div
            key={chair._id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center text-center transition duration-300 hover:shadow-lg relative"
          >
            {editingIndex === index ? (
              <>
                <label
                  htmlFor={`image-${index}`}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer hover:bg-opacity-75"
                >
                  <FaCamera />
                  <input
                    type="file"
                    id={`image-${index}`}
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(index, e.target.files[0])
                    }
                  />
                </label>

                <img
                  src={
                    editingChairperson.newImage
                      ? URL.createObjectURL(editingChairperson.newImage)
                      : `${api}/images/${chair.image}`
                  }
                  alt={chair.name}
                  loading="lazy"
                  className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 object-cover rounded-full mb-4 sm:mb-5 md:mb-6"
                />

                <input
                  type="text"
                  value={editingChairperson.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Name"
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  value={editingChairperson.designation || ""}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  placeholder="Designation"
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  value={editingChairperson.duration || ""}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="Duration"
                  className="w-full border p-2 mb-2 rounded"
                />
                <textarea
                  value={editingChairperson.body || ""}
                  onChange={(e) => handleChange("body", e.target.value)}
                  placeholder="Body"
                  className="w-full border p-2 mb-2 rounded"
                />

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
              </>
            ) : (
              <>
                <img
                  src={`${api}/images/${chair.image}`}
                  alt={chair.name}
                  loading="lazy"
                  className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 object-cover rounded-full mb-4 sm:mb-5 md:mb-6"
                />
                <h3 className="text-lg sm:text-xl font-bold text-primary font-secondary mb-1">
                  {chair.name}
                </h3>
                <p className="text-sm sm:text-md font-semibold text-gray-600 font-primary mb-1">
                  {chair.designation}
                </p>
                <p className="text-xs sm:text-sm font-primary text-gray-500 mb-2 sm:mb-3 md:mb-4">
                  {chair.duration}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 font-primary leading-relaxed">
                  {chair.body}
                </p>
                <div className="flex justify-end gap-2 mt-4 absolute top-2 right-2">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="bg-yellow-300 text-black p-2 rounded-full hover:bg-yellow-400"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDelete(chair._id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import {
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";

export default function CoreValues() {
  const [values, setValues] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false); //For Adding Core Value
  const [editingIndex, setEditingIndex] = useState(null);

  const [newValue, setNewValue] = useState({
    title: "",
    body: "",
    image: null,
  });

  const [editingValue, setEditingValue] = useState({});

  const api = import.meta.env.VITE_URL;

  const fetchValues = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/values/`);
      if (res.status === 200) {
        setValues(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching values:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValues();
  }, [api]);

  useEffect(() => {
    // Update editingValue when editingIndex changes. Also handle null editingIndex
    console.log("useEffect editingValue running", { editingIndex, values }); // Debugging
    setEditingValue(editingIndex !== null ? values?.[editingIndex] || {} : {});
  }, [editingIndex, values]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editingValue.title);
      formData.append("body", editingValue.body);

      if (editingValue.newImage) {
        formData.append("image", editingValue.newImage);
      } else if (editingValue.image) {
        formData.append("image", editingValue.image);
      }

      const res = await axios.patch(
        `${api}/values/edit/${editingValue._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        // Update the values array after successful save
        setValues((prevValues) => {
          return prevValues.map((val) => {
            if (val._id === editingValue._id) {
              return {
                ...val,
                ...editingValue,
                image: res.data.data.image, // Update image URL from the response
              };
            }
            return val;
          });
        });
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error saving value:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/values/del/${id}`);
      setValues((prev) => prev.filter((value) => value._id !== id));
    } catch (error) {
      console.error("Error deleting value:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newValue.title);
      formData.append("body", newValue.body);
      if (newValue.image) {
        formData.append("image", newValue.image);
      }

      const res = await axios.post(`${api}/values/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setValues((prevValues) => [...prevValues, res.data.data]);
        setIsAdding(false);
        setNewValue({ title: "", body: "", image: null });
        fetchValues(); // Refresh data after adding
      }
    } catch (error) {
      console.error("Error adding value:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditingValue((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewValueChange = (field, value) => {
    setNewValue({ ...newValue, [field]: value });
  };

  const handleImageChange = (index, file) => {
    setEditingValue((prev) => ({ ...prev, newImage: file }));
  };

  const handleNewImageChange = (file) => {
    setNewValue({ ...newValue, image: file });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingValue({}); // Clear the editing value as well
  };

  if (loading) return <Loading />;
  if (!values) return <p>No values found.</p>; // Add a check if values are null

  return (
    <section className="min-h-[80vh] pt-12  bg-blue-50 pb-12 px-6 sm:px-12 mx-auto">
      <h2 className="text-3xl font-bold text-primary font-secondary text-center mb-4">
        Our Core Values
      </h2>
      <p className="text-base sm:text-lg mx-auto font-secondary text-center mb-12 leading-relaxed">
        These principles guide everything we do at NNJS, shaping our culture and
        driving our success.
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
            Add New Core Value
          </h3>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newValue.title}
              onChange={(e) => handleNewValueChange("title", e.target.value)}
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
              value={newValue.body}
              onChange={(e) => handleNewValueChange("body", e.target.value)}
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
            Add Value
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => {
          console.log({ editingIndex, index, value }); // Debugging
          return value && value._id ? ( // Only render if value and value._id are defined
            <FlipCard
              key={value._id}
              value={value}
              api={api}
              isEditing={editingIndex === index}
              onEdit={() => {
                setEditingIndex(index);
                setShowEditModal(true);
              }}
              onSave={handleSave}
              onDelete={handleDelete}
              editingValue={editingValue}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              onCancel={handleCancel}
            />
          ) : null;
        })}
      </div>
    </section>
  );
}

function FlipCard({
  value,
  api,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  editingValue,
  handleChange,
  handleImageChange,
  onCancel,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <div
      className="relative w-full h-80 perspective"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d rounded-xl shadow-lg">
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
          {isEditing ? (
            <label
              htmlFor={`image-${value._id}`}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer hover:bg-opacity-75"
            >
              <FaCamera />
              <input
                type="file"
                id={`image-${value._id}`}
                className="hidden"
                onChange={(e) =>
                  handleImageChange(value._id, e.target.files[0])
                }
              />
            </label>
          ) : null}

          <img
            src={
              isEditing && editingValue.newImage
                ? URL.createObjectURL(editingValue.newImage)
                : `${api}/images/${value.image}`
            }
            alt={value.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <h3 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold font-secondary drop-shadow-lg px-4 text-center">
            {isEditing ? (
              <input
                type="text"
                value={editingValue.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full bg-transparent text-white border-none focus:outline-none"
                placeholder="Title"
              />
            ) : (
              value.title
            )}
          </h3>
          <div className="absolute top-2 left-2 flex gap-2">
            {!isEditing && (
              <>
                <button
                  onClick={onEdit}
                  className="bg-yellow-300 text-black p-2 rounded-full hover:bg-yellow-400"
                >
                  <FaPen />
                </button>
                <button
                  onClick={() => onDelete(value._id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-8 flex flex-col justify-center">
          <h3 className="text-primary text-3xl font-bold font-secondary mb-6 text-center">
            {isEditing ? (
              <input
                type="text"
                value={editingValue.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Title"
              />
            ) : (
              value.title
            )}
          </h3>
          {isEditing ? (
            <>
              <textarea
                value={editingValue.body || ""}
                onChange={(e) => handleChange("body", e.target.value)}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Body"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={onSave}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  <FaSave />
                </button>
                <button
                  onClick={onCancel}
                  className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
                >
                  <FaTimes />
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-700 font-primary leading-relaxed text-base overflow-y-auto max-h-[280px]">
              {value.body}
            </p>
          )}
        </div>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowEditModal(false);
                handleCancel();
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold mb-4 text-center">
              Edit Core Value
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                type="text"
                value={editingValue.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Body</label>
              <textarea
                value={editingValue.body || ""}
                onChange={(e) => handleChange("body", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Image</label>
              <input
                type="file"
                onChange={(e) =>
                  handleImageChange(editingValue._id, e.target.files[0])
                }
              />
              {editingValue.newImage ? (
                <img
                  src={URL.createObjectURL(editingValue.newImage)}
                  alt="Preview"
                  className="mt-2 w-full h-48 object-cover rounded"
                />
              ) : (
                <img
                  src={`${api}/images/${editingValue.image}`}
                  alt="Current"
                  className="mt-2 w-full h-48 object-cover rounded"
                />
              )}
            </div>

            <button
              onClick={() => {
                handleSave();
                setShowEditModal(false);
              }}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              <FaSave className="inline mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          pointer-events: none;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .perspective {
          perspective: 1000px;
        }
        .transition-transform {
          transition-property: transform;
          transition-duration: 700ms;
          transition-timing-function: ease;
        }
      `}</style>
    </div>
  );
}

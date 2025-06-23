import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../AuthContext";

export default function CoreValues() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const { authToken } = useContext(AuthContext);
  const [newValue, setNewValue] = useState({
    title: "",
    body: "",
    image: null,
  });
  const [editingValue, setEditingValue] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

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
    setEditingValue(editingIndex !== null ? values?.[editingIndex] || {} : {});
  }, [editingIndex, values]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editingValue.title);
      formData.append("body", editingValue.body);
      if (editingValue.newImage)
        formData.append("image", editingValue.newImage);

      const res = await axios.patch(
        `${api}/values/edit/${editingValue._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        const updated = values.map((val) =>
          val._id === editingValue._id
            ? { ...val, ...editingValue, image: res.data.data.image }
            : val
        );
        setValues(updated);
        setEditingIndex(null);
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error saving value:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/values/del/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setValues((prev) => prev.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Error deleting value:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newValue.title);
      formData.append("body", newValue.body);
      if (newValue.image) formData.append("image", newValue.image);

      const res = await axios.post(`${api}/values/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        setValues([...values, res.data.data]);
        setIsAdding(false);
        setNewValue({ title: "", body: "", image: null });
        fetchValues();
      }
    } catch (error) {
      console.error("Error adding value:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditingValue((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewValueChange = (field, value) => {
    setNewValue((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (file) => {
    setEditingValue((prev) => ({ ...prev, newImage: file }));
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingValue({});
    setShowEditModal(false);
  };

  if (loading) return <Loading />;
  if (!values) return <p>No values found.</p>;

  return (
    <section className="min-h-[80vh] pt-12 bg-blue-50 pb-12 px-6 sm:px-12 mx-auto">
      <h2 className="text-2xl sm:texl-3xl md:text-4xl font-bold text-primary font-secondary text-center mb-4">
        Our Core Values
      </h2>
      <p className=" text-sm sm:text-base md:text-lg lg:text-xl mx-auto font-primary text-center mb-12 leading-relaxed">
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
          <input
            type="text"
            placeholder="Title"
            className="mb-2 w-full border p-2 rounded"
            value={newValue.title}
            onChange={(e) => handleNewValueChange("title", e.target.value)}
          />
          <textarea
            placeholder="Body"
            className="mb-2 w-full border p-2 rounded"
            value={newValue.body}
            onChange={(e) => handleNewValueChange("body", e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => handleNewValueChange("image", e.target.files[0])}
            className="mb-4 w-full"
          />
          <button
            onClick={handleAdd}
            className="w-full p-2 bg-green-600 text-white rounded"
          >
            <FaPlus className="inline mr-2" /> Add Value
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => {
          const isEditing = index === editingIndex;
          return (
            <div
              key={value._id}
              className="relative w-full h-80 perspective"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d rounded-xl shadow-lg">
                <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
                  {isEditing && (
                    <label className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 cursor-pointer hover:bg-opacity-75">
                      <FaCamera />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                      />
                    </label>
                  )}
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
                        className="w-full bg-transparent text-white border-none text-center"
                      />
                    ) : (
                      value.title
                    )}
                  </h3>
                  <div className="absolute top-2 left-2 flex gap-2">
                    {!isEditing && (
                      <>
                        <button
                          onClick={() => {
                            setEditingIndex(index);
                            setShowEditModal(true);
                          }}
                          className="bg-yellow-300 text-black p-2 rounded-full hover:bg-yellow-400"
                        >
                          <FaPen />
                        </button>
                        <button
                          onClick={() => handleDelete(value._id)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={handleCancel}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold mb-4 text-center">
              Edit Core Value
            </h3>

            <input
              type="text"
              value={editingValue.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <textarea
              value={editingValue.body || ""}
              onChange={(e) => handleChange("body", e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <input
              type="file"
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="mb-2"
            />
            {editingValue.newImage ? (
              <img
                src={URL.createObjectURL(editingValue.newImage)}
                alt="Preview"
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <img
                src={`${api}/images/${editingValue.image}`}
                alt="Current"
                className="w-full h-48 object-cover rounded"
              />
            )}

            <button
              onClick={handleSave}
              className="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              <FaSave className="inline mr-2" /> Save Changes
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

import React, { useState, useEffect } from "react";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import { FaPen, FaSave, FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";
import SearchableIconPicker from "./SearchableIconPicker";

const Commitments = () => {
  const [loading, setLoading] = useState(false);
  const [commitments, setCommitments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCommitment, setNewCommitment] = useState({
    icon: "FaStar",
    title: "",
    body: "",
    color: "text-blue-500",
  });

  const api = import.meta.env.VITE_URL;
  const iconMap = { ...ReactIcons };

  const fetchCommitments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/commitments`);
      if (res.status === 200) {
        setCommitments(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching commitments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommitments();
  }, []);

  const IconRenderer = ({ iconName, color }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <IconComponent className={`${color} text-2xl sm:text-3xl mb-3 sm:mb-4`} />
    ) : (
      <span>Icon not found</span>
    );
  };

  const handleChange = (index, field, value) => {
    const updated = [...commitments];
    updated[index][field] = value;
    setCommitments(updated);
  };

  const handleSave = async (obj, index) => {
    try {
      const { _id, title, body, icon, color } = obj;
      const res = await axios.patch(`${api}/commitments/edit/${_id}`, {
        title,
        body,
        icon,
        color,
      });
      if (res.status === 200) {
        setEditingIndex(null);
        fetchCommitments();
      }
    } catch (error) {
      console.error("Error saving commitment:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${api}/commitments/del/${_id}`);
      setCommitments((prev) => prev.filter((c) => c._id !== _id));
    } catch (error) {
      console.error("Error deleting commitment:", error);
    }
  };

  const handleAddCommitment = async () => {
    try {
      await axios.post(`${api}/commitments/create`, newCommitment);
      setNewCommitment({
        icon: "FaStar",
        title: "",
        body: "",
        color: "text-blue-500",
      });
      setIsAdding(false);
      // Don't show the newly added immediately
      fetchCommitments(); // refetch without appending directly
    } catch (error) {
      console.error("Error adding commitment:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4 font-secondary">
          Our Commitments
        </h2>
        <p className="text-base sm:text-lg md:text-xl px-2">
          The fundamental principles that guide our work in eye healthcare:
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="p-2 rounded-full text-black bg-gray-200 hover:bg-gray-300"
          aria-label={isAdding ? "Back" : "Add"}
        >
          {isAdding ? <FaArrowLeft size={18} /> : <FaPlus size={18} />}
        </button>
      </div>

      {isAdding && (
        <div className="w-full max-w-md mx-auto border p-4 bg-white text-black rounded-lg mb-10">
          <h3 className="text-xl font-semibold mb-4">Add New Commitment</h3>
          <SearchableIconPicker
            selectedIcon={newCommitment.icon}
            setSelectedIcon={(icon) =>
              setNewCommitment({ ...newCommitment, icon })
            }
          />
          <input
            type="text"
            value={newCommitment.color}
            onChange={(e) =>
              setNewCommitment({ ...newCommitment, color: e.target.value })
            }
            className="w-full border mb-2 p-1"
            placeholder="text-blue-500"
          />
          <IconRenderer
            iconName={newCommitment.icon}
            color={newCommitment.color}
          />
          <input
            type="text"
            value={newCommitment.title}
            onChange={(e) =>
              setNewCommitment({ ...newCommitment, title: e.target.value })
            }
            className="w-full border mb-2 p-1"
            placeholder="Title"
          />
          <textarea
            value={newCommitment.body}
            onChange={(e) =>
              setNewCommitment({ ...newCommitment, body: e.target.value })
            }
            className="w-full border mb-4 p-1"
            placeholder="Body"
          />
          <button
            onClick={handleAddCommitment}
            className="p-2 w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            Add Commitment
          </button>
        </div>
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {commitments.map((item, index) => (
          <div
            key={item._id}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 border-t-4 border-primary hover:shadow-lg transition-all relative"
          >
            {editingIndex === index ? (
              <>
                <SearchableIconPicker
                  selectedIcon={item.icon}
                  setSelectedIcon={(icon) => handleChange(index, "icon", icon)}
                />
                <input
                  type="text"
                  value={item.color}
                  onChange={(e) => handleChange(index, "color", e.target.value)}
                  className="w-full border mb-2 p-1"
                />
                <IconRenderer iconName={item.icon} color={item.color} />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full border mb-2 p-1"
                  placeholder="Title"
                />
                <textarea
                  value={item.body}
                  onChange={(e) => handleChange(index, "body", e.target.value)}
                  className="w-full border mb-2 p-1"
                  placeholder="Body"
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => handleSave(item, index)}
                    className="p-2 bg-green-600 text-white rounded"
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="p-2 bg-gray-400 text-white rounded"
                  >
                    <FaArrowLeft />
                  </button>
                </div>
              </>
            ) : (
              <>
                <IconRenderer iconName={item.icon} color={item.color} />
                <h3 className="text-lg sm:text-xl font-bold text-primary font-secondary mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {item.body}
                </p>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="p-2 bg-yellow-300 text-black rounded-full"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-500 text-white rounded-full"
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commitments;

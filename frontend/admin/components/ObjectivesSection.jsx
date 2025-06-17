import React, { useState, useEffect } from "react";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import Loading from "./Loading";
import { FaPen, FaSave, FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";
import SearchableIconPicker from "./SearchableIconPicker";

export default function ObjectivesSection() {
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newObjective, setNewObjective] = useState({
    icon: "FaStar",
    title: "",
    body: "",
    color: "text-blue-500",
  });
  const api = import.meta.env.VITE_URL;
  const iconMap = { ...ReactIcons };

  const IconRenderer = ({ iconName, color }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <IconComponent className={`${color} text-4xl mb-2`} />
    ) : (
      <span>Icon not found</span>
    );
  };

  const fetchObjectives = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/strategicObjectives/`);
      if (res.status === 200) {
        setObjectives(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching objectives:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, [api, isAdding]);

  const toggleAdd = () => setIsAdding((prev) => !prev);

  const handleChange = (index, field, value) => {
    const updated = [...objectives];
    updated[index][field] = value;
    setObjectives(updated);
  };

  const handleSave = async (obj, index) => {
    try {
      const { _id, title, body, icon, color } = obj;
      const res = await axios.patch(`${api}/strategicObjectives/edit/${_id}`, {
        title,
        body,
        icon,
        color,
      });
      if (res.status === 200) {
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error updating objective:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${api}/strategicObjectives/del/${_id}`);
      setObjectives((prev) => prev.filter((o) => o._id !== _id));
    } catch (error) {
      console.error("Error deleting objective:", error);
    }
  };

  const handleAddObjective = async () => {
    try {
      const res = await axios.post(
        `${api}/strategicObjectives/create`,
        newObjective
      );
      if (res.status === 201) {
        setObjectives([...objectives, res.data.data]);
        setNewObjective({
          icon: "FaStar",
          title: "",
          body: "",
          color: "text-blue-500",
        });
        setIsAdding(false);
      }
    } catch (error) {
      console.error("Error creating objective:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center space-y-8 py-10 px-4 bg-blue-50">
      <h2 className="text-3xl font-bold font-secondary">
        Our Strategic Objectives
      </h2>
      <button
        onClick={toggleAdd}
        className="p-2 rounded-full text-black bg-gray-200 hover:bg-gray-300"
        aria-label={isAdding ? "Back" : "Add"}
      >
        {isAdding ? <FaArrowLeft size={18} /> : <FaPlus size={18} />}
      </button>

      {!isAdding ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {objectives.map((obj, index) => (
            <div
              key={obj._id}
              className="text-left font-secondary text-lg relative border p-4 rounded-lg bg-white text-black"
            >
              {editingIndex === index ? (
                <>
                  <SearchableIconPicker
                    selectedIcon={obj.icon}
                    setSelectedIcon={(icon) =>
                      handleChange(index, "icon", icon)
                    }
                  />
                  <input
                    type="text"
                    value={obj.color}
                    onChange={(e) =>
                      handleChange(index, "color", e.target.value)
                    }
                    className="w-full border mb-2 p-1"
                    placeholder="text-blue-500"
                  />
                  <IconRenderer iconName={obj.icon} color={obj.color} />
                  <input
                    type="text"
                    value={obj.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    className="w-full border mb-2 p-1"
                    placeholder="Title"
                  />
                  <textarea
                    value={obj.body}
                    onChange={(e) =>
                      handleChange(index, "body", e.target.value)
                    }
                    className="w-full border mb-2 p-1"
                    placeholder="Body"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleSave(obj, index)}
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
                  <IconRenderer iconName={obj.icon} color={obj.color} />
                  <h3 className="font-bold text-xl mt-2">{obj.title}</h3>
                  <p className="text-gray-700 mt-1">{obj.body}</p>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="p-2 bg-yellow-300 text-black rounded-full"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDelete(obj._id)}
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
      ) : (
        <div className="w-full max-w-md border p-4 bg-white text-black rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Objective</h3>
          <SearchableIconPicker
            selectedIcon={newObjective.icon}
            setSelectedIcon={(icon) =>
              setNewObjective({ ...newObjective, icon })
            }
          />
          <input
            type="text"
            value={newObjective.color}
            onChange={(e) =>
              setNewObjective({ ...newObjective, color: e.target.value })
            }
            className="w-full border mb-2 p-1"
            placeholder="text-blue-500"
          />
          <IconRenderer
            iconName={newObjective.icon}
            color={newObjective.color}
          />
          <input
            type="text"
            value={newObjective.title}
            onChange={(e) =>
              setNewObjective({ ...newObjective, title: e.target.value })
            }
            className="w-full border mb-2 p-1"
            placeholder="Title"
          />
          <textarea
            value={newObjective.body}
            onChange={(e) =>
              setNewObjective({ ...newObjective, body: e.target.value })
            }
            className="w-full border mb-4 p-1"
            placeholder="Body"
          />
          <button
            onClick={handleAddObjective}
            className="p-2 w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            Add Objective
          </button>
        </div>
      )}
    </div>
  );
}

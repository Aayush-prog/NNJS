import React, { useState, useEffect } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import { FaPen, FaTrash, FaSave, FaPlus, FaArrowLeft } from "react-icons/fa";
import SearchableIconPicker from "./SearchableIconPicker";
import Loading from "./Loading";

export default function MissionSection() {
  const [loading, setLoading] = useState(false);
  const [missions, setMissions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMission, setNewMission] = useState({
    icon: "FaStar",
    title: "",
    body: "",
    color: "text-blue-500",
  });

  const api = import.meta.env.VITE_URL;
  const iconMap = { ...FaIcons };

  const fetchMissions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/mission/`);
      if (res.status === 200) {
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        setMissions(data);
      }
    } catch (error) {
      console.error("Error fetching mission:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [api, isAdding]);

  const handleChange = (index, field, value) => {
    const updated = [...missions];
    updated[index][field] = value;
    setMissions(updated);
  };

  const handleSave = async (item, index) => {
    try {
      const { _id, title, body, icon, color } = item;
      const res = await axios.patch(`${api}/mission/edit/${_id}`, {
        title,
        body,
        icon,
        color,
      });
      if (res.status === 200) {
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error updating mission:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${api}/mission/del/${_id}`);
      setMissions((prev) => prev.filter((m) => m._id !== _id));
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

  const handleAddMission = async () => {
    try {
      const res = await axios.post(`${api}/mission/create`, newMission);
      if (res.status === 201) {
        setMissions([...missions, res.data.data]);
        setNewMission({
          icon: "FaStar",
          title: "",
          body: "",
          color: "text-blue-500",
        });
        setIsAdding(false);
      }
    } catch (error) {
      console.error("Error creating mission:", error);
    }
  };

  const IconRenderer = ({ iconName, color }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <IconComponent className={`${color} text-3xl sm:text-4xl`} />
    ) : (
      <span>Icon not found</span>
    );
  };

  if (loading) return <Loading />;
  if (!missions) return null;

  return (
    <div className="bg-blue-100 py-12 px-4 sm:px-6 md:px-10 font-secondary">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
          Our Mission
        </h2>
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="mt-4 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
        >
          {isAdding ? <FaArrowLeft /> : <FaPlus />}
        </button>
      </div>

      {isAdding ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-4">Add New Mission</h3>
          <SearchableIconPicker
            selectedIcon={newMission.icon}
            setSelectedIcon={(icon) => setNewMission({ ...newMission, icon })}
          />
          <input
            type="text"
            value={newMission.color}
            onChange={(e) =>
              setNewMission({ ...newMission, color: e.target.value })
            }
            className="w-full border mb-2 p-2"
            placeholder="text-blue-500"
          />
          <IconRenderer iconName={newMission.icon} color={newMission.color} />
          <input
            type="text"
            value={newMission.title}
            onChange={(e) =>
              setNewMission({ ...newMission, title: e.target.value })
            }
            className="w-full border mb-2 p-2"
            placeholder="Title"
          />
          <textarea
            value={newMission.body}
            onChange={(e) =>
              setNewMission({ ...newMission, body: e.target.value })
            }
            className="w-full border mb-4 p-2"
            placeholder="Body"
          />
          <button
            onClick={handleAddMission}
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus /> Add Mission
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {missions.map((item, index) => {
            const IconComponent = FaIcons[item.icon];
            return (
              <div
                key={item._id}
                className="bg-white p-6 sm:p-7 md:p-8 rounded-xl shadow-md flex flex-col items-center text-center lg:mb-10 relative"
              >
                {editingIndex === index ? (
                  <>
                    <SearchableIconPicker
                      selectedIcon={item.icon}
                      setSelectedIcon={(icon) =>
                        handleChange(index, "icon", icon)
                      }
                    />
                    <input
                      type="text"
                      value={item.color}
                      onChange={(e) =>
                        handleChange(index, "color", e.target.value)
                      }
                      className="w-full border mb-2 p-2"
                      placeholder="text-blue-500"
                    />
                    <div className="bg-primary text-white p-4 rounded-full mb-5 shadow-sm mt-4">
                      <IconRenderer iconName={item.icon} color={item.color} />
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleChange(index, "title", e.target.value)
                      }
                      className="w-full border mb-2 p-2"
                      placeholder="Title"
                    />
                    <textarea
                      value={item.body}
                      onChange={(e) =>
                        handleChange(index, "body", e.target.value)
                      }
                      className="w-full border mb-2 p-2"
                      placeholder="Body"
                    />
                    <div className="flex justify-between w-full mt-2">
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
                    <div
                      className={`p-4 rounded-full mb-5 shadow-sm mt-4 ${item.color} bg-primary text-white`}
                    >
                      {IconComponent && (
                        <IconComponent className="text-3xl sm:text-4xl" />
                      )}
                    </div>
                    <h3 className="text-primary text-lg sm:text-xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-black text-sm sm:text-base leading-relaxed mb-4">
                      {item.body}
                    </p>
                    <div className="absolute top-2 right-2 flex gap-2">
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
            );
          })}
        </div>
      )}
    </div>
  );
}

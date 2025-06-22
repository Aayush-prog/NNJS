import React, { useState, useEffect } from "react";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import Loading from "./Loading";
import { FaPen, FaSave, FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";
import SearchableIconPicker from "./SearchableIconPicker";
import { AuthContext } from "../../AuthContext";
export default function Impacts() {
  const [loading, setLoading] = useState(false);
  const [impacts, setImpacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newImpact, setNewImpact] = useState({
    icon: "FaStar",
    title: "",
    count: "",
  });
  const api = import.meta.env.VITE_URL;
  const [isAdding, setIsAdding] = useState(false);
  const iconMap = { ...ReactIcons };
  const { authToken } = useState(AuthContext);
  const iconNames = Object.keys(iconMap).filter((name) =>
    name.startsWith("Fa")
  );

  const IconRenderer = ({ iconName }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <IconComponent className="mb-2 text-support text-4xl inline-block" />
    ) : (
      <span>Icon not found</span>
    );
  };

  useEffect(() => {
    const fetchImpacts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/impacts/`);
        if (res.status === 200) {
          setImpacts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching impacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImpacts();
  }, [api, isAdding]);
  const toggleAdd = () => setIsAdding((prev) => !prev);
  const handleChange = (index, field, value) => {
    const updated = [...impacts];
    updated[index][field] = value;
    setImpacts(updated);
  };

  const handleSave = async (impact, index) => {
    try {
      const { _id, title, count, icon } = impact;
      const res = await axios.patch(
        `${api}/impacts/edit/${_id}`,
        {
          title,
          count,
          icon,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (res.status === 200) {
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Error updating impact:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${api}/impacts/del/${_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setImpacts((prev) => prev.filter((i) => i._id !== _id));
    } catch (error) {
      console.error("Error deleting impact:", error);
    }
  };

  const handleAddImpact = async () => {
    try {
      const res = await axios.post(`${api}/impacts/create`, newImpact, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status === 201) {
        setImpacts([...impacts, res.data.data]);
        setNewImpact({ icon: "FaStar", title: "", count: "" });
        setIsAdding(false);
      }
    } catch (error) {
      console.error("Error creating impact:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center space-y-8 bg-primary text-white py-10 px-4">
      <h2 className="text-3xl font-bold font-secondary">Our Impacts</h2>
      <button
        onClick={toggleAdd}
        className=" right-4 p-2 rounded-full text-black bg-gray-200 hover:bg-gray-300"
        aria-label={isAdding == true ? "Back" : "Add"}
      >
        {isAdding == true ? <FaArrowLeft size={18} /> : <FaPlus size={18} />}
      </button>
      {/* Impacts Grid */}
      {isAdding == false ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {impacts.map((impact, index) => (
            <div
              key={impact._id}
              className="text-center font-bold font-secondary text-xl relative border p-4 rounded-lg bg-white text-black"
            >
              {editingIndex === index ? (
                <>
                  <SearchableIconPicker
                    selectedIcon={impact.icon}
                    setSelectedIcon={(icon) =>
                      handleChange(index, "icon", icon)
                    }
                  />

                  <div className="mb-2">
                    <IconRenderer iconName={impact.icon} />
                  </div>

                  <input
                    type="text"
                    value={impact.count}
                    onChange={(e) =>
                      handleChange(index, "count", e.target.value)
                    }
                    className="border p-1 mb-2 w-full text-center"
                    placeholder="Count"
                  />
                  <input
                    type="text"
                    value={impact.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    className="border p-1 mb-2 w-full text-center"
                    placeholder="Title"
                  />

                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleSave(impact, index)}
                      className="p-2 bg-green-600 text-white rounded-lg"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="p-2 bg-gray-400 text-white rounded-lg"
                    >
                      <FaArrowLeft />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <IconRenderer iconName={impact.icon} />
                  <h1>{impact.count}</h1>
                  <h2>{impact.title}</h2>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="p-2 bg-yellow-300 text-black rounded-full"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDelete(impact._id)}
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
          <h3 className="text-xl font-semibold mb-4">Add New Impact</h3>
          <SearchableIconPicker
            selectedIcon={newImpact.icon}
            setSelectedIcon={(icon) => setNewImpact({ ...newImpact, icon })}
          />

          <div className="mb-2">
            <IconRenderer iconName={newImpact.icon} />
          </div>

          <input
            type="text"
            value={newImpact.count}
            onChange={(e) =>
              setNewImpact({ ...newImpact, count: e.target.value })
            }
            className="border p-1 mb-2 w-full text-center"
            placeholder="Count"
          />
          <input
            type="text"
            value={newImpact.title}
            onChange={(e) =>
              setNewImpact({ ...newImpact, title: e.target.value })
            }
            className="border p-1 mb-4 w-full text-center"
            placeholder="Title"
          />
          <button
            onClick={handleAddImpact}
            className="p-2 w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            Add Impact
          </button>
        </div>
      )}
    </div>
  );
}

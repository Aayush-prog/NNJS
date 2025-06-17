import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";

export default function SpecificObjectives() {
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newObjective, setNewObjective] = useState({
    title: "",
    objectives: [""],
  });

  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchObjective = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/specificObjectives/`);
        if (res.status === 200) {
          const sortedData = [...res.data.data].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setObjectives(sortedData);
        } else {
          console.error("Status:", res.status);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchObjective();
  }, [api]);

  const handleChange = (field, value, objIndex = null, listIndex = null) => {
    const updated = [...objectives];
    if (field === "objectives" && listIndex !== null) {
      updated[objIndex].objectives[listIndex] = value;
    } else {
      updated[objIndex][field] = value;
    }
    setObjectives(updated);
  };

  const handleSave = async (item, index) => {
    try {
      const { _id, title, objectives: objArray } = item;
      const res = await axios.patch(`${api}/specificObjectives/edit/${_id}`, {
        title,
        objectives: objArray,
      });
      if (res.status === 200) {
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${api}/specificObjectives/del/${_id}`);
      setObjectives((prev) => prev.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleAddObjective = async () => {
    try {
      const res = await axios.post(
        `${api}/specificObjectives/create`,
        newObjective
      );
      if (res.status === 201) {
        setObjectives([...objectives, res.data.data]);
        setNewObjective({ title: "", objectives: [""] });
        setIsAdding(false);
      }
    } catch (error) {
      console.error("Create Error:", error);
    }
  };

  const handleRemoveArrayItem = (objIndex, listIndex) => {
    const updated = [...objectives];
    updated[objIndex].objectives.splice(listIndex, 1);
    setObjectives(updated);
  };

  const handleAddArrayItem = (objIndex) => {
    const updated = [...objectives];
    updated[objIndex].objectives.push("");
    setObjectives(updated);
  };

  if (loading) return <Loading />;
  if (!objectives) return null;

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 sm:mb-4 font-secondary">
            Specific Objectives Timeline
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-secondary">
            Our roadmap for eliminating preventable blindness and improving eye
            care services
          </p>
          <button
            onClick={() => setIsAdding((prev) => !prev)}
            className="mt-4 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
          >
            {isAdding ? <FaArrowLeft /> : <FaPlus />}
          </button>
        </div>

        {isAdding && (
          <div className="max-w-xl mx-auto mb-10 bg-white p-6 rounded-xl shadow">
            <input
              type="text"
              value={newObjective.title}
              onChange={(e) =>
                setNewObjective({ ...newObjective, title: e.target.value })
              }
              placeholder="Title"
              className="w-full border mb-3 p-2"
            />
            {newObjective.objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => {
                    const updated = [...newObjective.objectives];
                    updated[i] = e.target.value;
                    setNewObjective({ ...newObjective, objectives: updated });
                  }}
                  placeholder={`Objective ${i + 1}`}
                  className="w-full border p-2"
                />
                {newObjective.objectives.length > 1 && (
                  <button
                    onClick={() => {
                      const updated = [...newObjective.objectives];
                      updated.splice(i, 1);
                      setNewObjective({ ...newObjective, objectives: updated });
                    }}
                    className="text-red-500"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() =>
                setNewObjective({
                  ...newObjective,
                  objectives: [...newObjective.objectives, ""],
                })
              }
              className="text-sm text-blue-600 mb-4"
            >
              + Add another point
            </button>
            <button
              onClick={handleAddObjective}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              <FaPlus className="inline mr-1" /> Add Objective
            </button>
          </div>
        )}

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full border-l-4 border-primary"></div>

          <div className="space-y-8 sm:space-y-12">
            {objectives.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isEditing = editingIndex === index;

              return (
                <div
                  key={item._id}
                  className={`flex flex-col md:flex-row ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  } relative`}
                >
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 md:px-8 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-white shadow-xl rounded-xl p-4 md:p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2 justify-between">
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-500 text-lg md:text-xl flex-shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                handleChange("title", e.target.value, index)
                              }
                              className="font-bold text-primary font-secondary border p-1 w-full"
                            />
                          ) : (
                            <h3 className="text-lg md:text-xl font-bold text-primary font-secondary">
                              {item.title}
                            </h3>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSave(item, index)}
                              className="bg-green-600 text-white p-2 rounded"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditingIndex(null)}
                              className="bg-gray-400 text-white p-2 rounded"
                            >
                              <FaArrowLeft />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingIndex(index)}
                              className="bg-yellow-300 text-black p-2 rounded"
                            >
                              <FaPen />
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="bg-red-500 text-white p-2 rounded"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>

                      <ul className="list-disc ml-5 md:ml-6 space-y-2 text-sm md:text-base text-gray-700">
                        {item.objectives.map((obj, i) =>
                          isEditing ? (
                            <li key={i} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={obj}
                                onChange={(e) =>
                                  handleChange(
                                    "objectives",
                                    e.target.value,
                                    index,
                                    i
                                  )
                                }
                                className="w-full border p-1"
                              />
                              <button
                                onClick={() => handleRemoveArrayItem(index, i)}
                                className="text-red-500"
                              >
                                <FaTimes />
                              </button>
                            </li>
                          ) : (
                            <li key={i}>{obj}</li>
                          )
                        )}
                      </ul>

                      {isEditing && (
                        <button
                          onClick={() => handleAddArrayItem(index)}
                          className="text-sm text-blue-600 mt-2"
                        >
                          + Add another point
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center absolute left-2 md:left-1/2 transform md:-translate-x-1/2 top-4 z-10">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border-4 border-primary rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

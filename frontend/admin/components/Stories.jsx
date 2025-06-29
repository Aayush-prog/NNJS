import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [storiesData, setStoriesData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    text: "",
    author: "",
    image: null,
  });
  const [editPreview, setEditPreview] = useState(null);
  const [newStory, setNewStory] = useState({
    text: "",
    author: "",
    image: null,
  });
  const [newPreview, setNewPreview] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { authToken } = useContext(AuthContext);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/story/`);
      if (res.status === 200) setStoriesData(res.data.data);
      else console.error("Error fetching story: Status code", res.status);
    } catch (error) {
      console.error("Error fetching story:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/story/del/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      fetchStories();
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const startEditing = (story) => {
    setEditingId(story._id);
    setEditForm({ text: story.text, author: story.author, image: null });
    setEditPreview(`${api}/images/${story.image}`);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ text: "", author: "", image: null });
    setEditPreview(null);
  };

  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      formData.append("text", editForm.text);
      formData.append("author", editForm.author);
      if (editForm.image) formData.append("image", editForm.image);

      await axios.patch(`${api}/story/edit/${editingId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      fetchStories();
      cancelEditing();
    } catch (error) {
      console.error("Error editing story:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newStory.text || !newStory.author || !newStory.image) return;
    try {
      const formData = new FormData();
      formData.append("text", newStory.text);
      formData.append("author", newStory.author);
      formData.append("image", newStory.image);

      await axios.post(`${api}/story/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setNewStory({ text: "", author: "", image: null });
      setNewPreview(null);
      setShowAddForm(false);
      fetchStories();
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({ ...editForm, image: file });
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStory({ ...newStory, image: file });
      setNewPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="py-16 flex flex-col items-center space-y-8">
      {/* Title and toggle button */}
      <div className="flex items-center space-x-4">
        <h2 className="text-4xl font-bold text-primary font-secondary">
          Success Stories
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-green-600 hover:text-green-800 text-2xl"
          title={showAddForm ? "Go Back" : "Add new story"}
        >
          {showAddForm ? <FaArrowLeft /> : <FaPlus />}
        </button>
      </div>

      {/* Add form appears below title when toggled */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="w-full md:w-3/4 bg-grey rounded-md shadow p-6 flex flex-col space-y-4"
        >
          <h3 className="text-2xl font-bold">Add New Story</h3>
          <textarea
            value={newStory.text}
            onChange={(e) => setNewStory({ ...newStory, text: e.target.value })}
            placeholder="Story text"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newStory.author}
            onChange={(e) =>
              setNewStory({ ...newStory, author: e.target.value })
            }
            placeholder="Author"
            required
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleNewImageChange}
            className="border p-2 rounded"
          />
          {newPreview && (
            <img
              src={newPreview}
              alt="Preview"
              className="rounded-full w-40 h-40 object-cover self-center shadow-lg"
            />
          )}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
            Add Story
          </button>
        </form>
      )}

      {/* Stories slider always below */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="w-full md:w-3/4"
        >
          {storiesData.map((story) => (
            <SwiperSlide key={story._id}>
              <section className="relative flex flex-col md:flex-row items-center bg-grey rounded-md shadow p-8">
                <div className="absolute top-4 right-4 flex space-x-2">
                  {editingId === story._id ? (
                    <>
                      <button
                        onClick={handleEditSave}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(story)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(story._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>

                <div className="md:w-1/2 flex justify-center">
                  {editingId === story._id ? (
                    <div className="flex flex-col items-center space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                        className="border rounded p-2"
                      />
                      {editPreview && (
                        <img
                          src={editPreview}
                          alt="Preview"
                          className="rounded-full w-40 h-40 object-cover shadow-lg"
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      src={`${api}/images/${story.image}`}
                      loading="lazy"
                      alt={story.author}
                      className="rounded-full w-40 h-40 object-cover shadow-lg"
                    />
                  )}
                </div>

                <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left flex flex-col space-y-2">
                  {editingId === story._id ? (
                    <>
                      <textarea
                        value={editForm.text}
                        onChange={(e) =>
                          setEditForm({ ...editForm, text: e.target.value })
                        }
                        placeholder="Story text"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editForm.author}
                        onChange={(e) =>
                          setEditForm({ ...editForm, author: e.target.value })
                        }
                        placeholder="Author"
                        className="border p-2 rounded"
                      />
                    </>
                  ) : (
                    <>
                      <blockquote className="italic font-semibold text-lg">
                        {story.text}
                      </blockquote>
                      <cite className="block mt-2 text-gray-500">
                        — {story.author}
                      </cite>
                    </>
                  )}
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

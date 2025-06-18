import React, { useRef, useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import axios from "axios";
import Loading from "../components/Loading";

const TimelineCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({
    title: "",
    body: "",
    year: "",
    image: null, // Store the file object instead of the filename
  });

  const api = import.meta.env.VITE_URL;

  const fetchTimestone = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/timeStone/`);
      if (res.status === 200) setData(res.data.data);
    } catch (error) {
      console.error("Error fetching timestone:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimestone();
  }, [api]);

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newData.title);
      formData.append("body", newData.body);
      formData.append("year", newData.year);
      if (newData.image) {
        formData.append("image", newData.image);
      }

      await axios.post(`${api}/timeStone/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsAdding(false);
      setNewData({ title: "", body: "", year: "", image: null });
      fetchTimestone();
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  const handleSave = async (item, index) => {
    try {
      const formData = new FormData();
      formData.append("title", item.title);
      formData.append("body", item.body);
      formData.append("year", item.year);
      if (item.newImage) {
        // Changed from newData.image to item.newImage
        formData.append("image", item.newImage); // Append new image if it exists
      }
      //Append old image if no new image provided
      else {
        formData.append("image", item.image);
      }

      const res = await axios.patch(
        `${api}/timeStone/edit/${item._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setEditingIndex(null);
        fetchTimestone();
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/timeStone/del/${id}`);
      fetchTimestone();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  //For Image Updates
  const handleImageChange = (index, file) => {
    const updated = [...data];
    updated[index].newImage = file; // Store the new file object
    setData(updated);
  };

  const handleNewDataChange = (field, value) => {
    setNewData({ ...newData, [field]: value });
  };

  const handleNewImageChange = (file) => {
    setNewData({ ...newData, image: file });
  };

  if (loading) return <Loading />;

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-secondary font-bold text-center text-primary mb-12">
        Our Journey Through Time
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
            Add New Milestone
          </h3>
          <div className="mb-2">
            <label
              htmlFor="year"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Year:
            </label>
            <input
              type="text"
              id="year"
              placeholder="Year"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newData.year}
              onChange={(e) => handleNewDataChange("year", e.target.value)}
            />
          </div>
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
              value={newData.title}
              onChange={(e) => handleNewDataChange("title", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="body"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="body"
              placeholder="Description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newData.body}
              onChange={(e) => handleNewDataChange("body", e.target.value)}
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
            Add Milestone
          </button>
        </div>
      )}

      <div className="relative">
        <div className="absolute top-7 md:top-8 left-0 right-0 h-1 bg-primary z-0" />
        <button
          ref={prevRef}
          className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-blue-200 text-primary p-2 rounded-full"
        >
          <FaArrowLeft />
        </button>
        <button
          ref={nextRef}
          className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-blue-200 text-primary p-2 rounded-full"
        >
          <FaArrowRight />
        </button>

        <Swiper
          direction="horizontal"
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
          pagination={{ clickable: true }}
          modules={[Pagination, Mousewheel, Navigation]}
          className="mySwiper w-full"
        >
          {data.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div className="flex flex-col items-center text-center p-4 relative z-10 pb-10">
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary border-4 border-white shadow-lg" />
                  <div className="mt-2 text-sm sm:text-xl font-semibold text-primary">
                    {item.year}
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 w-full max-w-sm mx-auto ">
                  {editingIndex === index ? (
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold mb-4 text-center">
                        Edit Milestone
                      </h3>

                      <div className="mb-2">
                        <label
                          htmlFor={`title-${index}`}
                          className="block text-gray-700 text-sm font-bold mb-1"
                        >
                          Title:
                        </label>
                        <input
                          type="text"
                          id={`title-${index}`}
                          value={item.title}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-2">
                        <label
                          htmlFor={`body-${index}`}
                          className="block text-gray-700 text-sm font-bold mb-1"
                        >
                          Description:
                        </label>
                        <textarea
                          id={`body-${index}`}
                          value={item.body}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) =>
                            handleChange(index, "body", e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-2">
                        <label
                          htmlFor={`year-${index}`}
                          className="block text-gray-700 text-sm font-bold mb-1"
                        >
                          Year:
                        </label>
                        <input
                          type="text"
                          id={`year-${index}`}
                          value={item.year}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) =>
                            handleChange(index, "year", e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor={`image-${index}`}
                          className="block text-gray-700 text-sm font-bold mb-1"
                        >
                          Image:
                        </label>
                        <input
                          type="file"
                          id={`image-${index}`}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) =>
                            handleImageChange(index, e.target.files[0])
                          }
                        />
                      </div>

                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleSave(item, index)}
                          className="p-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 sm:p-6">
                      <img
                        src={`${api}/images/${item.image}`}
                        loading="lazy"
                        alt={item.title}
                        className="w-full h-48 object-cover mb-4"
                      />
                      <h3 className="text-lg sm:text-xl font-bold font-secondary text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-primary">
                        {item.body ?? item.body}
                      </p>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => setEditingIndex(index)}
                          className="p-2 bg-yellow-300 text-black rounded-full hover:bg-yellow-400 focus:outline-none focus:shadow-outline"
                        >
                          <FaPen />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TimelineCarousel;

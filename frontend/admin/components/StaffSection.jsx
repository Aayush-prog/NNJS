import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading"; // Assuming you have a Loading component

export default function StaffSection(props) {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [groupSize, setGroupSize] = useState(1);
  const [staffList, setStaffList] = useState(props.person); // Use a local state
  const api = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);

  const [newStaffMember, setNewStaffMember] = useState({
    name: "",
    designation: "",
    body: "",
    image: null,
    type: "Staff", // Set type to "Staff" for new staff members
  });

  // Refetch data
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/person/staff`); // Correct endpoint
      if (res.status === 200) {
        setStaffList(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [api, isAdding]);

  useEffect(() => {
    setStaffList(props.person);
  }, [props.person]);

  // Adjust slides based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
        setGroupSize(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(1);
        setGroupSize(2);
      } else {
        setSlidesPerView(1);
        setGroupSize(3);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create grouped staff arrays based on responsive group size
  const groupedStaff = [];
  if (staffList) {
    // Check if staffList is available before mapping
    for (let i = 0; i < staffList.length; i += groupSize) {
      groupedStaff.push(staffList.slice(i, i + groupSize));
    }
  }
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleSave = async (staff) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", staff.name);
      formData.append("designation", staff.designation);
      formData.append("body", staff.body);

      if (staff.newImage) {
        formData.append("image", staff.newImage);
      }
      // No need to send the image again if it hasn't changed

      const res = await axios.patch(
        `${api}/person/edit/${staff._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        // Update the staffList with the new data
        setStaffList((prevStaffList) =>
          prevStaffList.map((s) =>
            s._id === staff._id
              ? { ...s, ...staff, image: res.data.data.image }
              : s
          )
        );
        setEditingIndex(null);
        setEditingStaff(null);
        fetchStaff(); // Refetch to update list
      }
    } catch (error) {
      console.error("Error saving staff member:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${api}/person/del/${id}`);
      setStaffList((prev) => prev.filter((staff) => staff._id !== id));
    } catch (error) {
      console.error("Error deleting staff member:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", newStaffMember.name);
      formData.append("designation", newStaffMember.designation);
      formData.append("body", newStaffMember.body);
      formData.append("type", newStaffMember.type); // Ensure the type is sent

      if (newStaffMember.image) {
        formData.append("image", newStaffMember.image);
      }

      const res = await axios.post(`${api}/person/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setStaffList((prevStaffList) => [...prevStaffList, res.data.data]);
        setIsAdding(false);
        setNewStaffMember({
          name: "",
          designation: "",
          body: "",
          image: null,
          type: "Staff",
        }); // Reset type as well
        fetchStaff(); // Re-fetch
      }
    } catch (error) {
      console.error("Error adding staff member:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewImageChange = (file) => {
    setNewStaffMember((prev) => ({ ...prev, image: file }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 text-center relative">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mb-6 sm:mb-8 md:mb-12">
        Our Staff
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
            Add New Staff Member
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
              value={newStaffMember.name}
              onChange={(e) =>
                setNewStaffMember({ ...newStaffMember, name: e.target.value })
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
              value={newStaffMember.designation}
              onChange={(e) =>
                setNewStaffMember({
                  ...newStaffMember,
                  designation: e.target.value,
                })
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
              value={newStaffMember.body}
              onChange={(e) =>
                setNewStaffMember({ ...newStaffMember, body: e.target.value })
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
            Add Staff Member
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          className="pb-10 sm:pb-12"
        >
          {groupedStaff.map((group, index) => (
            <SwiperSlide key={index}>
              <div
                className={`grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 ${
                  group.length === 2
                    ? "sm:grid-cols-2"
                    : group.length >= 3
                    ? "sm:grid-cols-2 md:grid-cols-3"
                    : ""
                } mb-6 sm:mb-8 md:mb-12`}
              >
                {group.map((staff, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 shadow-md rounded-lg p-4 mb-4 sm:p-6 text-center hover:shadow-lg transition h-auto sm:h-[280px] md:h-[300px]"
                  >
                    {editingIndex === staff._id ? (
                      <>
                        <label
                          htmlFor={`image-${staff._id}`}
                          className="relative inline-block mb-3 mx-auto"
                        >
                          <img
                            src={
                              staff.newImage
                                ? URL.createObjectURL(staff.newImage)
                                : `${api}/images/${staff.image}`
                            }
                            alt={staff.name}
                            loading="lazy"
                            className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full mx-auto border-2 border-gray-300 shadow-sm"
                          />
                          <FaCamera className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1 cursor-pointer" />
                          <input
                            type="file"
                            id={`image-${staff._id}`}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setStaffList((prevStaffList) =>
                                prevStaffList.map((s) =>
                                  s._id === staff._id
                                    ? { ...s, newImage: file }
                                    : s
                                )
                              );
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          value={staff.name}
                          onChange={(e) => {
                            setStaffList((prevStaffList) =>
                              prevStaffList.map((s) =>
                                s._id === staff._id
                                  ? { ...s, name: e.target.value }
                                  : s
                              )
                            );
                          }}
                          className="w-full text-base sm:text-lg font-bold text-primary font-secondary mb-1 text-center"
                        />
                        <input
                          type="text"
                          value={staff.designation}
                          onChange={(e) => {
                            setStaffList((prevStaffList) =>
                              prevStaffList.map((s) =>
                                s._id === staff._id
                                  ? { ...s, designation: e.target.value }
                                  : s
                              )
                            );
                          }}
                          className="w-full text-xs sm:text-sm font-semibold text-gray-600 mb-1 text-center"
                        />
                        <textarea
                          value={staff.body}
                          onChange={(e) => {
                            setStaffList((prevStaffList) =>
                              prevStaffList.map((s) =>
                                s._id === staff._id
                                  ? { ...s, body: e.target.value }
                                  : s
                              )
                            );
                          }}
                          className="w-full text-xs sm:text-sm text-primary break-words text-center"
                        />
                        <div className="flex justify-center mt-2">
                          <button
                            onClick={() => handleSave(staff)}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mr-2"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={() => {
                              setEditingIndex(null);
                              // Reset to original values
                              fetchStaff();
                            }}
                            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={`${api}/images/${staff.image}`}
                          alt={staff.name}
                          loading="lazy"
                          className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full mx-auto mb-3 sm:mb-4 border-2 border-gray-300 shadow-sm"
                        />
                        <h3 className="text-base sm:text-lg font-bold text-primary font-secondary mb-1">
                          {staff.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">
                          {staff.designation}
                        </p>
                        <p className="text-xs sm:text-sm text-primary break-words">
                          {staff.body}
                        </p>
                        <div className="flex justify-center mt-2">
                          <button
                            onClick={() => {
                              setEditingIndex(staff._id);
                              setEditingStaff(staff);
                            }}
                            className="bg-yellow-300 text-black p-2 rounded-full hover:bg-yellow-400 mr-2"
                          >
                            <FaPen />
                          </button>
                          <button
                            onClick={() => handleDelete(staff._id)}
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
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          ref={prevRef}
          className="hidden lg:flex swiper-button-prev-custom absolute top-36 -translate-y-1/2 left-0 sm:-left-4 md:-left-18 p-1 sm:p-2 md:p-3 bg-blue-50 rounded-full shadow-md z-10 cursor-pointer"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div
          ref={nextRef}
          className="hidden lg:flex swiper-button-prev-custom absolute md:top-36 -translate-y-1/2 right-0 sm:-right-4 md:-right-18 p-1 md:p-3 bg-blue-50 rounded-full shadow-md z-10 cursor-pointer"
          aria-label="Next slide"
        >
          <svg
            className="md:w-6 md:h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

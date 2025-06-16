import React, { useState } from "react";
import axios from "axios";
import { FaPen, FaSave } from "react-icons/fa";

const HeroSection = ({ id, image, title, body }) => {
  const api = import.meta.env.VITE_URL;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title || "");
  const [editedBody, setEditedBody] = useState(body || "");
  const [editedImage, setEditedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    image ? `${api}/images/${image}` : null
  );

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedTitle);
      formData.append("body", editedBody);
      if (editedImage) {
        formData.append("image", editedImage);
      }

      const response = await axios.patch(
        `${api}/heroSection/edit/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Hero section updated:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating hero section:", error);
    }
  };

  return (
    <div
      loading="lazy"
      className="relative h-[40vh] sm:h-[50vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${previewImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Edit / Save Button */}
      <button
        onClick={isEditing ? handleSave : toggleEdit}
        className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200 z-20"
        aria-label={isEditing ? "Save" : "Edit"}
      >
        {isEditing ? <FaSave size={18} /> : <FaPen size={18} />}
      </button>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-4 space-y-4 sm:space-y-6 md:space-y-10">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary leading-tight text-center bg-transparent border-b outline-none"
          />
        ) : (
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary leading-tight">
            {editedTitle}
          </h1>
        )}

        {isEditing ? (
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary text-center bg-transparent border p-2 outline-none w-full max-w-2xl mx-auto"
            rows={3}
          />
        ) : (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary">
            {editedBody}
          </p>
        )}

        {/* Image Upload */}
        {isEditing && (
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

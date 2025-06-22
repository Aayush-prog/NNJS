import React, { useState } from "react";
import { FaPen, FaSave, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

export default function SubSection({ title, body, image, id }) {
  const api = import.meta.env.VITE_URL;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title || "");
  const [imageDeleted, setImageDeleted] = useState(false);
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
      formData.append("imageDeleted", imageDeleted);
      if (editedImage) {
        formData.append("image", editedImage);
      }

      const response = await axios.patch(
        `${api}/subSection/edit/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Saved successfully:", response.data);

      if (response.data.image) {
        setPreviewImage(`${api}/images/${response.data.image}`);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving subsection:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5">
      {/* Back Button */}
      {isEditing && (
        <button
          onClick={toggleEdit}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Back"
        >
          <FaArrowLeft size={18} />
        </button>
      )}

      {/* Edit / Save Button */}
      <button
        onClick={isEditing ? handleSave : toggleEdit}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label={isEditing ? "Save" : "Edit"}
      >
        {isEditing ? <FaSave size={18} /> : <FaPen size={18} />}
      </button>

      {/* Title */}
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center border-b focus:outline-none"
        />
      ) : (
        editedTitle && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary">
            {editedTitle}
          </h2>
        )
      )}

      {/* Body */}
      {isEditing ? (
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw] border p-2 rounded focus:outline-none"
          rows={4}
        />
      ) : (
        editedBody && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]">
            {editedBody}
          </p>
        )
      )}

      {/* Image */}
      {isEditing ? (
        <>
          {previewImage && (
            <>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[60vw] rounded"
              />
            </>
          )}
          <div className="flex items-center gap-5">
            {previewImage && (
              <button
                onClick={() => {
                  setImageDeleted(true);
                  setPreviewImage(null);
                }}
                className="p-2 bg-accent rounded-2xl text-white"
              >
                Delete the image
              </button>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className=" border-2"
            />
          </div>
        </>
      ) : (
        previewImage && (
          <img
            src={previewImage}
            alt="Current"
            className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[60vw] rounded"
          />
        )
      )}
    </div>
  );
}

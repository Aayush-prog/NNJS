import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  FaPen,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaArrowCircleUp,
} from "react-icons/fa";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { AuthContext } from "../../AuthContext";

export default function Partners() {
  const [logos, setLogos] = useState({ current: [], past: [], special: [] });
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: "",
    image: null,
    type: "Current",
    link: "",
  });
  const [editingPartner, setEditingPartner] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const api = import.meta.env.VITE_URL;
  const types = ["Current", "Past", "Special"];

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/partners`);
      if (res.status === 200) {
        setLogos(res.data); // { current, past, special }
      }
    } catch (err) {
      console.error("Error fetching partners", err);
    } finally {
      setLoading(false);
    }
  };
  const { authToken } = useContext(AuthContext);
  console.log(authToken);
  useEffect(() => {
    fetchPartners();
  }, [api]);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleChange = (field, value) => {
    setNewPartner((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditChange = (field, value) => {
    setEditingPartner((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newPartner.name);
      formData.append("type", newPartner.type);
      formData.append("image", newPartner.image);
      formData.append("link", newPartner.link);

      await axios.post(`${api}/partners/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      setNewPartner({ name: "", image: null, type: "Current" });
      setShowForm(false);
      fetchPartners(); // refetch after add
    } catch (err) {
      console.error("Error adding partner", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/partners/del/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      fetchPartners(); // refetch after delete
    } catch (err) {
      console.error("Error deleting partner", err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editingPartner.name);
      formData.append("type", editingPartner.type);
      formData.append("link", editingPartner.link);
      if (editingPartner.newImage) {
        formData.append("image", editingPartner.newImage);
      }

      await axios.patch(
        `${api}/partners/edit/${editingPartner._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setEditingPartner(null);
      fetchPartners(); // refetch after edit
    } catch (err) {
      console.error("Error saving partner", err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Nav />
      <section className="min-h-screen py-12 px-6 sm:px-12 bg-blue-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-secondary text-primary mb-4">
            Partner Organizations
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showForm ? (
              <FaTimes className="inline mr-2" />
            ) : (
              <FaPlus className="inline mr-2" />
            )}
            {showForm ? "Cancel" : "Add Partner"}
          </button>
        </div>

        {showForm && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-10">
            <h3 className="text-xl font-bold mb-4 text-center">
              Add New Partner
            </h3>
            <input
              type="text"
              placeholder="Name"
              value={newPartner.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full mb-4 border p-2 rounded"
            />
            <select
              value={newPartner.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full mb-4 border p-2 rounded"
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) => handleChange("image", e.target.files[0])}
              className="w-full mb-4"
            />
            <input
              type="text"
              placeholder="Link"
              value={newPartner.link}
              onChange={(e) => handleChange("link", e.target.value)}
              className="w-full mb-4 border p-2 rounded"
            />
            <button
              onClick={handleAdd}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              <FaPlus className="inline mr-2" />
              Add Partner
            </button>
          </div>
        )}

        {types.map((type) => {
          const key = type.toLowerCase(); // for accessing logos.current, logos.past
          return (
            <div key={type} className="mb-12">
              <h3 className="text-2xl font-bold text-center text-primary mb-6">
                {type} Partners
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {logos[key]?.map((partner) => (
                  <div
                    key={partner._id}
                    className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center"
                  >
                    <img
                      src={
                        editingPartner?._id === partner._id &&
                        editingPartner?.newImage
                          ? URL.createObjectURL(editingPartner.newImage)
                          : `${api}/images/${partner.image}`
                      }
                      alt={partner.name}
                      className="w-full h-40 object-contain mb-4"
                    />
                    {editingPartner?._id === partner._id ? (
                      <>
                        <input
                          type="text"
                          value={editingPartner.name}
                          onChange={(e) =>
                            handleEditChange("name", e.target.value)
                          }
                          className="mb-2 w-full border p-2 rounded"
                        />
                        <select
                          value={editingPartner.type}
                          onChange={(e) =>
                            handleEditChange("type", e.target.value)
                          }
                          className="mb-2 w-full border p-2 rounded"
                        >
                          {types.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleEditChange("newImage", e.target.files[0])
                          }
                          className="mb-2"
                        />
                        <input
                          type="text"
                          value={editingPartner.link}
                          onChange={(e) =>
                            handleEditChange("link", e.target.value)
                          }
                          className="mb-2 w-full border p-2 rounded"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={handleSaveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={() => setEditingPartner(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="font-bold text-lg mb-2">
                          {partner.name}
                        </h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingPartner(partner)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded"
                          >
                            <FaPen />
                          </button>
                          <button
                            onClick={() => handleDelete(partner._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
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
        })}
      </section>

      <Footer />
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full shadow-lg hover:bg-support transition z-10"
        >
          <FaArrowCircleUp size={24} />
        </button>
      )}
    </div>
  );
}

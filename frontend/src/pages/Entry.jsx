import React, { useRef, useState } from "react";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function Entry() {
  const [form, setForm] = useState({
    programName: "",
    name: "",
    designation: "",
    organization: "",
    branch: "",
    gender: "",
    address: "",
    email: "",
    phone: "",
    date: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef();
  const api = import.meta.env.VITE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const signatureData = sigCanvas.current.getCanvas().toDataURL("image/png");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("signature", signatureData);

    try {
      await axios.post(`${api}/program/entry`, formData);
      alert("Submitted successfully!");
      setForm({
        programName: "",
        name: "",
        designation: "",
        organization: "",
        branch: "",
        gender: "",
        address: "",
        email: "",
        phone: "",
        date: "",
        photo: null,
      });
      setPhotoPreview(null);
      sigCanvas.current.clear();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-3xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Program Entry Form
          </h2>

          {/* Grouped Inputs - Flex on medium screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="programName"
              placeholder="Event Title"
              value={form.programName}
              onChange={handleChange}
              required
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={form.designation}
              onChange={handleChange}
              required
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={form.organization}
              onChange={handleChange}
              required
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={form.branch}
              onChange={handleChange}
              className="p-3 border rounded-md"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="p-3 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="p-3 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 border rounded-md"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="p-3 border rounded-md"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="p-3 border rounded-md"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhoto}
              required
              className="w-full p-3 border rounded-md mt-2"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="mt-3 w-full max-h-72 object-contain rounded-md border"
              />
            )}
          </div>

          {/* Signature Canvas */}
          <div>
            <p className="mb-2 font-semibold">Signature:</p>
            <div className="overflow-x-auto">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 150,
                  className:
                    "border border-gray-300 rounded-md w-full max-w-full",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleClearSignature}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Clear Signature
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-200"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Entry;

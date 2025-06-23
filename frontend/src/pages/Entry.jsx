import React, { useRef, useState } from "react";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";

function Entry() {
  const [form, setForm] = useState({
    programName: "",
    name: "",
    designation: "",
    date: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef();
  const api = import.meta.env.VITE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoto = (e) => {
    setForm((prev) => ({ ...prev, photo: e.target.files[0] }));
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
        date: "",
        photo: null,
      });
      sigCanvas.current.clear();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Program Entry Form
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="programName"
            placeholder="Program Name"
            value={form.programName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            required
            className="w-full p-3 border rounded-md"
          />

          <div>
            <p className="mb-2 font-semibold">Signature:</p>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "border border-gray-300 rounded-md",
              }}
            />
            <button
              type="button"
              onClick={handleClearSignature}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Clear Signature
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-200"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Entry;

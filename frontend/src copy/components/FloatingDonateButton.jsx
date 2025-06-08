import { useNavigate } from "react-router-dom";

export default function FloatingDonateButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      className={`bg-red-600 text-white px-6 py-3 rounded-l-lg shadow-lg font-bold hover:bg-red-700 transition ${className}`}
      onClick={() => navigate("/donate")}
      aria-label="Donate"
    >
      Donate
    </button>
  );
}
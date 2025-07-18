import React from "react";
import { useNavigate } from "react-router";

export default function DonateButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/donate");
  };
  return (
    <button
      className="bg-accent rounded-sm text-center p-2 font-secondary px-5
    font-bold text-l text-white hover:bg-support hover:text-primary"
      onClick={handleClick}
    >
      Donate Now
    </button>
  );
}

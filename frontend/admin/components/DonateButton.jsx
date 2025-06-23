import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext";
export default function DonateButton() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <button
      className="bg-accent rounded-sm text-center p-2 font-secondary px-5
    font-bold text-l text-white hover:bg-support hover:text-primary"
      onClick={handleClick}
    >
      Logout
    </button>
  );
}

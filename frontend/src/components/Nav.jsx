import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import DonateButton from "./DonateButton";
import { ChevronDown } from "lucide-react";

export default function Nav() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div>
      <div className="flex flex-col gap-3 px-30 py-5">
        <div className="flex place-content-between items-center">
          <div className="flex text-primary items-center">
            <img src={Logo} alt="Logo" className="w-16 h-16 mr-4" />
            <div>
              <h1 className="font-semibold text-4xl font-secondary">
                Nepal Netra Jyoti Sangh
              </h1>
              <p className="text-lg">
                National Society for Comprehensive Eye Care
              </p>
            </div>
          </div>
          <DonateButton />
        </div>
      </div>

      <div className="flex items-center justify-between px-32 py-5 text-white font-secondary bg-primary relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 hover:text-gray-200 focus:outline-none"
          >
            Who We Are
          </button>

          {showDropdown && (
            <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <Link
                to="/mission"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Our Mission
              </Link>
              <Link
                to="/history"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                History & Timeline
              </Link>
              <Link
                to="/team"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Our Team
              </Link>
            </div>
          )}
        </div>

        <Link to="/what-we-do">What We Do</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/press">Press/Media</Link>
        <Link to="/ethics">Ethical Review</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}

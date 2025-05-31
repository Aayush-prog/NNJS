import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import DonateButton from "./DonateButton";
import { ChevronDown } from "lucide-react";

export default function Nav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); //Ref for outside click detection
  const dropdownButtonRef = useRef(null); //Ref for focusing button on close

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, dropdownButtonRef]);

  //Accessibility improvements: Close dropdown on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showDropdown) {
        setShowDropdown(false);
        dropdownButtonRef.current?.focus(); // Return focus to the button
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDropdown]);

  return (
    <nav>
      {" "}
      {/* Changed div to semantic <nav> element */}
      <div className="flex flex-col gap-3 px-30 py-5">
        <div className="flex place-content-between items-center">
          <Link
            to="/"
            className="flex text-primary items-center"
            aria-label="Navigate to homepage"
          >
            {" "}
            {/* Added aria-label */}
            <img
              src={Logo}
              alt="Nepal Netra Jyoti Sangh Logo"
              className="w-16 h-16 mr-4"
            />{" "}
            {/* Added descriptive alt text */}
            <div>
              <h1 className="font-semibold text-4xl font-secondary">
                Nepal Netra Jyoti Sangh
              </h1>
              <p className="text-lg">
                National Society for Comprehensive Eye Care
              </p>
            </div>
          </Link>
          <DonateButton />
        </div>
      </div>
      <div className="flex items-center justify-between px-32 py-5 text-white font-secondary bg-primary relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 hover:text-gray-200 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={showDropdown}
            ref={dropdownButtonRef}
          >
            Who We Are
            <ChevronDown aria-hidden="true" />{" "}
            {/*Added aria-hidden to chevron*/}
          </button>

          {showDropdown && (
            <div
              className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg z-50"
              ref={dropdownRef}
              role="menu"
              aria-label="Who We Are Navigation"
            >
              {/*Added role and aria-label for the dropdown menu*/}
              <Link
                to="/mission"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
                role="menuitem" //Role for menu item
              >
                Our Mission
              </Link>
              <Link
                to="/history"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
                role="menuitem" //Role for menu item
              >
                History & Timeline
              </Link>
              <Link
                to="/team"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
                role="menuitem" //Role for menu item
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
    </nav>
  );
}

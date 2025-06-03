import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import DonateButton from "./DonateButton";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export default function Nav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showDropdown) {
        setShowDropdown(false);
        dropdownButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDropdown]);

  return (
    <nav>
      <div className="flex flex-col gap-3 px-30 py-5">
        <div className="flex place-content-between items-center">
          <Link
            to="/"
            className="flex text-primary items-center"
            aria-label="Navigate to homepage"
          >
            <img
              src={Logo}
              alt="Nepal Netra Jyoti Sangh Logo"
              className="w-16 h-16 mr-4"
            />
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
      <div className="flex items-center justify-between px-32 py-5 text-primary font-secondary  relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 hover:text-accent focus:outline-none font-bold"
            aria-haspopup="true"
            aria-expanded={showDropdown}
            ref={dropdownButtonRef}
          >
            Who We Are
            <ChevronDown aria-hidden="true" />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg z-50 font-bold"
                ref={dropdownRef}
                role="menu"
                aria-label="Who We Are Navigation"
                variants={dropdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <NavLink
                  to="/mission"
                  className="block px-4 py-2 hover:bg-gray-100 font-bold"
                  onClick={() => setShowDropdown(false)}
                  role="menuitem"
                >
                  Our Mission
                </NavLink>
                <NavLink
                  to="/history"
                  className="block px-4 py-2 hover:bg-gray-100 font-bold"
                  onClick={() => setShowDropdown(false)}
                  role="menuitem"
                >
                  History & Timeline
                </NavLink>
                <NavLink
                  to="/team"
                  className="block px-4 py-2 hover:bg-gray-100 font-bold"
                  onClick={() => setShowDropdown(false)}
                  role="menuitem"
                >
                  Our Team
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <NavLink to="/what_we_do" className="font-bold hover:text-accent">
          What We Do
        </NavLink>
        <NavLink to="/partners" className="font-bold hover:text-accent">
          Partners
        </NavLink>
        <NavLink to="/resources" className="font-bold hover:text-accent">
          Resources
        </NavLink>
        <NavLink to="/press" className="font-bold hover:text-accent">
          Press/Media
        </NavLink>
        <NavLink to="/ethical" className="font-bold hover:text-accent">
          Ethical Review
        </NavLink>
        <NavLink to="/contact" className="font-bold hover:text-accent">
          Contact Us
        </NavLink>
      </div>
    </nav>
  );
}

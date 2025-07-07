import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import DonateButton from "./DonateButton";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import flagWave from "../assets/flag.webm";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setMobileMenuOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav>
      <div className="flex flex-col gap-3 px-6 sm:px-10 lg:px-30 py-5">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex text-primary items-center"
            aria-label="Navigate to homepage"
          >
            <img
              src={Logo}
              alt="Nepal Netra Jyoti Sangh Logo"
              className="w-14 h-14 mr-4 sm:w-16 sm:h-16"
            />
            <div>
              <h1 className="font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-secondary leading-tight">
                Nepal Netra Jyoti Sangh
              </h1>
              <p className="text-[10px] pt-1 sm:text-sm md:text-base lg:text-lg leading-snug">
                National Society for Comprehensive Eye Care
              </p>
            </div>
            {/* <video width="150px" muted loop autoPlay>
              <source src={flagWave} type="video/webm" />
            </video> */}
          </Link>

          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <button onClick={toggleMobileMenu} aria-label="Toggle menu">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
            <div className="hidden lg:block">
              <DonateButton />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-between px-6 sm:px-10 lg:px-32 py-5 text-primary font-secondary relative">
        <div className="relative inline-block">
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
                className="absolute left-0 top-full mt-2 w-48 bg-white text-black rounded shadow-lg z-50 font-bold"
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white text-black shadow-inner px-6 pt-4 pb-8 space-y-4 font-bold text-base z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 text-primary font-secondary">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span>Who We Are</span>
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <div className="pl-4 mt-2 space-y-2">
                  <NavLink
                    to="/mission"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    Our Mission
                  </NavLink>
                  <NavLink
                    to="/history"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    History & Timeline
                  </NavLink>
                  <NavLink
                    to="/team"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    Our Team
                  </NavLink>
                </div>
              </details>
              <NavLink
                to="/what_we_do"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                What We Do
              </NavLink>
              <NavLink
                to="/partners"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                Partners
              </NavLink>
              <NavLink
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                Resources
              </NavLink>
              <NavLink
                to="/press"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                Press/Media
              </NavLink>
              <NavLink
                to="/ethical"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                Ethical Review
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                Contact Us
              </NavLink>
              <div className="pt-4">
                <DonateButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

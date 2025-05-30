import React from "react";
import Logo from "../assets/LOGO.png";
import DonateButton from "./DonateButton";

export default function Nav() {
  return (
    <div>
      <div className="flex flex-col gap-3 px-30 py-5">
        {/* Top section: Logo and Donate button */}
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
      <div className="flex items-center place-content-between px-30 py-5 text-white font-secondary p-2 bg-primary ">
        <a href="#who-we-are" className="">
          Who We Are
        </a>
        <a href="#what-we-do" className="">
          What We Do
        </a>
        <a href="#partners" className="">
          Partners
        </a>
        <a href="#resources" className="">
          Resources
        </a>
        <a href="#press" className="">
          Press/Media
        </a>
        <a href="#ethics" className="">
          Ethical Review
        </a>
        <a href="#contact" className="">
          Contact Us
        </a>
      </div>
    </div>
  );
}

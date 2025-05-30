import React from "react";
import Logo from "../assets/LOGO.png";
import DonateButton from "./DonateButton";
export default function Nav() {
  return (
    <div className="flex place-content-between items-center px-20 py-5">
      <div className="flex text-primary items-center">
        <img src={Logo} />
        <div className="">
          <h1 className="font-semibold text-4xl font-secondary">
            Nepal Netra Jyoti Sangh
          </h1>
          <p className="text-l"> National Society for Comprehensive Eye Care</p>
        </div>
      </div>
      <div>
        <DonateButton />
      </div>
    </div>
  );
}

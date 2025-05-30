import React from "react";
import donate from "../assets/donate.jpg";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Donate() {
  return (
    <div>
      <Nav />
      <div className="relative w-full h-[450px]">
        <img
          src={donate}
          alt="Donate Us"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold font-secondary">
            Donate
          </h1>
        </div>
      </div>
     
     
      <Footer />
    </div>
  )
}

import React from "react";
import DonateButton from "./DonateButton";
import Logo from "../assets/LOGO.png";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0A142F] text-white ">
      <div className="text-center space-y-10">
        <h1 className="text-3xl font-secondary mb-4">तमसोमा ज्योतिर्गमय</h1>
        <DonateButton />
        <div className="flex justify-center mt-8 space-x-40 text-left font-primary">
          <div className="space-y-3">
            <p className="font-bold mb-2">QUICK LINKS</p>
            <div className="space-y-1">
              <p>Home</p>
              <p>Who Are We</p>
              <p>Resources</p>
              <p>Press & Media</p>
              <p>Careers</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold mb-2">WHAT WE DO</p>
            <div className="space-y-1">
              <p>Home</p>
              <p>Who Are We</p>
              <p>What We Do</p>
              <p>Press & Media</p>
              <p>Careers</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold mb-2">EMPLOYEE</p>
            <div className="space-y-1">
              <p>Attendance</p>
              <p>Register Online</p>
              <p>Report</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold mb-2">TALK TO US</p>
            <div className="space-y-1 ">
              <p>nnjs@mos.com.np</p>
              <p>Contact Us</p>
              <p>Facebook</p>
              <p>LinkedIn</p>
              <p>Twitter</p>
            </div>
          </div>
        </div>
        <div className="border "></div>
        <div className="flex items-center justify-between">
          <img src={Logo} />
          <p>© 2025 NNJS. All Rights Reserved. </p>
          <div className="flex space-x-5 text-3xl">
            <FaFacebook />
            <FaLinkedin />
            <RiTwitterXLine />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import DonateButton from "./DonateButton";
import Logo from "../assets/LOGO.png";
import { FaFacebook, FaYoutube, FaGoogle } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col h-screen  justify-center items-center bg-[#0A142F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <h1 className="text-3xl font-secondary">तमसोमा ज्योतिर्गमय</h1>
          <DonateButton aria-label="Donate to support our cause" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-8">
            <div>
              <h2 className="font-bold mb-2 text-lg" id="quick-links-heading">
                QUICK LINKS
              </h2>
              <ul aria-labelledby="quick-links-heading" className="space-y-1">
                <li>
                  <a href="/" aria-label="Go to Home page">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/who-are-we"
                    aria-label="Learn more about Who We Are"
                  >
                    Who Are We
                  </a>
                </li>
                <li>
                  <a href="/resources" aria-label="Access our Resources">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="/press-media" aria-label="View Press and Media">
                    Press & Media
                  </a>
                </li>
                <li>
                  <a href="/careers" aria-label="Explore Career opportunities">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold mb-2 text-lg" id="what-we-do-heading">
                WHAT WE DO
              </h2>
              <ul aria-labelledby="what-we-do-heading" className="space-y-1">
                <li>
                  <a href="/" aria-label="Go to Home page">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/who-are-we"
                    aria-label="Learn more about Who We Are"
                  >
                    Who Are We
                  </a>
                </li>
                <li>
                  <a
                    href="/what-we-do"
                    aria-label="Learn more about What We Do"
                  >
                    What We Do
                  </a>
                </li>
                <li>
                  <a href="/press-media" aria-label="View Press and Media">
                    Press & Media
                  </a>
                </li>
                <li>
                  <a href="/careers" aria-label="Explore Career opportunities">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold mb-2 text-lg" id="employee-heading">
                EMPLOYEE
              </h2>
              <ul aria-labelledby="employee-heading" className="space-y-1">
                <li>
                  <a href="/attendance" aria-label="Access Attendance system">
                    Attendance
                  </a>
                </li>
                <li>
                  <a href="/register-online" aria-label="Register Online">
                    Register Online
                  </a>
                </li>
                <li>
                  <a href="/report" aria-label="View Employee Reports">
                    Report
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold mb-2 text-lg" id="talk-to-us-heading">
                TALK TO US
              </h2>
              <ul aria-labelledby="talk-to-us-heading" className="space-y-1">
                <li>
                  <a
                    href="mailto:nnjs@mos.com.np"
                    aria-label="Email us at nnjs@mos.com.np"
                  >
                    nnjs@mos.com.np
                  </a>
                </li>
                <li>
                  <a href="/contact-us" aria-label="Contact Us">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com"
                    aria-label="Visit our Facebook page"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com"
                    aria-label="Visit our LinkedIn page"
                  >
                    Youtube
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com"
                    aria-label="Visit our Twitter page"
                  >
                    Google
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 m-20"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-20">
            <img src={Logo} alt="NNJS Logo" className="h-12" />
            <p>© {new Date().getFullYear()} NNJS. All Rights Reserved.</p>
            <div className="flex space-x-5 text-3xl">
              <a
                href="https://www.facebook.com"
                aria-label="Visit our Facebook page"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com"
                aria-label="Visit our YouTube channel"
              >
                <FaYoutube />
              </a>
              <a href="https://www.google.com" aria-label="Visit Google">
                <FaGoogle />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

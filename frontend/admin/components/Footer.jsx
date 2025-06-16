import React from "react";
import DonateButton from "./DonateButton";
import Logo from "../../src/assets/LOGO.png";
import { FaFacebook, FaYoutube, FaGoogle, FaMap } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col min-h-[500px] md:min-h-[600px] justify-center items-center bg-[#0A142F] text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 md:space-y-8">
          <h1 className="text-2xl md:text-3xl font-secondary">
            तमसोमा ज्योतिर्गमय
          </h1>
          <DonateButton aria-label="Donate to support our cause" />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-6 md:mt-8 text-sm md:text-base">
            <div>
              <h2
                className="font-bold mb-2 text-base md:text-lg"
                id="quick-links-heading"
              >
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
              <h2
                className="font-bold mb-2 text-base md:text-lg"
                id="what-we-do-heading"
              >
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
              <h2
                className="font-bold mb-2 text-base md:text-lg"
                id="employee-heading"
              >
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
              <h2
                className="font-bold mb-2 text-base md:text-lg"
                id="talk-to-us-heading"
              >
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
                    href="https://www.facebook.com/profile.php?id=100064789866065#"
                    aria-label="Visit our Facebook page"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UC4850z46i9u0mvs8SnWIEqQ/featured"
                    aria-label="Visit our Youtube"
                  >
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 my-8 md:my-16"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2 md:px-16">
            <img
              src={Logo}
              alt="NNJS Logo"
              className="h-10 md:h-12 mb-4 md:mb-0"
            />
            <p className="text-sm md:text-base">
              © {new Date().getFullYear()} NNJS. All Rights Reserved.
            </p>
            <div className="flex space-x-5 text-2xl md:text-3xl mt-4 md:mt-0">
              <a
                href="https://www.facebook.com/profile.php?id=100064789866065#"
                aria-label="Visit our Facebook page"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com/channel/UC4850z46i9u0mvs8SnWIEqQ/featured"
                aria-label="Visit our YouTube channel"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.google.com/maps/contrib/105016702714475758470/place/ChIJQ3PYtrIZ6zkRSxExsBQobC0/@27.692357,85.314105,15z?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D"
                aria-label="Visit Maps"
              >
                <FaMap />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

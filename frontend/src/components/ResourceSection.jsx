import React, { useState, useEffect } from "react";
import {FileText } from "lucide-react";
import axios from "axios";
import Loading from "./Loading";
import { GoDownload } from "react-icons/go";

const categories = [
  {
    group: "Notices & Reports",
    includes: ["Notice & Reports"],
    stateKey: "notices",
  },
  {
    group: "Guidelines & Protocols",
    includes: ["Guidelines & Protocols"],
    stateKey: "guidelines",
  },
  {
    group: "Media & Bulletins",
    includes: ["Media & Bulletins"],
    stateKey: "media",
  },
  {
    group: "Publications",
    includes: ["Publications"],
    stateKey: "publications",
  },
  {
    group: "CMEs & Conference",
    includes: ["CMEs & Conference"],
    stateKey: "cmes",
  },
  {
    group: "RAAB Survey",
    includes: ["RAAB Survey"],
    stateKey: "raab",
  },
];

const ResourcesSection = () => {
  const [activeGroup, setActiveGroup] = useState("Notices & Reports");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [media, setMedia] = useState([]);
  const [publications, setPublications] = useState([]);
  const [cmes, setCMEs] = useState([]);
  const [raab, setRAAB] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL; // Define api here

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/resource`);
        console.log(res.data);
        if (res.status === 200) {
          setNotices(res.data.notice || []);
          setGuidelines(res.data.guidelines || []);
          setMedia(res.data.media || []);
          setPublications(res.data.publications || []);
          setCMEs(res.data.cmes || []);
          setRAAB(res.data.raab || []);
          setLoading(false);
        } else {
          console.error("Error fetching page: Status code", res.status);
          setLoading(false); // Ensure loading is set to false even on error
        }
      } catch (error) {
        console.error("Error fetching page:", error);
        setLoading(false); // Ensure loading is set to false even on error
      }
    };

    fetchResource();
  }, [api]);

  // Determine which state array corresponds to the active category.
  const activeCategoryData = (() => {
    const activeCategoryObject = categories.find(
      (cat) => cat.group === activeGroup
    );
    if (!activeCategoryObject) return [];

    switch (activeCategoryObject.stateKey) {
      case "notices":
        return notices;
      case "guidelines":
        return guidelines;
      case "media":
        return media;
      case "publications":
        return publications;
      case "cmes":
        return cmes;
      case "raab":
        return raab;
      default:
        return [];
    }
  })();

  // Function to handle category selection and close dropdown on mobile
  const handleCategorySelect = (group) => {
    setActiveGroup(group);
    setMenuOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 mt-1 mx-auto">
      {/* Mobile view - Dropdown for categories */}
      <div className="md:hidden pt-8">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-left"
        >
          <span className="font-secondary font-semibold text-primary">
            {activeGroup}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              menuOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {categories.map(({ group }) => (
              <button
                key={group}
                onClick={() => handleCategorySelect(group)}
                className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                  activeGroup === group ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop view - Tabs for categories */}
      <div className="hidden md:flex md:flex-wrap gap-20 border-b border-gray-300 mb-4 justify-evenly">
        {categories.map(({ group }) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`py-3 md:py-6 text-xs md:text-sm border-b-2 transition font-secondary font-semibold ${
              activeGroup === group
                ? "text-blue-600 border-blue-600 pb-[11px]"
                : "text-gray-700 border-transparent hover:text-blue-600 pb-3"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 mb-6 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 sm:p-4 md:p-8">
        {activeCategoryData && activeCategoryData.length > 0 ? (
          activeCategoryData.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md md:shadow-lg rounded-xl p-4 md:p-5 hover:shadow-xl transition h-autoflex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <FileText className="w-5 h-5 md:w-7 md:h-7 text-blue-500 flex-shrink-0" />
                  <h3 className="text-base md:text-lg font-semibold text-primary font-secondary ">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-primary  leading-relaxed">
                  {item.body}
                </p>
              </div>

              {item.link && (
                <a
                  href={`${item.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs md:text-sm font-primary flex items-center hover:underline mt-2 md:mt-4"
                >
                  Visit Resource
                </a>
              )}
              {item.file && (
                <a
                  href={`${api}/files/${item.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs md:text-sm font-primary flex items-center hover:underline mt-2 md:mt-4"
                >
                  <GoDownload className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Download Resource
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-8">
            No resources available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResourcesSection;

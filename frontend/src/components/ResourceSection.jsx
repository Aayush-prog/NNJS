import React, { useState } from "react";
import { Download, FileText } from "lucide-react"; // File icon

const categories = [
  {
    group: "Notices & Reports",
    includes: ["Notice Board", "Activity Report", "Workshop Report"],
  },
  { group: "Guidelines & Protocols", includes: ["Protocol", "NNJS Bidhan"] },
  { group: "Media & Bulletins", includes: ["NNJS in Media", "Bulletins"] },
  { group: "Publications", includes: ["Publication"] },
];

const data = [
  {
    id: 1,
    category: "Workshop Report",
    title: "Eye Health Workshop 2023",
    description: "Detailed report from Kathmandu event on eye care strategies.",
    fileUrl:
      "https://www.nnjs.org.np/files/resources/1617622336.NNJS's%2043th%20annual%20day.pdf",
  },
  {
    id: 2,
    category: "Notice Board",
    title: "Annual General Meeting Notice",
    description: "Invitation to the annual general meeting of NNJS members.",
    fileUrl: "/pdfs/agm-notice.pdf",
  },
  {
    id: 3,
    category: "Bulletins",
    title: "NNJS Bulletin - Q1 2024",
    description: "Quarterly highlights, updates, and achievements.",
    fileUrl: "/pdfs/bulletin-q1-2024.pdf",
  },
  {
    id: 4,
    category: "Publication",
    title: "Eye Care Awareness Booklet",
    description: "Educational material on preventive eye care practices.",
    fileUrl: "/pdfs/eye-care-booklet.pdf",
  },
];

const ResourcesSection = () => {
  const [activeGroup, setActiveGroup] = useState("Notices & Reports");
  const [menuOpen, setMenuOpen] = useState(false);

  const activeCategories =
    categories.find((cat) => cat.group === activeGroup)?.includes || [];

  const filteredResources = data.filter((item) =>
    activeCategories.includes(item.category)
  );

  // Function to handle category selection and close dropdown on mobile
  const handleCategorySelect = (group) => {
    setActiveGroup(group);
    setMenuOpen(false);
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 mt-1 mx-auto">
      {/* Mobile view - Dropdown for categories */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-left"
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
      <div className="hidden md:grid md:grid-cols-4 border-b border-gray-300 text-center items-center mb-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 sm:p-4 md:p-8">
        {filteredResources.length > 0 ? (
          filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md md:shadow-lg rounded-xl p-4 md:p-5 hover:shadow-xl transition h-auto md:h-[150px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <FileText className="w-5 h-5 md:w-7 md:h-7 text-blue-500 flex-shrink-0" />
                  <h3 className="text-base md:text-lg font-semibold text-primary font-secondary line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-primary line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs md:text-sm font-primary flex items-center hover:underline mt-2 md:mt-4"
                >
                  <Download className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Download PDF
                </a>
              </div>
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

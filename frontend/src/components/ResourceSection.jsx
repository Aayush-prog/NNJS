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

  const activeCategories =
    categories.find((cat) => cat.group === activeGroup)?.includes || [];

  const filteredResources = data.filter((item) =>
    activeCategories.includes(item.category)
  );

  return (
    <div className="px-24 mt-1 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-300 text-center items-center mb-4">
        {categories.map(({ group }) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`py-6 text-sm border-b-2 transition font-secondary font-semibold ${
              activeGroup === group
                ? "text-blue-600 border-blue-600 pb-[11px]"
                : "text-gray-700 border-transparent hover:text-blue-600 pb-3"
            }${activeGroup === group ? "pb-[11px]" : "pb-3"}`}
            // style={{ marginBottom: activeGroup === group ? "-3px" : "0" }}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {filteredResources.length > 0 ? (
          filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition h-[150px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-7 h-7 text-blue-500" />
                  <h3 className="text-lg font-semibold text-primary font-secondary">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 font-primary line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-primary flex items-center hover:underline mt-4"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No resources available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResourcesSection;

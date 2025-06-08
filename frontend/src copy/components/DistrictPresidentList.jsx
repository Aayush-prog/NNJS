import React, { useState } from "react";
import SortSelect from "./Sort";
import Pagination from "./Pagination";

// Dummy data for testing
const dummyPresidents = [
  {
    name: "Ram Bahadur Thapa",
    district: "Kathmandu",
    committee: "Central Committee",
    contact: "9801000001",
    profilePic: "",
    contactPerson: "Ramesh Shrestha",
  },
  {
    name: "Sita Devi Sharma",
    district: "Lalitpur",
    committee: "District Committee",
    contact: "9801000002",
    profilePic: "",
    contactPerson: "Sita Sharma",
  },
  {
    name: "Hari Prasad Koirala",
    district: "Bhaktapur",
    committee: "District Committee",
    contact: "9801000003",
    profilePic: "",
    contactPerson: "Hari Koirala",
  },
];

export default function DistrictPresidentList({ presidents = dummyPresidents }) {
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "district", label: "District" },
    { value: "committee", label: "Committee" },
    { value: "contact", label: "Contact" },
    { value: "contactPerson", label: "Contact Person" },
  ];

  const sortedPresidents = [...presidents].sort((a, b) =>
    (a[sortBy] || "").localeCompare(b[sortBy] || "")
  );

  const totalPages = Math.ceil(sortedPresidents.length / itemsPerPage);
  const paginatedPresidents = sortedPresidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* <h2 className="text-3xl font-bold text-center my-8">
        NNJS District Presidents List
      </h2> */}
      {/* <SortSelect options={sortOptions} value={sortBy} onChange={setSortBy} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedPresidents.map((president, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2 items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
              {president.profilePic ? (
                <img src={president.profilePic} alt={president.name} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                "Profile Pic"
              )}
            </div>
            <h2 className="text-lg font-bold text-blue-900">{president.name}</h2>
            <p className="text-gray-700"><span className="font-semibold">District:</span> {president.district}</p>
            <p className="text-gray-700"><span className="font-semibold">Committee:</span> {president.committee}</p>
            <p className="text-gray-700"><span className="font-semibold">Contact:</span> {president.contact}</p>
            <p className="text-gray-700"><span className="font-semibold">Contact Person:</span> {president.contactPerson}</p>
          </div>
        ))}
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      /> */}
    </div>
  );
}
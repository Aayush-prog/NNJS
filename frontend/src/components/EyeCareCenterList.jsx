// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import SortSelect from "./Sort";
// import Pagination from "./Pagination";

// // Dummy data for testing
// const dummyCenters = [
//   {
//     name: "Kathmandu Eye Care Center",
//     district: "Kathmandu",
//     contactPerson: "Dr. Suman Shrestha",
//     contactNumber: "01-5551234",
//   },
//   {
//     name: "Pokhara Vision Center",
//     district: "Kaski",
//     contactPerson: "Ms. Anju Gurung",
//     contactNumber: "061-467890",
//   },
//   {
//     name: "Biratnagar Eye Clinic",
//     district: "Morang",
//     contactPerson: "Dr. Rajesh Yadav",
//     contactNumber: "021-441122",
//   },
// ];

// export default function EyeCareCenterList({ centers = dummyCenters }) {
//   const [sortBy, setSortBy] = useState("name");
//   const [secondarySortBy, setSecondarySortBy] = useState("district"); // NEW
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;

//   const sortOptions = [
//     { value: "name", label: "Name" },
//     { value: "district", label: "District" },
//     { value: "contactPerson", label: "Contact Person" },
//     { value: "contactNumber", label: "Contact Number" },
//   ];

//   const sortedCenters = [...centers].sort((a, b) => {
//     const primary = (a[sortBy] || "").localeCompare(b[sortBy] || "");
//     if (primary !== 0) return primary;
//     return (a[secondarySortBy] || "").localeCompare(b[secondarySortBy] || "");
//   });
//   const totalPages = Math.ceil(sortedCenters.length / itemsPerPage);
//   const paginatedCenters = sortedCenters.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       {/* <h2 className="text-3xl font-bold text-center my-8">
//         List of Eye Care Centers in Nepal
//       </h2> */}
//       <div className="mb-6 flex gap-4">
//       {/* Primary Sort */}
//       {/* <SortSelect
//         options={sortOptions}
//         value={sortBy}
//         onChange={setSortBy}
//       /> */}
//       {/* Secondary Sort */}
//       {/* <SortSelect
//         options={sortOptions}
//         value={secondarySortBy}
//         onChange={setSecondarySortBy}
//       /> */}
//         </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {paginatedCenters.map((center, i) => (
//             <Link to={`/care/${i}`} key={i} className="block">
//               <div key={i} className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2">
//                 <h2 className="text-xl font-bold text-blue-900">{center.name}</h2>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">District:</span> {center.district}
//                 </p>
//                 {center.contactPerson && (
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Contact Person:</span> {center.contactPerson}
//                   </p>
//                 )}
//                 {center.contactNumber && (
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Contact Number:</span> {center.contactNumber}
//                   </p>
//                 )}
//               </div>
//             </Link>
//           ))}
//       </div>
//       {/* <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       /> */}
//     </div>
//   );
// }

// export { dummyCenters };
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import SortSelect from "./Sort";
// import Pagination from "./Pagination";

// // Dummy data for testing
// const dummyHospitals = [
//   {
//     name: "Tilganga Institute of Ophthalmology",
//     address: "Gaushala, Kathmandu",
//     phone: "01-4493775",
//     email: "info@tilganga.org",
//     website: "www.tilganga.org",
//     images: "https://static.vecteezy.com/system/resources/thumbnails/036/372/442/small_2x/hospital-building-with-ambulance-emergency-car-on-cityscape-background-cartoon-illustration-vector.jpg",
//   },
//   {
//     name: "Lumbini Eye Institute",
//     address: "Bhairahawa, Rupandehi",
//     phone: "071-522921",
//     email: "contact@lumbinieye.com",
//     website: "lumbinieye.com",
//     images: "https://static.vecteezy.com/system/resources/thumbnails/036/372/442/small_2x/hospital-building-with-ambulance-emergency-car-on-cityscape-background-cartoon-illustration-vector.jpg",
//   },
//   {
//     name: "Sagarmatha Choudhary Eye Hospital",
//     address: "Lahan, Siraha",
//     phone: "033-560187",
//     email: "info@sceh.org.np",
//     website: "http://www.sceh.org.np",
//     images: "https://static.vecteezy.com/system/resources/thumbnails/036/372/442/small_2x/hospital-building-with-ambulance-emergency-car-on-cityscape-background-cartoon-illustration-vector.jpg",
//   },
// ];

// // export { dummyHospitals }; // export dummy data for detail pages

// export default function EyeHospitalList({ hospitals = dummyHospitals }) {
//   const [sortBy, setSortBy] = useState("name");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState(""); // <-- Add search state
//   const itemsPerPage = 3;

//   const sortOptions = [
//     { value: "name", label: "Name" },
//     { value: "address", label: "Address" },
//     { value: "phone", label: "Phone" },
//     { value: "email", label: "Email" },
//     { value: "website", label: "Website" },
//   ];

//   // Filter hospitals by search
//   const filteredHospitals = hospitals.filter((h) =>
//     h.name.toLowerCase().includes(search.toLowerCase()) ||
//     h.address.toLowerCase().includes(search.toLowerCase())
//   );

//   const sortedHospitals = [...filteredHospitals].sort((a, b) =>
//     (a[sortBy] || "").localeCompare(b[sortBy] || "")
//   );
//   const totalPages = Math.ceil(sortedHospitals.length / itemsPerPage);
//   const paginatedHospitals = sortedHospitals.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       {/* Search Bar */}
//       <div className="mb-6 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search hospitals by name..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1); // Reset to first page on search
//           }}
//           className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       {/* <h2 className="text-3xl font-bold text-center my-8">
//         List of Eye Hospitals in Nepal
//       </h2> */}
//       {/* <SortSelect options={sortOptions} value={sortBy} onChange={setSortBy} /> */}
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {paginatedHospitals.map((h, i) => (
//             <Link to={`/hospital/${i}`} key={i} className="block">
//               <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2">
//                 <h2 className="text-xl font-bold text-blue-900">{h.name}</h2>
//                 {h.address && <p className="text-gray-700"><span className="font-semibold">Address:</span> {h.address}</p>}
//                 {h.phone && <p className="text-gray-700"><span className="font-semibold">Phone:</span> {h.phone}</p>}
//                 {h.email && <p className="text-gray-700"><span className="font-semibold">Email:</span> <a href={`mailto:${h.email}`} className="text-blue-600 underline">{h.email}</a></p>}
//                 {h.website && <p className="text-gray-700"><span className="font-semibold">Website:</span> <a href={h.website.startsWith('http') ? h.website : `http://${h.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{h.website}</a></p>}
//                 {h.images && (
//                   <div className="mt-4">
//                     <img src={h.images} alt={h.name} className="w-full h-48 object-cover rounded-lg" />
//                   </div>
//                 )}
//               </div>
//             </Link>
//           ))}
//         </div>
//         {/* <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         /> */}
//       </div>
//     </div>
//   );
// }
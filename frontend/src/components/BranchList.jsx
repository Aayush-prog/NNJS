// import React from "react";
// import { Link } from "react-router-dom";

// // Dummy data for testing
// const dummyBranches = [
//   {
//     district: "Kathmandu",
//     contactPerson: "Ramesh Shrestha",
//     committee: "Central Committee",
//   },
//   {
//     district: "Lalitpur",
//     contactPerson: "Sita Sharma",
//     committee: "District Committee",
//   },
//   {
//     district: "Bhaktapur",
//     contactPerson: "Hari Koirala",
//     committee: "District Committee",
//   },
// ];

// export { dummyBranches };

// export default function BranchList({ branches = dummyBranches }) {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold text-center my-8">NNJS Branches</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {branches.map((branch, i) => (
//           <Link to={`/branch/${i}`} key={i} className="block">
//             <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2">
//               <p className="text-gray-700">
//                 <span className="font-semibold">District:</span> {branch.district}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Contact Person:</span>{" "}
//                 {branch.contactPerson}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Committee:</span> {branch.committee}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
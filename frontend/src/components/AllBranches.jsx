import React, { useState } from "react";
import SortSelect from "./Sort";
import Pagination from "./Pagination";

// Dummy data for hospitals
const dummyHospitals = [
  {
    name: "Tilganga Institute of Ophthalmology",
    address: "Gaushala, Kathmandu",
    phone: "01-4493775",
    email: "info@tilganga.org",
    website: "www.tilganga.org",
    images: "https://static.vecteezy.com/system/resources/thumbnails/036/372/442/small_2x/hospital-building-with-ambulance-emergency-car-on-cityscape-background-cartoon-illustration-vector.jpg",
  },
  {
    name: "Lumbini Eye Institute",
    address: "Bhairahawa, Rupandehi",
    phone: "071-522921",
    email: "contact@lumbinieye.com",
    website: "lumbinieye.com",
    images: "https://static.vecteezy.com/system/resources/thumbnails/036/372/442/small_2x/hospital-building-with-ambulance-emergency-car-on-cityscape-background-cartoon-illustration-vector.jpg",
  },
  {
    name: "Sagarmatha Choudhary Eye Hospital",
    address: "Lahan, Siraha",
    phone: "033-560187",
    email: "info@sceh.org.np",
    website: "http://www.sceh.org.np",
    images: "https://static.vecteezy.com/system/resources/thumbnails/036/372/442/small_2x/hospital-building-with-ambulance-emergency-car-on-cityscape-background-cartoon-illustration-vector.jpg",
  },
];

// Dummy data for eye care centers
const dummyCenters = [
  {
    name: "Kathmandu Eye Care Center",
    district: "Kathmandu",
    contactPerson: "Dr. Suman Shrestha",
    contactNumber: "01-5551234",
  },
  {
    name: "Pokhara Vision Center",
    district: "Kaski",
    contactPerson: "Ms. Anju Gurung",
    contactNumber: "061-467890",
  },
  {
    name: "Biratnagar Eye Clinic",
    district: "Morang",
    contactPerson: "Dr. Rajesh Yadav",
    contactNumber: "021-441122",
  },
];

// Dummy data for presidents
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

// Improved sort function that handles different data types
const sortByProperty = (array, property, direction = 'asc') => {
  return [...array].sort((a, b) => {
    // Handle missing values
    const valueA = a[property] === undefined ? '' : a[property];
    const valueB = b[property] === undefined ? '' : b[property];
    
    // Sort by number if both values are numeric
    if (!isNaN(valueA) && !isNaN(valueB)) {
      return direction === 'asc' 
        ? Number(valueA) - Number(valueB) 
        : Number(valueB) - Number(valueA);
    }
    
    // Otherwise sort alphabetically (case-insensitive)
    const compResult = String(valueA).localeCompare(String(valueB), undefined, {
      sensitivity: 'base', // case-insensitive
      numeric: true // enables natural sorting for strings with numbers
    });
    
    return direction === 'asc' ? compResult : -compResult;
  });
};

// Multi-criteria sort function
const multiSort = (array, sortCriteria) => {
  return [...array].sort((a, b) => {
    for (const { property, direction } of sortCriteria) {
      const valueA = a[property] === undefined ? '' : a[property];
      const valueB = b[property] === undefined ? '' : b[property];
      
      // Sort by number if both values are numeric
      if (!isNaN(valueA) && !isNaN(valueB)) {
        const numResult = direction === 'asc' 
          ? Number(valueA) - Number(valueB) 
          : Number(valueB) - Number(valueA);
        if (numResult !== 0) return numResult;
      } else {
        // Otherwise sort alphabetically (case-insensitive)
        const compResult = String(valueA).localeCompare(String(valueB), undefined, {
          sensitivity: 'base',
          numeric: true
        });
        
        const result = direction === 'asc' ? compResult : -compResult;
        if (result !== 0) return result;
      }
    }
    return 0;
  });
};

export default function NNJSCombinedList({
  hospitals = dummyHospitals,
  centers = dummyCenters,
  presidents = dummyPresidents,
}) {
  // Hospital/Eye Center search and sort
  const [search, setSearch] = useState("");
  // Add a list of common keywords
  const keywordOptions = [
    "Eye Hospital",
    "Eye Center",
    "President List",
  ];
  const [hospitalSortBy, setHospitalSortBy] = useState("name");
  const [hospitalPage, setHospitalPage] = useState(1);
  const [centerSortBy, setCenterSortBy] = useState("name");
  const [centerSecondarySortBy, setCenterSecondarySortBy] = useState("district");
  const [centerPage, setCenterPage] = useState(1);
  const [presidentSortBy, setPresidentSortBy] = useState("name");
  const [presidentPage, setPresidentPage] = useState(1);

  const itemsPerPage = 3;

  // Multi-keyword search logic for hospitals
  const hospitalKeywords = search.toLowerCase().split(" ").filter((kw) => kw.trim() !== "");
  const filteredHospitals = hospitals.filter((h) =>
    hospitalKeywords.every(
      (kw) =>
        (h.name && h.name.toLowerCase().includes(kw)) ||
        (h.address && h.address.toLowerCase().includes(kw)) ||
        (h.phone && h.phone.toLowerCase().includes(kw)) ||
        (h.email && h.email.toLowerCase().includes(kw)) ||
        (h.website && h.website.toLowerCase().includes(kw))
    )
  );
  const sortedHospitals = [...filteredHospitals].sort((a, b) =>
    (a[hospitalSortBy] || "").localeCompare(b[hospitalSortBy] || "")
  );
  const hospitalTotalPages = Math.ceil(sortedHospitals.length / itemsPerPage);
  const paginatedHospitals = sortedHospitals.slice(
    (hospitalPage - 1) * itemsPerPage,
    hospitalPage * itemsPerPage
  );

  // Multi-keyword search logic for centers
  const filteredCenters = centers.filter((c) =>
    hospitalKeywords.every(
      (kw) =>
        (c.name && c.name.toLowerCase().includes(kw)) ||
        (c.district && c.district.toLowerCase().includes(kw)) ||
        (c.contactPerson && c.contactPerson.toLowerCase().includes(kw)) ||
        (c.contactNumber && c.contactNumber.toLowerCase().includes(kw))
    )
  );
  const sortedCenters = [...filteredCenters].sort((a, b) => {
    const primary = (a[centerSortBy] || "").localeCompare(b[centerSortBy] || "");
    if (primary !== 0) return primary;
    return (a[centerSecondarySortBy] || "").localeCompare(b[centerSecondarySortBy] || "");
  });
  const centerTotalPages = Math.ceil(sortedCenters.length / itemsPerPage);
  const paginatedCenters = sortedCenters.slice(
    (centerPage - 1) * itemsPerPage,
    centerPage * itemsPerPage
  );

  // President list (now with search, sort/paginate)
  const filteredPresidents = presidents.filter((p) =>
    hospitalKeywords.every(
      (kw) =>
        (p.name && p.name.toLowerCase().includes(kw)) ||
        (p.district && p.district.toLowerCase().includes(kw)) ||
        (p.committee && p.committee.toLowerCase().includes(kw)) ||
        (p.contact && p.contact.toLowerCase().includes(kw)) ||
        (p.contactPerson && p.contactPerson.toLowerCase().includes(kw))
    )
  );
  const sortedPresidents = [...filteredPresidents].sort((a, b) =>
    (a[presidentSortBy] || "").localeCompare(b[presidentSortBy] || "")
  );
  const presidentTotalPages = Math.ceil(sortedPresidents.length / itemsPerPage);
  const paginatedPresidents = sortedPresidents.slice(
    (presidentPage - 1) * itemsPerPage,
    presidentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Hospital/Eye Center Search Bar and Keyword Selector */}
      <div className="mb-6 flex justify-center gap-2">
        <input
          type="text"
          placeholder="Search hospitals or centers (e.g. 'eye Kathmandu')"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setHospitalPage(1);
            setCenterPage(1);
          }}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          className="border border-gray-300 rounded px-2 py-2 bg-white"
          defaultValue=""
          onChange={e => {
            if (e.target.value) {
              setSearch(prev => prev ? prev + " " + e.target.value : e.target.value);
              setHospitalPage(1);
              setCenterPage(1);
              e.target.value = "";
            }
          }}
        >
          <option value="" disabled>Add keyword</option>
          {keywordOptions.map((kw, idx) => (
            <option key={idx} value={kw}>{kw}</option>
          ))}
        </select>
      </div>

      {/* Hospitals Section */}
      <section>
        {/* <h2 className="text-2xl font-bold mb-4">Eye Hospitals</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedHospitals.map((h, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2">
                {h.images && (
                <div className="mt-">
                  <img src={h.images} alt={h.name} className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
              <h2 className="text-xl font-bold text-blue-900">{h.name}</h2>
              {h.address && <p className="text-gray-700"><span className="font-semibold">Address:</span> {h.address}</p>}
              {h.phone && <p className="text-gray-700"><span className="font-semibold">Phone:</span> {h.phone}</p>}
              {h.email && <p className="text-gray-700"><span className="font-semibold">Email:</span> <a href={`mailto:${h.email}`} className="text-blue-600 underline">{h.email}</a></p>}
              {h.website && <p className="text-gray-700"><span className="font-semibold">Website:</span> <a href={h.website.startsWith('http') ? h.website : `http://${h.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{h.website}</a></p>}
              
            </div>
          ))}
        </div>
        {/* <Pagination
          currentPage={hospitalPage}
          totalPages={hospitalTotalPages}
          onPageChange={setHospitalPage}
        /> */}
      </section>

      {/* Eye Care Centers Section */}
      <section>
        {/* <h2 className="text-2xl font-bold mb-4">Eye Care Centers</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedCenters.map((center, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2">
              <h2 className="text-xl font-bold text-blue-900">{center.name}</h2>
              <p className="text-gray-700">
                <span className="font-semibold">District:</span> {center.district}
              </p>
              {center.contactPerson && (
                <p className="text-gray-700">
                  <span className="font-semibold">Contact Person:</span> {center.contactPerson}
                </p>
              )}
              {center.contactNumber && (
                <p className="text-gray-700">
                  <span className="font-semibold">Contact Number:</span> {center.contactNumber}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* <Pagination
          currentPage={centerPage}
          totalPages={centerTotalPages}
          onPageChange={setCenterPage}
        /> */}
      </section>

      {/* District Presidents Section */}
      <section>
        {/* <h2 className="text-2xl font-bold mb-4">District Presidents</h2> */}
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
          currentPage={presidentPage}
          totalPages={presidentTotalPages}
          onPageChange={setPresidentPage}
        /> */}
      </section>
    </div>
  );
}
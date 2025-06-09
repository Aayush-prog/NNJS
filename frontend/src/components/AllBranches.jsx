import React, { useState } from "react";
import SortSelect from "./Sort";
import Pagination from "./Pagination";
import { motion } from "framer-motion";

// Define the fadeInUp animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
   {
    name: "Ram Bahadur Thapa",
    district: "Kathmandu",
    committee: "Central Committee",
    contact: "9801000001",
    profilePic: "",
    contactPerson: "Ramesh Shrestha",
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
  
  // Replace keywords with category filter
  const [activeCategory, setActiveCategory] = useState("all"); // "all", "hospitals", "centers", "presidents"
  
  const [hospitalSortBy, setHospitalSortBy] = useState("name");
  const [hospitalSortDirection, setHospitalSortDirection] = useState("asc");
  const [hospitalPage, setHospitalPage] = useState(1);
  
  const [centerSortBy, setCenterSortBy] = useState("name");
  const [centerSortDirection, setCenterSortDirection] = useState("asc");
  const [centerPage, setCenterPage] = useState(1);
  
  const [presidentSortBy, setPresidentSortBy] = useState("name");
  const [presidentSortDirection, setPresidentSortDirection] = useState("asc");
  const [presidentPage, setPresidentPage] = useState(1);

  const itemsPerPage = 3;

  // Search and filter logic
  const searchKeywords = search.toLowerCase().split(" ").filter((kw) => kw.trim() !== "");
  
  // Hospital filtering and sorting
  const filteredHospitals = hospitals.filter((h) =>
    searchKeywords.every(
      (kw) =>
        (h.name && h.name.toLowerCase().includes(kw)) ||
        (h.address && h.address.toLowerCase().includes(kw)) ||
        (h.phone && h.phone.toLowerCase().includes(kw)) ||
        (h.email && h.email.toLowerCase().includes(kw)) ||
        (h.website && h.website.toLowerCase().includes(kw))
    )
  );
  
  const sortedHospitals = sortByProperty(filteredHospitals, hospitalSortBy, hospitalSortDirection);
  const hospitalTotalPages = Math.ceil(sortedHospitals.length / itemsPerPage);
  const paginatedHospitals = sortedHospitals.slice(
    (hospitalPage - 1) * itemsPerPage,
    hospitalPage * itemsPerPage
  );

  // Centers filtering and sorting
  const filteredCenters = centers.filter((c) =>
    searchKeywords.every(
      (kw) =>
        (c.name && c.name.toLowerCase().includes(kw)) ||
        (c.district && c.district.toLowerCase().includes(kw)) ||
        (c.contactPerson && c.contactPerson.toLowerCase().includes(kw)) ||
        (c.contactNumber && c.contactNumber.toLowerCase().includes(kw))
    )
  );
  
  const sortedCenters = sortByProperty(filteredCenters, centerSortBy, centerSortDirection);
  const centerTotalPages = Math.ceil(sortedCenters.length / itemsPerPage);
  const paginatedCenters = sortedCenters.slice(
    (centerPage - 1) * itemsPerPage,
    centerPage * itemsPerPage
  );

  // Presidents filtering and sorting
  const filteredPresidents = presidents.filter((p) =>
    searchKeywords.every(
      (kw) =>
        (p.name && p.name.toLowerCase().includes(kw)) ||
        (p.district && p.district.toLowerCase().includes(kw)) ||
        (p.committee && p.committee.toLowerCase().includes(kw)) ||
        (p.contact && p.contact.toLowerCase().includes(kw)) ||
        (p.contactPerson && p.contactPerson.toLowerCase().includes(kw))
    )
  );
  
  const sortedPresidents = sortByProperty(filteredPresidents, presidentSortBy, presidentSortDirection);
  const presidentTotalPages = Math.ceil(sortedPresidents.length / itemsPerPage);
  const paginatedPresidents = sortedPresidents.slice(
    (presidentPage - 1) * itemsPerPage,
    presidentPage * itemsPerPage
  );

  // Sort options for each category
  const hospitalSortOptions = [
    { label: "Name", value: "name" },
    { label: "Address", value: "address" },
  ];
  
  const centerSortOptions = [
    { label: "Name", value: "name" },
    { label: "District", value: "district" },
    { label: "Contact Person", value: "contactPerson" },
  ];
  
  const presidentSortOptions = [
    { label: "Name", value: "name" },
    { label: "District", value: "district" },
    { label: "Committee", value: "committee" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 font-primary">
      {/* Category Filter and Search/Sort Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-full max-w-2xl mx-auto bg-white p-5 rounded-2xl shadow-lg space-y-5">
          
          {/*** 1. SCROLLING CATEGORY FILTER ***/}
          <div className="relative">
            <div className="overflow-x-auto pb-1 hide-scrollbar pr-12">
              <div className="flex flex-nowrap items-center gap-3 font-primary">
                {['all','hospitals','centers','presidents'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setHospitalPage(1);
                      setCenterPage(1);
                      setPresidentPage(1);
                    }}
                    className={`flex-shrink-0 px-5 py-2 text-sm font-secondary rounded-lg transition-colors duration-200 ${
                      activeCategory === category
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {{
                      all: 'All',
                      hospitals: 'Hospitals',
                      centers: 'Centers',
                      presidents: 'Branches'
                    }[category]}
                  </button>
                ))}
              </div>
            </div>
            {/* gradient fade */}
            <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white pointer-events-none" />
          </div>

          {/*** 2. SEARCH + SORT ***/}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Search */}
            <div className="relative md:flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHospitalPage(1);
                  setCenterPage(1);
                  setPresidentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-800
                           focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none shadow-sm font-primary"
              />
            </div>

            {/* Sort */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <span className="text-slate-700 font-secondary">Sort:</span>
              <select
                value={
                  activeCategory === 'centers'
                    ? centerSortBy
                    : activeCategory === 'presidents'
                      ? presidentSortBy
                      : hospitalSortBy
                }
                onChange={(e) => {
                  const v = e.target.value;
                  if (activeCategory === 'centers') setCenterSortBy(v);
                  else if (activeCategory === 'presidents') setPresidentSortBy(v);
                  else setHospitalSortBy(v);
                }}
                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800
                           focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                {(
                  activeCategory === 'centers'
                    ? centerSortOptions
                    : activeCategory === 'presidents'
                      ? presidentSortOptions
                      : hospitalSortOptions
                ).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  if (activeCategory === 'centers')
                    setCenterSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
                  else if (activeCategory === 'presidents')
                    setPresidentSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
                  else setHospitalSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
                }}
                className="flex-shrink-0 bg-white border border-slate-200 rounded-lg w-10 h-10
                           flex items-center justify-center text-slate-700 hover:bg-slate-50
                           focus:ring-2 focus:ring-sky-500 outline-none"
                aria-label="Toggle sort direction"
              >
                <span className="text-xl font-semibold leading-none align-middle">
                  {(
                    activeCategory === 'centers'
                      ? centerSortDirection
                      : activeCategory === 'presidents'
                        ? presidentSortDirection
                        : hospitalSortDirection
                  ) === 'asc'
                    ? '↑'
                    : '↓'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Conditional rendering based on active category */}
      {/* Hospitals Section */}
      {(activeCategory === 'all' || activeCategory === 'hospitals') && (
        <section>
          <h2 className="text-2xl font-bold mb-4 font-secondary">Eye Hospitals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedHospitals.length > 0 ? paginatedHospitals.map((h, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {h.images && (
                  <img
                    src={h.images}
                    alt={h.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-secondary text-primary">
                    {h.name}
                  </h3>
                  {h.address && (
                    <p className="text-sm text-gray-600 mb-3 font-primary">
                      {h.address}
                    </p>
                  )}
                  <div className="text-gray-700 mb-4 font-primary">
                    {h.phone && <p><span className="font-semibold">Phone:</span> {h.phone}</p>}
                    {h.email && <p><span className="font-semibold">Email:</span> {h.email}</p>}
                  </div>
                  {h.website && (
                    <a
                      className="text-primary font-secondary hover:text-accent transition-colors duration-colors inline-flex items-center"
                      href={h.website.startsWith('http') ? h.website : `http://${h.website}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visit Website <span className="ml-1">→</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No hospitals found</p>
              </div>
            )}
          </div>
          {sortedHospitals.length > itemsPerPage && (
            <Pagination
              currentPage={hospitalPage}
              totalPages={hospitalTotalPages}
              onPageChange={setHospitalPage}
            />
          )}
        </section>
      )}

      {/* Eye Care Centers Section */}
      {(activeCategory === 'all' || activeCategory === 'centers') && (
        <section>
          <h2 className="text-2xl font-bold mb-4 font-secondary">Eye Care Centers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedCenters.length > 0 ? paginatedCenters.map((center, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2"
              >
                <h2 className="text-xl font-bold text-blue-900 font-secondary">
                  {center.name}
                </h2>
                <p className="text-gray-700 font-primary">
                  <span className="font-semibold">District:</span> {center.district}
                </p>
                {center.contactPerson && (
                  <p className="text-gray-700 font-primary">
                    <span className="font-semibold">Contact Person:</span> {center.contactPerson}
                  </p>
                )}
                {center.contactNumber && (
                  <p className="text-gray-700 font-primary">
                    <span className="font-semibold">Contact Number:</span> {center.contactNumber}
                  </p>
                )}
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No eye care centers found</p>
              </div>
            )}
          </div>
          {sortedCenters.length > itemsPerPage && (
            <Pagination
              currentPage={centerPage}
              totalPages={centerTotalPages}
              onPageChange={setCenterPage}
            />
          )}
        </section>
      )}

      {/* District Presidents Section */}
      {(activeCategory === 'all' || activeCategory === 'presidents') && (
        <section>
          <h2 className="text-2xl font-bold mb-4 font-secondary">Branches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedPresidents.length > 0 ? paginatedPresidents.map((president, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2 items-center"
              >
                {/* <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                  {president.profilePic ? (
                    <img src={president.profilePic} alt={president.name} className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    "Profile Pic"
                  )}
                </div> */}
                <h2 className="text-xl font-bold text-blue-900 font-secondary">
                  {president.district}
                </h2>
                <p className="text-gray-700 font-primary"><span className="font-semibold">President:</span> {president.name}</p>
                <p className="text-gray-700 font-primary"><span className="font-semibold">Committee:</span> {president.committee}</p>
                <p className="text-gray-700 font-primary"><span className="font-semibold">Contact:</span> {president.contact}</p>
                <p className="text-gray-700 font-primary"><span className="font-semibold">Contact Person:</span> {president.contactPerson}</p>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No Branches found</p>
              </div>
            )}
          </div>
          {sortedPresidents.length > itemsPerPage && (
            <Pagination
              currentPage={presidentPage}
              totalPages={presidentTotalPages}
              onPageChange={setPresidentPage}
            />
          )}
        </section>
      )}
    </div>
  );
}
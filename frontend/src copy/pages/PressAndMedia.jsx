import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import DonateButton from "../components/DonateButton";
import Pagination from "../components/Pagination"; // Import Pagination component
import { motion } from "framer-motion";
import {
  FaArrowCircleUp,
  FaUserInjured,
  FaProcedures,
  FaHospital,
  FaEye,
  FaDownload,
  FaFilePdf,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import heroImage from "../assets/Landing frame.png";
import mapImage from "../assets/map.png";
import profileImage from "../assets/profile.png";
import CoreValues from "../components/CoreValues";

// Dummy data for press articles
const PRESS_ARTICLES = [
  {
    id: 1,
    headline: "NNJS Brings Hope to Local Communities",
    source: "Healthcare Daily",
    date: "May 15, 2025",
    summary:
      "A look into how NNJS is transforming healthcare access in underserved neighborhoods.",
    link: "#",
    image: profileImage,
  },
  {
    id: 2,
    headline: "New Surgical Initiative Helps Hundreds",
    source: "Medical Journal",
    date: "April 22, 2025",
    summary:
      "NNJS's latest initiative provides critical surgeries to those who cannot afford them.",
    link: "#",
    image: profileImage,
  },
  {
    id: 3,
    headline: "Healthcare Heroes: The Story of NNJS",
    source: "Community Health Magazine",
    date: "March 10, 2025",
    summary:
      "An in-depth look at the founding and impact of NNJS across the region.",
    link: "#",
    image: profileImage,
  },
  {
    id: 4,
    headline: "Volunteer Program Expands Medical Access",
    source: "Health Network News",
    date: "February 25, 2025",
    summary:
      "NNJS volunteer program recognized for outstanding community engagement and service.",
    link: "#",
    image: profileImage,
  },
   
];

// Dummy data for press releases
const PRESS_RELEASES = [
  {
    id: 1,
    title: "NNJS Announces New Partnership with Regional Hospitals",
    date: "June 1, 2025",
    pdfLink: "#",
    year: "2025",
  },
  {
    id: 2,
    title: "Annual Impact Report Shows 45% Increase in Patients Served",
    date: "May 5, 2025",
    pdfLink: "#",
    year: "2025",
  },
  {
    id: 3,
    title: "NNJS Expands Services to Three New Communities",
    date: "April 12, 2025",
    pdfLink: "#",
    year: "2025",
  },
  {
    id: 4,
    title: "End of Year Summary: Looking Back at Our Impact",
    date: "December 22, 2024",
    pdfLink: "#",
    year: "2024",
  },
  {
    id: 5,
    title: "New Medical Education Program Launches",
    date: "November 8, 2024",
    pdfLink: "#",
    year: "2024",
  },
  {
    id: 6,
    title: "NNJS Receives Excellence in Healthcare Award",
    date: "October 15, 2024",
    pdfLink: "#",
    year: "2024",
  },
   {
    id: 7,
    title: "End of Year Summary: Looking Back at Our Impact",
    date: "December 22, 2024",
    pdfLink: "#",
    year: "2025",
  },
  {
    id: 8,
    title: "End of Year Summary: Looking Back at Our Impact",
    date: "December 22, 2024",
    pdfLink: "#",
    year: "2025",
  },
];

// Dummy data for photo gallery
const GALLERY_ITEMS = [
  { id: 1, image: profileImage, title: "Community Outreach Event" },
  { id: 2, image: profileImage, title: "Medical Staff Training" },
  { id: 3, image: profileImage, title: "New Facility Opening" },
  { id: 4, image: profileImage, title: "Patient Consultation" },
  { id: 5, image: profileImage, title: "Mobile Clinic Services" },
  { id: 6, image: profileImage, title: "Healthcare Workshop" },
  { id: 7, image: profileImage, title: "Volunteer Recognition" },
  { id: 8, image: profileImage, title: "Medical Equipment Donation" },
{ id: 9, image: profileImage, title: "Healthcare Workshop" },
  { id: 10, image: profileImage, title: "Volunteer Recognition" },
  { id: 11, image: profileImage, title: "Medical Equipment Donation" },

];



// Available years for filtering
const AVAILABLE_YEARS = ["2025", "2024", "2023"];

export default function PressAndMedia() {
  const [showButton, setShowButton] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [pressArticles, setPressArticles] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [mediaContacts, setMediaContacts] = useState([]);
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Add pagination state for press releases
  const [releaseCurrentPage, setReleaseCurrentPage] = useState(1);
  const releasesPerPage = 4;

  // Add pagination state for gallery
  const [galleryCurrentPage, setGalleryCurrentPage] = useState(1);
  const galleryItemsPerPage = 8;

  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      setPressArticles(PRESS_ARTICLES);
      setPressReleases(PRESS_RELEASES);
      setGalleryItems(GALLERY_ITEMS);
      setMediaContacts(MEDIA_CONTACTS);
    };

    fetchData();

    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Calculate pagination for press releases
  const filteredReleases =
    activeFilter === "all"
      ? pressReleases
      : pressReleases.filter((release) => release.year === activeFilter);
  
  const indexOfLastRelease = releaseCurrentPage * releasesPerPage;
  const indexOfFirstRelease = indexOfLastRelease - releasesPerPage;
  const currentReleases = filteredReleases.slice(indexOfFirstRelease, indexOfLastRelease);
  const totalReleasePages = Math.ceil(filteredReleases.length / releasesPerPage);

  // Handle page change for press releases
  const handleReleasePageChange = (pageNumber) => {
    setReleaseCurrentPage(pageNumber);
    // Scroll to the top of the press releases section
    const releasesSection = document.getElementById('releases-section');
    if (releasesSection) {
      releasesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate pagination for press articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = pressArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(pressArticles.length / articlesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to the top of the news section
    const newsSection = document.getElementById('news-section');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate pagination for gallery
  const indexOfLastGalleryItem = galleryCurrentPage * galleryItemsPerPage;
  const indexOfFirstGalleryItem = indexOfLastGalleryItem - galleryItemsPerPage;
  const currentGalleryItems = galleryItems.slice(indexOfFirstGalleryItem, indexOfLastGalleryItem);
  const totalGalleryPages = Math.ceil(galleryItems.length / galleryItemsPerPage);

  // Handle page change for gallery
  const handleGalleryPageChange = (pageNumber) => {
    setGalleryCurrentPage(pageNumber);
    // Scroll to the top of the gallery section
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Nav />

      <main>
        {/* Hero Section */}
        <div
          className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-4 sm:space-y-6 md:space-y-10 max-w-4xl px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-secondary">
              Press and Media
            </h1>
          </div>
        </div>

        {/* Latest Press Coverage */}
        <section id="news-section" className="py-10 sm:py-12 md:py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h2 className="text-4xl font-bold text-center mb-12 font-secondary">
                In the News
              </h2>
            </motion.div>

            {pressArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading press coverage...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {currentArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={article.image}
                        alt={article.headline}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">
                          {article.headline}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                          {article.source} – {article.date}
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{article.summary}</p>
                        <a
                          href={article.link}
                          className="text-primary font-medium hover:text-accent transition-colors duration-300 inline-flex items-center text-sm sm:text-base"
                        >
                          Read More <span className="ml-1">→</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Add Pagination component */}
                {pressArticles.length > articlesPerPage && (
                  <div className="mt-6 sm:mt-8">
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={handlePageChange} 
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Press Releases */}
        <section id="releases-section" className="py-10 sm:py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h2 className="text-4xl font-bold text-center mb-12 font-secondary">
                Press Releases
              </h2>
            </motion.div>

            {/* Filter controls */}
            <div className="flex justify-center mb-8 overflow-x-auto py-2">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setReleaseCurrentPage(1);
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-l-lg border ${
                    activeFilter === "all"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  All
                </button>
                {AVAILABLE_YEARS.map((year, index) => (
                  <button
                    key={year}
                    onClick={() => {
                      setActiveFilter(year);
                      setReleaseCurrentPage(1);
                    }}
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-t border-b border-r ${
                      index === AVAILABLE_YEARS.length - 1 ? "rounded-r-lg" : ""
                    } ${
                      activeFilter === year
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {pressReleases.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading press releases...</p>
              </div>
            ) : filteredReleases.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">
                  No press releases found for this year.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {currentReleases.map((release) => (
                    <motion.div
                      key={release.id}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">{release.title}</h3>
                        <p className="text-gray-600 mt-1">{release.date}</p>
                      </div>
                      <a
                        href={release.pdfLink}
                        className="flex items-center text-primary hover:text-accent transition-colors duration-300 mt-2 sm:mt-0"
                      >
                        <FaFilePdf className="mr-2" />
                        <span className="text-sm sm:text-base">Download PDF</span>
                      </a>
                    </motion.div>
                  ))}
                </div>
                
                {/* Add Pagination for press releases */}
                {filteredReleases.length > releasesPerPage && (
                  <Pagination 
                    currentPage={releaseCurrentPage} 
                    totalPages={totalReleasePages} 
                    onPageChange={handleReleasePageChange} 
                  />
                )}
              </>
            )}
          </div>
        </section>

        {/* Photo Gallery */}
        <section id="gallery-section" className="py-10 sm:py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h2 className="text-4xl font-bold text-center mb-12 font-secondary">
                Photo & Video Library
              </h2>
            </motion.div>

            {galleryItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading gallery...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {currentGalleryItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="rounded-lg overflow-hidden cursor-pointer relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center p-2">
                        <span className="text-white text-center text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                          {item.title}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add Pagination for gallery instead of "View All" button */}
                {galleryItems.length > galleryItemsPerPage && (
                  <div className="mt-8">
                    <Pagination 
                      currentPage={galleryCurrentPage} 
                      totalPages={totalGalleryPages} 
                      onPageChange={handleGalleryPageChange} 
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </section>

       
      </main>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </motion.div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 bg-accent text-white p-2 rounded-full z-50 hover:bg-support transition-colors duration-300 shadow-lg"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} className="sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
}

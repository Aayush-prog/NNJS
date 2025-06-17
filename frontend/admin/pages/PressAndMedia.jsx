import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination"; // Import Pagination component
import { motion } from "framer-motion";
import { FaArrowCircleUp, FaFilePdf } from "react-icons/fa";
import Loading from "../components/Loading";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import { format } from "date-fns";
import GalleryItem from "../components/GalleryItem";
// Available years for filtering

export default function PressAndMedia() {
  // track viewport width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // pagination current pages
  const [currentPage, setCurrentPage] = useState(1);
  const [releaseCurrentPage, setReleaseCurrentPage] = useState(1);
  const [galleryCurrentPage, setGalleryCurrentPage] = useState(1);

  // update width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // derive items-per-page dynamically
  const articlesPerPage = windowWidth < 640 ? 3 : windowWidth < 1024 ? 3 : 3;
  const releasesPerPage = windowWidth < 640 ? 3 : windowWidth < 1024 ? 3 : 4;
  const galleryItemsPerPage =
    windowWidth < 640 ? 4 : windowWidth < 1024 ? 6 : 8;

  const [showButton, setShowButton] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [news, setNews] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState();
  const [AVAILABLE_YEARS, setYears] = useState(["2025", "2024", "2023"]);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        console.log(api);
        const res = await axios.get(`${api}/pages/press`);
        const response = await axios.get(`${api}/media`);
        if (res.status === 200) {
          let createdArray;
          setPage(res.data.data);
          setNews(response.data.news);
          setPressReleases(response.data.press);
          createdArray = response.data.press.map((release) => {
            const date = new Date(release.createdAt);
            return format(date, "yyyy");
          });
          setYears(createdArray);
          setGallery(response.data.gallery);
          setLoading(false);
        } else {
          console.error("Error fetching page: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchPage();
  }, [api]);
  const getYouTubeId = (url) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
  };
  useEffect(() => {
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
      : pressReleases.filter(
          (release) =>
            format(new Date(release.createdAt), "yyyy") === activeFilter
        );

  const indexOfLastRelease = releaseCurrentPage * releasesPerPage;
  const indexOfFirstRelease = indexOfLastRelease - releasesPerPage;
  const currentReleases = filteredReleases.slice(
    indexOfFirstRelease,
    indexOfLastRelease
  );
  const totalReleasePages = Math.ceil(
    filteredReleases.length / releasesPerPage
  );

  // Handle page change for press releases
  const handleReleasePageChange = (pageNumber) => {
    setReleaseCurrentPage(pageNumber);
    // Scroll to the top of the press releases section
    const releasesSection = document.getElementById("releases-section");
    if (releasesSection) {
      releasesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate pagination for press articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(news.length / articlesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to the top of the news section
    const newsSection = document.getElementById("news-section");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate pagination for gallery
  const indexOfLastGalleryItem = galleryCurrentPage * galleryItemsPerPage;
  const indexOfFirstGalleryItem = indexOfLastGalleryItem - galleryItemsPerPage;
  const currentGalleryItems = gallery.slice(
    indexOfFirstGalleryItem,
    indexOfLastGalleryItem
  );
  const totalGalleryPages = Math.ceil(gallery.length / galleryItemsPerPage);

  // Handle page change for gallery
  const handleGalleryPageChange = (pageNumber) => {
    setGalleryCurrentPage(pageNumber);
    // Scroll to the top of the gallery section
    const gallerySection = document.getElementById("gallery-section");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const truncateText = (text, maxLength = 100) => {
    if (!text) return ""; // Handle null or undefined text
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  if (loading) return <Loading />;
  return (
    <div>
      <Nav />

      <main>
        {page && (
          <HeroSection
            title={page.heroSection.title}
            body={page.heroSection.body}
            image={page.heroSection.image}
          />
        )}

        {/* Latest Press Coverage */}
        <section
          id="news-section"
          className="py-10 sm:py-12 md:py-16 px-4 bg-gray-50"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* make H2 responsive */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 font-secondary">
                In the News
              </h2>
            </motion.div>

            {news.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading press coverage...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 ">
                  {currentArticles.map((article) => (
                    <motion.div
                      key={article._id}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={`${api}/images/${article.image}`}
                        alt={article.title}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 font-secondary">
                          {article.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-primary">
                          {article.createdAt &&
                            format(
                              new Date(article.createdAt),
                              "MMMM dd, yyyy"
                            )}
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 font-primary">
                          "{truncateText(article.body)}"
                        </p>
                        <a
                          href={article.link}
                          className="text-primary font-medium hover:text-accent transition-colors duration-300 inline-flex items-center text-sm sm:text-base font-primary"
                        >
                          Read More <span className="ml-1 font-primary">→</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add Pagination component */}
                {news.length > articlesPerPage && (
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 font-secondary">
                Press Releases
              </h2>
            </motion.div>

            {/* Filter controls */}
            <motion.div
              className="flex justify-center mb-8 overflow-x-auto py-2"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setReleaseCurrentPage(1);
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium font-secondary rounded-l-lg border ${
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
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium font-secondary border-t border-b border-r ${
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
            </motion.div>

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
                      key={release._id}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-secondary">
                          {release.title}
                        </h3>
                        <p className="text-gray-600 mt-1 font-primary">
                          {release.createdAt &&
                            format(
                              new Date(release.createdAt),
                              "MMMM dd, yyyy"
                            )}
                        </p>
                        {release.link && (
                          <a
                            href={`${release.link}`}
                            className="text-primary underline underline-offset-2"
                          >
                            {" "}
                            Link to the article
                          </a>
                        )}
                      </div>
                      {release.file && (
                        <a
                          href={`${api}/files/${release.file}`}
                          className="flex items-center text-primary hover:text-accent transition-colors duration-300 mt-2 sm:mt-0 font-secondary"
                        >
                          <FaFilePdf className="mr-2" />
                          <span className="text-sm sm:text-base font-secondary">
                            Download PDF
                          </span>
                        </a>
                      )}
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 font-secondary">
                Photo & Video Library
              </h2>
            </motion.div>

            {gallery.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading gallery...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {currentGalleryItems.map((item) =>
                    item.images.length > 0 ? (
                      <GalleryItem item={item} images={item.images} />
                    ) : (
                      <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        key={item._id}
                        className="w-full max-w-sm aspect-video rounded-lg overflow-hidden shadow"
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYouTubeId(
                            item.video
                          )}?rel=0`}
                          title="YouTube video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </motion.div>
                    )
                  )}
                </div>

                {/* Add Pagination for gallery instead of "View All" button */}
                {gallery.length > galleryItemsPerPage && (
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
          <FaArrowCircleUp size={24} />
        </button>
      )}
    </div>
  );
}

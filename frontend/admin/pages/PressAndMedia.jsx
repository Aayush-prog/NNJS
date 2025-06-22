import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaArrowCircleUp } from "react-icons/fa";
import Loading from "../components/Loading";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import { format } from "date-fns";
import GalleryItem from "../components/GalleryItem";
import InTheNews from "../components/InTheNews";
import PressReleasesSection from "../components/PressReleasesSection"; // Import PressReleasesSection

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

  // Handle page change for press releases
  const handleReleasePageChange = (pageNumber) => {
    setReleaseCurrentPage(pageNumber);
    // Scroll to the top of the press releases section
    const releasesSection = document.getElementById("releases-section");
    if (releasesSection) {
      releasesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            id={page.heroSection._id}
          />
        )}

        <InTheNews
          news={news}
          setNews={setNews}
          api={api}
          currentPage={currentPage}
          articlesPerPage={articlesPerPage}
          handlePageChange={(page) => setCurrentPage(page)}
          totalPages={Math.ceil(news.length / articlesPerPage)}
        />

        {/* Press Releases */}
        <PressReleasesSection
          pressReleases={pressReleases}
          api={api}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          releaseCurrentPage={releaseCurrentPage}
          setReleaseCurrentPage={setReleaseCurrentPage}
          releasesPerPage={releasesPerPage}
          handleReleasePageChange={handleReleasePageChange}
          AVAILABLE_YEARS={AVAILABLE_YEARS}
        />

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

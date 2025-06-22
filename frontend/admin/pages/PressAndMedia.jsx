import React, { useState, useEffect, useContext } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaArrowCircleUp, FaPen, FaTrash, FaPlus } from "react-icons/fa";
import Loading from "../components/Loading";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import { format } from "date-fns";
import GalleryItem from "../components/GalleryItem";
import InTheNews from "../components/InTheNews";
import PressReleasesSection from "../components/PressReleasesSection";
import { AuthContext } from "../../AuthContext"; 

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
  const { authToken } = useContext(AuthContext); 

  // Add new state for gallery management
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    body: "",
    type: "Gallery", 
    video: "",
    images: [],
  });
  const [editedGalleryItem, setEditedGalleryItem] = useState({
    title: "",
    body: "",
    type: "Gallery", 
    video: "",
    images: [],
  });

  // Gallery management functions
  const handleAddGalleryItem = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newGalleryItem.title);
      formData.append("body", newGalleryItem.body);
      
      // Set the correct type based on selection
      const mediaType = newGalleryItem.type === "video" ? "Gallery" : "Gallery";
      formData.append("type", mediaType);

      if (newGalleryItem.type === "video") {
        formData.append("video", newGalleryItem.video);
      }

      // Handle multiple images
      newGalleryItem.images.forEach((image, index) => {
        formData.append("images", image);
      });

      const response = await axios.post(`${api}/media/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("New gallery item added:", response.data);
      setIsAddingGallery(false);
      setNewGalleryItem({
        title: "",
        body: "",
        type: "Gallery", // Reset to "Gallery"
        video: "",
        images: [],
      });

      // Refresh gallery data
      const mediaResponse = await axios.get(`${api}/media`);
      setGallery(mediaResponse.data.gallery);
    } catch (error) {
      console.error("Error adding new gallery item:", error);
      // Log the actual error response for debugging
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleEditGalleryItem = (item) => {
    setEditingGalleryId(item._id);
    setEditedGalleryItem({
      title: item.title || "",
      body: item.body || "",
      type: item.type || "Gallery",
      video: item.video || "",
      images: [],
    });
  };

  const handleUpdateGalleryItem = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedGalleryItem.title);
      formData.append("body", editedGalleryItem.body);
      
      // Set the correct type
      const mediaType = editedGalleryItem.type === "video" ? "Gallery" : "Gallery";
      formData.append("type", mediaType);

      if (editedGalleryItem.type === "video") {
        formData.append("video", editedGalleryItem.video);
      }

      // Handle new images if any
      editedGalleryItem.images.forEach((image, index) => {
        formData.append("images", image);
      });

      const response = await axios.patch(
        `${api}/media/edit/${editingGalleryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Gallery item updated:", response.data);
      setEditingGalleryId(null);

      // Refresh gallery data
      const mediaResponse = await axios.get(`${api}/media`);
      setGallery(mediaResponse.data.gallery);
    } catch (error) {
      console.error("Error updating gallery item:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  const handleDeleteGalleryItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await axios.delete(`${api}/media/del/${itemId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        // Refresh gallery data
        const mediaResponse = await axios.get(`${api}/media`);
        setGallery(mediaResponse.data.gallery);
        console.log("Gallery item deleted successfully");
      } catch (error) {
        console.error("Error deleting gallery item:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        }
      }
    }
  };

  const handleNewGalleryChange = (e) => {
    const { name, value } = e.target;
    setNewGalleryItem({ ...newGalleryItem, [name]: value });
  };

  const handleEditedGalleryChange = (e) => {
    const { name, value } = e.target;
    setEditedGalleryItem({ ...editedGalleryItem, [name]: value });
  };

  const handleNewGalleryImagesChange = (e) => {
    setNewGalleryItem({ ...newGalleryItem, images: Array.from(e.target.files) });
  };

  const handleEditedGalleryImagesChange = (e) => {
    setEditedGalleryItem({ ...editedGalleryItem, images: Array.from(e.target.files) });
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
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-secondary">
                  Photo & Video Library
                </h2>
                <button
                  onClick={() => setIsAddingGallery(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                >
                  <FaPlus /> Add Gallery Item
                </button>
              </div>
            </motion.div>

            {/* Add Gallery Item Modal */}
            {isAddingGallery && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">Add Gallery Item</h3>

                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newGalleryItem.title}
                    onChange={handleNewGalleryChange}
                    className="w-full border rounded-lg p-2 mb-3"
                  />

                  <textarea
                    name="body"
                    placeholder="Description"
                    value={newGalleryItem.body}
                    onChange={handleNewGalleryChange}
                    className="w-full border rounded-lg p-2 mb-3"
                    rows="3"
                  />

                  <select
                    name="type"
                    value={newGalleryItem.type === "Gallery" ? "gallery" : "video"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewGalleryItem({
                        ...newGalleryItem,
                        type: value === "video" ? "video" : "Gallery"
                      });
                    }}
                    className="w-full border rounded-lg p-2 mb-3"
                  >
                    <option value="gallery">Photo Gallery</option>
                    <option value="video">Video</option>
                  </select>

                  {newGalleryItem.type === "video" ? (
                    <input
                      type="text"
                      name="video"
                      placeholder="YouTube Video URL"
                      value={newGalleryItem.video}
                      onChange={handleNewGalleryChange}
                      className="w-full border rounded-lg p-2 mb-3"
                    />
                  ) : (
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleNewGalleryImagesChange}
                      className="w-full border rounded-lg p-2 mb-3"
                    />
                  )}

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleAddGalleryItem}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setIsAddingGallery(false)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Gallery Item Modal */}
            {editingGalleryId && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">Edit Gallery Item</h3>

                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={editedGalleryItem.title}
                    onChange={handleEditedGalleryChange}
                    className="w-full border rounded-lg p-2 mb-3"
                  />

                  <textarea
                    name="body"
                    placeholder="Description"
                    value={editedGalleryItem.body}
                    onChange={handleEditedGalleryChange}
                    className="w-full border rounded-lg p-2 mb-3"
                    rows="3"
                  />

                  <select
                    name="type"
                    value={editedGalleryItem.type === "Gallery" && !editedGalleryItem.video ? "gallery" : "video"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditedGalleryItem({
                        ...editedGalleryItem,
                        type: value === "video" ? "video" : "Gallery"
                      });
                    }}
                    className="w-full border rounded-lg p-2 mb-3"
                  >
                    <option value="gallery">Photo Gallery</option>
                    <option value="video">Video</option>
                  </select>

                  {editedGalleryItem.type === "video" ? (
                    <input
                      type="text"
                      name="video"
                      placeholder="YouTube Video URL"
                      value={editedGalleryItem.video}
                      onChange={handleEditedGalleryChange}
                      className="w-full border rounded-lg p-2 mb-3"
                    />
                  ) : (
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleEditedGalleryImagesChange}
                      className="w-full border rounded-lg p-2 mb-3"
                    />
                  )}

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleUpdateGalleryItem}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingGalleryId(null)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gallery.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading gallery...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {currentGalleryItems.map((item) => (
                    <div key={item._id} className="relative group">
                      {/* Admin Controls */}
                      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEditGalleryItem(item)}
                            className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-xs"
                          >
                            <FaPen size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteGalleryItem(item._id)}
                            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Gallery Item Content */}
                      {item.images && item.images.length > 0 ? (
                        <GalleryItem item={item} images={item.images} />
                      ) : (
                        <motion.div
                          variants={fadeInUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.1 }}
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
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
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

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useState, useEffect, useContext } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Pagination from "./Pagination";
import Loading from "../components/Loading";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const InTheNews = ({
  currentPage,
  articlesPerPage,
  handlePageChange,
  totalPages,
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: "",
    body: "",
    link: "",
    image: null,
    type: "News",
  });
  const [imageDeleted, setImageDeleted] = useState(false);
  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleInputChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setNewArticle((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/media`);
      if (res.status === 200) {
        setNews(res.data.news || []);
      } else {
        console.error("Error fetching news: Status code", res.status);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [api]);

  const handleAddArticle = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newArticle.title);
      formData.append("body", newArticle.body);
      formData.append("link", newArticle.link);
      formData.append("type", newArticle.type);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await axios.post(`${api}/media/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 201) {
        await fetchNews();
        setNewArticle({
          title: "",
          body: "",
          link: "",
          image: null,
          type: "News",
        });
        setSelectedImage(null);
        setIsAdding(false);
      } else {
        console.error("Error creating media:", res.status);
      }
    } catch (error) {
      console.error("Error creating media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = (mediaId) => {
    setEditingArticleId(mediaId);
    const mediaToEdit = news.find((media) => media._id === mediaId);
    if (mediaToEdit) {
      setNewArticle({
        title: mediaToEdit.title || "",
        body: mediaToEdit.body || "",
        link: mediaToEdit.link || "",
        image: mediaToEdit.image || null,
        type: "News",
        _id: mediaToEdit._id,
      });
      setSelectedImage(null);
      setImageDeleted(false);
    }
  };

  const handleUpdateArticle = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newArticle.title);
      formData.append("body", newArticle.body);
      formData.append("link", newArticle.link);
      formData.append("type", newArticle.type);
      formData.append("imageDeleted", imageDeleted);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await axios.patch(
        `${api}/media/edit/${newArticle._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        await fetchNews();
        setNewArticle({
          title: "",
          body: "",
          link: "",
          image: null,
          type: "News",
        });
        setSelectedImage(null);
        setEditingArticleId(null);
        setImageDeleted(false);
      } else {
        console.error("Error updating media:", res.status);
      }
    } catch (error) {
      console.error("Error updating media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (mediaId) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setLoading(true);
      try {
        const res = await axios.delete(`${api}/media/del/${mediaId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 200) {
          await fetchNews();
        } else {
          console.error("Error deleting news:", res.status);
        }
      } catch (error) {
        console.error("Error deleting news:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loading />;

  return (
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
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-50 hover:bg-blue-600 text-primary hover:text-white rounded-full p-4 transition duration-300 shadow-md hover:shadow-lg"
              >
                <FaPlus />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {currentArticles.map((article) => (
                <motion.div
                  key={article._id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                      onClick={() => handleEditArticle(article._id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold p-2 rounded-full"
                    >
                      <FaPen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                  {article.image && (
                    <img
                      src={`${api}/images/${article.image}`}
                      alt={article.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 font-secondary">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-primary">
                      {article.createdAt &&
                        format(new Date(article.createdAt), "MMMM dd, yyyy")}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 font-primary">
                      "{truncateText(article.body)}"
                    </p>
                    {article.link && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:text-accent transition-colors duration-300 inline-flex items-center text-sm sm:text-base font-primary"
                      >
                        Read More <span className="ml-1 font-primary">→</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

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

      {/* Add Article Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-md text-center relative w-full max-w-md max-h-96 overflow-y-auto">
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full"
            >
              <RxCross2 className="inline-block h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Article</h3>
            <input
              type="text"
              name="title"
              value={newArticle.title}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-3"
              placeholder="Title"
            />
            <textarea
              name="body"
              value={newArticle.body}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-3"
              placeholder="Body"
              rows="3"
            />
            <input
              type="text"
              name="link"
              value={newArticle.link}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-3"
              placeholder="Article Link (optional)"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2 mb-3"
              accept="image/*"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddArticle}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {editingArticleId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-md text-center relative w-full max-w-md max-h-96 overflow-y-auto">
            <button
              onClick={() => {
                setEditingArticleId(null);
                setImageDeleted(false);
              }}
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full"
            >
              <RxCross2 className="inline-block h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Article</h3>
            <input
              type="text"
              name="title"
              value={newArticle.title}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-3"
              placeholder="Title"
            />
            <textarea
              name="body"
              value={newArticle.body}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-3"
              placeholder="Body"
              rows="3"
            />
            <input
              type="text"
              name="link"
              value={newArticle.link}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-3"
              placeholder="Article Link (optional)"
            />
          
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2 mb-3"
              accept="image/*"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdateArticle}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setEditingArticleId(null);
                  setImageDeleted(false);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InTheNews;
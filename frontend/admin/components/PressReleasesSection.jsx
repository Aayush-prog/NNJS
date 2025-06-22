// PressReleasesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaFilePdf } from "react-icons/fa";
import Pagination from "../components/Pagination";

const PressReleasesSection = ({
  pressReleases,
  api,
  activeFilter,
  setActiveFilter,
  releaseCurrentPage,
  setReleaseCurrentPage,
  releasesPerPage,
  handleReleasePageChange,
  AVAILABLE_YEARS,
}) => {
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

  return (
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
                        format(new Date(release.createdAt), "MMMM dd, yyyy")}
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
  );
};

export default PressReleasesSection;

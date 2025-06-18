import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  FaArrowCircleUp,
  FaArrowLeft,
  FaPlus,
  FaSave,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import SubSection from "../components/SubSection";
import HeroSection from "../components/HeroSection";

const faqs = [
  {
    question: "Who can apply for ethical approval, and how is it submitted?",
    answer: (
      <div>
        <p>
          Any staff, student, or affiliated personnel of NNJS can apply.
          Download the proposal submission format below and email the completed
          form with all required documents to irc@nnjs.org.np.
        </p>
        <a
          href="#"
          className="inline-block mt-3 text-blue-600 underline hover:text-blue-800 font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          IRCNNJS Full Report Submitting Format
        </a>
      </div>
    ),
  },
  {
    question:
      "How long does the ethical approval process take, and can I request urgency?",
    answer:
      "The process typically takes 2-6 weeks. If serious ethical concerns arise or documents are incomplete, it may take longer. Urgent requests are reviewed case-by-case with justification.",
  },
  {
    question: "What are the ethical approval fees and how can I pay them?",
    answer:
      "Fees vary depending on research type and budget. Pay at NNJS office or via Nepal Investment Bank Limited. Email the payment voucher to irc@nnjs.org.np after deposit.",
  },
  {
    question:
      "What are the consent requirements for research involving minors or vulnerable groups?",
    answer:
      "For under 7: guardian consent. Ages 7-17: assent + guardian consent. 18+: self-consent. Vulnerable groups include children, elderly, prisoners, etc.",
  },
  {
    question: "Can I send human biological samples outside Nepal for analysis?",
    answer:
      "Exporting raw samples is strictly prohibited. Only extracted materials may be sent abroad with prior IRC approval, a commitment letter from the lab, and handler CVs.",
  },
  {
    question:
      "What should I do if I need to modify the proposal after approval?",
    answer:
      "Submit an amendment request with changes and reasons. Amendments aren't allowed if the approval period has expired.",
  },
  {
    question:
      "Is ethical approval required for all studies involving human participants?",
    answer:
      "Yes. Any study with human interaction or identifiable data needs prior IRC approval. No retroactive approvals.",
  },
  {
    question:
      "Who is responsible for submitting the ethics application, and what if the team changes?",
    answer:
      "The Principal Investigator (PI) submits the application. New team members must be added through an amendment.",
  },
  {
    question: "What happens if research begins without ethical approval?",
    answer:
      "This is a serious violation. Data collected cannot be used and retroactive approval isn’t possible.",
  },
  {
    question: "How long does approval remain valid?",
    answer:
      "It's valid for the duration stated in your proposal. Check the expiry date in your approval letter.",
  },
  {
    question: "Do NNJS's own projects require IRC approval?",
    answer:
      "Yes. All NNJS research must undergo IRC review and approval like any other affiliated study.",
  },
];

function SearchableIconPicker({ selectedIcon, setSelectedIcon }) {
  const [searchTerm, setSearchTerm] = useState("");

  const iconList = Object.keys(ReactIcons);

  const filteredIcons = iconList.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="icon-picker">
      <input
        type="text"
        placeholder="Search Icons..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border rounded mb-2 p-1"
      />
      <div className="icon-grid max-h-40 overflow-y-auto grid grid-cols-5 gap-2">
        {filteredIcons.map((iconName) => {
          const IconComponent = ReactIcons[iconName];
          return (
            <button
              key={iconName}
              onClick={() => setSelectedIcon(iconName)}
              className={`p-1 rounded hover:bg-gray-200 ${
                selectedIcon === iconName ? "bg-blue-200" : ""
              }`}
            >
              <IconComponent size={24} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function EthicalReview() {
  const [showButton, setShowButton] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [objectives, setObjectives] = useState(null);
  const [irc, setIrc] = useState();
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newObjective, setNewObjective] = useState({
    icon: "FaStar",
    title: "",
    description: "",
    color: "text-blue-500",
  });
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchCommitments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/ircObjectives/`);
        const response = await axios.get(`${api}/pages/ethicalReview`);
        if (res.status === 200) {
          setObjectives(res.data.data);
          setIrc(response.data.data);
        } else {
          console.error("Error fetching commitments: Status code", res.status);
        }
      } catch (error) {
        console.error("Error fetching commitments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitments();
  }, [api]);
  const toggleAdd = () => setIsAdding((prev) => !prev);

  const handleChange = (index, field, value) => {
    const updated = [...objectives];
    updated[index][field] = value;
    setObjectives(updated);
  };

  const handleSave = async (obj, index) => {
    try {
      const { _id, title, description, icon, color } = obj;
      const res = await axios.patch(`${api}/ircObjectives/edit/${_id}`, {
        title,
        description,
        icon,
        color,
      });
      if (res.status === 200) {
        setEditingIndex(null);
        fetchObjectives(); // Refresh after save
      }
    } catch (error) {
      console.error("Error updating objective:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${api}/ircObjectives/del/${_id}`);
      setObjectives((prev) => prev.filter((o) => o._id !== _id));
      fetchObjectives(); // Refresh after delete
    } catch (error) {
      console.error("Error deleting objective:", error);
    }
  };

  const handleAddObjective = async () => {
    try {
      const res = await axios.post(`${api}/ircObjectives/create`, newObjective);
      if (res.status === 201) {
        //setObjectives([...objectives, res.data.data]);
        setNewObjective({
          icon: "FaStar",
          title: "",
          description: "",
          color: "text-blue-500",
        });
        setIsAdding(false);
        fetchObjectives(); // Refresh after add
      }
    } catch (error) {
      console.error("Error creating objective:", error);
    }
  };
  const iconMap = { ...ReactIcons };

  function IconRenderer({ iconName, color }) {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) {
      return <span>Icon not found: {iconName}</span>;
    }
    return (
      <IconComponent
        className={`${color} text-2xl sm:text-3xl mb-3 sm:mb-4`}
        aria-hidden="true"
      />
    );
  }
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchObjectives = async () => {
    try {
      const res = await axios.get(`${api}/ircObjectives/`);
      if (res.status === 200) {
        setObjectives(res.data.data);
      } else {
        console.error("Error fetching objectives: Status code", res.status);
      }
    } catch (error) {
      console.error("Error fetching objectives:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Nav />
      <main>
        {irc && (
          <HeroSection
            title={irc.heroSection.title}
            body={irc.heroSection.body}
            image={irc.heroSection.image}
            id={irc.heroSection._id}
          />
        )}
        {irc && (
          <SubSection
            title={irc.subSection1.title}
            body={irc.subSection1.body}
            image={irc.subSection1.image}
            id={irc.subSection1._id}
          />
        )}
        <div className="flex flex-col items-center py-10 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mt-10 md:mt-16 mb-6 md:mb-8 text-center px-4">
            IRC's Objectives
          </h2>
          <button
            onClick={toggleAdd}
            className="p-2 rounded-full text-black bg-gray-200 hover:bg-gray-300"
            aria-label={isAdding ? "Back" : "Add"}
          >
            {isAdding ? <FaArrowLeft size={18} /> : <FaPlus size={18} />}
          </button>

          {!isAdding ? (
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 px-4 sm:px-8 md:px-16 lg:px-28 mb-10 md:mb-18">
              {objectives &&
                objectives.map((obj, index) => (
                  <div
                    key={obj._id}
                    className="bg-white border border-gray-200 rounded-xl p-6 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 relative"
                  >
                    {editingIndex === index ? (
                      <div className="flex flex-col">
                        <SearchableIconPicker
                          selectedIcon={obj.icon}
                          setSelectedIcon={(icon) =>
                            handleChange(index, "icon", icon)
                          }
                        />
                        <input
                          type="text"
                          value={obj.color}
                          onChange={(e) =>
                            handleChange(index, "color", e.target.value)
                          }
                          className="w-full border rounded mb-2 p-1"
                          placeholder="text-blue-500"
                        />
                        <input
                          type="text"
                          value={obj.title}
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                          className="w-full border rounded mb-2 p-1"
                          placeholder="Title"
                        />
                        <textarea
                          value={obj.description}
                          onChange={(e) =>
                            handleChange(index, "description", e.target.value)
                          }
                          className="w-full border rounded mb-2 p-1"
                          placeholder="Description"
                        />
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleSave(obj, index)}
                            className="p-2 bg-green-600 text-white rounded"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="p-2 bg-gray-400 text-white rounded"
                          >
                            <FaArrowLeft />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-3 md:gap-4">
                          <IconRenderer iconName={obj.icon} color={obj.color} />
                          <div>
                            <h3 className="text-base md:text-lg font-secondary font-semibold mb-1">
                              {obj.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-700 font-primary">
                              {obj.description}
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button
                            onClick={() => setEditingIndex(index)}
                            className="p-2 bg-yellow-300 text-black rounded-full"
                          >
                            <FaPen />
                          </button>
                          <button
                            onClick={() => handleDelete(obj._id)}
                            className="p-2 bg-red-500 text-white rounded-full"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="w-full max-w-md border p-4 bg-white text-black rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Add New Objective</h3>
              <SearchableIconPicker
                selectedIcon={newObjective.icon}
                setSelectedIcon={(icon) =>
                  setNewObjective({ ...newObjective, icon })
                }
              />
              <input
                type="text"
                value={newObjective.color}
                onChange={(e) =>
                  setNewObjective({ ...newObjective, color: e.target.value })
                }
                className="w-full border rounded mb-2 p-1"
                placeholder="text-blue-500"
              />

              <input
                type="text"
                value={newObjective.title}
                onChange={(e) =>
                  setNewObjective({ ...newObjective, title: e.target.value })
                }
                className="w-full border rounded mb-2 p-1"
                placeholder="Title"
              />
              <textarea
                value={newObjective.description}
                onChange={(e) =>
                  setNewObjective({
                    ...newObjective,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded mb-4 p-1"
                placeholder="Description"
              />
              <button
                onClick={handleAddObjective}
                className="p-2 w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <FaPlus />
                Add Objective
              </button>
            </div>
          )}
        </div>
        {irc && (
          <SubSection
            title={irc.subSection2.title}
            body={irc.subSection2.body}
            image={irc.subSection2.image}
          />
        )}

        <div className="bg-blue-50 py-10 md:py-16 px-4 sm:px-6 md:px-16">
          <h2 className="text-2xl sm:text-3xl md:4xl font-bold font-secondary text-primary text-center mb-8 md:mb-12">
            Frequently Asked Questions - FAQs
          </h2>
          <div className="bg-white shadow-md md:shadow-lg rounded-lg p-4 md:p-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left py-4 md:py-5 px-3 md:px-6 text-sm md:text-base text-gray-600 font-primary flex justify-between items-center border-b border-gray-200"
                >
                  <span className="pr-2">{faq.question}</span>
                  <span className="text-lg md:text-xl font-bold flex-shrink-0">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-3 md:p-4 text-sm md:text-base text-gray-600 font-primary border-b border-gray-300 leading-relaxed">
                    <span className="font-semibold text-gray-600">A:</span>{" "}
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full shadow-lg hover:bg-support transition"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} />
        </button>
      )}
    </div>
  );
}

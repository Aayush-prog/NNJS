import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaArrowCircleUp } from "react-icons/fa";
import * as ReactIcons from "react-icons/fa";
import { motion } from "motion/react";
import axios from "axios";
import Loading from "../components/Loading";
import SubSection from "../components/SubSection";
import HeroSection from "../components/HeroSection";
import Proposal from "../assets/IRC NNJS Proposal Submitting Format.doc";
import Full from "../assets/IRCNNJS Full Report Submittig Format.doc";
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
          href={Proposal}
          className="inline-block mt-3 text-blue-600 underline hover:text-blue-800 font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          IRCNNJS Proposal Submitting Format
        </a>
        <div></div>
        <a
          href={Full}
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

export default function EthicalReview() {
  const [showButton, setShowButton] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [objectives, setObjectives] = useState(null);
  const [irc, setIrc] = useState();
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

  const fadeInUp = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  // Animation variants for container with stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Animation variants for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
          />
        )}
        {irc && (
          <SubSection
            title={irc.subSection1.title}
            body={irc.subSection1.body}
            image={irc.subSection1.image}
          />
        )}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          className="bg-blue-50 py-1 sm:py-3 pb-8"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary text-primary mt-10 md:mt-16 mb-6 md:mb-8 text-center px-4"
          >
            IRC's Objectives
          </motion.h2>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 px-4 sm:px-8 md:px-16 lg:px-28 mb-10 md:mb-18">
            {objectives?.length > 0 &&
              objectives.map((obj, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-6 md:p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <IconRenderer iconName={obj.icon} color={obj.color} />
                    <div>
                      <h3
                        className={`text-base md:text-lg font-secondary font-semibold mb-1 ${obj.color}`}
                      >
                        {obj.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 font-primary">
                        {obj.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
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

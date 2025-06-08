import { React, useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import ethical from "../assets/ethical.jpg";
import { ShieldCheck, Eye, ClipboardCheck, HeartPulse } from "lucide-react";
import ethical_pic from "../assets/Ethical Review Process.png";
import { FaArrowCircleUp } from "react-icons/fa";

const objectives = [
  {
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Unbiased Ethical Review",
    description:
      "Review and approve scientifically sound proposals without bias.",
  },
  {
    icon: <Eye className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Promote Ocular Research",
    description:
      "Encourage and facilitate research focused on eye health in Nepal.",
  },
  {
    icon: <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Consistent Monitoring",
    description:
      "Supervise and monitor health-related studies approved by IRC.",
  },
  {
    icon: <HeartPulse className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Protect Participants",
    description:
      "Uphold the rights, safety, dignity, and wellbeing of research participants.",
  },
];

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

export default function EthicalReview() {
  const [showButton, setShowButton] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

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

  const colorClasses = [
    "text-blue-600",
    "text-green-600",
    "text-yellow-600",
    "text-red-600",
  ];

  return (
    <div>
      <Nav />
      <main>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative h-[60vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${ethical})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center space-y-6 md:space-y-10 px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-secondary">
              Ethical Review
            </h1>
          </div>
        </motion.div>

        <div className="items-center bg-blue-50 justify-center flex flex-col text-center py-10 md:py-16">
          <h1 className="font-secondary text-2xl md:text-3xl text-primary font-bold p-3 md:p-5">
            Institutional Review Committee (IRC) - NNJS
          </h1>
          <div className="text-base md:text-lg font-primary max-w-6xl mx-auto px-4 md:px-6 space-y-4 md:space-y-6 leading-relaxed">
            <p>
              The Institutional Review Committee (IRC) of NNJS is an independent
              ethical body comprising eleven members from medical and
              non-medical backgrounds. Established in 2018 and approved by the
              Nepal Health Research Council (NHRC), IRC-NNJS reviews research
              proposals from affiliated researchers to ensure scientific
              validity and ethical compliance.
            </p>
            <p>
              It also facilitates and refers national or international studies—
              including externally funded research and clinical trials involving
              humans or animals—to NHRC's Ethical Review Board (ERB) for
              approval when required.
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold font-secondary text-primary mt-10 md:mt-16 mb-6 md:mb-8 text-center px-4">
          IRC's Objectives
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 px-4 sm:px-8 md:px-16 lg:px-28 mb-10 md:mb-18">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div
                  className={`flex-shrink-0 ${
                    colorClasses[idx % colorClasses.length]
                  }`}
                >
                  {obj.icon}
                </div>
                <div>
                  <h3
                    className={`text-base md:text-lg font-secondary font-semibold mb-1 ${
                      colorClasses[idx % colorClasses.length]
                    }`}
                  >
                    {obj.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 font-primary">
                    {obj.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-secondary text-primary mt-12 md:mt-20 mb-6 md:mb-8 text-center px-4">
            Ethical Review Process
          </h2>
          <p className="text-center font-primary text-sm md:text-lg px-4 sm:px-10 md:px-20 lg:px-32 mx-auto mb-6 md:mb-8">
            The ethical review process at NNJS ensures all research proposals
            undergo a structured and transparent evaluation before
            implementation. This multi-stage process involves internal and
            external experts to assess scientific rigor and ethical compliance,
            promoting responsible research that safeguards participant welfare
            and aligns with national guidelines.
          </p>
          <img
            src={ethical_pic}
            alt="Ethical Review Process"
            className="w-4/5 md:w-1/2 lg:w-1/3 max-w-xl mx-auto my-6 md:my-10 mb-10 md:mb-16"
          />
        </div>

        <div className="bg-blue-50 py-10 md:py-16 px-4 sm:px-6 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold font-secondary text-primary text-center mb-8 md:mb-12">
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
          className="fixed bottom-5 right-5 bg-primary text-white p-2 rounded-full z-50 hover:bg-opacity-90 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowCircleUp size={24} />
        </button>
      )}
    </div>
  );
}

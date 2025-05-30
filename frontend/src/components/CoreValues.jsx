import {
  FaUsers,
  FaEye,
  FaMedal,
  FaShieldAlt,
  FaBalanceScale,
} from "react-icons/fa";

const values = [
  {
    icon: <FaUsers className="text-blue-600 text-4xl" />,
    color: "blue",
    title: "Togetherness",
    description:
      "NNJS fosters a collaborative environment where members share knowledge, resources, and responsibilities to achieve common goals. We solve problems collectively and support one another to strengthen team effectiveness.",
  },
  {
    icon: <FaEye className="text-green-600 text-4xl" />,
    color: "green",
    title: "Transparency",
    description:
      "We are committed to openness and honesty. NNJS actively communicates with stakeholders, ensures access to relevant information, and maintains transparency in all activities.",
  },
  {
    icon: <FaMedal className="text-purple-600 text-4xl" />,
    color: "purple",
    title: "Excellence",
    description:
      "We set high standards, value punctuality, and hold ourselves accountable to patients, colleagues, and supporters. Professionalism, innovation, and continuous learning drive our pursuit of excellence.",
  },
  {
    icon: <FaShieldAlt className="text-yellow-600 text-4xl" />,
    color: "yellow",
    title: "Integrity",
    description:
      "We act with honesty, fairness, and respect. NNJS takes responsibility for its actions, maintains transparency, and addresses concerns or misconduct without hesitation.",
  },
  {
    icon: <FaBalanceScale className="text-red-600 text-4xl" />,
    color: "red",
    title: "Governance",
    description:
      "NNJS adheres to principles of good governance. We are accountable for improving service quality and promoting excellence in clinical care through a culture of continuous improvement.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 font-primary">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-4 font-secondary text-primary">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600">
            These principles guide everything we do at NNJS, shaping our culture
            and driving our success.
          </p>
        </div>

        <div className="space-y-10">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-xl p-8 flex flex-col sm:flex-row transition transform hover:-translate-y-1 hover:scale-[1.01] duration-300"
            >
              <div
                className={`bg-gradient-to-br from-${val.color}-100 to-${val.color}-50 p-5 rounded-full mr-0 sm:mr-8 mb-2 sm:mb-0 self-center`}
              >
                {val.icon}
              </div>
              <div>
                <h3
                  className={`text-3xl font-semibold text-${val.color}-600 mb-2 font-secondary`}
                >
                  {val.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

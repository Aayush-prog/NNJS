import { FaCheckCircle } from "react-icons/fa";

export default function SpecificObjectives() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-secondary">
            Specific Objectives Timeline
          </h2>
          <p className="text-xl max-w-3xl mx-auto font-secondary">
            Our roadmap for eliminating preventable blindness and improving eye
            care services
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden font-primary">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FaCheckCircle className="text-green-500 text-2xl" />
              <h3 className="text-2xl font-bold text-primary font-secondary ">By 2022:</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>Increase the national CSR from 4300 to 6000</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Establish a cataract audit system to monitor quality and
                  quantity
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Achieve WHO visual outcome benchmarks (PVA ≥ 80%, BCVA ≥ 90%)
                </span>
              </li>
            </ul>
          </div>

          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FaCheckCircle className="text-green-500 text-2xl" />
              <h3 className="text-2xl font-bold text-primary font-secondary ">By 2023:</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Raise community awareness of eye diseases and services to over
                  90%
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Reduce vision impairment from URE below 2% and increase
                  spectacle coverage above 80%
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Ensure 90% awareness of IEC materials among the target
                  population
                </span>
              </li>
            </ul>
          </div>

          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FaCheckCircle className="text-green-500 text-2xl" />
              <h3 className="text-2xl font-secondary font-bold text-primary">By 2024:</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Establish at least 100 district-level ear care centres
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Train at least 70 additional ophthalmologists with
                  sub-specialty training
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Establish 350 vision centres at the local government level
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>Upgrade 33 ECCs to surgical eye hospitals</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Upgrade tertiary eye hospitals into Centres of Excellence in
                  each province
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block"></span>
                <span>
                  Provide Eye Banking and cornea harvesting facilities in all
                  Centres of Excellence
                </span>
              </li>
            </ul>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <FaCheckCircle className="text-green-500 text-2xl" />
              <h3 className="text-2xl font-bold text-primary font-secondary ">By 2030:</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 inline-block "></span>
                <span>Eliminate corneal blindness</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

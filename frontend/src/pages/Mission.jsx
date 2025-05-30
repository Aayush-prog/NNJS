import React from "react";
import Nav from "../components/Nav";
import mission from "../assets/mission.jpg";
import MissionSection from "../components/MissionSection";
import ObjectivesSection from "../components/ObjectivesSection";
import SpecificObjectives from "../components/SpecificObjectives";
import CoreValues from "../components/CoreValues";
import Footer from "../components/Footer";
import Commitments from "../components/Commitments";

export default function Mission() {
  return (
    <div>
      <Nav />

      <div className="relative w-full h-[450px]">
        <img
          src={mission}
          alt="Our Mission"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold font-secondary">
            Our Mission & Objectives
          </h1>
        </div>
      </div>
      <div className="items-center justify-center flex flex-col text-center mb-12">
        <h1 className="font-secondary text-4xl text-primary font-bold p-5 mt-10">
          One Vision At a Time
        </h1>
        <p className="text-lg font-secondary">
          Our vision is a Nepal where no one is blind from avoidable causes, and
          everyone can access the eye care they need to live a full and
          dignified life.
        </p>
      </div>
      <MissionSection />
      <div className="flex flex-col items-center mb-8">
        <h1 className="font-secondary text-4xl text-primary font-bold p-5 mt-10">
          About NNJS
        </h1>
        <p className="text-lg font-secondary px-20 text-center">
          The Nepal Netra Jyoti Sangh (NNJS) is the central coordinating body
          for eye care in Nepal. It liaises with eye hospitals, the Government
          of Nepal, and national and international organizations to support eye
          health programs and ensure quality standards. NNJS plays a key role in
          program evaluation, resource mobilization, community engagement, and
          promoting self-reliance.
        </p>
      </div>
      <ObjectivesSection />
      <SpecificObjectives />
      <CoreValues />
      <Commitments />
      <Footer />
    </div>
  );
}

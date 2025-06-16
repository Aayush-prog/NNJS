import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FaSpinner className={`animate-spin `} />
      Loading ....
    </div>
  );
}

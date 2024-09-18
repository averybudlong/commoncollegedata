import React from "react";
import { College } from "@/types/College";
import GenderPieChart from "./GenderPieChart";

const DemographicCard: React.FC<College> = (college) => {
  return (
    <div>
      <div className="mr-10 my-4 grid grid-cols-3 gap-6">
        <div className="w-full h-64">
          Applicant Distribution
          <GenderPieChart
            applicants_m={college.applicants_m}
            applicants_w={college.applicants_w}
          />
        </div>
        <div className="w-full h-64">
          Admitted Distribution
          <GenderPieChart
            applicants_m={college.admitted_m}
            applicants_w={college.admitted_w}
          />
        </div>
        <div className="w-full h-64">
          Full-Time Student Distribution
          <GenderPieChart
            applicants_m={college.enrolled_m}
            applicants_w={college.enrolled_w}
          />
        </div>
      </div>
    </div>
  );
};

export default DemographicCard;

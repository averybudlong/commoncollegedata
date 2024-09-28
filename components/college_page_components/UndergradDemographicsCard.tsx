import React from "react";
import { College } from "@/types/College";
import TwoChoicePieChart from "./TwoChoicePieChart";

const UndergradDemographicsCard: React.FC<College> = (college) => {
  return (
    <div>
      <h2 className="mt-2 font-bold text-xl">
        Undergrad Demographics:{" "}
        <span className="font-normal">
          ({college.enrolled.toLocaleString()} students)
        </span>
      </h2>
      <div className="mr-10 my-4 grid grid-cols-3 gap-6">
        <div className="w-full h-64">
          Applicants
          <TwoChoicePieChart
            value1={college.applicants_m}
            value2={college.applicants_w}
            name1="Male"
            name2="Female"
            colors={["#2a71f5", "#f05dc1"]}
          />
        </div>
        <div className="w-full h-64">
          Full-Time Students
          <TwoChoicePieChart
            value1={college.enrolled_m}
            value2={college.enrolled_w}
            name1="Male"
            name2="Female"
            colors={["#2a71f5", "#f05dc1"]}
          />
        </div>
        <div className="w-full h-64">
          International Students
          <TwoChoicePieChart
            value1={college.enrolled - college.non_us}
            value2={college.non_us}
            name1="US"
            name2="International"
            colors={["#969696", "#21c45d"]}
          />
        </div>
      </div>
    </div>
  );
};

export default UndergradDemographicsCard;

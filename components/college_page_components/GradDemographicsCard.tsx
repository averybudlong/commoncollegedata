import React from "react";
import { College } from "@/types/College";
import TwoChoicePieChart from "./TwoChoicePieChart";

const GradDemographicCard: React.FC<College> = (college) => {
  if (college.enrolled_grad === 0) {
    return <div className="mt-2 font-bold text-xl">No Graduate Students</div>;
  }

  return (
    <div>
      <h2 className="mt-2 font-bold text-xl">
        Graduate Demographics:{" "}
        <span className="font-normal">
          ({college.enrolled_grad.toLocaleString()} students)
        </span>
      </h2>
      <div className="mr-10 my-4 grid grid-cols-3 gap-6">
        <div className="w-full h-64">
          Enrolled Graduate Students
          <TwoChoicePieChart
            value1={college.enrolled_grad_m}
            value2={college.enrolled_grad_w}
            name1="Male"
            name2="Female"
            colors={["#2a71f5", "#f05dc1"]}
          />
        </div>
        <div className="w-full h-64">
          International Graduate Students
          <TwoChoicePieChart
            value1={college.non_us_grad_m}
            value2={college.non_us_grad_w}
            name1="Male"
            name2="Female"
            colors={["#2a71f5", "#f05dc1"]}
          />
        </div>
        <div className="w-full h-64">
          International Graduate Students
          <TwoChoicePieChart
            value1={college.enrolled_grad - college.non_us_grad}
            value2={college.non_us_grad}
            name1="US"
            name2="International"
            colors={["#969696", "#21c45d"]}
          />
        </div>
      </div>
    </div>
  );
};

export default GradDemographicCard;

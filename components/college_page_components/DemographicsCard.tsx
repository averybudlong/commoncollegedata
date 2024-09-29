import React from "react";
import { College } from "@/types/College";
import DemographicsPieChart from "./DemographicsPieChart";
import { Demographics } from "@/types/Demographics";

const DemographicsCard: React.FC<College> = (college) => {
  const demographics: Demographics = {
    white: college.white,
    black: college.black,
    asian: college.asian,
    hispanic: college.hispanic,
    american_indian: college.american_indian,
    pacific_islander: college.pacific_islander,
    multiple_races: college.multiple_races,
    unknown_race: college.unknown_race,
  };

  return (
    <div>
      <h2 className="mt-8 font-bold text-xl">Undergrad Demographics</h2>
      <div className="w-full h-[32rem]">
        <DemographicsPieChart {...demographics} />
      </div>
    </div>
  );
};

export default DemographicsCard;

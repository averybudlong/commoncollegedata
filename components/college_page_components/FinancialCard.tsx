import HorizontalBarChart from "@/components/college_page_components/HorizontalBarChart";
import { College } from "@/types/College";
import React from "react";

// These are averages for financial data for the 999 colleges in the dataset
const AVGREVENUEPRIV = 236550134;
const ENDOWMENTPERCAPITAPRIV = 147629;
const INSTRUCTIONPERCAPITAPRIV = 15241;
const RESEARCHPERCAPITAPRIV = 3045;

const AVGREVENUEPUB = 557278869;
const ENDOWMENTPERCAPITAPUB = 19498;
const INSTRUCTIONPERCAPITAPUB = 11538;
const RESEARCHPERCAPITAPUB = 3832;

const FinancialCard: React.FC<College> = (college) => {
  const isPublic = !!college.revenue_pub;
  return (
    <div>
      <h2 className="my-8 font-bold text-xl">Financial Data</h2>
      <div className="mr-10 my-4 grid grid-cols-2 gap-6">
        <HorizontalBarChart
          data={[
            {
              name: "Endowment Per Capita",
              value: isPublic
                ? college.endowment_per_capita_pub
                : college.endowment_per_capita_priv,
            },
            {
              name: "AVG Endowment Public",
              value: ENDOWMENTPERCAPITAPUB,
            },
            {
              name: "AVG Endowment Private",
              value: ENDOWMENTPERCAPITAPRIV,
            },
          ]}
          title={"Endowment Per Capita"}
        />

        <HorizontalBarChart
          data={[
            {
              name: "Revenue",
              value: isPublic ? college.revenue_pub : college.revenue_priv,
            },
            {
              name: "AVG Revenue Public",
              value: AVGREVENUEPUB,
            },
            {
              name: "AVG Revenue Private",
              value: AVGREVENUEPRIV,
            },
          ]}
          title={"Core Revenue"}
        />

        <HorizontalBarChart
          data={[
            {
              name: "Instruction Expense Per Capita",
              value: isPublic
                ? college.instruction_per_capita_pub
                : college.instruction_per_capita_priv,
            },
            {
              name: "AVG Instruction Expense Public",
              value: INSTRUCTIONPERCAPITAPUB,
            },
            {
              name: "AVG Instruction Expense Private",
              value: INSTRUCTIONPERCAPITAPRIV,
            },
          ]}
          title={"Instruction Spending Per Capita"}
        />

        <HorizontalBarChart
          data={[
            {
              name: "Research Expense Per Capita",
              value: isPublic
                ? college.research_per_capita_pub
                : college.research_per_capita_priv,
            },
            {
              name: "AVG Research Expense Public",
              value: RESEARCHPERCAPITAPUB,
            },
            {
              name: "AVG Research Expense Private",
              value: RESEARCHPERCAPITAPRIV,
            },
          ]}
          title={"Research Spending Per Capita"}
        />
      </div>
    </div>
  );
};

export default FinancialCard;

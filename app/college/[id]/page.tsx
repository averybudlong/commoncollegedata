import { getCollege } from "@/app/utils/supabaseUtils";
import EnrollmentSankey from "@/components/college_page_components/EnrollmentSankey";
import AdmissionCard from "@/components/college_page_components/AdmissionCard";
import LinksCard from "@/components/college_page_components/LinksCard";
import GeneralCard from "@/components/college_page_components/GeneralCard";
import HorizontalBarChart from "@/components/college_page_components/HorizontalBarChart";
import { College } from "@/types/College";

// These are averages for financial data for the 999 colleges in the dataset
const AVGREVENUEPRIV = 236550134;
const ENDOWMENTPERCAPITAPRIV = 147629;
const INSTRUCTIONPERCAPITAPRIV = 15241;
const RESEARCHPERCAPITAPRIV = 3045;

const AVGREVENUEPUB = 557278869;
const ENDOWMENTPERCAPITAPUB = 19498;
const INSTRUCTIONPERCAPITAPUB = 11538;
const RESEARCHPERCAPITAPUB = 3832;

// the id is the urlName
export default async function CollegePage({
  params,
}: {
  params: { id: number };
}) {
  const collegeData = await getCollege(params.id);

  if (!collegeData) {
    return <div>College not found</div>;
  }

  const college: College = collegeData;
  const isPublic = !!college.revenue_pub;

  const data = Object.entries(college).map(([propertyName, val]) => (
    <li key={propertyName}>{`${propertyName}: ${val}`}</li>
  ));

  return (
    <>
      <h1 className="font-black mt-6 mb-2 text-left text-3xl">
        {college.name}
      </h1>

      <div className="container mx-auto px-4 py-8">
        <h2 className="font-bold">Admission Data</h2>
        <EnrollmentSankey
          applicants={college.applicants}
          admitted={college.admitted}
          enrolled={college.enrolled_cycle}
        />
      </div>

      <div className="mb-4 mr-10 min-w-[48rem] w-auto grid gap-6 grid-cols-3">
        {/* revenue_pub will be null if its a private university */}
        <GeneralCard
          city={college.city}
          state={college.state}
          name={college.name}
          revenue_pub={college.revenue_pub}
        />
        <AdmissionCard
          applicants={college.applicants}
          admitted={college.admitted}
          enrolled_cycle={college.enrolled_cycle}
        />
        <LinksCard
          website={college.website}
          app_website={college.app_website}
        />
      </div>

      <div>
        <h2 className="my-8 font-bold">Financial Data</h2>
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
    </>
  );
}

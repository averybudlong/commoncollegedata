import { getCollege } from "@/app/utils/supabaseUtils";
import EnrollmentSankey from "@/components/college_page_components/EnrollmentSankey";
import AdmissionCard from "@/components/college_page_components/AdmissionCard";
import LinksCard from "@/components/college_page_components/LinksCard";
import GeneralCard from "@/components/college_page_components/GeneralCard";
import FinancialCard from "@/components/college_page_components/FinancialCard";
import StandardizedTestingCard from "@/components/college_page_components/StandardizedTestingCard";
import UndergradDemographicsCard from "@/components/college_page_components/UndergradDemographicsCard";
import GradDemographicCard from "@/components/college_page_components/GradDemographicsCard";
import { College } from "@/types/College";

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

  const data = Object.entries(college).map(([propertyName, val]) => (
    <li key={propertyName}>{`${propertyName}: ${val}`}</li>
  ));

  let policyMessage;
  if (college.standardized_test === 1) {
    policyMessage = "Required to be considered for admission";
  } else if (college.standardized_test === 3) {
    policyMessage = "Not considered for admission, even if submitted";
  } else if (college.standardized_test === 5) {
    policyMessage = "Not required for admission, but considered if submitted";
  } else {
    policyMessage = "Unknown Policy";
  }

  return (
    <>
      <h1 className="font-black mt-6 mb-2 text-left text-3xl">
        {college.name}
      </h1>

      <div className="container mx-auto px-4 py-8">
        <h2 className="font-bold text-xl">Admission Data</h2>
        <EnrollmentSankey
          applicants={college.applicants}
          admitted={college.admitted}
          enrolled={college.enrolled_cycle}
        />
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="mb-4 mr-10 min-w-[48rem] w-auto grid gap-6 grid-cols-3">
          {/* revenue_pub will be null if its a private university */}
          <GeneralCard
            city={college.city}
            state={college.state}
            name={college.name}
            revenue_pub={college.revenue_pub}
            longitude={college.longitude}
            latitude={college.latitude}
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
      </div>

      <div className="container mx-auto px-4 py-4">
        <FinancialCard {...college} />
      </div>

      <div className="container mx-auto px-4 py-4">
        <h2 className="mt-8 font-bold text-xl">Standardized Testing</h2>
        <h3 className="font-semibold text-[hsl(var(--accent))] text-center">
          {policyMessage}
        </h3>
        <div className="mr-10 my-4 grid grid-cols-2 gap-6">
          <StandardizedTestingCard
            name="SAT"
            percentile25={college.sat_m25 + college.sat_rw25}
            percentile50={college.sat_m50 + college.sat_rw50}
            percentile75={college.sat_m75 + college.sat_rw75}
            percentSubmitted={college.sat_pct}
          />
          <StandardizedTestingCard
            name="ACT"
            percentile25={college.act25}
            percentile50={college.act50}
            percentile75={college.act75}
            percentSubmitted={college.act_pct}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="my-8">
          <UndergradDemographicsCard {...college} />
        </div>

        <div className="mt-16">
          <GradDemographicCard {...college} />
        </div>
      </div>
    </>
  );
}

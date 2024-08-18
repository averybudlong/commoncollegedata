import { getCollege } from "@/app/utils/supabaseUtils";
import EnrollmentSankey from "@/components/collegePageComponents/EnrollmentSankey";
import AdmissionCard from "@/components/collegePageComponents/AdmissionCard";
import LinksCard from "@/components/collegePageComponents/LinksCard";
import GeneralCard from "@/components/collegePageComponents/GeneralCard";
import { College } from "@/types/College"

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

  const college: College = collegeData

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

      <div className="mb-4 min-w-[48rem] w-auto grid gap-6 grid-cols-4">
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

      <div className="container mx-auto px-4 py-8">{data}</div>
    </>
  );
}

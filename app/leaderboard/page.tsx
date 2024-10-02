import {
  getAllColleges,
  getTopCollegesByEndowment,
} from "@/app/utils/supabaseUtils";
import LeaderboardClient from "./LeaderboardClient";

// Makes sure the database is only queried once at build time
export const dynamic = "force-static";

export default async function leaderboardPage() {
  const colleges = await getAllColleges();
  const topColleges = await getTopCollegesByEndowment(100);

  return <LeaderboardClient colleges={colleges} topColleges={topColleges} />;
}

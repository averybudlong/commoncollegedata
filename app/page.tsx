import { getAllColleges } from "@/app/utils/supabaseUtils";
import HomeClient from "./HomeClient";

// Makes sure the database is only queried once at build time
export const dynamic = "force-static";

export default async function Home() {
  const colleges = await getAllColleges();

  return <HomeClient initialColleges={colleges} />;
}

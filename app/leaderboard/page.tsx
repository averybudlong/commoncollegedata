import React from "react";
import LeaderboardSearchBar from "@/components/LeaderboardSearchBar";
import { getAllColleges } from "@/app/utils/supabaseUtils";

// Makes sure the database is only queried once at build time
export const dynamic = "force-static";

export default async function leaderboardPage() {
  const colleges = await getAllColleges();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">College Leaderboard</h1>
      <LeaderboardSearchBar colleges={colleges} />
    </div>
  );
}

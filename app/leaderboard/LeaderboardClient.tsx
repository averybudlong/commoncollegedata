"use client";

import React, { useState, useMemo } from "react";
import LeaderboardSearchBar from "./components/LeaderboardSearchBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BasicCollege } from "@/types/BasicCollege";
import { LeaderboardCollege } from "@/types/LeaderboardCollege";
import { getCollege } from "@/app/utils/supabaseUtils";
import LeaderboardChart from "./components/LeaderboardChart";

interface LeaderboardClientProps {
  colleges: BasicCollege[];
  topColleges: LeaderboardCollege[];
}

export default function LeaderboardClient({
  colleges,
  topColleges,
}: LeaderboardClientProps) {
  const [numColleges, setNumColleges] = useState(10);
  const [input, setInput] = useState("10");
  const [error, setError] = useState("");
  const [selectedCollege, setSelectedCollege] =
    useState<LeaderboardCollege | null>(null);

  const data = useMemo(() => {
    const currentColleges = topColleges.slice(0, numColleges);
    let chartData = currentColleges.map((college) => ({
      name: college.name,
      value: college.value,
    }));

    if (selectedCollege) {
      // Add the selected college to the chart data
      chartData.push({
        name: `${selectedCollege.name} (Selected)`,
        value: selectedCollege.value,
      });

      // Sort the data to maintain the order
      chartData.sort((a, b) => b.value - a.value);
    }

    return chartData;
  }, [topColleges, numColleges, selectedCollege]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(input);
    if (num > 0 && num <= 100) {
      setNumColleges(num);
      setError("");
    } else {
      setError("Enter a number between 1 and 100");
    }
  };

  const handleCollegeSelect = async (collegeId: number) => {
    try {
      const college = await getCollege(collegeId);
      if (college) {
        const endowmentValue = college.revenue_pub
          ? college.endowment_per_capita_pub
          : college.endowment_per_capita_priv;
        setSelectedCollege({
          id: college.id,
          name: college.name,
          value: endowmentValue,
        });
      }
    } catch (error) {
      console.error("Error fetching college data:", error);
      setError("Failed to fetch college data");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">College Leaderboard</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm items-center space-x-2 mb-2"
      >
        <Input
          type="search"
          value={input}
          onChange={handleInputChange}
          placeholder="Number of colleges"
        />
        <Button type="submit">Update</Button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      <LeaderboardChart data={data} title={"Endowment Per Capita"} />

      <div className="mt-4">
        <LeaderboardSearchBar
          colleges={colleges}
          onCollegeSelect={handleCollegeSelect}
        />
      </div>
    </div>
  );
}

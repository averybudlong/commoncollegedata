"use client";

import React, { useState, useMemo } from "react";
import LeaderboardSearchBar from "@/components/LeaderboardSearchBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BasicCollege } from "@/types/BasicCollege";
import { LeaderboardCollege } from "@/types/LeaderboardCollege";
import { getCollege } from "@/app/utils/supabaseUtils";

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

  const currentColleges = useMemo(() => {
    return topColleges.slice(0, numColleges);
  }, [topColleges, numColleges]);

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

      <ol className="list-decimal list-inside mb-8">
        {currentColleges.map((college, i) => (
          <li key={college.id} className="mb-1">
            {college.name}: ${college.value.toLocaleString()}
          </li>
        ))}
      </ol>

      <LeaderboardSearchBar
        colleges={colleges}
        onCollegeSelect={handleCollegeSelect}
      />

      {selectedCollege && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">
            Selected College Endowment
          </h2>
          <p>
            {selectedCollege.name}: ${selectedCollege.value.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

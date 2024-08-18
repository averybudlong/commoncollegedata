"use client";

import SearchBar from "../components/SearchBar";
import CollegeCard from "../components/CollegeCard";
import { Courier_Prime } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { College } from "@/types/College";
import { Button } from "@/components/ui/button";

const CARDS_PER_PAGE = 12;

interface HomeClientProps {
  initialColleges: College[];
}

const courierPrime = Courier_Prime({ subsets: ["latin"], weight: "700" });

export default function HomeClient({ initialColleges }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredColleges = useMemo(() => {
    return initialColleges.filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialColleges, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const displayedColleges = filteredColleges.slice(0, page * CARDS_PER_PAGE);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="mx-4">
        <h1
          className={`
          ${courierPrime.className} 
          text-5xl
          font-bold 
          mb-4 mt-8 
          pb-2
          text-center sm:text-left
          whitespace-nowrap
          overflow-hidden
          tracking-wider
        `}
        >
          common<span className="text-[hsl(var(--accent))]">/</span>college
          <span className="text-[hsl(var(--accent))]">/</span>data
        </h1>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-4 grid gap-4 grid-cols-3 xl:grid-cols-4">
          {displayedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
        {filteredColleges.length > page * CARDS_PER_PAGE && (
          <div>
            <Button
              className="mt-8 mb-4 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--hover-button-text))]"
              onClick={loadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
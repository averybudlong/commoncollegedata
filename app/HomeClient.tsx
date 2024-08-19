"use client";

import SearchBar from "../components/SearchBar";
import SemanticSearcBar from "../components/SemanticSearchBar";
import CollegeCard from "../components/CollegeCard";
import { Courier_Prime } from "next/font/google";
import React, { useEffect, useMemo, useState } from "react";
import { College } from "@/types/College";
import { Button } from "@/components/ui/button";

const CARDS_PER_PAGE = 24;

interface HomeClientProps {
  initialColleges: College[];
}

interface SearchResult {
  id: number;
  name: string;
  similarity: number;
}

const courierPrime = Courier_Prime({ subsets: ["latin"], weight: "700" });

type SearchType = "keyword" | "semantic";

export default function HomeClient({ initialColleges }: HomeClientProps) {
  const [keywordSearchTerm, setKeywordSearchTerm] = useState("");
  const [semanticSearchResults, setSemanticSearchResults] = useState<
    SearchResult[]
  >([]);
  const [lastUsedSearch, setLastUsedSearch] = useState<SearchType>("keyword");
  const [page, setPage] = useState(1);

  const filteredColleges = useMemo(() => {
    if (lastUsedSearch === "semantic") {
      return initialColleges.filter((college) =>
        semanticSearchResults.some((result) => result.id === college.id)
      );
    } else {
      return initialColleges.filter((college) =>
        college.name.toLowerCase().includes(keywordSearchTerm.toLowerCase())
      );
    }
  }, [
    initialColleges,
    keywordSearchTerm,
    semanticSearchResults,
    lastUsedSearch,
  ]);

  useEffect(() => {
    setPage(1);
  }, [keywordSearchTerm, semanticSearchResults]);

  const handleKeywordSearch = (term: string) => {
    setKeywordSearchTerm(term);
    setLastUsedSearch("keyword");
  };

  const handleSemanticSearchResults = (results: SearchResult[]) => {
    setSemanticSearchResults(results);
    setLastUsedSearch("semantic");
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

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <SearchBar onSearch={handleKeywordSearch} />
          </div>
          <div className="flex-1">
            <SemanticSearcBar onSearchResults={handleSemanticSearchResults} />
          </div>
        </div>

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

import React, { Dispatch, SetStateAction } from "react";

interface SearchResult {
  id: number;
  name: string;
  similarity: number;
}

export const handleSemanticSearch = async (
  query: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setResults: (results: SearchResult[]) => void
) => {
  setIsLoading(true);
  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, limit: 24 }),
    });
    if (!response.ok) {
      throw new Error("Search request failed");
    }

    const data: SearchResult[] = await response.json();
    setResults(data);
  } catch (error) {
    console.error("Error performing Search:", error);
  } finally {
    setIsLoading(false);
  }
};

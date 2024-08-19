import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import { handleSemanticSearch } from "../app/utils/searchUtils";

interface SearchResult {
  id: number;
  name: string;
  similarity: number;
}

interface SemanticSearchBarProps {
  onSearchResults: (results: SearchResult[]) => void;
}

const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({
  onSearchResults,
}) => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSemanticSearch(query, setIsLoading, (results) => {
      onSearchResults(results);
      setQuery(""); // Clear the input after search
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div className="relative flex-grow">
        <Input
          type="search"
          placeholder="Semantic Search"
          className="pl-4 pr-10"
          value={query}
          onChange={handleInputChange}
        />
        <IconSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Button
        type="submit"
        className="ml-2 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--hover-button-text))]"
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default SemanticSearchBar;

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";

interface SemanticSearchBarProps {
  onSearch: (term: string) => void;
}

const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchterm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchterm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div className="relative flex-grow">
        <Input
          type="search"
          placeholder="Semantic Search"
          className="pl-4 pr-10"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <IconSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Button
        type="submit"
        className="ml-2 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--hover-button-text))]"
      >
        Search
      </Button>
    </form>
  );
};

export default SemanticSearchBar;

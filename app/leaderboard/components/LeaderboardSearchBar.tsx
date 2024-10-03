import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import debounce from "lodash/debounce";
import { BasicCollege } from "@/types/BasicCollege";

interface LeaderboardSearchBarProps {
  colleges: BasicCollege[];
  onCollegeSelect: (collegeId: number) => void;
}

const LeaderboardSearchBar: React.FC<LeaderboardSearchBarProps> = ({
  colleges,
  onCollegeSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchingColleges, setMatchingColleges] = useState<BasicCollege[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        const matches = colleges
          .filter((college) =>
            college.name.toLowerCase().includes(term.toLowerCase())
          )
          .slice(0, 10); // Limit to 5 results
        setMatchingColleges(matches);
      }, 100),
    [colleges]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleCollegeSelect = (college: BasicCollege) => {
    setSearchTerm(college.name);
    setMatchingColleges([]);
    onCollegeSelect(college.id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-64" ref={searchBarRef}>
      <Input
        type="search"
        placeholder="Add College to Compare"
        className="pl-4 pr-10"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsSearchFocused(true)}
      />
      <IconSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {isSearchFocused && matchingColleges.length > 0 && (
        <div className="absolute z-10 w-full bg-background border border-input rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
          <ul className="py-1">
            {matchingColleges.map((college) => (
              <li
                key={college.id}
                className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm"
                onClick={() => handleCollegeSelect(college)}
              >
                {college.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeaderboardSearchBar;

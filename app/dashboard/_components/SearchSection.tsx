import React from "react";
import { Search } from "lucide-react";

interface SearchSectionProps {
  onSearchInput: (value: string) => void;
}

function SearchSection({ onSearchInput }: SearchSectionProps) {
  return (
    <div className="p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white">
      <h2 className="text-3xl font-bold">Browse for games</h2>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[30%]">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => onSearchInput(event.target.value)}
            className="bg-transparent w-full outline-none text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;

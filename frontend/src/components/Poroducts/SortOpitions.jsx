import React from "react";
import { useSearchParams } from "react-router-dom";

function SortOpitions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-end mb-5">
      <select
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="text-sm border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-accent transition-colors cursor-pointer"
      >
        <option value="">Sort: Default</option>
        <option value="PriceAsc">Price: Low to High</option>
        <option value="PriceDesc">Price: High to Low</option>
        <option value="Popularity">Popularity</option>
      </select>
    </div>
  );
}

export default SortOpitions;

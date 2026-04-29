import { useSearchParams } from "react-router-dom";

function SortOpitions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-end mb-8">
      <select
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="text-[11px] font-medium tracking-widest uppercase border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-neutral-600 dark:text-neutral-300 px-4 py-2 focus:outline-none focus:border-primary dark:focus:border-white transition-colors cursor-pointer"
      >
        <option value="">Sort</option>
        <option value="PriceAsc">Price: Low — High</option>
        <option value="PriceDesc">Price: High — Low</option>
        <option value="Popularity">Popularity</option>
      </select>
    </div>
  );
}

export default SortOpitions;

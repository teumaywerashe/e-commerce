import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SortOpitions() {


  const [searchParams,setSearchParams]=useSearchParams()
  // const [sort, setSort] = useState(searchParams.get('sort')||'defualt');
  const handleSortChange = (e) => {
   const sortedBy=e.target.value;
   searchParams.set('sortedBy',sortedBy)
   setSearchParams(searchParams)
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        name="sort"
        onChange={handleSortChange}
        id="sort"
        value={searchParams.get('sortedBy')||''}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Defualt</option>
        <option value="PriceAsc">Price: Low to High</option>
        <option value="PriceDesc">Price: High to Low</option>
        <option value="Popularity">Popularity</option>
      </select>
    </div>
  );
}

export default SortOpitions;

import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/slice/productSlice";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-white/95 dark:bg-gray-950/95">
          <form onSubmit={handleSearch} className="w-full max-w-lg">
            <div className="flex items-center border-b border-primary dark:border-white pb-3 gap-3">
              <HiMagnifyingGlass className="h-4 w-4 text-neutral-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-sm text-primary dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none bg-transparent tracking-wide"
              />
              <button type="button" onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-primary dark:hover:text-white cursor-pointer transition-colors">
                <HiMiniXMark className="h-5 w-5" />
              </button>
            </div>
            {searchTerm && (
              <button type="submit"
                className="mt-6 bg-primary dark:bg-white text-white dark:text-gray-900 text-[11px] font-semibold tracking-widest2 uppercase px-6 py-3 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer">
                Search "{searchTerm}"
              </button>
            )}
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="text-neutral-600 hover:text-primary transition-colors cursor-pointer">
          <HiMagnifyingGlass className="h-[18px] w-[18px]" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

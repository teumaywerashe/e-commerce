import React, { useState } from "react";
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm">
          <form
            onSubmit={handleSearch}
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-5 py-4 gap-3">
              <HiMagnifyingGlass className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-sm text-primary placeholder-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors cursor-pointer"
              >
                <HiMiniXMark className="h-5 w-5" />
              </button>
            </div>
            {searchTerm && (
              <div className="px-5 pb-4">
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Search "{searchTerm}"
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
        >
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

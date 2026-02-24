import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/slice/productSlice";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };


const dispatch=useDispatch();
const  navigate=useNavigate();

  const handleSearch=(e)=>{
    e.preventDefault();
    dispatch(setFilters({search:searchTerm}))
    dispatch(fetchProductsByFilters({search:searchTerm}))
    navigate(`/collections/all?search=${searchTerm}`)
    setIsOpen(false)
  }
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="search "
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="bg-gray-100 px-4 py-2 pl-2 w-full pr-12 rounded-lg placeholder:text-gray-700 outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
           
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button >
            <button    onClick={handleSearchToggle} type="button" className="absolute top-1/2 -right-7 cursor-pointer transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <HiMiniXMark className="h-6 w-6"/>
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

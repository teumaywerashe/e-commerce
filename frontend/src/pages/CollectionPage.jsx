import React, { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../components/Poroducts/FilterSidebar";
import SortOpitions from "../components/Poroducts/SortOpitions";
import ProductGrid from '../components/Poroducts/ProductGrid'
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";

function CollectionPage() {

  const {collection}=useParams()
  const [searchParams]=useSearchParams()
  const queryParams=Object.fromEntries([...searchParams])
  const dispatch=useDispatch()

  const {products,error,loading}=useSelector(state=>state.products)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebareRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickoutside = (e) => {
    if (sidebareRef.current && !sidebareRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };


  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}))
  },[dispatch,collection,searchParams])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickoutside);
    return () => {
      document.removeEventListener("mousedown", handleClickoutside);
    };
  }, []);


  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border cursor-pointer flex gap-2 justify-center items-center"
      >
        <FiFilter className="mr-2 " /> Filters
      </button>

      <div
        ref={sidebareRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0  `}
      >
        <FilterSidebar />
      </div>
      <div className="grow p-4">
        <h2 className="text-2x1 uppercase mb-4">All collection</h2>
        <SortOpitions/>
 
        <ProductGrid products={products} error={error} loading={loading}/>
      </div>
    </div>
  );
}

export default CollectionPage;

import React, { useEffect, useRef, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import FilterSidebar from "../components/Poroducts/FilterSidebar";
import SortOpitions from "../components/Poroducts/SortOpitions";
import ProductGrid from "../components/Poroducts/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";

function CollectionPage() {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary capitalize">
              {queryParams.gender
                ? `${queryParams.gender}'s Collection`
                : queryParams.category || "All Products"}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {loading ? "Loading..." : `${products.length} products`}
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-primary border border-gray-200 bg-white px-4 py-2 rounded-lg hover:border-primary transition-colors cursor-pointer"
          >
            <FiFilter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-4">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setIsSidebarOpen(false)} />
              <div ref={sidebarRef} className="relative w-72 bg-white h-full overflow-y-auto shadow-2xl z-10">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <span className="font-bold text-primary">Filters</span>
                  <button onClick={() => setIsSidebarOpen(false)} className="cursor-pointer text-gray-500 hover:text-primary">
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            <SortOpitions />
            <ProductGrid products={products} error={error} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;

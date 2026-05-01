import { useEffect, useRef, useState } from "react";
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
  const { products, error, loading } = useSelector((s) => s.products);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  useEffect(() => {
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        setIsSidebarOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const title = queryParams.gender
    ? `${queryParams.gender}'s Collection`
    : queryParams.category || "All Products";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Page header */}
      <div className="border-b border-neutral-100 dark:border-gray-800 py-10 px-6 text-center">
        <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 mb-1">
          Shop
        </p>
        <h1 className="text-2xl font-light tracking-widest uppercase text-primary dark:text-white">
          {title}
        </h1>
        {!loading && (
          <p className="text-[10px] text-neutral-400 mt-2 tracking-widest uppercase">
            {products.length} pieces
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-20">
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile filter button */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 bg-primary text-white text-[10px] font-semibold tracking-widest uppercase px-6 py-3 shadow-lg cursor-pointer"
          >
            <FiFilter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div
              ref={sidebarRef}
              className="relative w-72 bg-white dark:bg-gray-900 h-full overflow-y-auto z-10"
            >
              <div className="flex items-center justify-between px-6 h-14 border-b border-neutral-100 dark:border-gray-800">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-900 dark:text-white">
                  Filter
                </span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="cursor-pointer text-neutral-400 hover:text-primary dark:hover:text-white"
                >
                  <FiX className="h-4 w-4" />
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
  );
}

export default CollectionPage;

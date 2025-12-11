import React, { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../components/Poroducts/FilterSidebar";
import SortOpitions from "../components/Poroducts/SortOpitions";
import ProductGrid from '../components/Poroducts/ProductGrid'

function CollectionPage() {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickoutside);
    return () => {
      document.removeEventListener("mousedown", handleClickoutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "product 1",
          price: 100,
          image: [{ url: "https://picsum.photos/500/500?ramdom=10" }],
        },
        {
          _id: 1,
          name: "product 2",
          price: 100,
          image: [{ url: "https://picsum.photos/500/500?ramdom=11" }],
        },
        {
          _id: 1,
          name: "product 3",
          price: 100,
          image: [{ url: "https://picsum.photos/500/500?ramdom=12" }],
        },
        {
          _id: 1,
          name: "product 4",
          price: 100,
          image: [{ url: "https://picsum.photos/500/500?ramdom=13" }],
        },
        {
          _id: 1,
          name: "product 5",
          price: 100,
          image: [{ url: "https://picsum.photos/500/500?ramdom=14" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
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
 
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default CollectionPage;

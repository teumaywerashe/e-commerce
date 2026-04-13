import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [error, setError] = useState(false);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrival`
        );
        setNewArrivals(response.data.newArivaleProducts);
      } catch {
        setError(true);
      }
    };
    fetchNewArrival();
  }, []);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollButtons);
    return () => el?.removeEventListener("scroll", updateScrollButtons);
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Just Dropped</p>
            <h2 className="text-3xl font-bold text-primary tracking-tight">New Arrivals</h2>
          </div>
          {newArrivals.length > 3 && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  canScrollLeft
                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  canScrollRight
                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm">Failed to load new arrivals.</p>
        )}

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-2"
        >
          {newArrivals.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group min-w-[260px] md:min-w-[300px] flex-shrink-0"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-100 mb-3">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText}
                  className="w-full h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    New
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrival`)
      .then((r) => setNewArrivals(r.data.newArivaleProducts))
      .catch(() => {});
  }, []);

  const scroll = (dir) =>
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });

  const updateBtns = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateBtns);
    return () => el?.removeEventListener("scroll", updateBtns);
  }, [newArrivals]);

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 mb-1">
              Just Dropped
            </p>
            <h2 className="text-xl font-light tracking-widest uppercase text-primary dark:text-white">
              New Arrivals
            </h2>
          </div>
          {newArrivals.length > 3 && (
            <div className="flex gap-2">
              {[
                ["left", canScrollLeft],
                ["right", canScrollRight],
              ].map(([dir, enabled]) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  disabled={!enabled}
                  className={`w-8 h-8 border flex items-center justify-center transition-colors cursor-pointer ${
                    enabled
                      ? "border-primary dark:border-white bg-white dark:bg-transparent text-primary dark:text-white hover:bg-primary dark:hover:bg-white hover:text-white dark:hover:text-gray-900"
                      : "border-neutral-200 dark:border-gray-700 bg-white dark:bg-transparent text-neutral-300 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {dir === "left" ? (
                    <FiChevronLeft className="h-3.5 w-3.5" />
                  ) : (
                    <FiChevronRight className="h-3.5 w-3.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar"
        >
          {newArrivals.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group shrink-0 w-[260px] md:w-[300px]"
            >
              <div className="relative overflow-hidden bg-neutral-50 dark:bg-gray-800 aspect-3/4 mb-3">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-primary dark:bg-white text-white dark:text-gray-900 text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5">
                  New
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wide text-primary dark:text-white line-clamp-1 mb-1">
                {product.name}
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;

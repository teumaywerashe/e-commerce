import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function NewArrivals() {
  const NewArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      image: [
        {
          url: "https://picsum.photos/500/500?ramdom=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Casual Shirt",
      price: 60,
      image: [
        {
          url: "https://picsum.photos/500/500?ramdom=2",
          altText: "Casual Shirt",
        },
      ],
    },
    {
      _id: "3",
      name: "Elegant Dress",
      price: 150,
      image: [
        {
          url: "https://picsum.photos/500/500?ramdom=3",

          altText: "Elegant Dress",
        },
      ],
    },
    {
      _id: "4",
      name: "Running Shoes",
      price: 80,
      image: [
        {
          url: "https://picsum.photos/500/500?ramdom=4",
          altText: "Running Shoes",
        },
      ],
    },
    {
      _id: "5",
      name: "Denim Jeans",
      price: 70,
      image: [
        {
          url: "https://picsum.photos/500/500?ramdom=5",
          altText: "Denim Jeans",
        },
      ],
    },
    {
      _id: "6",
      name: "Leather Handbag",
      price: 200,
      image: [
        {
          url: "https://picsum.photos/500/500?ramdom=6",

          altText: "Leather Handbag",
        },
      ],
    },
    {
      _id: "7",
      name: "Summer Hat",
      price: 35,
      image: [
        {
          url: "https://picsum.photos/500/500?ramdom=7",
          altText: "Summer Hat",
        },
      ],
    },
  ];

  const scrollRef = useRef(null);
  const [isDraggging, setIsDragging] = useState(false);
  const [stateX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButton = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container.addEventListener("scroll", updateScrollButton);
      updateScrollButton();
    }

    // Cleanup function
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButton);
      }
    };
  }, []); // run once on mount

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto relative text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway,freshly added to
          our collection
        </p>
        <div className="absolute right-0 -bottom-12 mb-3 flex space-x-2 ">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-1 cursor-pointer rounded border  ${
              canScrollLeft
                ? "text-black bg-white"
                : "text-gray-400 bg-gray-200"
            }`}
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-1 cursor-pointer rounded border  ${
              canScrollRight
                ? "text-black bg-white"
                : "text-gray-400 bg-gray-200"
            }`}
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="container overflow-x-scroll mx-auto flex space-x-6 relative"
      >
        {NewArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-full sm:min-w-[50%] md:min-w-[300px] lg:min-w-[30%] relative"
          >
            <img
              src={product.image[0]?.url}
              alt={product.image[0].altText}
              className="w-full h-[500px] object-cover mb-4 rounded-lg"
            />
            <div className="absolute bottom-0 right-0 left-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg ">
              <Link to={`/product/${product._id}`} className="block">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 font-bold">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;

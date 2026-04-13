import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

function FeaturedCollection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-0 bg-primary rounded-2xl overflow-hidden shadow-xl">
          {/* Text */}
          <div className="md:w-1/2 p-10 md:p-14 text-center md:text-left">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
              Featured
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Apparel made for your everyday life
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
            </p>
            <Link
              to="/collections/all"
              className="inline-block bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-accent/30"
            >
              Shop the Collection
            </Link>
          </div>
          {/* Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={featured}
              alt="Featured Collection"
              className="w-full h-[380px] md:h-[480px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;

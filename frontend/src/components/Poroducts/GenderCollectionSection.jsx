import React from "react";
import menscollectioImage from "../../assets/mens-collection.webp";
import womenscollectioImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

function GenderCollectionSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary tracking-tight">Shop by Collection</h2>
          <p className="text-gray-500 mt-2 text-sm">Curated styles for every occasion</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Men */}
          <Link to="/collections/all?gender=Men" className="group relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={menscollectioImage}
              alt="Men's Collection"
              className="w-full h-[480px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Men</p>
              <h3 className="text-white text-2xl font-bold mb-3">Men's Collection</h3>
              <span className="inline-flex items-center gap-2 text-white text-sm font-medium bg-white/20 border border-white/50 px-4 py-2 rounded-full group-hover:bg-white group-hover:text-primary transition-all duration-200">
                Shop Now →
              </span>
            </div>
          </Link>

          {/* Women */}
          <Link to="/collections/all?gender=Women" className="group relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={womenscollectioImage}
              alt="Women's Collection"
              className="w-full h-[480px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Women</p>
              <h3 className="text-white text-2xl font-bold mb-3">Women's Collection</h3>
              <span className="inline-flex items-center gap-2 text-white text-sm font-medium bg-white/20 border border-white/50 px-4 py-2 rounded-full group-hover:bg-white group-hover:text-primary transition-all duration-200">
                Shop Now →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;

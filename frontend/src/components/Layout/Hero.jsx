import React from "react";
import heroimage from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroimage}
        className="w-full h-[60vh] md:h-[85vh] object-cover object-center"
        alt="Hero"
      />
      {/* dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-xl">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              New Collection 2025
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-5">
              Vacation<br />Ready
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed">
              Explore our vacation-ready outfits with fast shipping and easy returns.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/collections/all"
                className="bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-accent/30"
              >
                Shop Now
              </Link>
              <Link
                to="/collections/all?gender=Women"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-7 py-3 rounded-full border border-white/50 transition-all duration-200"
              >
                Explore Women
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

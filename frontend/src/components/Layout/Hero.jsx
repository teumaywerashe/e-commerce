import React from "react";
import heroimage from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="relative">
      <img
        src={heroimage}
        className="w-full h-[400px] md:h-[80vh] lg:h-full object-cover "
        alt="Hero"
      />
      <div className="absolute inset-0 bg-opacity-5 flex items-center justify-center ">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl text-white font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation-ready outfit with fast shipping and easy
            returns.
          </p>
          <Link
            to="/collections/all"
            className="bg-white text-gray-950 px-4 py-2 rounded-sm text-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;

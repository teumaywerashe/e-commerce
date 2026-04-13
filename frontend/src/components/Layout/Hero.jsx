import { Link } from "react-router-dom";
import heroimage from "../../assets/rabbit-hero.webp";

function Hero() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <img src={heroimage} alt="Hero" className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center px-6">
        <p className="text-[10px] font-medium tracking-widest3 uppercase text-white/70 mb-4">
          Collection 2025
        </p>
        <h1 className="text-5xl md:text-7xl font-light tracking-widest text-white uppercase mb-8 leading-none">
          Vacation<br />Ready
        </h1>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/collections/all"
            className="text-[11px] font-semibold tracking-widest2 uppercase bg-white text-primary px-8 py-3 hover:bg-neutral-100 transition-colors duration-200"
          >
            Shop Now
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-[11px] font-semibold tracking-widest2 uppercase bg-primary text-white px-8 py-3 hover:bg-neutral-800 transition-colors duration-200"
          >
            Women
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;

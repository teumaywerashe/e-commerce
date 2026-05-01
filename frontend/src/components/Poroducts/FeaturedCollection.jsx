import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

function FeaturedCollection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-[500px] object-cover"
          />
        </div>
        {/* Text */}
        <div className="bg-primary flex flex-col justify-center px-12 py-16">
          <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-500 mb-4">
            Featured
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-white leading-tight mb-6">
            Everyday
            <br />
            Essentials
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-xs">
            High-quality, comfortable clothing that effortlessly blends fashion
            and function.
          </p>
          {/* solid white button — always visible */}
          <Link
            to="/collections/all"
            className="self-start text-[11px] font-semibold tracking-widest2 uppercase bg-white text-primary px-8 py-3 hover:bg-neutral-100 transition-colors duration-200"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;

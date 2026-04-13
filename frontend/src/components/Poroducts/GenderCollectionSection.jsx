import { Link } from "react-router-dom";
import menscollectioImage from "../../assets/mens-collection.webp";
import womenscollectioImage from "../../assets/womens-collection.webp";

const collections = [
  { label: "Men", to: "/collections/all?gender=Men", img: menscollectioImage, alt: "Men's Collection" },
  { label: "Women", to: "/collections/all?gender=Women", img: womenscollectioImage, alt: "Women's Collection" },
];

function GenderCollectionSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 text-center mb-2">Collections</p>
        <h2 className="text-xl font-light tracking-widest uppercase text-center text-primary mb-12">Shop by Gender</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((c) => (
            <Link key={c.label} to={c.to} className="group relative overflow-hidden block">
              <img
                src={c.img}
                alt={c.alt}
                className="w-full h-[560px] object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-widest3 uppercase text-white/60 mb-1">{c.label}</p>
                  <h3 className="text-2xl font-light tracking-widest uppercase text-white">{c.label}'s Collection</h3>
                </div>
                {/* solid white button — always visible */}
                <span className="text-[10px] font-semibold tracking-widest2 uppercase bg-white text-primary px-5 py-2.5 group-hover:bg-neutral-100 transition-colors duration-200">
                  Shop →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;

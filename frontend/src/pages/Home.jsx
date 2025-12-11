import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Poroducts/GenderCollectionSection";
import NewArrivals from "../components/Poroducts/NewArrivals";
import ProductDetails from "../components/Poroducts/ProductDetails";
import ProductGrid from "../components/Poroducts/ProductGrid";
import FeaturedCollection from "../components/Poroducts/featuredCollection";
import FeaturesSection from "../components/Poroducts/featuresSection";

const placeHolderProducts =
 [
  {
    _id: 1,
    name: "product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=10" }],
  },
  {
    _id: 1,
    name: "product 2",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=11" }],
  },
  {
    _id: 1,
    name: "product 3",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=12" }],
  },
  {
    _id: 1,
    name: "product 4",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=13" }],
  },
  {
    _id: 1,
    name: "product 5",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=14" }],
  },
];

function Home() {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
      <div className="container mx-auto ">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid products={placeHolderProducts} />
      </div>
      <FeaturedCollection/>
      <FeaturesSection/>
    </div>
  );
}

export default Home;

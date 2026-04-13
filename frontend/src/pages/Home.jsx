import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Poroducts/GenderCollectionSection";
import NewArrivals from "../components/Poroducts/NewArrivals";
import ProductDetails from "../components/Poroducts/ProductDetails";
import ProductGrid from "../components/Poroducts/ProductGrid";
import FeaturedCollection from "../components/Poroducts/FeaturedCollection";
import FeaturesSection from "../components/Poroducts/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((s) => s.products);
  const [bestSeller, setBestSeller] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ gender: "Women", category: "Top Wear", limit: 8 }));
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`)
      .then((r) => setBestSeller(r.data.bestSellerProduct))
      .catch(() => {});
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <section className="py-20 border-t border-neutral-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 text-center mb-2">Top Pick</p>
          <h2 className="text-xl font-light tracking-widest uppercase text-center text-primary mb-12">Best Seller</h2>
          <ProductDetails productId={bestSeller?._id} error={error} loading={loading} />
        </div>
      </section>

      {/* Women's Top Wear */}
      <section className="py-20 border-t border-neutral-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 text-center mb-2">For Her</p>
          <h2 className="text-xl font-light tracking-widest uppercase text-center text-primary mb-12">Top Wear</h2>
          <ProductGrid loading={loading} error={error} products={products} />
        </div>
      </section>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
}

export default Home;

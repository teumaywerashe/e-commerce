import React, { useEffect, useState } from "react";
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
  const { products, error, loading } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ gender: "Women", category: "Top Wear", limit: 8 }));

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`);
        setBestSellerProduct(response.data.bestSellerProduct);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <section className="py-10 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Top Pick</p>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Best Seller</h2>
          </div>
          <ProductDetails productId={bestSellerProduct?._id} error={error} loading={loading} />
        </div>
      </section>

      {/* Women's Top Wear */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">For Her</p>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Top Wear for Women</h2>
          </div>
          <ProductGrid loading={loading} error={error} products={products} />
        </div>
      </section>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
}

export default Home;

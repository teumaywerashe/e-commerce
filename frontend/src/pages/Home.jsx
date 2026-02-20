import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Poroducts/GenderCollectionSection";
import NewArrivals from "../components/Poroducts/NewArrivals";
import ProductDetails from "../components/Poroducts/ProductDetails";
import ProductGrid from "../components/Poroducts/ProductGrid";
import FeaturedCollection from "../components/Poroducts/featuredCollection";
import FeaturesSection from "../components/Poroducts/featuresSection";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slice/productSlice";
import axios from "axios";
function Home() {
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector((state) => state.products);

  const [bestSellereProduct, setBestSellereProduct] = useState(null);
  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      }),
    );

    const fetchbestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`,
        );
        setBestSellereProduct(response.data.bestSellerProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchbestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellereProduct ? (
        <ProductDetails productId={bestSellereProduct._id} />
      ) : (
        <p className="text-center"> Loading best seller product...</p>
      )}

      <div className="container mx-auto ">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid loading={loading} error={error} products={products} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/CartSlice";

function ProductDetails({ error, loading, productId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const { selectedProduct, similarProducts } = useSelector((state) => state.products);

  const productFetchId = productId || id;

  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color", { duration: 1500 });
      return;
    }
    setIsButtonDisabled(true);
    dispatch(
      addToCart({ productId: productFetchId, quantity, size: selectedSize, color: selectedColor, guestId, userId: user?._id })
    )
      .then(() => toast.success("Added to cart!", { duration: 1000 }))
      .catch(() => toast.error("Failed to add to cart"))
      .finally(() => setIsButtonDisabled(false));
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 bg-gray-200 rounded-2xl h-[500px]" />
        <div className="md:w-1/2 space-y-4">
          <div className="bg-gray-200 rounded h-8 w-3/4" />
          <div className="bg-gray-200 rounded h-6 w-1/4" />
          <div className="bg-gray-200 rounded h-24 w-full" />
        </div>
      </div>
    </div>
  );

  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (!selectedProduct) return null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-3 w-20">
          {selectedProduct.images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImage(img)}
              className={`rounded-lg overflow-hidden border-2 transition-all ${
                mainImage?.url === img.url ? "border-accent" : "border-transparent"
              }`}
            >
              <img src={img.url} alt={img.altText} className="w-20 h-20 object-cover" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="md:w-[45%]">
          {mainImage && (
            <div className="rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={mainImage.url}
                alt={mainImage.altText}
                className="w-full h-[520px] object-cover"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:w-[45%] flex flex-col justify-start">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-2">
            {selectedProduct.brand}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
            {selectedProduct.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            {selectedProduct.discountPrice ? (
              <>
                <span className="text-2xl font-bold text-primary">${selectedProduct.discountPrice}</span>
                <span className="text-lg text-gray-400 line-through">${selectedProduct.price}</span>
                <span className="bg-blue-50 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">
                  Save ${(selectedProduct.price - selectedProduct.discountPrice).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">${selectedProduct.price}</span>
            )}
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">{selectedProduct.description}</p>

          {/* Color */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-primary mb-2">
              Color: <span className="font-normal text-gray-500">{selectedColor || "Select"}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.colors?.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color ? "border-accent scale-110 shadow-md" : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-primary mb-2">Size:</p>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.sizes?.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                    selectedSize === size
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary mb-2">Quantity:</p>
            <div className="flex items-center gap-3">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity((p) => Math.max(p - 1, 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-medium hover:border-primary disabled:opacity-40 transition-all cursor-pointer"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-primary">{quantity}</span>
              <button
                onClick={() => setQuantity((p) => p + 1)}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-medium hover:border-primary transition-all cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
              isButtonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-accent hover:bg-blue-600 text-white shadow-lg hover:shadow-accent/30"
            }`}
          >
            {isButtonDisabled ? "Adding..." : "Add to Cart"}
          </button>

          {/* Specs */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-primary mb-3">Product Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ["Brand", selectedProduct.brand],
                ["Material", selectedProduct.material],
                ["Category", selectedProduct.category],
                ["Gender", selectedProduct.gender],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
                  <span className="text-primary font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar products */}
      {similarProducts?.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">You May Also Like</h2>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

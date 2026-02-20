import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/CartSlice";

function ProductDetails({ productId }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, guestId } = useSelector((state) => state.auth);
  const { selectedProduct, similarProducts, error, loading } = useSelector(
    (state) => state.products,
  );

  const productFetchId = productId || id;

  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Fetch product & similar products
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  // Set main image after product loads
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color before adding to cart", {
        duration: 1000,
      });
      console.log(selectedColor, selectedSize);
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      }),
    )
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .catch(() => toast.error("failled adding to cart"))
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!selectedProduct) return null;

  return (
    <div className="p-6">
      <div className="max-w-6xl bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                onClick={() => setMainImage(img)}
                alt={img.altText || "Product Image"}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage?.url === img.url
                    ? "border-black border-4"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            {mainImage && (
              <img
                src={mainImage.url}
                alt={mainImage.altText || "Product Image"}
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl capitalize font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            {selectedProduct.originalPrice && (
              <p className="text-lg text-gray-600 line-through">
                ${selectedProduct.originalPrice}
              </p>
            )}

            <p className="text-xl text-gray-500 mb-2">
              ${selectedProduct.price}
            </p>

            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Colors */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors?.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes?.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-2 py-1 bg-gray-400 text-white rounded"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-2 py-1 bg-gray-400 text-white rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            {/* Characteristics */}
            <div className="mb-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

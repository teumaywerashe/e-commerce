import React, { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const similarProducts = [
  {
    _id: 1,
    name: "product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=10" }],
  }, {
    _id: 1,
    name: "product 2",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=11" }],
  }, {
    _id: 1,
    name: "product 3",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=12" }],
  }, {
    _id: 1,
    name: "product 4",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=13" }],
  }, {
    _id: 1,
    name: "product 5",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?ramdom=14" }],
  },
];

const selectedProduct = {
  name: "stylish jacket",
  price: 120,
  originalPrice: 150,
  description: "this is stylidh jacket for an y ocation",
  brand: "fashion",
  material: "leather",
  size: ["S", "M", "L", "XL"],
  colors: ["red", "blue", "green"],
  image: [
    {
      url: "https://picsum.photos/500/500?ramdom=10",
      altText: "Stylish Jacket",
    },
    {
      url: "https://picsum.photos/500/500?ramdom=11",
      altText: "Stylish Jacket Side View",
    },
  ],
};
function ProductDetails() {
  const [mainImage, setMainImage] = useState(selectedProduct.image[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [Quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("please select select size and color before adding to cart", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Cart added successfully", { duration: 1000 });
      setIsButtonDisabled(false);
    }, 2000);
  };

  return (
    <div className="p-6 ">
      <div className="max-w-6xl bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.image.map((img, index) => (
              <img
                key={index}
                src={img.url}
                onClick={() => setMainImage(img)}
                alt={img.altText || `Product Image`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage.url === img.url
                    ? "border-black border-4"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage.url}
                alt={mainImage.altText || "Product Image"}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="md:hidden flex overscroll-x-scrool space-x-4">
            {selectedProduct.image.map((img, index) => (
              <img
                key={index}
                src={img.url}
                onClick={() => setMainImage(img)}
                alt={img.altText || `Product Image`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage.url === img.url
                    ? "border-black border-4"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl capitalize font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `$${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              ${selectedProduct.price}
            </p>
            <p className=" text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="mb-4 ">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border cursor-pointer ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.8)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4 ">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.size.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded cursor-pointer ${
                      selectedSize === size
                        ? " bg-black text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6 ">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  disabled={Quantity < 1}
                  onClick={() => setQuantity((pre) => (pre > 1 ? pre - 1 : 1))}
                  className={`px-2 py-1 cursor-pointer rounded text-lg ${
                    Quantity <= 1
                      ? "bg-gray-200 text-gray-500"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  -
                </button>
                <span className="text-lg ">{Quantity}</span>
                <button
                  onClick={() => setQuantity((pre) => (pre >= 0 ? pre + 1 : 0))}
                  className="px-2 py-1 cursor-pointer bg-gray-400 text-white rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white cursor-pointer py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding...." : "Add to Cart"}
            </button>
            <div className="mb-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4 ">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
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
        <div className="mt-20 ">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

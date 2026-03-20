import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAdminProduct } from "../../redux/slice/adminProductSlice";
import { toast } from "react-hot-toast"; // Optional: for better UX

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Access loading/error state from Redux
  const { loading, error } = useSelector((state) => state.adminProducts);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    colors: [],
    sizes: [],
    collections: "",
    material: "",
    gender: "Unisex",
    isFeatured: false,
    isPublished: false,
    images: [],
    tages: [], // Matches backend naming
    dimensions: { length: "", height: "", width: "" },
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayInput = (name, value) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: value },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Note: In a production app, you'd usually upload this to a 
    // service like Cloudinary first, then save the URL to the state.
    const url = URL.createObjectURL(file);

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, { url: url, altText: file.name }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger the Redux action
    const resultAction = await dispatch(createAdminProduct(productData));

    if (createAdminProduct.fulfilled.match(resultAction)) {
      // Success logic
      navigate("/admin/products");
    } else {
      // Error handling (Redux slice catches the error message)
      console.error("Failed to save product:", resultAction.payload);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name & SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">SKU</label>
            <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="w-full p-2 border rounded" rows={4} required />
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Price</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Discount Price</label>
            <input type="number" name="discountPrice" value={productData.discountPrice} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Count in Stock</label>
            <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <input type="text" name="category" value={productData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Brand</label>
            <input type="text" name="brand" value={productData.brand} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        {/* Arrays: Colors, Sizes, Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Colors (comma separated)</label>
            <input type="text" placeholder="Red, Blue" onChange={(e) => handleArrayInput("colors", e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Sizes (comma separated)</label>
            <input type="text" placeholder="S, M, L" onChange={(e) => handleArrayInput("sizes", e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Tags (comma separated)</label>
            <input type="text" placeholder="New, Sale" onChange={(e) => handleArrayInput("tages", e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Dimensions */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Dimensions (L x W x H)</label>
          <div className="flex gap-2">
            <input name="length" placeholder="Length" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
            <input name="width" placeholder="Width" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
            <input name="height" placeholder="Height" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Flags & Upload */}
        <div className="flex flex-wrap gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" checked={productData.isFeatured} onChange={handleChange} /> Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isPublished" checked={productData.isPublished} onChange={handleChange} /> Published
          </label>
          <div className="flex-1">
            <label className="block font-semibold mb-2">Upload Image</label>
            <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>
        </div>

        {/* Image Preview */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {productData.images.map((img, i) => (
            <img key={i} src={img.url} alt={img.altText} className="w-24 h-24 object-cover border rounded shadow-sm" />
          ))}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 rounded text-white font-bold transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Processing..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
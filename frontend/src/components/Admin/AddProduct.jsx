import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAdminProduct } from "../../redux/slice/adminProductSlice";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
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
    collections: "", // Required by schema
    material: "",
    gender: "Unisex", // Enum: Men, Women, Unisex
    isFeatured: false,
    isPublished: false,
    images: [],
    tages: "", 
    dimensions: { length: 0, height: 0, width: 0 },
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
    // For colors and sizes which are [String] in schema
    setProductData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()).filter(item => item !== ""),
    }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: Number(value) },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Note: In a real app, you'd upload to Cloudinary/S3 first and get a URL
    const url = URL.createObjectURL(file);

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, { url: [url], altText: file.name }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(createAdminProduct(productData));
    if (createAdminProduct.fulfilled.match(resultAction)) {
      navigate("/admin/products");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white my-10">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      
      {error && <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">SKU (Unique)</label>
            <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="w-full p-2 border rounded" rows={3} required />
        </div>

        {/* Pricing & Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Price</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Discount Price</label>
            <input type="number" name="discountPrice" value={productData.discountPrice} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Stock</label>
            <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Weight</label>
            <input type="text" name="weight" value={productData.weight} onChange={handleChange} placeholder="e.g. 1.2kg" className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Classification */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <input type="text" name="category" value={productData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Brand</label>
            <input type="text" name="brand" value={productData.brand} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Collection</label>
            <input type="text" name="collections" value={productData.collections} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Gender</label>
            <select name="gender" value={productData.gender} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Variants & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Colors (Red, Blue)</label>
            <input type="text" onChange={(e) => handleArrayInput("colors", e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Sizes (S, M, L)</label>
            <input type="text" onChange={(e) => handleArrayInput("sizes", e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-2">Tags (Single String)</label>
            <input type="text" name="tages" value={productData.tages} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Dimensions */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <label className="block font-semibold mb-2">Dimensions (L x W x H)</label>
          <div className="flex gap-4">
            <input type="number" name="length" placeholder="Length" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
            <input type="number" name="width" placeholder="Width" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
            <input type="number" name="height" placeholder="Height" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Material & Flags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Material</label>
            <input type="text" name="material" value={productData.material} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" checked={productData.isFeatured} onChange={handleChange} /> Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isPublished" checked={productData.isPublished} onChange={handleChange} /> Published
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Product Images</label>
          <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <div className="flex gap-4 mt-4">
            {productData.images.map((img, i) => (
              <img key={i} src={img.url[0]} alt={img.altText} className="w-20 h-20 object-cover border rounded shadow-sm" />
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 rounded text-white font-bold transition-all ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 shadow-lg"}`}
        >
          {loading ? "Saving Product..." : "Add Product to Catalog"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
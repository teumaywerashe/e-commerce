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
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white dark:bg-gray-900 my-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Add New Product</h2>
      {error && <p className="text-red-500 mb-4 p-2 bg-red-50 dark:bg-red-900/20 rounded">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-900 dark:text-white">SKU (Unique)</label>
            <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required />
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Description</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" rows={3} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Price</label><input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required /></div>
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Discount Price</label><input type="number" name="discountPrice" value={productData.discountPrice} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Stock</label><input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required /></div>
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Weight</label><input type="text" name="weight" value={productData.weight} onChange={handleChange} placeholder="e.g. 1.2kg" className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Category</label><input type="text" name="category" value={productData.category} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required /></div>
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Brand</label><input type="text" name="brand" value={productData.brand} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required /></div>
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Collection</label><input type="text" name="collections" value={productData.collections} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required /></div>
          <div>
            <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Gender</label>
            <select name="gender" value={productData.gender} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Colors (Red, Blue)</label><input type="text" onChange={(e) => handleArrayInput("colors", e.target.value)} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required /></div>
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Sizes (S, M, L)</label><input type="text" onChange={(e) => handleArrayInput("sizes", e.target.value)} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required /></div>
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Tags</label><input type="text" name="tages" value={productData.tages} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
        </div>
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded">
          <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Dimensions (L x W x H)</label>
          <div className="flex gap-4">
            <input type="number" name="length" placeholder="Length" onChange={handleDimensionChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <input type="number" name="width" placeholder="Width" onChange={handleDimensionChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <input type="number" name="height" placeholder="Height" onChange={handleDimensionChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div><label className="block font-semibold mb-2 text-gray-900 dark:text-white">Material</label><input type="text" name="material" value={productData.material} onChange={handleChange} className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-white">
              <input type="checkbox" name="isFeatured" checked={productData.isFeatured} onChange={handleChange} /> Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-white">
              <input type="checkbox" name="isPublished" checked={productData.isPublished} onChange={handleChange} /> Published
            </label>
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Upload Product Images</label>
          <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100" />
          <div className="flex gap-4 mt-4">
            {productData.images.map((img, i) => (
              <img key={i} src={img.url[0]} alt={img.altText} className="w-20 h-20 object-cover border dark:border-gray-700 rounded shadow-sm" />
            ))}
          </div>
        </div>
        <button type="submit" disabled={loading}
          className={`w-full py-3 rounded text-white font-bold transition-all ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 shadow-lg"}`}>
          {loading ? "Saving Product..." : "Add Product to Catalog"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
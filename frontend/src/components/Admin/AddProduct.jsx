import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAdminProduct } from "../../redux/slice/adminProductSlice";

function AddProduct() {
  const navigate = useNavigate();
const dispatch=useDispatch()
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
    tages: [],
    dimensions: { length: "", height: "", width: "" },
    weight: "",
  });

  const [loading, setLoading] = useState(false);

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
    setLoading(false)
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: value },
    }));
  };

  const handleImageUpload = (e) => {
    setLoading(false)
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, { url: [url], altText: file.name }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createAdminProduct(productData));
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="w-full p-2 border rounded" rows={4} required />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Discount Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Discount Price</label>
          <input type="number" name="discountPrice" value={productData.discountPrice} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <input type="text" name="category" value={productData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Brand */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Brand</label>
          <input type="text" name="brand" value={productData.brand} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma separated)</label>
          <input type="text" onChange={(e) => handleArrayInput("colors", e.target.value)} className="w-full p-2 border rounded" />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes (comma separated)</label>
          <input type="text" onChange={(e) => handleArrayInput("sizes", e.target.value)} className="w-full p-2 border rounded" />
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Tags (comma separated)</label>
          <input type="text" onChange={(e) => handleArrayInput("tages", e.target.value)} className="w-full p-2 border rounded" />
        </div>

        {/* Collection */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Collection</label>
          <input type="text" name="collections" value={productData.collections} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Material */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Material</label>
          <input type="text" name="material" value={productData.material} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gender</label>
          <select name="gender" value={productData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option>Men</option>
            <option>Women</option>
            <option>Unisex</option>
          </select>
        </div>

        {/* Dimensions */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Dimensions</label>
          <div className="flex gap-2">
            <input name="length" placeholder="Length" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
            <input name="width" placeholder="Width" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
            <input name="height" placeholder="Height" onChange={handleDimensionChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Weight */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Weight</label>
          <input type="text" name="weight" value={productData.weight} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Flags */}
        <div className="mb-6 flex gap-6">
          <label>
            <input type="checkbox" name="isFeatured" onChange={handleChange} /> Featured
          </label>
          <label>
            <input type="checkbox" name="isPublished" onChange={handleChange} /> Published
          </label>
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />

          <div className="flex gap-2 mt-4">
            {productData.images.map((img, i) => (
              <img key={i} src={img.url[0]} alt="" className="w-20 h-20 object-cover" />
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

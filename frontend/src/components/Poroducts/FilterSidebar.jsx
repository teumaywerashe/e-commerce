import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    colors: "",
    gender: "",
    sizes: "",
    material: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const gender = ["Men", "Women"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "MS", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton Blend",
    "Wool Blend",
    "Denim",
    "Polyester",
    "Silk Blend",
    "Linen Blend",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      colors: params.color || "",
      sizes: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
    
  };

  

  const updatePriceRange = (e) => {
    const newPriceRange = e.target.value;

    setPriceRange([0, newPriceRange]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPriceRange };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-600 mb-2"></h3>

      {/* category filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 cursor-pointer focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* gender filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>

        {gender.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 cursor-pointer focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* color filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>

        <div className="flex flex-wrap gap-2">
          {" "}
          {colors.map((color) => (
            <button
              key={color}
              value={color}
              name="color"
              type="button"
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border cursor-pointer border-gray-300 transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-400" : ""
              }`}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </div>

      {/* size filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filters.sizes.includes(size)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4  text-blue-500 cursor-pointer focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/* material filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 text-blue-500 cursor-pointer focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* brand filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="radio"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              name="brand"
              className="mr-2 w-4 h-4 text-blue-500 cursor-pointer focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* price Range filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          price Range
        </label>

        <input
          min={0}
          max={100}
          type="range"
          name="priceRange"
          value={priceRange[1]}
          onChange={updatePriceRange}
          className="mr-2 h-2 w-full bg-gray-600 rounded-lg cursor-pointer appearance-none text-blue-500 focus:ring-blue-400 border-gray-300"
        />
        <div className="flex text-gray-700 justify-between mb-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;

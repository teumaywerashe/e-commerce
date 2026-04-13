import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const categories = ["Top Wear", "Bottom Wear"];
const genders = ["Men", "Women"];
const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const materials = ["Cotton Blend", "Wool Blend", "Denim", "Polyester", "Silk Blend", "Linen Blend", "Viscose", "Fleece"];
const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];

function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "", gender: "", colors: "", sizes: [], material: [], brand: [], minPrice: 0, maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

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

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };
    if (type === "checkbox") {
      newFilters[name] = checked
        ? [...(newFilters[name] || []), value]
        : newFilters[name].filter((i) => i !== value);
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updatePriceRange = (e) => {
    const val = e.target.value;
    setPriceRange([0, val]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: val };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{title}</h4>
      {children}
    </div>
  );

  return (
    <div className="p-5 bg-white h-full">
      <h3 className="text-base font-bold text-primary mb-6">Filters</h3>

      <Section title="Category">
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input
              type="radio" name="category" value={cat}
              checked={filters.category === cat}
              onChange={handleFilterChange}
              className="accent-accent w-4 h-4"
            />
            <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{cat}</span>
          </label>
        ))}
      </Section>

      <Section title="Gender">
        {genders.map((g) => (
          <label key={g} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input
              type="radio" name="gender" value={g}
              checked={filters.gender === g}
              onChange={handleFilterChange}
              className="accent-accent w-4 h-4"
            />
            <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{g}</span>
          </label>
        ))}
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color} type="button" name="color" value={color}
              onClick={handleFilterChange}
              title={color}
              className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 cursor-pointer ${
                filters.colors === color ? "border-accent shadow-md scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <label key={size} className="cursor-pointer">
              <input
                type="checkbox" name="sizes" value={size}
                checked={filters.sizes.includes(size)}
                onChange={handleFilterChange}
                className="sr-only"
              />
              <span className={`inline-block px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                filters.sizes.includes(size)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary"
              }`}>
                {size}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Material">
        {materials.map((mat) => (
          <label key={mat} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input
              type="checkbox" name="material" value={mat}
              checked={filters.material.includes(mat)}
              onChange={handleFilterChange}
              className="accent-accent w-4 h-4"
            />
            <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{mat}</span>
          </label>
        ))}
      </Section>

      <Section title="Brand">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input
              type="radio" name="brand" value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="accent-accent w-4 h-4"
            />
            <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{brand}</span>
          </label>
        ))}
      </Section>

      <Section title="Price Range">
        <input
          type="range" min={0} max={100}
          value={priceRange[1]}
          onChange={updatePriceRange}
          className="w-full accent-accent cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span className="font-semibold text-primary">${priceRange[1]}</span>
        </div>
      </Section>
    </div>
  );
}

export default FilterSidebar;

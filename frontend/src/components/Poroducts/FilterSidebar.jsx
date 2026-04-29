import { useEffect, useState } from "react";
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
  const [filters, setFilters] = useState({ category: "", gender: "", colors: "", sizes: [], material: [], brand: [], minPrice: 0, maxPrice: 100 });
  const [priceRange, setPriceRange] = useState([0, 100]);

  useEffect(() => {
    const p = Object.fromEntries([...searchParams]);
    setFilters({
      category: p.category || "", gender: p.gender || "", colors: p.color || "",
      sizes: p.size ? p.size.split(",") : [], material: p.material ? p.material.split(",") : [],
      brand: p.brand ? p.brand.split(",") : [], minPrice: p.minPrice || 0, maxPrice: p.maxPrice || 100,
    });
    setPriceRange([0, p.maxPrice || 100]);
  }, [searchParams]);

  const updateURL = (f) => {
    const params = new URLSearchParams();
    Object.keys(f).forEach((k) => {
      if (Array.isArray(f[k]) && f[k].length > 0) params.append(k, f[k].join(","));
      else if (f[k]) params.append(k, f[k]);
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const f = { ...filters };
    if (type === "checkbox") f[name] = checked ? [...(f[name] || []), value] : f[name].filter((i) => i !== value);
    else f[name] = value;
    setFilters(f);
    updateURL(f);
  };

  const updatePrice = (e) => {
    const val = e.target.value;
    setPriceRange([0, val]);
    const f = { ...filters, minPrice: 0, maxPrice: val };
    setFilters(f);
    updateURL(f);
  };

  const Section = ({ title, children }) => (
    <div className="mb-7">
      <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-3">{title}</p>
      {children}
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-950">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-primary dark:text-white mb-7">Filter</p>

      <Section title="Category">
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input type="radio" name="category" value={c} checked={filters.category === c} onChange={handleChange} className="accent-primary w-3 h-3" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-primary dark:group-hover:text-white transition-colors">{c}</span>
          </label>
        ))}
      </Section>

      <Section title="Gender">
        {genders.map((g) => (
          <label key={g} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input type="radio" name="gender" value={g} checked={filters.gender === g} onChange={handleChange} className="accent-primary w-3 h-3" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-primary dark:group-hover:text-white transition-colors">{g}</span>
          </label>
        ))}
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button key={color} type="button" name="color" value={color} onClick={handleChange} title={color}
              className={`w-6 h-6 border transition-all cursor-pointer hover:scale-110 ${filters.colors === color ? "border-primary scale-110" : "border-transparent"}`}
              style={{ backgroundColor: color.toLowerCase() }} />
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <label key={size} className="cursor-pointer">
              <input type="checkbox" name="sizes" value={size} checked={filters.sizes.includes(size)} onChange={handleChange} className="sr-only" />
              <span className={`inline-block px-3 py-1.5 text-[10px] font-medium tracking-wide border transition-colors ${
                filters.sizes.includes(size)
                  ? "bg-primary dark:bg-white text-white dark:text-gray-900 border-primary dark:border-white"
                  : "bg-white dark:bg-gray-900 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-gray-700 hover:border-primary dark:hover:border-white"
              }`}>{size}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Material">
        {materials.map((m) => (
          <label key={m} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input type="checkbox" name="material" value={m} checked={filters.material.includes(m)} onChange={handleChange} className="accent-primary w-3 h-3" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-primary dark:group-hover:text-white transition-colors">{m}</span>
          </label>
        ))}
      </Section>

      <Section title="Brand">
        {brands.map((b) => (
          <label key={b} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
            <input type="radio" name="brand" value={b} checked={filters.brand.includes(b)} onChange={handleChange} className="accent-primary w-3 h-3" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-primary dark:group-hover:text-white transition-colors">{b}</span>
          </label>
        ))}
      </Section>

      <Section title="Price">
        <input type="range" min={0} max={100} value={priceRange[1]} onChange={updatePrice} className="w-full accent-primary cursor-pointer" />
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>$0</span><span className="text-primary dark:text-white font-medium">${priceRange[1]}</span>
        </div>
      </Section>
    </div>
  );
}

export default FilterSidebar;

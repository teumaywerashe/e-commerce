import React from "react";
import { Link } from "react-router-dom";

function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl h-72 mb-3" />
            <div className="bg-gray-200 rounded h-4 w-3/4 mb-2" />
            <div className="bg-gray-200 rounded h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-sm">Error: {error}</p>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">No products found.</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product, i) => (
        <Link
          to={`/product/${product._id}`}
          key={i}
          className="group"
        >
          <div className="relative overflow-hidden rounded-xl bg-gray-100 mb-3">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.discountPrice && (
              <span className="absolute top-2.5 left-2.5 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Sale
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-primary group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {product.discountPrice ? (
              <>
                <span className="text-sm font-semibold text-primary">${product.discountPrice}</span>
                <span className="text-xs text-gray-400 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-sm font-semibold text-primary">${product.price}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;

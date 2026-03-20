import React from "react";
import { Link } from "react-router-dom";
function ProductGrid({ products, loading, error }) {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">Error:{error}</p>;
  }
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <Link to={`/product/${product._id}`} key={i} className="">
              <div className="bg-white p-4 rounded-lg">
                <div className="w-full h-96 mb-4">
                  <img
                    src={product.images[0].url}
                    alt="product iimage"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-sm mb-2 ">{product.name}</h3>
                <p className="text-gray-500 font-medium text-sm tracking-tighter">
                  $ {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="flex h-full w-full text-xl">
          No product with that <span className="font-bold text-red-400 ml-1 mr-1">filter</span> to display{" "}
          <span className="text-red-400 text-xl font-bold ml-0.5">!</span>
        </h1>
      )}
    </>
  );
}

export default ProductGrid;

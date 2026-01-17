import React from "react";
import { Link } from "react-router-dom";

function ProductManagement() {
  const products = [
    { _id: 1234, name: "product1", price: 234, sku: "uigkijn" },
    { _id: 1634, name: "product1", price: 234, sku: "ugk,ijn" },
    { _id: 1224, name: "product1", price: 234, sku: "uiu;kgn" },
    { _id: 1434, name: "product1", price: 234, sku: "uigkjgj" },
    { _id: 1454, name: "product1", price: 234, sku: "uiruklj" },
    { _id: 1734, name: "product1", price: 234, sku: "klkgsij" },
    { _id: 1266, name: "product1", price: 234, sku: "uiruijn" },
    { _id: 1264, name: "product1", price: 234, sku: "uiruijn" },
    { _id: 1253, name: "product1", price: 234, sku: "uirgljn" },
    { _id: 1236, name: "product1", price: 234, sku: "uiruijn" },
    { _id: 1232, name: "product1", price: 234, sku: "uiruijn" },
    { _id: 1230, name: "product1", price: 234, sku: "uiruijn" },
    { _id: 1364, name: "product1", price: 234, sku: "uiruijn" },
    { _id: 1235, name: "product1", price: 234, sku: "uiruijn" },
    { _id: 1242, name: "product1", price: 234, sku: "uiruijn" },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this product")) {
      console.log(id, "yes");
    } else {
      console.log("no");
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-black font-bold text-2xl mb-6">Product Management</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-xs bg-gray-100 uppercase font-bold text-gray-700">
            <tr>
              <td className="px-4 py-2">name</td>
              <td className="px-4 py-2">price</td>
              <td className="px-4 py-2">sku</td>
              <td className="px-4 py-2">actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">{product.sku}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      className="bg-yellow-500 rounded p-2 text-white"
                      to={`/admin/product/edit/${product._id}`}
                    >
                      edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500  hover:bg-red-600cursor-pointer px-2 py-1 rounded text-white"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products to Display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;

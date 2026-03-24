import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {} from 'react-icons'
import {
  deleteProducts,
  fetchAdminProducts,
} from "../../redux/slice/adminProductSlice";
import { FaPlus } from "react-icons/fa";

function ProductManagement() {
  const dispatch = useDispatch();
const navigate=useNavigate()
  const { products } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch, products]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this product")) {
      dispatch(deleteProducts(id, "yes"));
    } else {
      console.log("no");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-black font-bold text-2xl mb-6">
          Product Management
        </h1>
        <button onClick={()=>navigate('/admin/new-product')}  className="bg-amber-300 flex items-center gap-4 mb-5 rounded-xl hover:bg-amber-100 cursor-pointer hover:rounded-full p-2"> <FaPlus/> <span>new product</span> </button>
      </div>
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
              products?.map((product) => (
                <tr
                  key={product?._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {product?.name}
                  </td>
                  <td className="px-4 py-2">${product?.price}</td>
                  <td className="px-4 py-2">{product?.sku}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      className="bg-yellow-500 rounded p-2 text-white"
                      to={`/admin/product/edit/${product?._id}`}
                    >
                      edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product?._id)}
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

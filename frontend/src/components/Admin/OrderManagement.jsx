import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slice/adminOrderSlice";
import { useNavigate } from "react-router-dom";

function OrderManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, orders]);

  const handleStatusChange = (orderId, status) => {
    try {
      dispatch(updateOrderStatus({ id: orderId, status }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="font-bold text-gray-900 dark:text-white mb-6 text-2xl">Order Management</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-gray-100 dark:bg-gray-800 uppercase font-bold text-gray-700 dark:text-gray-300">
            <tr>
              <td className="px-4 py-2">Order Id</td>
              <td className="px-4 py-2">Customer</td>
              <td className="px-4 py-2">Total Price</td>
              <td className="px-4 py-2">Status</td>
              <td className="px-4 py-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <td className="px-3 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">#{order._id}</td>
                  <td className="px-3 py-4">{order.user.name}</td>
                  <td className="px-3 py-4">{order.totalPrice.toFixed(2)}</td>
                  <td className="px-3 py-4">
                    <select
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-gray-50 dark:bg-gray-800 border border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      name="status"
                      value={order.status}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="px-3 py-4">
                    <button onClick={() => handleStatusChange(order._id, "Delivered")} className="bg-green-300 text-white rounded-lg cursor-pointer font-medium px-1 py-2 hover:bg-green-600">
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">No Orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;

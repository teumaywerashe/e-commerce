import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/orderSlice";
import { HiOutlineShoppingBag } from "react-icons/hi2";

function MyOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="bg-gray-200 rounded h-4 w-1/2" />
              <div className="bg-gray-200 rounded h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-bold text-primary text-base">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <HiOutlineShoppingBag className="h-12 w-12 text-gray-200 mb-3" />
          <p className="text-gray-500 font-medium">No orders yet</p>
          <p className="text-gray-400 text-sm mt-1">Your orders will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5 text-left">Order</th>
                <th className="py-3 px-5 text-left">Date</th>
                <th className="py-3 px-5 text-left">Items</th>
                <th className="py-3 px-5 text-left">Total</th>
                <th className="py-3 px-5 text-left">Status</th>
                <th className="py-3 px-5 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.orderItems[0]?.image}
                        alt={order.orderItems[0]?.name}
                        className="w-10 h-10 object-cover rounded-lg bg-gray-100"
                      />
                      <span className="text-xs text-gray-400 font-mono">#{order._id.slice(-8)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-5 text-gray-500">
                    {order.orderItems.reduce((t, i) => t + i.quantity, 0)} items
                  </td>
                  <td className="py-4 px-5 font-semibold text-primary">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      order.isPaid
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-accent text-xs font-semibold hover:underline">View →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyOrders;

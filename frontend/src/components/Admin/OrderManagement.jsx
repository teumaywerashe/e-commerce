import React from "react";

function OrderManagement() {
  const orders = [
    {
      _id: 1334,
      user: {
        name: "jhon madia",
      },
      totalPrice: 23,
      status: "Processing",
    },
    {
      _id: 3423,
      user: {
        name: "jhon madia",
      },
      totalPrice: 23,
      status: "Processing",
    },
    {
      _id: 1423,
      user: {
        name: "jhon madia",
      },
      totalPrice: 23,
      status: "Processing",
    },
  ];

  const handleStatusChange = (orderId, status) => {
    console.log(orderId, status);
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="font-bold text-black mb-6 text-2xl">Order Management</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-xs bg-gray-100 uppercase font-bold text-gray-700">
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
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-3 py-4 whitespace-nowrap text-gray-900 font-medium">
                    #{order._id}
                  </td>
                  <td className="px-3 py-4">{order.user.name}</td>
                  <td className="px-3 py-4">{order.totalPrice}</td>
                  <td className="px-3 py-4">
                    <select
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      name="status"
                      value={order.status}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>

                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-green-300 text-white rounded-lg cursor-pointer font-medium px-1 py-2 hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center ttext-gray-500"> No Orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;

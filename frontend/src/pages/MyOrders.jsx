import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate(`/order/${id}`);
  };
  useEffect(() => {
    setTimeout(() => {
      const mokeOrders = [
        {
          _id: "1",
          createdAt: "2023-10-01",
          shippingAddress: {
            street: "123 Main St",
            city: "New York",
          },
          isPaid: true,
          totalPrice: 150.0,
          orderItems: [
            {
              name: "Product A",
              image: "https://picsum.photos/200?random=1",
              quantity: 2,
              price: 50.0,
            },
          ],
        },
        {
          _id: "2",
          createdAt: "2023-09-15",
          shippingAddress: {
            street: "456 Elm St",
            city: "Los Angeles",
          },
          isPaid: true,
          totalPrice: 200.0,
          orderItems: [
            {
              name: "Product C",
              image: "https://picsum.photos/200?random=2",
              quantity: 4,
              price: 50.0,
            },
          ],
        },
      ];
      setOrders(mokeOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-scroll">
        <table className="min-w-full text-left text-gray-500">
          <thead
            className="bg-gray-100 text-xs uppercase text-gray-700
          "
          >
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order Id</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">shippingAddress</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
              <th className="py-2 px-4 sm:py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleOnClick(order._id)}
                  className="border-b hover:border-r-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 object-cover sm:h-12 sm:w-12 rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-gray-900 whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()} <br />
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}{" "}
                    Items
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.isPaid ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 sm:py-3">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;

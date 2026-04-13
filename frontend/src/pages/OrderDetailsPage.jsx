import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/orderSlice";

function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [id, dispatch]);

  if (loading) return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="bg-gray-200 rounded h-8 w-48 mb-6" />
      <div className="bg-white rounded-2xl p-8 space-y-4">
        <div className="bg-gray-200 rounded h-6 w-1/3" />
        <div className="bg-gray-200 rounded h-4 w-1/4" />
      </div>
    </div>
  );

  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/my-orders" className="text-accent text-sm font-semibold hover:underline">
            ← My Orders
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Order Details</span>
        </div>

        {orderDetails ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-7 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-primary text-lg">
                  Order #{orderDetails._id.slice(-10)}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  {new Date(orderDetails.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  orderDetails.isPaid ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                }`}>
                  {orderDetails.isPaid ? "Paid" : "Payment Pending"}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  orderDetails.isDelevered ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                }`}>
                  {orderDetails.isDelevered ? "Delivered" : "In Transit"}
                </span>
              </div>
            </div>

            <div className="p-7 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Payment */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Payment</h4>
                <p className="text-sm text-primary font-medium">{orderDetails.paymentMethod}</p>
                <p className="text-sm text-gray-500">{orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
              </div>

              {/* Shipping */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Shipping</h4>
                <p className="text-sm text-primary font-medium">{orderDetails.ShippimgMethod}</p>
                <p className="text-sm text-gray-500">
                  {orderDetails.shippingAdress?.city}, {orderDetails.shippingAdress?.country}
                </p>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Summary</h4>
                <p className="text-sm text-gray-500">{orderDetails.orderItems?.length} item(s)</p>
                <p className="text-sm font-bold text-primary">${orderDetails.totalPrice?.toFixed(2)}</p>
              </div>
            </div>

            {/* Items */}
            <div className="px-7 pb-7">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Items</h4>
              <div className="space-y-3">
                {orderDetails.orderItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg bg-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.productID}`}
                        className="text-sm font-semibold text-primary hover:text-accent transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-gray-400">${item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <p className="text-gray-500">No order details found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetailsPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../redux/slice/CartSlice";
import { HiCheckCircle } from "react-icons/hi2";

const estimatedDelivery = (createdAt) => {
  const d = new Date(createdAt);
  d.setDate(d.getDate() + 10);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

function OrderConformationPage() {
  const { checkout } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkout?._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
            <HiCheckCircle className="h-9 w-9 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 text-sm">
            Thank you for your purchase. We'll send you a confirmation email shortly.
          </p>
        </div>

        {checkout && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Order meta */}
            <div className="px-7 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                <p className="font-mono text-sm font-semibold text-primary">#{checkout._id.slice(-12)}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
                <p className="text-sm font-semibold text-green-600">{estimatedDelivery(checkout.createdAt)}</p>
              </div>
            </div>

            {/* Items */}
            <div className="px-7 py-5 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {checkout.checkOutItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.color} · {item.size} · Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Delivery */}
            <div className="px-7 py-5 grid grid-cols-2 gap-6 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Payment</p>
                <p className="text-sm font-medium text-primary">PayPal</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Ship to</p>
                <p className="text-sm font-medium text-primary">
                  {checkout.shippingAdress?.address?.split(" ")[0]}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-7 py-5 flex flex-col sm:flex-row gap-3">
              <Link
                to="/my-orders"
                className="flex-1 text-center bg-accent hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
              >
                View My Orders
              </Link>
              <Link
                to="/collections/all"
                className="flex-1 text-center bg-gray-50 hover:bg-gray-100 text-primary font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderConformationPage;

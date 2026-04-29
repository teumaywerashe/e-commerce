import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../redux/slice/CartSlice";

const estimatedDelivery = (createdAt) => {
  const d = new Date(createdAt);
  d.setDate(d.getDate() + 10);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

function OrderConformationPage() {
  const { checkout } = useSelector((s) => s.checkout);
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
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-primary dark:bg-white flex items-center justify-center mx-auto mb-6">
            <svg className="w-5 h-5 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 mb-2">Confirmed</p>
          <h1 className="text-2xl font-light tracking-widest uppercase text-primary dark:text-white mb-3">Order Placed</h1>
          <p className="text-xs text-neutral-400 tracking-wide">
            Thank you. A confirmation email will be sent shortly.
          </p>
        </div>

        {checkout && (
          <div className="border border-neutral-100 dark:border-gray-800">
            {/* Order meta */}
            <div className="px-7 py-5 border-b border-neutral-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-1">Order ID</p>
                <p className="text-xs font-medium text-primary dark:text-white font-mono">#{checkout._id.slice(-12)}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-1">Est. Delivery</p>
                <p className="text-xs font-medium text-primary dark:text-white">{estimatedDelivery(checkout.createdAt)}</p>
              </div>
            </div>

            {/* Items */}
            <div className="px-7 py-5 border-b border-neutral-100 dark:border-gray-800">
              <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-4">Items</p>
              <div className="space-y-4">
                {checkout.checkOutItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-neutral-50 dark:bg-gray-800 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-primary dark:text-white line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-neutral-400">{item.color} · {item.size} · Qty {item.quantity}</p>
                    </div>
                    <p className="text-[11px] font-semibold text-primary dark:text-white shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment / Ship */}
            <div className="px-7 py-5 grid grid-cols-2 gap-6 border-b border-neutral-100 dark:border-gray-800">
              <div>
                <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-1">Payment</p>
                <p className="text-xs text-primary dark:text-white">PayPal</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-1">Ship To</p>
                <p className="text-xs text-primary dark:text-white">{checkout.shippingAdress?.address?.split(" ")[0]}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-7 py-5 flex flex-col sm:flex-row gap-3">
              <Link to="/my-orders"
                className="flex-1 text-center bg-primary dark:bg-white text-white dark:text-gray-900 text-[10px] font-semibold tracking-widest2 uppercase py-4 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                View Orders
              </Link>
              <Link to="/collections/all"
                className="flex-1 text-center bg-neutral-100 dark:bg-gray-800 text-primary dark:text-white text-[10px] font-semibold tracking-widest2 uppercase py-4 hover:bg-neutral-200 dark:hover:bg-gray-700 transition-colors">
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

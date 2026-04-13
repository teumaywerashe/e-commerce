import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/CheckoutSlice";
import axios from "axios";

function Checkout() {
  const { user } = useSelector((state) => state.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firestName: "", lastName: "", address: "", postalCode: "", city: "", country: "", phone: "",
  });

  useEffect(() => {
    if (!cart?.products?.length) navigate("/");
  }, [cart, navigate]);

  const total = cart?.products?.reduce((acc, p) => acc + p.price * p.quantity, 0) || 0;

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    const res = await dispatch(createCheckout({
      checkoutItems: cart.products,
      shippingAddress,
      paymentMethod: "Paypal",
      totalPrice: Number(cart.totalPrice),
    }));
    if (res.payload) setCheckoutId(res.payload._id);
  };

  const handlePaymentSuccess = async ({ details }) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetail: details },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      navigate("/order-confirmation");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-gray-500">Loading...</p></div>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent transition-colors bg-white";
  const labelClass = "block text-sm font-medium text-primary mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-primary mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <form onSubmit={handleCreateCheckout}>
                <h2 className="text-base font-bold text-primary mb-5">Contact Details</h2>
                <div className="mb-5">
                  <label className={labelClass}>Email</label>
                  <input type="email" value={user?.email || ""} disabled className={`${inputClass} bg-gray-50 text-gray-400`} />
                </div>

                <h2 className="text-base font-bold text-primary mb-5 mt-7">Delivery Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input type="text" placeholder="John" required className={inputClass}
                      value={shippingAddress.firestName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, firestName: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" placeholder="Doe" required className={inputClass}
                      value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={labelClass}>Address</label>
                  <input type="text" placeholder="123 Main St" required className={inputClass}
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" placeholder="New York" required className={inputClass}
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Postal Code</label>
                    <input type="text" placeholder="10001" required className={inputClass}
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>Country</label>
                    <input type="text" placeholder="United States" required className={inputClass}
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input type="tel" placeholder="+1 234 567 890" required className={inputClass}
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} />
                  </div>
                </div>

                {!checkoutId ? (
                  <button
                    type="submit"
                    className="w-full mt-4 bg-accent hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-accent/30 cursor-pointer"
                  >
                    Continue to Payment
                  </button>
                ) : (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-primary mb-4">Pay with PayPal</h3>
                    <PaypalButton
                      amount={cart.totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={() => alert("Payment failed. Please try again.")}
                    />
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sticky top-4">
              <h2 className="text-base font-bold text-primary mb-5">Order Summary</h2>
              <div className="space-y-4 mb-5">
                {cart?.products?.map((product, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-14 h-16 object-cover rounded-lg bg-gray-100" />
                      <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {product.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.color} · {product.size}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">${(product.price * product.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

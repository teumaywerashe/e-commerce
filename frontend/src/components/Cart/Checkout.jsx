import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/CheckoutSlice";
import axios from "axios";

function Checkout() {
  const { user } = useSelector((s) => s.auth);
  const { cart, loading, error } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [addr, setAddr] = useState({ firestName: "", lastName: "", address: "", postalCode: "", city: "", country: "", phone: "" });

  useEffect(() => { if (!cart?.products?.length) navigate("/"); }, [cart, navigate]);

  const total = cart?.products?.reduce((a, p) => a + p.price * p.quantity, 0) || 0;

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    const res = await dispatch(createCheckout({ checkoutItems: cart.products, shippingAddress: addr, paymentMethod: "Paypal", totalPrice: Number(cart.totalPrice) }));
    if (res.payload) setCheckoutId(res.payload._id);
  };

  const handlePaymentSuccess = async ({ details }) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, { paymentStatus: "paid", paymentDetail: details }, { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
      navigate("/order-confirmation");
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-xs tracking-widest uppercase text-neutral-400">Loading...</p></div>;
  if (error) return <p className="text-center text-neutral-500 py-10 text-xs">{error}</p>;

  const inputClass = "w-full border-b border-neutral-200 py-3 text-sm text-primary placeholder-neutral-400 focus:outline-none focus:border-primary transition-colors bg-transparent";
  const labelClass = "text-[9px] font-semibold tracking-widest uppercase text-neutral-400 block mb-1";

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 mb-1">Order</p>
        <h1 className="text-2xl font-light tracking-widest uppercase text-primary mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleCreateCheckout}>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-6">Contact</p>
              <div className="mb-8">
                <label className={labelClass}>Email</label>
                <input type="email" value={user?.email || ""} disabled className={`${inputClass} text-neutral-400`} />
              </div>

              <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-6">Delivery</p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div><label className={labelClass}>First Name</label><input type="text" placeholder="John" required className={inputClass} value={addr.firestName} onChange={(e) => setAddr({ ...addr, firestName: e.target.value })} /></div>
                <div><label className={labelClass}>Last Name</label><input type="text" placeholder="Doe" required className={inputClass} value={addr.lastName} onChange={(e) => setAddr({ ...addr, lastName: e.target.value })} /></div>
              </div>
              <div className="mb-6"><label className={labelClass}>Address</label><input type="text" placeholder="123 Main St" required className={inputClass} value={addr.address} onChange={(e) => setAddr({ ...addr, address: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div><label className={labelClass}>City</label><input type="text" placeholder="New York" required className={inputClass} value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} /></div>
                <div><label className={labelClass}>Postal Code</label><input type="text" placeholder="10001" required className={inputClass} value={addr.postalCode} onChange={(e) => setAddr({ ...addr, postalCode: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div><label className={labelClass}>Country</label><input type="text" placeholder="United States" required className={inputClass} value={addr.country} onChange={(e) => setAddr({ ...addr, country: e.target.value })} /></div>
                <div><label className={labelClass}>Phone</label><input type="tel" placeholder="+1 234 567 890" required className={inputClass} value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} /></div>
              </div>

              {!checkoutId ? (
                <button type="submit" className="w-full bg-primary text-white text-[11px] font-semibold tracking-widest2 uppercase py-4 hover:bg-neutral-800 transition-colors cursor-pointer">
                  Continue to Payment
                </button>
              ) : (
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-4">Payment</p>
                  <PaypalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={() => alert("Payment failed.")} />
                </div>
              )}
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-20">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-6">Order Summary</p>
              <div className="space-y-5 mb-8">
                {cart?.products?.map((p, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img src={p.image} alt={p.name} className="w-14 h-16 object-cover bg-neutral-50" />
                      <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center">{p.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-primary line-clamp-1">{p.name}</p>
                      <p className="text-[10px] text-neutral-400">{p.color} · {p.size}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-primary">${(p.price * p.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 pt-5 space-y-3">
                <div className="flex justify-between text-xs text-neutral-500"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-xs text-neutral-500"><span>Shipping</span><span>Free</span></div>
                <div className="flex justify-between text-sm font-semibold text-primary pt-3 border-t border-neutral-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

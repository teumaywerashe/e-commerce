import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/orderSlice";

function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((s) => s.orders);

  useEffect(() => { dispatch(fetchUserOrders()); }, [id, dispatch]);

  if (loading) return (
    <div className="max-w-screen-xl mx-auto px-6 py-16 animate-pulse space-y-4">
      <div className="bg-neutral-100 h-4 w-32" />
      <div className="bg-neutral-100 h-64 w-full" />
    </div>
  );

  if (error) return <p className="text-center text-neutral-400 py-16 text-xs tracking-widest uppercase">{error}</p>;

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12">
          <Link to="/my-orders" className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 hover:text-primary transition-colors">
            ← Orders
          </Link>
          <span className="text-neutral-200">/</span>
          <span className="text-[10px] tracking-widest uppercase text-neutral-400">Details</span>
        </div>

        {orderDetails ? (
          <div className="border border-neutral-100">
            {/* Header */}
            <div className="px-8 py-6 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-1">Order</p>
                <p className="text-sm font-medium text-primary font-mono">#{orderDetails._id.slice(-12)}</p>
                <p className="text-[10px] text-neutral-400 mt-1">
                  {new Date(orderDetails.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="flex gap-2">
                <span className={`text-[9px] font-semibold tracking-widest uppercase px-3 py-1.5 ${
                  orderDetails.isPaid ? "bg-primary text-white" : "border border-neutral-300 text-neutral-500"
                }`}>
                  {orderDetails.isPaid ? "Paid" : "Pending"}
                </span>
                <span className={`text-[9px] font-semibold tracking-widest uppercase px-3 py-1.5 ${
                  orderDetails.isDelevered ? "bg-primary text-white" : "border border-neutral-300 text-neutral-500"
                }`}>
                  {orderDetails.isDelevered ? "Delivered" : "In Transit"}
                </span>
              </div>
            </div>

            {/* Meta grid */}
            <div className="px-8 py-6 border-b border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Payment", lines: [orderDetails.paymentMethod, orderDetails.isPaid ? "Paid" : "Unpaid"] },
                { label: "Shipping", lines: [orderDetails.ShippimgMethod, `${orderDetails.shippingAdress?.city}, ${orderDetails.shippingAdress?.country}`] },
                { label: "Summary", lines: [`${orderDetails.orderItems?.length} item(s)`, `$${orderDetails.totalPrice?.toFixed(2)}`] },
              ].map(({ label, lines }) => (
                <div key={label}>
                  <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-2">{label}</p>
                  {lines.map((l, i) => (
                    <p key={i} className={`text-xs ${i === 0 ? "text-primary font-medium" : "text-neutral-500"}`}>{l}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Items */}
            <div className="px-8 py-6">
              <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-5">Items</p>
              <div className="space-y-4">
                {orderDetails.orderItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-5 py-4 border-b border-neutral-50 last:border-0">
                    <img src={item.image} alt={item.name} className="w-14 h-16 object-cover bg-neutral-50 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.productID}`} className="text-[11px] font-medium text-primary hover:opacity-60 transition-opacity line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-[10px] text-neutral-400">${item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-neutral-100 py-20 text-center">
            <p className="text-[10px] tracking-widest uppercase text-neutral-400">No order details found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetailsPage;

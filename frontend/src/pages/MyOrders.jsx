import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/orderSlice";

function MyOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.orders);
  const navigate = useNavigate();

  useEffect(() => { dispatch(fetchUserOrders()); }, [dispatch]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4 border-b border-neutral-100 pb-4">
            <div className="w-12 h-12 bg-neutral-100" />
            <div className="flex-1 space-y-2">
              <div className="bg-neutral-100 h-3 w-1/2" />
              <div className="bg-neutral-100 h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-[11px] text-neutral-400 tracking-wide">{error}</p>;

  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-6">Order History</p>

      {orders.length === 0 ? (
        <div className="border border-neutral-100 py-20 text-center">
          <p className="text-[10px] tracking-widest uppercase text-neutral-400">No orders yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                {["Order", "Date", "Items", "Total", "Status", ""].map((h) => (
                  <th key={h} className="py-3 px-4 text-left text-[9px] font-semibold tracking-widest uppercase text-neutral-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="border-b border-neutral-50 hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={order.orderItems[0]?.image} alt="" className="w-10 h-10 object-cover bg-neutral-100" />
                      <span className="text-[10px] text-neutral-400 font-mono">#{order._id.slice(-8)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[11px] text-neutral-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-[11px] text-neutral-500">
                    {order.orderItems.reduce((t, i) => t + i.quantity, 0)}
                  </td>
                  <td className="py-4 px-4 text-[11px] font-semibold text-primary">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[9px] font-semibold tracking-widest uppercase px-2 py-1 ${
                      order.isPaid ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600"
                    }`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-primary hover:opacity-60 transition-opacity">
                      View →
                    </span>
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

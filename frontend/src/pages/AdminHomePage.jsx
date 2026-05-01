import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slice/adminProductSlice";
import { fetchAllOrders } from "../redux/slice/adminOrderSlice";

function AdminHomePage() {
  const dispatch = useDispatch();
  const { products, loading: pLoad } = useSelector((s) => s.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: oLoad,
  } = useSelector((s) => s.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const stats = [
    { label: "Revenue", value: `$${(totalSales || 0).toFixed(2)}`, link: null },
    {
      label: "Orders",
      value: totalOrders || 0,
      link: { to: "/admin/orders", text: "Manage" },
    },
    {
      label: "Products",
      value: products?.length || 0,
      link: { to: "/admin/products", text: "Manage" },
    },
  ];

  if (oLoad || pLoad) {
    return (
      <div className="p-8 animate-pulse space-y-6">
        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-neutral-100 dark:bg-gray-800 h-28" />
          ))}
        </div>
        <div className="bg-neutral-100 dark:bg-gray-800 h-64" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 mb-1">
        Overview
      </p>
      <h1 className="text-2xl font-light tracking-widest uppercase text-primary dark:text-white mb-10">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border border-neutral-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
          >
            <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              {s.label}
            </p>
            <p className="text-3xl font-light text-primary dark:text-white mb-4">
              {s.value}
            </p>
            {s.link && (
              <Link
                to={s.link.to}
                className="text-[9px] font-semibold tracking-widest uppercase text-primary dark:text-white hover:opacity-60 transition-opacity"
              >
                {s.link.text} →
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="border border-neutral-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-gray-800 flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-primary dark:text-white">
            Recent Orders
          </p>
          <Link
            to="/admin/orders"
            className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 hover:text-primary dark:hover:text-white transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-gray-800">
                {["Order ID", "Customer", "Total", "Status"].map((h) => (
                  <th
                    key={h}
                    className="py-3 px-6 text-left text-[9px] font-semibold tracking-widest uppercase text-neutral-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.slice(0, 8).map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-neutral-50 dark:border-gray-800 hover:bg-neutral-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-4 px-6 text-[10px] font-mono text-neutral-400">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="py-4 px-6 text-[11px] font-medium text-primary dark:text-white">
                      {order.user?.name}
                    </td>
                    <td className="py-4 px-6 text-[11px] font-semibold text-primary dark:text-white">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-[9px] font-semibold tracking-widest uppercase px-2 py-1 ${
                          order.isPaid
                            ? "bg-primary dark:bg-white text-white dark:text-gray-900"
                            : "bg-neutral-100 dark:bg-gray-800 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-[10px] tracking-widest uppercase text-neutral-400"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;

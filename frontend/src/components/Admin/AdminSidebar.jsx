import { useEffect } from "react";
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/AuthSlice";
import { clearCart } from "../../redux/slice/CartSlice";

const links = [
  { to: "/admin/users", icon: <FaUser className="h-3.5 w-3.5" />, label: "Users" },
  { to: "/admin/products", icon: <FaBoxOpen className="h-3.5 w-3.5" />, label: "Products" },
  { to: "/admin/orders", icon: <FaClipboardList className="h-3.5 w-3.5" />, label: "Orders" },
  { to: "/admin/shop", icon: <FaStore className="h-3.5 w-3.5" />, label: "Shop" },
];

function AdminSidebar() {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full py-6 px-5">
      {/* Logo */}
      <div className="hidden md:block mb-10">
        <Link to="/admin" className="text-[11px] font-semibold tracking-widest3 uppercase text-white hover:opacity-60 transition-opacity">
          Rabbit
        </Link>
        <p className="text-[9px] tracking-widest uppercase text-neutral-500 mt-1">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 text-[10px] font-semibold tracking-widest uppercase transition-colors ${
                isActive
                  ? "bg-white text-primary text-black"
                  : "text-neutral-400 hover:text-white hover:bg-white/10"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-[10px] font-medium text-white truncate px-3 mb-0.5">{user?.name}</p>
        <p className="text-[9px] text-neutral-500 truncate px-3 mb-4">{user?.email}</p>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 text-[10px] font-semibold tracking-widest uppercase bg-white/10 text-white hover:bg-white hover:text-primary transition-colors cursor-pointer">
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;

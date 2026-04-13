import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyOrders from "./MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/AuthSlice";
import { clearCart } from "../redux/slice/CartSlice";

function Profile() {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 mb-1">Account</p>
        <h1 className="text-2xl font-light tracking-widest uppercase text-primary mb-12">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar card */}
          <div className="md:w-56 shrink-0">
            <div className="border border-neutral-100 p-6">
              <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4">
                <span className="text-white text-sm font-semibold tracking-widest uppercase">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <p className="text-sm font-medium text-primary mb-0.5">{user?.name}</p>
              <p className="text-[11px] text-neutral-400 mb-8 truncate">{user?.email}</p>
              <button
                onClick={handleLogout}
                className="w-full border border-primary text-primary text-[10px] font-semibold tracking-widest uppercase py-3 hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Orders */}
          <div className="flex-1 min-w-0">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

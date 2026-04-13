import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyOrders from "./MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/AuthSlice";
import { clearCart } from "../redux/slice/CartSlice";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-primary mb-8">My Account</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile card */}
          <div className="md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                  <HiOutlineUser className="h-8 w-8 text-accent" />
                </div>
                <h2 className="font-bold text-primary text-lg">{user?.name}</h2>
                <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
              </div>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <HiOutlineMail className="h-4 w-4 text-accent" />
                  <span className="truncate">{user?.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
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

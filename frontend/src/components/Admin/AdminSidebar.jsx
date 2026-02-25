import React, { useEffect } from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaOpencart,
  FaSignInAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/AuthSlice";
import { clearCart } from "../../redux/slice/CartSlice";

function AdminSidebar() {

  const {user}=useSelector(state=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const handleLogout=()=>{
   dispatch(logout())
   dispatch(clearCart())
   navigate('/login')
 }
 useEffect(()=>{
 if(!user){
   navigate('/')
 }
 },[user,navigate])
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium  ">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center ">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 text-white "
              : "text-gray-300 hover:bg-gray-700 space-x-2 rounded flex items-center py-3 px-4 hover:text-white"
          }
        >
          <FaUser /> <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 text-white "
              : "text-gray-300 hover:bg-gray-700 space-x-2 rounded flex items-center py-3 px-4 hover:text-white"
          }
        >
          <FaBoxOpen /> <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 text-white "
              : "text-gray-300 hover:bg-gray-700 space-x-2 rounded flex items-center py-3 px-4 hover:text-white"
          }
        >
          <FaClipboardList /> <span>Orders</span>
        </NavLink>
        <NavLink
          to="/admin/shop"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 py-3 px-4 rounded flex items-center space-x-2 text-white "
              : "text-gray-300 hover:bg-gray-700 space-x-2 rounded flex items-center py-3 px-4 hover:text-white"
          }
        >
          <FaStore /> <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mb-6">
        <button
          className="w-full bg-red-500 py-2 space-x-2 px-4 justify-center rounded flex items-center hover:bg-red-600 cursor-pointer text-white"
          onClick={handleLogout}
        >
          <FaSignInAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;

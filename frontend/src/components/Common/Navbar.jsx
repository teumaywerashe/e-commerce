import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const cartItemCount =
    cart?.products?.reduce((total, p) => total + p.quantity, 0) || 0;

  const toggleCartDrawer = () => setDrawerOpen((prev) => !prev);
  const toggleNav = () => setNavOpen((prev) => !prev);

  const navLinks = [
    { label: "Men", to: "/collections/all?gender=Men" },
    { label: "Women", to: "/collections/all?gender=Women" },
    { label: "Top Wear", to: "/collections/all?category=Top Wear" },
    { label: "Bottom Wear", to: "/collections/all?category=Bottom Wear" },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-primary hover:text-accent transition-colors"
          >
            RABBIT
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hidden md:block text-xs font-semibold bg-accent text-white px-3 py-1.5 rounded-full hover:bg-blue-600 transition-colors"
              >
                Admin
              </Link>
            )}

            <SearchBar />

            <Link
              to="/profile"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <HiOutlineUser className="h-5 w-5" />
            </Link>

            <button
              onClick={toggleCartDrawer}
              className="relative text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              <HiOutlineShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleNav}
              className="md:hidden text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              <HiBars3 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      {/* Mobile nav overlay */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleNav}
        />
      )}

      {/* Mobile nav panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="text-lg font-bold tracking-tight text-primary">RABBIT</span>
          <button onClick={toggleNav} className="cursor-pointer text-gray-500 hover:text-primary">
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={toggleNav}
              className="block py-3 px-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={toggleNav}
              className="block py-3 px-3 text-sm font-semibold text-accent hover:bg-blue-50 rounded-lg transition-colors"
            >
              Admin Dashboard
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;

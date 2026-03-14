import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container flex items-center justify-between mx-auto py-4 px-6">
        {/* left icones */}
        <div>
          <Link to="/" className="text-2x1 font-medium">
            Rabbit
          </Link>
        </div>
        {/* center icones */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-700 text-sm font-medium uppercase"
          >
            men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-700 text-sm font-medium uppercase"
          >
            women
          </Link>{" "}
          <Link
            to="/collections/all?category=Top Wear"
            className="text-gray-700 text-sm font-medium uppercase"
          >
            top wear
          </Link>{" "}
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-700 text-sm font-medium uppercase"
          >
            bottom wear
          </Link>
        </div>
        {/* right icomes */}
        <div className="flex itemcenter space-x-4">
          {user && user.role == "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 text-white rounded text-sm "
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black flex">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="flex cursor-pointer relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute bg-[#ea2e0e] -top-1 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          <div clasname="overflow-hidden">
            <SearchBar />
          </div>

          <button onClick={toggleNav} className="flex cursor-pointer md:hidden">
            <HiBars3BottomRight />
          </button>
        </div>
      </nav>
      <CartDrawer
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        {/* Mobile navigation content goes here */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNav} className="cursor-pointer">
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4"> Menu </h2>
          <nav className="space-y-4">
            <Link
              onClick={toggleNav}
              to="/collections/all?gender=Men"
              className="block py-2 text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              onClick={toggleNav}
              to="/collections/all?gender=Women"
              className="block py-2 text-gray-600 hover:text-black"
            >
              women
            </Link>{" "}
            <Link
              onClick={toggleNav}
              to="/collections/all?category=Top Wear"
              className="block py-2 text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              onClick={toggleNav}
              to="/collections/all?category=Bottom Wear"
              className="block py-2 text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;

import React from "react";
import { HiXMark } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";

function CartDrawer({ drawerOpen, toggleCartDrawer }) {
  return (
    <div
      className={`flex flex-col absolute overflow-scroll shadow-lg transform transition-transform duration-300  w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white text-black z-50 top-0 right-0 ${
        drawerOpen ? "translate-x-0 " : "translate-x-full hidden"
      }`}
    >
      <div className="flex  itemscenter justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 cursor-pointer text-gray-300" />
        </button>
      </div>
      <div className="flex relative grow p-4 overflow-y-auto flex-col space-y-4">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContent/>
      </div>{" "}
      <div className="p-4 bg-white sticky bottom-0">
        <button className="w-full bg-black text-white py-3 rounded-lg cursor-pointer font-semibold hover:text-gray-800 hover:bg-gray-200 transition">Checkout</button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">Shipping taxes and discounts calculated at checkout.</p>
      </div>
    </div>
  );
}

export default CartDrawer;

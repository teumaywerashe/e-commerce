import React from "react";
import { IoMdClose } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CartDrawer({ drawerOpen, setDrawerOpen, toggleCartDrawer }) {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const userId = user?._id || null;

  const total = cart?.products?.reduce((acc, p) => acc + p.price * p.quantity, 0) || 0;
  const itemCount = cart?.products?.reduce((acc, p) => acc + p.quantity, 0) || 0;

  const navigateCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={toggleCartDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <HiOutlineShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-primary text-base">
              Your Cart
              {itemCount > 0 && (
                <span className="ml-2 text-xs bg-accent text-white rounded-full px-2 py-0.5">
                  {itemCount}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={toggleCartDrawer}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-500"
          >
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart?.products?.length > 0 ? (
            <CartContent cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <HiOutlineShoppingBag className="h-14 w-14 text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some items to get started</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.products?.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-bold text-primary text-lg">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={navigateCheckout}
              className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-accent/30 cursor-pointer"
            >
              Proceed to Checkout
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;

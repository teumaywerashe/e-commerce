import React, { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CartDrawer({ drawerOpen, setDrawerOpen, toggleCartDrawer }) {
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
  }, []);

  const { user, guestId } = useSelector((state) => state.auth);

  const userId = user ? user._id : null;
  const navigateCheckout = () => {
    toggleCartDrawer();
    setDrawerOpen(false);
    if (!user) {
      navigate("/login?redirect=checkout");
      return;
    }
    navigate("/checkout");
  };
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

        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is Empty.</p>
        )}
      </div>

      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={navigateCheckout}
              className="w-full bg-black text-white py-3 rounded-lg cursor-pointer font-semibold hover:text-gray-800 hover:bg-gray-200 transition"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Shipping taxes and discounts calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;

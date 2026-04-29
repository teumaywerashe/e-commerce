import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CartDrawer({ drawerOpen, setDrawerOpen, toggleCartDrawer }) {
  const navigate = useNavigate();
  const { cart } = useSelector((s) => s.cart);
  const { user, guestId } = useSelector((s) => s.auth);
  const userId = user?._id || null;

  const total = cart?.products?.reduce((a, p) => a + p.price * p.quantity, 0) || 0;
  const itemCount = cart?.products?.reduce((a, p) => a + p.quantity, 0) || 0;

  const goCheckout = () => {
    toggleCartDrawer();
    navigate(user ? "/checkout" : "/login?redirect=checkout");
  };

  return (
    <>
      {drawerOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={toggleCartDrawer} />}

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 z-50 flex flex-col transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-100 dark:border-gray-800">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-primary dark:text-white">
            Bag {itemCount > 0 && <span className="text-neutral-400">({itemCount})</span>}
          </p>
          <button onClick={toggleCartDrawer} className="text-neutral-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer">
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart?.products?.length > 0 ? (
            <CartContent cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-xs tracking-widest uppercase text-neutral-400">Your bag is empty</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.products?.length > 0 && (
          <div className="px-6 py-6 border-t border-neutral-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[11px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400">Total</span>
              <span className="text-sm font-semibold text-primary dark:text-white">${total.toFixed(2)}</span>
            </div>
            <button onClick={goCheckout}
              className="w-full bg-primary dark:bg-white text-white dark:text-gray-900 text-[11px] font-semibold tracking-widest2 uppercase py-4 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer">
              Checkout
            </button>
            <p className="text-[10px] text-neutral-400 text-center mt-3 tracking-wide">
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;

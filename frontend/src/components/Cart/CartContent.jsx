import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../redux/slice/CartSlice";

function CartContent({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, size, delta, color, quantity) => {
    const newQuantity = quantity + delta;
    dispatch(updateCartQuantity({ productId: String(productId), quantity: newQuantity, guestId, userId, size, color }));
  };

  const handleRemove = (productId, color, size) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="space-y-4">
      {cart.products.map(
        (item, i) =>
          item.quantity > 0 && (
            <div key={i} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
              <div className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded-xl bg-gray-100"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-primary line-clamp-1 mb-0.5">{item.name}</h3>
                <p className="text-xs text-gray-400 mb-2">
                  {item.color} · {item.size}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.size, -1, item.color, item.quantity)}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-sm hover:border-primary transition-all cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold text-primary w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.size, 1, item.color, item.quantity)}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-sm hover:border-primary transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => handleRemove(item.productId, item.color, item.size)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                >
                  <RiDeleteBin3Line className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default CartContent;

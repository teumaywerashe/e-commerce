import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../redux/slice/CartSlice";

function CartContent({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  const handleQty = (productId, size, delta, color, quantity) => {
    dispatch(updateCartQuantity({ productId: String(productId), quantity: quantity + delta, guestId, userId, size, color }));
  };

  const handleRemove = (productId, color, size) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="space-y-6">
      {cart.products.map((item, i) =>
        item.quantity > 0 && (
          <div key={i} className="flex gap-4 border-b border-neutral-100 pb-6 last:border-0">
            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-neutral-50 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium tracking-wide text-primary line-clamp-1 mb-0.5">{item.name}</p>
              <p className="text-[10px] text-neutral-400 mb-3">{item.color} · {item.size}</p>
              <div className="flex items-center gap-3">
                {/* quantity − */}
                <button onClick={() => handleQty(item.productId, item.size, -1, item.color, item.quantity)}
                  className="w-7 h-7 border border-neutral-300 bg-white text-primary flex items-center justify-center text-sm hover:border-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  −
                </button>
                <span className="text-xs font-semibold text-primary w-4 text-center">{item.quantity}</span>
                {/* quantity + */}
                <button onClick={() => handleQty(item.productId, item.size, 1, item.color, item.quantity)}
                  className="w-7 h-7 border border-neutral-300 bg-white text-primary flex items-center justify-center text-sm hover:border-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <span className="text-[11px] font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
              {/* delete — dark icon on white, always visible */}
              <button onClick={() => handleRemove(item.productId, item.color, item.size)}
                className="text-neutral-400 hover:text-primary transition-colors cursor-pointer">
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

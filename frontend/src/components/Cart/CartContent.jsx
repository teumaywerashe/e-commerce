import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../redux/slice/CartSlice";

function CartContent({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, size, delta, color, quantity) => {
    const newQuantity = quantity + delta;

    dispatch(
      updateCartQuantity({
        productId,
        size,
        color,
        quantity: newQuantity,
        guestId,
        userId,
      }),
    );
  };
  const handleRemoveFromCart = (productId, color, size) => {
    dispatch(removeFromCart({ productId, color, size, userId, guestId }));
  };
  // Example cart items array
  return (
    <div>
      {cart.products.map(
        (item, i) =>
          item.quantity > 0 && (
            <div
              key={i}
              className="flex items-center justify-between py-4 space-x-4 border-b pb-4"
            >
              <div className="flex items-start">
                {" "}
                <img
                  className="w-20 h-24 object-cover rounded"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-md font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500"> Size: {item.size}</p>
                <div>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        item.productId,
                        item.size,
                        -1,
                        item.color,
                        item.quantity,
                      )
                    }
                    className="border rounded   cursor-pointer px-2 py-1 text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="mx-4"> {item.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        item.productId,
                        item.size,
                        1,
                        item.color,
                        item.quantity,
                      )
                    }
                    className="border rounded  cursor-pointer px-2 py-1 text-xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p>$ {item.price}</p>
                <button
                  onClick={() =>
                    handleRemoveFromCart(item.productId, item.color, item.size)
                  }
                  className="cursor-pointer"
                >
                  <RiDeleteBin3Line className="h-6 w-6 mt-2 text-[red]" />
                </button>
              </div>
            </div>
          ),
      )}
    </div>
  );
}

export default CartContent;

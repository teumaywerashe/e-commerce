import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

function CartContent() {
  const cartItems = [
    {
      productID: 1,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 2,
      name: "jins",
      size: "M",
      color: "blue",
      quantity: 2,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 3,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 4,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 5,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 6,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 7,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 8,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productID: 9,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
  ]; // Example cart items array
  return (
    <div>
      {cartItems.map((item, i) => (
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
              <button className="border rounded px-2 py-1 text-xl font-medium">+</button>
              <span className="mx-4">  {item.quantity}</span>
              <button className="border rounded px-2 py-1 text-xl font-medium">-</button>
            </div>
          </div>
          <div>
          <p>$ {item.price.toLocaleString()}</p>
          <button className="cursor-pointer">
            <RiDeleteBin3Line className="h-6 w-6 mt-2 text-[red]"/>
          </button>
          </div>
         
        </div>
      ))}
    </div>
  );
}

export default CartContent;

import React from "react";
const checkout = {
  _id: "1234",
  createdAt: new Date(),
  checkOutItems: [
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
      image: "https://picsum.photos/200?random=2",
    },
    {
      productID: 3,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=3",
    },
  ],
  shippingAdress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA",
  },
};

const calculateEstimatedDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleString();
};

function OrderConformationPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for your order
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* order id and date*/}
            <div>
              <h2 className="text-xl font-semibold">
                Order Id: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* estimated delivery*/}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* ordered items */}
          <div className="mb-4 p-4">
            {checkout.checkOutItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center mb-4"
              >
                <img
                  className="w-16 object-cover h-16 rounded-md mr-4"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <h4 className="text-md  font-semibold text-black">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>

                <div className="ml-auto text-right">
                  <p className="text-md text-black">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty:  {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* payment and delivery info */}
          <div className="grid grid-cols-2 gap-8">
            {/* payment info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>
            {/* delivery info */}
            <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">{checkout.shippingAdress.address.split(' ')[0]}</p>
              <p className="text-gray-600"></p>
            </div> 
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConformationPage;

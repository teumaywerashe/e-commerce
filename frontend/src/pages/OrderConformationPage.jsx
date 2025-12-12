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
  ],
  shippingAdress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA",
  },
};

const calculateEstimatedDelivery=()=>{

}

function OrderConformationPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for your order
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-center mb-20">
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
            <div >
              <p className="text-emerald-700 text-sm">Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConformationPage;

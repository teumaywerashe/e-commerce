import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/CheckoutSlice";

function Checkout() {
  const { user } = useSelector((state) => state.auth);
  const {cart}=useSelector((state)=>state.cart)
  const dispatch = useDispatch();

  const [checkoutId,setCheckoutId]=useState(null)
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    firestName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
  });
 
  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(1234)
    try {
      dispatch(createCheckout({checkoutItems:cart,shippingAddress,toatalPrice:calculateTotal(),}))
    } catch (error) {
      console.log(error);
    }
   
  };



  const calculateTotal = () => {
    const totlaQuantity = cart.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
    return totlaQuantity;
  };

  const handleSuccess = ({ details }) => {
    console.log("Payment detail", details);
    navigate("/order-conformation");
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/*  left side*/}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6 ">checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">contact details</h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700 ">
              Email
            </label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              value={`${user.email}`}
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4  ">
            <div>
              <label htmlFor="" className="block text-gray-700">
                First Name
              </label>{" "}
              <input
                value={shippingAddress.firestName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firestName: e.target.value,
                  })
                }
                type="text"
                placeholder="first name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Last Name
              </label>{" "}
              <input
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                type="text"
                placeholder="last name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                address
              </label>{" "}
              <input
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                type="text"
                placeholder="yoour address"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4  ">
            <div>
              <label htmlFor="" className="block text-gray-700">
                Country
              </label>{" "}
              <input
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                type="text"
                placeholder="your country"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                postalCode
              </label>{" "}
              <input
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                type="text"
                placeholder="your postal code"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                City
              </label>{" "}
              <input
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                type="text"
                placeholder="your city"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                Phone
              </label>{" "}
              <input
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                type="tele"
                placeholder="your phone number"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-6 ">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black cursor-pointer text-white py-3 rounded"
              >
                continue to payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg capitalize mb-4">pay with paypal</h3>

                <PaypalButton
                  amount={100}
                  onsuccess={handleSuccess}
                  onError={() => alert("Payment failed. try again!")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* rightf sidebare */}
      <div className="bg-gray-50 rounded-lg p-6 ">
        <h2 className="items-center text-lg mb-4">order summery</h2>
        <div className="border-t mb-4 py-4 ">
          {cart.products.map((product, index) => (
            <div
              className="flex items-start justify-between py-2 border-b"
              key={index}
            >
              <div className="flex  items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 object-cover mr-4 h-24"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-lg">${product.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${calculateTotal()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-r border-t pt-4">
          <p>Total</p>
          <p> ${calculateTotal()}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  
} from "react-router-dom";
import loginImage from "../assets/login.webp";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slice/AuthSlice";
import { mergeCart } from "../redux/slice/CartSlice";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const { user,error, guestId,loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.lengt > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user,guestId,cart,navigate,dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
   
    dispatch(loginUser({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex ">
      <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className=" w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium ">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 ">Hey there ✋</h2>
          <p className="text-center mb-6 ">
            Enter Your username and password to login
          </p>
          <div className="mb-6">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              className="w-full p-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="text"
              value={password}
              className="w-full p-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error&&<p className="text-red-400 p-10">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black mb-4 cursor-pointer text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
           {loading?"Processing...":'Login'}
          </button>
          <p className="mb-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to={`/register?redirecct=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={loginImage}
            alt="Login to account"
            className="w-full h-[750px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

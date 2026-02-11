import React, { useState } from "react";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.webp";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slice/AuthSlice";

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser({ name: name, email: email, password: password }));
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
            Enter Your information to register
          </p>
          <div className="mb-6">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              className="w-full p-2 border rounded"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-black mb-4 cursor-pointer text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
          <p className="mb-6 text-center text-sm">
            already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={registerImage}
            alt="Login to account"
            className="w-full h-[750px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;

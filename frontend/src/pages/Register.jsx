import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../assets/register.webp";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slice/AuthSlice";

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Form side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight block mb-10">
            RABBIT
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">Create account</h1>
          <p className="text-gray-500 text-sm mb-8">Join us and start shopping today</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-accent/30 cursor-pointer disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Image side */}
      <div className="hidden md:block md:w-1/2 relative">
        <img src={registerImage} alt="Register" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-transparent" />
        <div className="absolute bottom-12 left-10 text-white">
          <p className="text-3xl font-bold leading-tight">Discover your<br />next favorite look.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;

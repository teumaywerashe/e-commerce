import { useState } from "react";
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
  const { loading, error } = useSelector((s) => s.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    navigate("/");
  };

  const inputClass =
    "w-full border-b border-neutral-300 dark:border-neutral-600 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors bg-transparent";

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950">
      {/* Form side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="text-xs font-semibold tracking-widest uppercase text-gray-900 dark:text-white block mb-12 hover:opacity-60 transition-opacity"
          >
            Rabbit
          </Link>

          <h1 className="text-2xl font-light tracking-widest uppercase text-gray-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-10 tracking-wide">
            Join us today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={inputClass}
              />
            </div>

            {error && (
              <p className="text-[11px] text-red-500 tracking-wide">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-semibold tracking-widest uppercase py-4 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 text-center mt-8 tracking-wide">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-900 dark:text-white font-semibold hover:opacity-60 transition-opacity"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Image side */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img
          src={registerImage}
          alt="Register"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-10">
          <p className="text-3xl font-light tracking-widest uppercase text-white leading-tight">
            Discover your
            <br />
            next look.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

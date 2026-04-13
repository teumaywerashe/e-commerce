import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const { user, error, guestId, loading } = useSelector((s) => s.auth);
  const { cart } = useSelector((s) => s.cart);
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckout = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      const dest = user.role === "admin" ? "/admin" : isCheckout ? "/checkout" : "/";
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => navigate(dest));
      } else {
        navigate(dest);
      }
    }
  }, [user, guestId, cart, navigate, dispatch, isCheckout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const inputClass = "w-full border-b border-neutral-200 py-3 text-sm text-primary placeholder-neutral-400 focus:outline-none focus:border-primary transition-colors bg-transparent";

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-16 bg-white">
        <div className="w-full max-w-sm">
          <Link to="/" className="text-xs font-semibold tracking-widest3 uppercase text-primary block mb-12 hover:opacity-60 transition-opacity">
            Rabbit
          </Link>
          <h1 className="text-2xl font-light tracking-widest uppercase text-primary mb-2">Sign In</h1>
          <p className="text-xs text-neutral-400 mb-10 tracking-wide">Welcome back</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" required className={inputClass} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" required className={inputClass} />

            {error && <p className="text-[11px] text-red-500 tracking-wide">{error}</p>}

            {/* solid black — always visible */}
            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white text-[11px] font-semibold tracking-widest2 uppercase py-4 hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-[11px] text-neutral-400 text-center mt-8 tracking-wide">
            New here?{" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-primary font-semibold hover:opacity-60 transition-opacity">
              Create account
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-10">
          <p className="text-3xl font-light tracking-widest uppercase text-white leading-tight">Style that<br />speaks.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

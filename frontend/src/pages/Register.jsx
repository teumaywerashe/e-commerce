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

  const inputClass = "w-full border-b border-neutral-200 py-3 text-sm text-primary placeholder-neutral-400 focus:outline-none focus:border-primary transition-colors bg-transparent";

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-16 bg-white">
        <div className="w-full max-w-sm">
          <Link to="/" className="text-xs font-semibold tracking-widest3 uppercase text-primary block mb-12 hover:opacity-60 transition-opacity">
            Rabbit
          </Link>
          <h1 className="text-2xl font-light tracking-widest uppercase text-primary mb-2">Create Account</h1>
          <p className="text-xs text-neutral-400 mb-10 tracking-wide">Join us today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required className={inputClass} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required className={inputClass} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className={inputClass} />

            {error && <p className="text-[11px] text-red-500 tracking-wide">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white text-[11px] font-semibold tracking-widest2 uppercase py-4 hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 mt-4">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-[11px] text-neutral-400 text-center mt-8 tracking-wide">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:opacity-60 transition-opacity">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img src={registerImage} alt="Register" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-10">
          <p className="text-3xl font-light tracking-widest uppercase text-white leading-tight">Discover your<br />next look.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;

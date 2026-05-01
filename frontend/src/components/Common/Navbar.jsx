import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { MdOutlineAutoMode } from "react-icons/md";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slice/themeSlice";

const navLinks = [
  { label: "Men", to: "/collections/all?gender=Men" },
  { label: "Women", to: "/collections/all?gender=Women" },
  { label: "Top Wear", to: "/collections/all?category=Top Wear" },
  { label: "Bottom Wear", to: "/collections/all?category=Bottom Wear" },
];

function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const { cart } = useSelector((s) => s.cart);
  const { mode, preference } = useSelector((s) => s.theme);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const cartCount = cart?.products?.reduce((t, p) => t + p.quantity, 0) || 0;
  const toggleCart = () => setDrawerOpen((p) => !p);
  const toggleNav = () => setNavOpen((p) => !p);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-neutral-100 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link
            to="/"
            className="text-sm font-semibold tracking-widest3 uppercase text-primary dark:text-white hover:opacity-60 transition-opacity"
          >
            Rabbit
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hidden md:block text-[10px] font-semibold tracking-widest uppercase bg-primary text-white px-3 py-1.5 hover:bg-neutral-800 transition-colors"
              >
                Admin
              </Link>
            )}
            <SearchBar />
            <button
              onClick={() => dispatch(toggleTheme())}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
              aria-label={`Theme: ${preference}. Click to cycle.`}
              title={
                preference === "light"
                  ? "Light mode"
                  : preference === "dark"
                    ? "Dark mode"
                    : "Auto (system)"
              }
            >
              {preference === "dark" ? (
                <HiOutlineMoon className="h-[18px] w-[18px]" />
              ) : preference === "auto" ? (
                <MdOutlineAutoMode className="h-[18px] w-[18px]" />
              ) : (
                <HiOutlineSun className="h-[18px] w-[18px]" />
              )}
            </button>
            <Link
              to="/profile"
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-white transition-colors"
            >
              <HiOutlineUser className="h-[18px] w-[18px]" />
            </Link>
            <button
              onClick={toggleCart}
              className="relative text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
            >
              <HiOutlineShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={toggleNav}
              className="md:hidden text-neutral-600 dark:text-neutral-300 hover:text-primary cursor-pointer"
            >
              <RiMenu3Line className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        toggleCartDrawer={toggleCart}
      />

      {navOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleNav} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-100 dark:border-gray-800">
          <span className="text-xs font-semibold tracking-widest3 uppercase text-primary dark:text-white">
            Menu
          </span>
          <button
            onClick={toggleNav}
            className="cursor-pointer text-neutral-400 dark:text-neutral-300 hover:text-primary dark:hover:text-white"
          >
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>
        <nav className="px-6 py-8 space-y-6">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={toggleNav}
              className="block text-xs font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={toggleNav}
              className="block text-xs font-semibold tracking-widest uppercase text-primary dark:text-white"
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;

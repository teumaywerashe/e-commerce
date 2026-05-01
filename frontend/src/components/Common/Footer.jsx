import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-neutral-500 pt-16 pb-8 border-t border-gray-800 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand + Newsletter */}
        <div>
          <p className="text-white text-[11px] font-semibold tracking-widest3 uppercase mb-4">
            Rabbit
          </p>
          <p className="text-xs leading-relaxed mb-6">
            Minimal luxury fashion for the modern wardrobe.
          </p>
          <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-3">
            Get 10% off your first order
          </p>
          <form className="flex border border-neutral-700 dark:border-gray-700">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent text-white placeholder-neutral-600 text-xs px-3 py-2.5 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-gray-900 text-[10px] font-semibold tracking-widest uppercase px-4 py-2.5 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
            >
              Join
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <p className="text-white text-[10px] font-semibold tracking-widest uppercase mb-5">
            Shop
          </p>
          <ul className="space-y-3">
            {[
              "Men's Top Wear",
              "Women's Top Wear",
              "Men's Bottom Wear",
              "Women's Bottom Wear",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  className="text-xs hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-white text-[10px] font-semibold tracking-widest uppercase mb-5">
            Support
          </p>
          <ul className="space-y-3">
            {["Contact Us", "About Us", "FAQs", "Returns"].map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  className="text-xs hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div>
          <p className="text-white text-[10px] font-semibold tracking-widest uppercase mb-5">
            Follow Us
          </p>
          <div className="flex gap-3 mb-6">
            {[
              {
                href: "https://facebook.com",
                icon: <TbBrandMeta className="h-4 w-4" />,
              },
              {
                href: "https://instagram.com",
                icon: <IoLogoInstagram className="h-4 w-4" />,
              },
              {
                href: "https://x.com",
                icon: <RiTwitterXLine className="h-4 w-4" />,
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-white hover:text-white transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a
            href="tel:+1234567890"
            className="text-xs hover:text-white transition-colors"
          >
            +1 (234) 567-890
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-800 text-center">
        <p className="text-[10px] tracking-widest uppercase text-neutral-700">
          © 2025 Rabbit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

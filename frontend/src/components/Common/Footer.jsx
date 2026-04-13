import React from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-primary text-gray-400 pt-14 pb-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold text-lg mb-1">RABBIT</h3>
          <p className="text-sm mb-4 leading-relaxed">
            Be the first to know about new arrivals, exclusive offers, and more.
          </p>
          <p className="text-xs text-accent font-semibold mb-4 uppercase tracking-wide">
            Sign up & get 10% off your first order
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-white/10 text-white placeholder-gray-500 text-sm px-4 py-2.5 rounded-l-lg border border-white/10 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-r-lg transition-colors cursor-pointer"
            >
              Join
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Shop</h3>
          <ul className="space-y-3 text-sm">
            {["Men's Top Wear", "Women's Top Wear", "Men's Bottom Wear", "Women's Bottom Wear"].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Support</h3>
          <ul className="space-y-3 text-sm">
            {["Contact Us", "About Us", "FAQs", "Returns"].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Follow Us</h3>
          <div className="flex items-center gap-4 mb-6">
            {[
              { href: "https://facebook.com", icon: <TbBrandMeta className="h-5 w-5" /> },
              { href: "https://instagram.com", icon: <IoLogoInstagram className="h-5 w-5" /> },
              { href: "https://x.com", icon: <RiTwitterXLine className="h-5 w-5" /> },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-accent hover:text-white transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FiPhoneCall className="h-4 w-4 text-accent" />
            <a href="tel:+1234567890" className="hover:text-white transition-colors">
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-600">
        © 2025 Rabbit. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

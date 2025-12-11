import React from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta, TbFilePhone } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 llg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">NewsLetter</h3>
          <p className="text-gray-500 mb-4 ">
            Be the first to know about new arrivals, exclusive offers, and more.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            signup and get 10% off your first order!
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-md w-fulll text-sm border-l border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all required:"
            />
            <button
              type="submit"
              className="text-white bg-black cursor-pointer px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              subscribe
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-6">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Men's bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-6">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg mb-4 text-gray-800">Follow Us</h3>
          <div className="flec items-center space-x-4 mb-6 ">
            <a
              href="http://www.facebook.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="http://www.facebook.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>{" "}
            <a
              href="http://www.facebook.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <RiTwitterXLine className="h-6 w-6" />
            </a>
          </div>
          <p className="text-gray-500">CallUs</p>
          <p> <FiPhoneCall className="inline-block mr-2"/>
          0123-456-789</p>
         
        </div>
      </div>
      <div className="container ax-s=auto mt-12 px-4 lg;px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          @ 2025 ,compileTab. aLL Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

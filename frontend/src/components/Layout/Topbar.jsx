import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

function Topbar() {
  return (
    <div className="bg-primary text-white text-xs">
      <div className="container mx-auto flex justify-between items-center py-2.5 px-4">
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="hover:text-accent transition-colors">
            <TbBrandMeta className="h-4 w-4" />
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            <IoLogoInstagram className="h-4 w-4" />
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <p className="tracking-wide text-gray-300 text-center w-full md:w-auto">
          Free worldwide shipping on orders over $100
        </p>
        <div className="hidden md:block text-gray-300">
          <a href="tel:+123456789" className="hover:text-white transition-colors">
            +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;

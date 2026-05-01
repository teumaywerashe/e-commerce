import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <Topbar />
      <Navbar/>
    </header >
  );
}

export default Header;

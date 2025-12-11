import { React } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import Register from "../../pages/Register";

function UserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default UserLayout;

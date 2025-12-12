import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Poroducts/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConformationPage from "./pages/OrderConformationPage";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/collections/:collection"
            element={<CollectionPage />}
          ></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route
            path="/order-conformation"
            element={<OrderConformationPage />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

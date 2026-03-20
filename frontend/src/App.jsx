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
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProduct from "./components/Admin/EditProduct";
import OrderManagement from "./components/Admin/OrderManagement";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import AddProduct from "./components/Admin/AddProduct";
function App() {
  return (
    <>
 
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route
            path="collections/:collection"
            element={<CollectionPage />}
          ></Route>
          <Route path="product/:id" element={<ProductDetails />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route 
            path="order-conformation"
            element={<OrderConformationPage />}
          ></Route>
          <Route path="order/:id" element={<OrderDetailsPage />}></Route>
          <Route path="my-orders" element={<MyOrders />}></Route>
        </Route>
        <Route path="/admin" element={
          <ProtectedRoute role="admin" ><AdminLayout /></ProtectedRoute>
          
          }>
          <Route index element={<AdminHomePage />}></Route>
          <Route path="users" element={<UserManagement />}></Route>
          <Route path="products" element={<ProductManagement />}></Route>
          <Route path="orders" element={<OrderManagement />}></Route>
          <Route path="shop" element={<UserManagement />}></Route>
          <Route path="new-product" element={<AddProduct />}></Route>

          <Route path="product/edit/:id" element={<EditProduct />}></Route>

        </Route>
      </Routes>
    
    </>
  );
}

export default App;

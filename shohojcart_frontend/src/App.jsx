// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";

import Layout from "./components/Layout";
import Protected from "./components/Protected";

// Dashboard pages (slug-scoped)
import Home from "./pages/dashboard/Home";
import Orders from "./pages/dashboard/Orders";
import Products from "./pages/dashboard/Products";
import Customers from "./pages/dashboard/Customers";
import Marketing from "./pages/dashboard/Marketing";
import Discounts from "./pages/dashboard/Discounts";
import Analytics from "./pages/dashboard/Analytics";
import Content from "./pages/dashboard/Content";
import Markets from "./pages/dashboard/Markets";
import OnlineStore from "./pages/dashboard/OnlineStore";
import Apps from "./pages/dashboard/Apps";
import Settings from "./pages/dashboard/Settings";
import ProductNew from "./pages/dashboard/ProductNew";

// Storefront pages
import ShopHome from "./components/Storefront/ShopHome.jsx";
import ShopProduct from "./components/Storefront/ShopProduct.jsx";
import Cart from "./components/Storefront/Cart.jsx";
import Checkout from "./components/Storefront/Checkout.jsx";

export default function App() {
  return (
    <Routes>
      {/* Default -> login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public storefront */}
<Route path="/s/:shopSlug" element={<ShopHome />} />
<Route path="/s/:shopSlug/product/:productSlug" element={<ShopProduct />} />
<Route path="/s/:shopSlug/cart" element={<Cart />} />
<Route path="/s/:shopSlug/checkout" element={<Checkout />} />
      {/* Slug-scoped dashboard */}
      <Route
        path="/d/:shopSlug"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<Home />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="discounts" element={<Discounts />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="content" element={<Content />} />
        <Route path="markets" element={<Markets />} />
        <Route path="onlinestore" element={<OnlineStore />} />
        <Route path="apps" element={<Apps />} />
        <Route path="settings" element={<Settings />} />
        <Route path="products/new" element={<ProductNew />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

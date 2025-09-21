//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import Home from "./pages/dashboard/Home";
import Orders from "./pages/dashboard/Orders";
import Products from "./pages/dashboard/Products";
import Customers from "./pages/dashboard/Customers";
import Marketing from "./pages/dashboard/Marketing";
import Discounts from "./pages/dashboard/Discounts";
import Content from "./pages/dashboard/Content";
import Markets from "./pages/dashboard/Markets";
import Analytics from "./pages/dashboard/Analytics";
import OnlineStore from "./pages/dashboard/OnlineStore";
import Apps from "./pages/dashboard/Apps";
import Settings from "./pages/dashboard/Settings";

function App() {
  //  const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* Protected Dashboard pages */}
      <Route path="/" element={<Protected><Layout /></Protected>}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="discounts" element={<Discounts />} />
        <Route path="content" element={<Content />} />
        <Route path="markets" element={<Markets />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="onlinestore" element={<OnlineStore />} />
        <Route path="apps" element={<Apps />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Auth pages */}
      <Route path="/Signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

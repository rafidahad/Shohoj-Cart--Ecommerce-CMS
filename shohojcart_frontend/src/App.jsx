//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Header,
  Footer,
  ProductList,
  ProductPage,
  Cart,
  Checkout,
} from "./components/Storefront";
import Home from "./pages/StoreManager/Home";
import Orders from "./pages/StoreManager/Orders";
import Products from "./pages/StoreManager/Products";
import Customers from "./pages/StoreManager/Customers";
import Marketing from "./pages/StoreManager/Marketing";
import Discounts from "./pages/StoreManager/Discounts";
import Content from "./pages/StoreManager/Content";
import Markets from "./pages/StoreManager/Markets";
import Protected from "./components/Protected";
function App() {
  //  const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* Storefront pages */}
      <Route path="/" element={<Protected><Home /></Protected>} />
      <Route path="/dashboard" element={<Protected><Home /></Protected>} />
      <Route path="/orders" element={<Protected><Orders /></Protected>} />
      <Route path="/products" element={<Protected><Products /></Protected>} />
      <Route path="/customers" element={<Protected><Customers /></Protected>} />
      <Route path="/marketing" element={<Protected><Marketing /></Protected>} />
      <Route path="/discounts" element={<Protected><Discounts /></Protected>} />
      <Route path="/content" element={<Protected><Content /></Protected>} />
      <Route path="/markets" element={<Protected><Markets /></Protected>} />
      <Route path="/product/:id" element={<Protected><ProductPage /></Protected>} />
      <Route path="/cart" element={<Protected><Cart /></Protected>} />
      <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

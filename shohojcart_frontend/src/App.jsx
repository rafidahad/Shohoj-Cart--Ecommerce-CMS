//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login/Login'
import Signup from './components/SignUp/Signup'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Header, Footer, ProductList, ProductPage, Cart, Checkout } from "./components/Storefront";

function App() {
//  const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* Storefront pages */}
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
      <Route path="/" element={<Signup />} />
      <Route path='/login' element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      
    </Routes>
  )
}

export default App

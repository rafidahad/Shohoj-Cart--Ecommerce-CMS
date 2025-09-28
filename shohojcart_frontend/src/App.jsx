import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import ProtectedRoute from './components/dashboard/ProtectedRoute';

// Auth pages
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';

// Dashboard pages
import DashboardHome from './pages/dashboard/Home';
import Products from './pages/dashboard/Products';
import ProductNew from './pages/dashboard/ProductNew';
import Orders from './pages/dashboard/Orders';
import Customers from './pages/dashboard/Customers';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';

// Storefront pages
import ShopHome from './components/Storefront/ShopHome';
import ProductPage from './components/Storefront/ProductPage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Storefront routes */}
              <Route path="/store/:shop_id" element={<ShopHome />} />
              <Route path="/store/:shop_id/product/:product_id" element={<ProductPage />} />
              
              {/* Protected dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardHome />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/products" element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/products/new" element={
                <ProtectedRoute>
                  <ProductNew />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/customers" element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </ShopProvider>
    </AuthProvider>
  )
}

export default App

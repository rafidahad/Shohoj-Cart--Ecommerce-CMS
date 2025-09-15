import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";


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
import Login from "./pages/dashboard/Login";
import Register from "./pages/dashboard/Register";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/content" element={<Content />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/onlinestore" element={<OnlineStore />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
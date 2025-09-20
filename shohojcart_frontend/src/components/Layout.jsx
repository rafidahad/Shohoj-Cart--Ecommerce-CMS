import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Box,
  Users,
  Megaphone,
  Tag,
  FileText,
  Globe,
  BarChart,
  Store,
  Grid,
  Settings,
} from "lucide-react"; // lucide-react icons

const links = [
  { label: "Home", path: "/", icon: <Home size={18} /> },
  { label: "Orders", path: "/orders", icon: <ShoppingCart size={18} /> },
  { label: "Products", path: "/products", icon: <Box size={18} /> },
  { label: "Customers", path: "/customers", icon: <Users size={18} /> },
  { label: "Marketing", path: "/marketing", icon: <Megaphone size={18} /> },
  { label: "Discounts", path: "/discounts", icon: <Tag size={18} /> },
  { label: "Content", path: "/content", icon: <FileText size={18} /> },
  { label: "Markets", path: "/markets", icon: <Globe size={18} /> },
  { label: "Analytics", path: "/analytics", icon: <BarChart size={18} /> },
  { label: "Online Store", path: "/onlinestore", icon: <Store size={18} /> },
  { label: "Apps", path: "/apps", icon: <Grid size={18} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ======= Top Navbar ======= */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 shadow">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Brand */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3"
          >
            <div className="h-9 w-9 grid place-items-center rounded-md bg-white text-blue-600 font-bold">
              S
            </div>
            <span className="text-xl font-extrabold tracking-wide text-white">
              ShohojCart
            </span>
          </button>

          {/* Right side user info */}
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-white text-sm">
              Hi, User
            </span>
            <div className="h-9 w-9 rounded-full bg-white text-blue-600 grid place-items-center font-semibold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* ======= Sidebar ======= */}
      <aside
        className="
          fixed top-16 left-0 z-40
          h-[calc(100vh-4rem)] w-60
          bg-white border-r shadow-sm
          overflow-y-auto
          flex flex-col
        "
      >
        <nav className="flex flex-col gap-1 p-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50",
                ].join(" ")
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ======= Main Content ======= */}
      <main
        className="
          pt-16 pl-60
          min-h-screen
          bg-gray-50
        "
      >
        <div className="max-w-7xl mx-auto p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

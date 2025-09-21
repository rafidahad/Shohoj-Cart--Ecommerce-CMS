// src/components/Layout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  Home, ShoppingCart, Box, Users, Megaphone, Tag, FileText, Globe, BarChart, Store, Grid, Settings,
} from "lucide-react";
import { useShop } from "../context/ShopContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Use relative "segments" and build full URLs with the current slug
const navLinks = [
  { label: "Home",       seg: "",           icon: <Home size={18} /> },
  { label: "Orders",     seg: "orders",     icon: <ShoppingCart size={18} /> },
  { label: "Products",   seg: "products",   icon: <Box size={18} /> },
  { label: "Customers",  seg: "customers",  icon: <Users size={18} /> },
  { label: "Marketing",  seg: "marketing",  icon: <Megaphone size={18} /> },
  { label: "Discounts",  seg: "discounts",  icon: <Tag size={18} /> },
  { label: "Content",    seg: "content",    icon: <FileText size={18} /> },
  { label: "Markets",    seg: "markets",    icon: <Globe size={18} /> },
  { label: "Analytics",  seg: "analytics",  icon: <BarChart size={18} /> },
  { label: "Online Store", seg: "onlinestore", icon: <Store size={18} /> },
  { label: "Apps",       seg: "apps",       icon: <Grid size={18} /> },
  { label: "Settings",   seg: "settings",   icon: <Settings size={18} /> },
];

export default function Layout() {
  const navigate = useNavigate();
  const { shopSlug } = useParams();
  const { shop, setBySlug } = useShop();

  const user  = JSON.parse(localStorage.getItem("auth_user") || "null");
  const token = localStorage.getItem("auth_token");
  const [menuOpen, setMenuOpen] = useState(false);

  // Resolve shop by slug whenever slug changes
  useEffect(() => {
    if (shopSlug) setBySlug(shopSlug);
  }, [shopSlug, setBySlug]);

  const base = `/d/${encodeURIComponent(shopSlug || "")}`;

  const handleLogout = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: "POST",
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // ignore API errors
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("shop_ctx");
      localStorage.removeItem("shop_id");
      navigate("/login", { replace: true });
    }
  };

  const initials = (user?.name || user?.email || "U").slice(0, 1).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ======= Top Navbar ======= */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 shadow">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Brand + shop name */}
          <button onClick={() => navigate(base)} className="group flex items-center gap-3">
            <div className="h-9 w-9 grid place-items-center rounded-md bg-white text-blue-600 font-bold">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wide text-white">ShohojCart</span>
              <span className="text-[11px] text-white/80 -mt-0.5">
                Dashboard{shop?.name ? ` · ${shop.name}` : ""}
              </span>
            </div>
          </button>

          {/* Right: user menu with Logout */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-3"
            >
              <span className="hidden md:block text-white text-sm">
                Hi, {user?.name || "User"}
              </span>
              <div className="h-9 w-9 rounded-full bg-white text-blue-600 grid place-items-center font-semibold">
                {initials}
              </div>
            </button>

            {menuOpen && (
              <>
                {/* click-away */}
                <button
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setMenuOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 mt-2 w-44 z-50 rounded-lg border bg-white shadow-lg">
                  <div className="px-3 py-2 text-xs text-gray-500">{user?.email || ""}</div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
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
          {navLinks.map((link) => {
            const to = link.seg ? `${base}/${link.seg}` : base;
            return (
              <NavLink
                key={link.label}
                to={to}
                end={!link.seg} // exact match for home
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
            );
          })}
        </nav>
      </aside>

      {/* ======= Main Content ======= */}
      <main className="pt-16 pl-60 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// src/components/Layout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
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
  Menu,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useShop } from "../context/ShopContext.jsx";

export default function Layout() {
  const navigate = useNavigate();
  const { shopSlug } = useParams();
  const { user, logout, me } = useAuth();
  const { shop, setBySlug } = useShop();
  const [open, setOpen] = useState(false); // mobile sidebar

  useEffect(() => {
    (async () => {
      await me().catch(() => {});
      if (shopSlug) await setBySlug(shopSlug).catch(() => {});
    })();
  }, [shopSlug]);

  const prefix = (p) => `/d/${shop?.slug ?? shopSlug}${p}`;
  const userInitial = (user?.name?.[0] ?? user?.email?.[0] ?? "U").toUpperCase();

  const links = [
    { label: "Home", path: "", icon: <Home size={18} /> },
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ======= Top Navbar ======= */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 shadow">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden -ml-1 p-2 rounded-md hover:bg-white/10"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle Sidebar"
            >
              <Menu className="text-white" size={22} />
            </button>

            {/* Brand */}
            <button
              onClick={() => navigate(prefix(""))}
              className="group flex items-center gap-3"
            >
              <div className="h-9 w-9 grid place-items-center rounded-md bg-white text-blue-600 font-bold">
                S
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-extrabold tracking-wide text-white leading-none">
                  ShohojCart
                </span>
                <span className="text-[11px] text-white/90 leading-none mt-0.5">
                  {shop?.name ? `Dashboard · ${shop.name}` : "Dashboard"}
                </span>
              </div>
            </button>
          </div>

          {/* Right side user info with dropdown */}
          <details className="relative">
            <summary className="flex items-center gap-3 list-none cursor-pointer select-none">
              <span className="hidden md:block text-white text-sm">
                Hi, {user?.name ?? "User"}
              </span>
              <div className="h-9 w-9 rounded-full bg-white text-blue-600 grid place-items-center font-semibold">
                {userInitial}
              </div>
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow p-1 border">
              <button
                onClick={async () => {
                  await logout().catch(() => {});
                  navigate("/login", { replace: true });
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </details>
        </div>
      </header>

      {/* ======= Sidebar ======= */}
      <aside
        className={[
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-60 bg-white border-r shadow-sm overflow-y-auto flex flex-col transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1 p-4">
          {links.map((link) => {
            const full = prefix(link.path);
            const isRoot = link.path === "";
            return (
              <NavLink
                key={full}
                to={full}
                end={isRoot}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow"
                      : "text-gray-700 hover:bg-blue-50",
                  ].join(" ")
                }
                onClick={() => setOpen(false)}
              >
                {link.icon}
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ======= Main Content ======= */}
      <main className="pt-16 lg:pl-60 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
          {/* page header bar (optional breadcrumb / shop name) */}
          <div className="mb-4 text-sm text-gray-500">
            {shop ? (
              <>
                You are managing: <span className="font-medium">{shop.name}</span>
              </>
            ) : (
              "Loading shop…"
            )}
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
}

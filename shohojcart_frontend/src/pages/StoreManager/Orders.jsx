import React from "react";
import { useNavigate } from "react-router-dom";

const sidebarLinks = [
  { label: "Home", icon: "home", color: "bg-gradient-to-r from-blue-500 to-cyan-400", path: "/" },
  { label: "Orders", icon: "shopping_cart", color: "bg-gradient-to-r from-purple-500 to-pink-400", path: "/orders" },
  { label: "Products", icon: "inventory_2", color: "bg-gradient-to-r from-green-400 to-lime-400", path: "/products" },
  { label: "Customers", icon: "people", color: "bg-gradient-to-r from-yellow-400 to-orange-400", path: "/customers" },
  { label: "Marketing", icon: "campaign", color: "bg-gradient-to-r from-pink-500 to-red-400", path: "/marketing" },
  { label: "Discounts", icon: "local_offer", color: "bg-gradient-to-r from-indigo-400 to-blue-400", path: "/discounts" },
  { label: "Content", icon: "article", color: "bg-gradient-to-r from-teal-400 to-cyan-400", path: "/content" },
  { label: "Markets", icon: "public", color: "bg-gradient-to-r from-amber-400 to-yellow-300", path: "/markets" },
  { label: "Analytics", icon: "bar_chart", color: "bg-gradient-to-r from-rose-400 to-pink-300", path: "/analytics" },
  { label: "Online Store", icon: "storefront", color: "bg-gradient-to-r from-blue-400 to-cyan-300", path: "/onlinestore" },
  { label: "Apps", icon: "apps", color: "bg-gradient-to-r from-gray-400 to-gray-200", path: "/apps" },
  { label: "Settings", icon: "settings", color: "bg-gradient-to-r from-gray-500 to-gray-300", path: "/settings" },
];

export default function Orders() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-400 to-lime-400 shadow flex items-center px-8 py-4 justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          {/* Custom Shop Logo SVG */}
          <span className="inline-block h-9 w-9">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#paint0_linear)" />
              <path d="M12 28V16a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H14a2 2 0 01-2-2z" fill="#fff" />
              <path d="M16 18h8v8h-8z" fill="#38bdf8" />
              <circle cx="20" cy="24" r="2" fill="#0ea5e9" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="font-extrabold text-2xl text-white tracking-wide">shohojcart</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 min-h-full py-8 px-3 flex flex-col gap-3 shadow-xl rounded-2xl m-4 bg-white/60 border border-blue-100 backdrop-blur-md">
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.label} label={link.label} color={link.color} path={link.path} />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Orders</h1>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <p className="text-gray-600 text-lg">This is the Orders page. List and manage your orders here.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ label, color, path }) {
  const navigate = useNavigate();
  const isActive = window.location.pathname === path;
  return (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 shadow-sm cursor-pointer select-none ${isActive
        ? `${color} text-white shadow-lg scale-105`
        : `text-gray-700 hover:${color} hover:text-white`
        }`}
    >
      {label}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const sidebarLinks = [
  { label: "Home", path: "/" },
  { label: "Orders", path: "/orders" },
  { label: "Products", path: "/products" },
  { label: "Customers", path: "/customers" },
  { label: "Marketing", path: "/marketing" },
  { label: "Discounts", path: "/discounts" },
  { label: "Content", path: "/content" },
  { label: "Markets", path: "/markets" },
  { label: "Analytics", path: "/analytics" },
  { label: "Online Store", path: "/onlinestore" },
  { label: "Apps", path: "/apps" },
  { label: "Settings", path: "/settings" },
];

function unwrap(data) {
  return data?.data ?? data;
}

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingShop, setLoadingShop] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile

  const token = useMemo(() => localStorage.getItem("auth_token") || "", []);
  const savedShopId = useMemo(() => localStorage.getItem("shop_id") || "", []);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setError("");
      if (!token) {
        setLoadingUser(false);
        return;
      }
      try {
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        if (savedShopId) headers["X-Shop-Id"] = savedShopId;

        // user
        const uRes = await fetch(`${API_BASE}/auth/me`, { headers });
        const uRaw = await uRes.json().catch(() => ({}));
        if (!uRes.ok) throw new Error(
          (uRaw?.errors && Object.values(uRaw.errors)?.[0]?.[0]) ||
          uRaw?.message || `Failed to load user (HTTP ${uRes.status})`
        );
        const u = unwrap(uRaw);
        if (isMounted) setUser(u);

        // shop
        const id = u?.shop_id || savedShopId;
        if (id) {
          setLoadingShop(true);
          const sRes = await fetch(`${API_BASE}/shops/${id}`, { headers });
          const sRaw = await sRes.json().catch(() => ({}));
          if (sRes.ok) {
            const s = unwrap(sRaw);
            if (isMounted) {
              setShop(s);
              localStorage.setItem("shop_id", String(s?.id || id));
            }
          }
        }
      } catch (e) {
        if (isMounted) setError(e?.message || "Failed to load");
      } finally {
        if (isMounted) {
          setLoadingUser(false);
          setLoadingShop(false);
        }
      }
    }

    load();
    return () => { isMounted = false; };
  }, [API_BASE, token, savedShopId]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
    } catch {}
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("shop_id");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col">
      {/* Reusable header */}
      <Header
        user={user}
        onLogoClick={() => navigate("/")}
        onLogout={handleLogout}
      />

      {/* Mobile top bar for sidebar toggle */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 md:hidden">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="px-3 py-2 rounded-md bg-gray-900 text-white"
        >
          {sidebarOpen ? "Close Menu" : "Menu"}
        </button>
        {shop?.name && <div className="text-sm font-semibold text-gray-700">{shop.name}</div>}
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 md:min-h-full py-4 md:py-6 px-3 md:px-2 md:m-4 md:rounded-xl
              bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border border-gray-800 shadow-xl`}
        >
          <nav className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-1 md:mt-2">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.label} label={link.label} path={link.path} />
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-3 border border-red-200">
              {error}
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-800">
            {loadingUser ? "Loading..." : shop?.name || "Welcome to ShohojCart"}
          </h1>

          <p className="text-gray-600 mb-6">
            {loadingShop
              ? "Loading your shop..."
              : shop
              ? `Shop slug: ${shop?.slug} • ${shop?.active ? "Active" : "Inactive"}`
              : user
              ? "You don't have a shop yet. Create one to get started."
              : "Please log in to continue."}
          </p>

          {/* Info cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InfoCard
              title="Your Profile"
              lines={[
                `Name: ${user?.name ?? "-"}`,
                `Email: ${user?.email ?? "-"}`,
                `Status: ${user?.status ?? "-"}`,
                Array.isArray(user?.roles) && user.roles.length
                  ? `Roles: ${user.roles.map((r) => (typeof r === "string" ? r : r?.name)).filter(Boolean).join(", ")}`
                  : "Roles: -",
              ]}
              ctaLabel={!shop && user ? "Create Shop" : undefined}
              onCta={() => navigate("/onboarding")}
            />

            <InfoCard
              title="Shop"
              lines={
                shop
                  ? [
                      `Name: ${shop.name}`,
                      `Slug: ${shop.slug}`,
                      `Location: ${shop.location ?? "-"}`,
                      `Active: ${shop.active ? "Yes" : "No"}`,
                    ]
                  : ["No shop linked."]
              }
              ctaLabel={!shop && user ? "Create Shop" : undefined}
              onCta={() => navigate("/onboarding")}
            />
          </div>

          {/* Starter tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-xl border border-blue-100 hover:scale-[1.01] transition-transform">
              <button
                onClick={() => navigate("/products/new")}
                className="text-lg sm:text-xl font-bold mb-3 underline text-blue-700"
              >
                Add your first product
              </button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png"
                alt="Mug"
                className="h-24 w-24 sm:h-28 sm:w-28 mb-5 drop-shadow-lg"
              />
              <div className="text-gray-500 text-sm sm:text-base text-center">
                Start by adding a product and a few key details. Not ready?{" "}
                <button onClick={() => navigate("/products/sample")} className="text-blue-600 underline">
                  Start with a sample product
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-100 via-white to-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-xl border border-pink-100 hover:scale-[1.01] transition-transform">
              <div className="w-full h-24 sm:h-28 bg-gradient-to-r from-blue-200 to-cyan-100 rounded-xl mb-5 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl text-blue-400 font-extrabold">+</span>
              </div>
              <div className="font-bold mb-2 text-lg text-gray-800">Design your store</div>
              <div className="text-gray-500 text-sm sm:text-base text-center">
                Describe your business to generate custom themes or{" "}
                <button onClick={() => navigate("/themes")} className="text-blue-600 underline">
                  browse pre-designed themes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ label, path }) {
  const navigate = useNavigate();
  const isActive = window.location.pathname === path;
  return (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg text-sm sm:text-base font-semibold cursor-pointer select-none transition-all
        ${isActive ? "bg-gradient-to-r from-green-500 to-lime-400 text-white shadow-lg" : "text-gray-200 hover:bg-gray-800 hover:text-white"}`}
    >
      <span className="tracking-wide">{label}</span>
    </div>
  );
}

function InfoCard({ title, lines = [], ctaLabel, onCta }) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
        {ctaLabel && (
          <button
            className="text-xs sm:text-sm px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={onCta}
          >
            {ctaLabel}
          </button>
        )}
      </div>
      <ul className="text-gray-700 space-y-1">
        {lines.map((l, i) => (
          <li key={i} className="text-sm">{l}</li>
        ))}
      </ul>
    </div>
  );
}

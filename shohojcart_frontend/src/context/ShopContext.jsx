// src/context/ShopContext.jsx
import React, { createContext, useContext, useState } from "react";
import { api } from "../lib/api";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [shop, setShop] = useState(() => {
    const raw = localStorage.getItem("shop_ctx");
    return raw ? JSON.parse(raw) : null;
  });

  const setBySlug = async (slug) => {
    try {
      // storefront-safe shop
      const res = await api.get(`/shops/slug/${encodeURIComponent(slug)}/storefront`);
      const s = res.data ?? res;
      setShop(s);
      localStorage.setItem("shop_ctx", JSON.stringify(s));
      localStorage.setItem("shop_id", String(s.id));
      localStorage.setItem("shop_slug", s.slug || slug); 
      return s;
    } catch (err) {
      if (err?.status === 404) {
        console.warn(`Shop slug "${slug}" not found`);
        setShop(null);
        localStorage.removeItem("shop_ctx");
        localStorage.removeItem("shop_id");
        return null;
      }
      throw err;
    }
  };

  return <ShopContext.Provider value={{ shop, setBySlug }}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}

// src/components/Storefront/useAddToCart.js
import { useState, useCallback } from "react";
import { api } from "../../lib/api";
import { useShop } from "../../context/ShopContext.jsx";

/**
 * Reliable add-to-cart:
 * - Ensures shop is available (from context)
 * - Creates/reuses cart
 * - Adds { product_id, qty }
 * - Surfaces clear errors
 */
export function useAddToCart() {
  const { shop } = useShop();
  const [addingId, setAddingId] = useState(null); // product id currently adding
  const [error, setError] = useState("");

  const addToCart = useCallback(
    async (product, qty = 1) => {
      setError("");
      if (!product?.id) {
        setError("Invalid product");
        return false;
      }
      const sid = product.shop_id ?? shop?.id;
      if (!sid) {
        setError("Store not resolved");
        return false;
      }

      try {
        setAddingId(product.id);
        const created = await api.post("carts", { shop_id: sid });
        const cartId = created?.data?.id ?? created?.id;
        if (!cartId) throw new Error("Failed to create cart");

        await api.post(`carts/${cartId}/items`, {
          product_id: product.id,
          qty,
        });
        return true;
      } catch (e) {
        setError(e?.message || "Add to cart failed");
        return false;
      } finally {
        setAddingId(null);
      }
    },
    [shop?.id]
  );

  return { addToCart, addingId, error };
}

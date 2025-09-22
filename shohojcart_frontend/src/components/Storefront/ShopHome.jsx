// src/components/Storefront/ShopHome.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";
import StorefrontLayout from "./Layout.jsx";
import ProductCard from "./ProductCard.jsx";
import { Skeleton } from "./ui";

function normalizeProducts(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data;
  return [];
}

export default function ShopHome() {
  const { shopSlug } = useParams();
  const { shop, setBySlug } = useShop();
  const [resolvedShop, setResolvedShop] = useState(shop?.slug === shopSlug ? shop : null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopNotFound, setShopNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        setShopNotFound(false);
        const s = shop?.slug === shopSlug ? shop : await setBySlug(shopSlug);
        if (!s?.id) {
          if (!cancelled) { setShopNotFound(true); setLoading(false); }
          return;
        }
        !cancelled && setResolvedShop(s);
        const list = await api.get(`/shops/${s.id}/storefront/products`);
        !cancelled && setProducts(normalizeProducts(list));
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to load products");
          setProducts([]);
        }
      } finally {
        !cancelled && setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, [shopSlug, shop?.slug]);

  async function addToCart(p) {
    try {
      const cart = await api.post("carts", { shop_id: p.shop_id });
      const cartId = cart.data?.id ?? cart.id;
      await api.post(`carts/${cartId}/items`, { product_id: p.id, qty: 1 });
    } catch (e) {
      alert(e.message || "Failed to add to cart");
    }
  }

  return (
    <StorefrontLayout>
      {/* Hero */}
      <section className="rounded-3xl border border-neutral-200 bg-white px-6 py-8 md:px-10 md:py-12 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {resolvedShop?.name || "Welcome to ShohojCart"}
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Discover curated products with a smooth, dashboard-quality shopping experience.
        </p>
      </section>

      {/* Products */}
      <section className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="mt-3 h-4 w-2/3" />
                <Skeleton className="mt-2 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-5/6" />
                <div className="mt-4 flex gap-3">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : shopNotFound ? (
          <div className="text-red-600 font-medium">Store not found.</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-600">
            No products yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {products.map((p) => (
    <ProductCard key={p.id ?? p.slug} product={p} shopSlug={shopSlug} />
  ))}
          </div>
        )}
      </section>
    </StorefrontLayout>
  );
}

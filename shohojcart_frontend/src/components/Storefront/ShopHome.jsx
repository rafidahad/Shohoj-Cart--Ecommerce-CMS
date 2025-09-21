// src/pages/Storefront/ShopHome.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";

// Normalizes both paginated & raw arrays (Laravel paginator / custom)
function normalizeProducts(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;               // { data: [...] }
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data; // axios-like
  return [];
}

export default function ShopHome() {
  const { shopSlug } = useParams();
  const { shop, setBySlug } = useShop();

  const [resolvedShop, setResolvedShop] = useState(
    shop?.slug === shopSlug ? shop : null // 👈 local copy for stable heading
  );
  const [products, setProducts] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [shopNotFound, setShopNotFound] = useState(false);
  const [error,      setError]      = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!shopSlug) return;

      setLoading(true);
      setError("");
      setShopNotFound(false);
      setProducts([]);
      setResolvedShop(shop?.slug === shopSlug ? shop : null);

      try {
        // Resolve shop by slug (use cached if already matches)
        const s =
          shop?.slug === shopSlug
            ? shop
            : await setBySlug(encodeURIComponent(shopSlug)); // 👈 encode defensively

        if (!s || !s.id) {
          if (!cancelled) {
            setShopNotFound(true);
            setLoading(false);
          }
          return;
        }

        if (!cancelled) setResolvedShop(s); // 👈 keep local stable ref

        // Fetch products for this shop (optionally filter to published)
        const list = await api.get(`/shops/${s.id}/products`);
        if (!cancelled) {
          setProducts(normalizeProducts(list));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          if (err?.status === 404) setShopNotFound(true); // 👈 explicit 404 handling
          else setError(err?.message || "Failed to load products");
          setProducts([]);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shopSlug]); // rerun when slug changes

  return (
    <main className="max-w-6xl mx-auto p-6">
      {loading && <div className="text-sm text-gray-500">Loading store...</div>}

      {!loading && shopNotFound && (
        <div className="text-red-600 font-medium">
          Shop “{shopSlug}” not found.
        </div>
      )}

      {!loading && !shopNotFound && (
        <>
          <h1 className="text-2xl font-bold mb-6">
            {resolvedShop?.name ?? "Store"}
          </h1>

          {error && (
            <div className="mb-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-gray-500 text-sm">No products yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((p) => {
                const price = Number(p.sell_price ?? p.price ?? 0);
                return (
                  <Link
                    to={`/s/${shopSlug}/product/${p.slug}`}
                    key={p.id ?? p.slug}
                    className="block rounded-xl border p-4 hover:shadow"
                  >
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-500">
                      ৳ {price.toFixed(2)}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
}

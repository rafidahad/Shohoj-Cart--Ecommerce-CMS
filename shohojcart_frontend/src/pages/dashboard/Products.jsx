// src/pages/dashboard/Products.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";
import { Plus, RefreshCcw } from "lucide-react";

function normalize(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;                // Laravel paginator
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data; // axios-like
  return [];
}

export default function Products() {
  const { shopSlug } = useParams();
  const { shop } = useShop();               // 👈 current shop from context
  const [items, setItems] = useState([]);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");

  const fetchProducts = async (sid) => {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get(`/shops/${sid}/products`);
      setRaw(res);
      setItems(normalize(res));
    } catch (e) {
      setErr(e?.message || "Failed to load products");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!shop?.id) return; // waits until the shop (from slug) is resolved by Layout/Provider
    fetchProducts(shop.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop?.id]);

  // client-side search (name, slug, sku)
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((p) => {
      const hay = `${p.name ?? ""} ${p.slug ?? ""} ${p.sku ?? ""}`.toLowerCase();
      return hay.includes(term);
    });
  }, [items, q]);

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">
            {shop?.name ? `You are managing: ${shop.name}` : "Loading shop…"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="pl-3 pr-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
            />
          </div>

          {/* Replace with your real “create product” route when ready */}
          <Link
            to={`/d/${shopSlug}/products/new`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm"
          >
            <Plus className="h-4 w-4" />
            New
          </Link>

          <button
            onClick={() => shop?.id && fetchProducts(shop.id)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm"
            disabled={loading}
            title="Refresh"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border">
        {/* states */}
        {loading && (
          <div className="text-gray-500 text-sm">Loading products…</div>
        )}

        {!loading && err && (
          <div className="text-red-600 text-sm">{err}</div>
        )}

        {!loading && !err && filtered.length === 0 && (
          <div className="text-gray-500 text-sm">No products found.</div>
        )}

        {!loading && !err && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">SKU</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4 w-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4 font-medium">{p.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{p.sku || "-"}</td>
                    <td className="py-3 pr-4">
                      ৳ {Number(p.sell_price ?? p.price ?? 0).toFixed(2)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        (p.status || "published") === "published"
                          ? "bg-green-50 text-green-700"
                          : (p.status === "draft" ? "bg-yellow-50 text-yellow-700" : "bg-gray-100 text-gray-600")
                      }`}>
                        {p.status || "published"}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {/* Replace with your edit route when ready */}
                      <Link
                        to={`/d/${shopSlug}/products/${p.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* If you want pagination controls later, use raw paginator data in `raw` */}
          </div>
        )}
      </div>
    </>
  );
}

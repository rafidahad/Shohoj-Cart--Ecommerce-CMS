// src/pages/Storefront/ShopHome.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";
import { Search, ShoppingCart, Sparkles, ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

// --- helpers ---
const currency = (n) =>
  new Intl.NumberFormat("bn-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(
    Number.isFinite(+n) ? +n : 0
  );

function normalizeProducts(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;                // { data: [...] }
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data; // axios-like
  return [];
}

function getNextPage(payload) {
  if (payload?.next_page_url) return payload.next_page_url;
  if (payload?.data?.next_page_url) return payload.data.next_page_url;
  return null;
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 bg-gray-100 rounded" />
        <div className="h-4 w-1/3 bg-gray-100 rounded" />
        <div className="h-9 w-full bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

export default function ShopHome() {
  const { shopSlug } = useParams();
  const { shop, setBySlug } = useShop();

  const [resolvedShop, setResolvedShop] = useState(shop?.slug === shopSlug ? shop : null);
  const [products, setProducts] = useState([]);
  const [rawPayload, setRawPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shopNotFound, setShopNotFound] = useState(false);
  const [error, setError] = useState("");

  // UI state
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest"); // newest | price_asc | price_desc
  const [loadingMore, setLoadingMore] = useState(false);

  // --- data loading ---
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!shopSlug) return;

      setLoading(true);
      setError("");
      setShopNotFound(false);
      setProducts([]);
      setResolvedShop(shop?.slug === shopSlug ? shop : null);
      setRawPayload(null);

      try {
        const s =
          shop?.slug === shopSlug ? shop : await setBySlug(encodeURIComponent(shopSlug));

        if (!s || !s.id) {
          if (!cancelled) {
            setShopNotFound(true);
            setLoading(false);
          }
          return;
        }

        if (!cancelled) setResolvedShop(s);

        const list = await api.get(`/shops/${s.id}/products`);
        if (!cancelled) {
          setProducts(normalizeProducts(list));
          setRawPayload(list);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          if (err?.status === 404) setShopNotFound(true);
          else setError(err?.message || "Failed to load products");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shopSlug]);

  // --- derived list: search + sort (client-side) ---
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;

    if (q) {
      list = list.filter((p) => {
        const hay = `${p.name ?? ""} ${p.slug ?? ""} ${p.sku ?? ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (sort === "price_asc") {
      list = [...list].sort(
        (a, b) => (+(a.sell_price ?? a.price ?? 0)) - (+(b.sell_price ?? b.price ?? 0))
      );
    } else if (sort === "price_desc") {
      list = [...list].sort(
        (a, b) => (+(b.sell_price ?? b.price ?? 0)) - (+(a.sell_price ?? a.price ?? 0))
      );
    } else {
      list = [...list].sort((a, b) => (+(b.id ?? 0)) - (+(a.id ?? 0))); // newest
    }

    return list;
  }, [products, query, sort]);

  // --- pagination: load more (Laravel paginator) ---
  const nextPageUrl = getNextPage(rawPayload);
  const loadMore = async () => {
    if (!nextPageUrl || !resolvedShop?.id) return;
    try {
      setLoadingMore(true);
      const res = await api.get(
        nextPageUrl.includes("/api/")
          ? nextPageUrl
          : `/shops/${resolvedShop.id}/products?page=${(rawPayload?.current_page ?? 1) + 1}`
      );
      setProducts((prev) => [...prev, ...normalizeProducts(res)]);
      setRawPayload(res);
    } catch {
      // no-op
    } finally {
      setLoadingMore(false);
    }
  };

  // --- UI ---
  return (
    <>
      {/* Hero / shop banner (kept), no external header/footer */}
      <section className="relative">
        <div className="h-36 md:h-44 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400" />
        <div className="max-w-6xl mx-auto px-6 -mt-10 md:-mt-12">
          <div className="bg-white rounded-2xl shadow-md border p-5 md:p-6 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-indigo-100 grid place-items-center">
              <Sparkles className="opacity-60" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold">
                {resolvedShop?.name ?? (shopNotFound ? "Shop not found" : "Loading…")}
              </h1>
              <p className="text-gray-500 text-sm">
                {resolvedShop?.slug ? `@${resolvedShop.slug}` : ""}
              </p>
            </div>

            {/* Search + sort */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-9 pr-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSort("price_asc")}
                  className={`px-3 py-2 rounded-xl border hover:bg-gray-50 transition ${
                    sort === "price_asc" ? "bg-gray-50" : ""
                  }`}
                  title="Price: Low to High"
                >
                  <ArrowDownWideNarrow className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSort("price_desc")}
                  className={`px-3 py-2 rounded-xl border hover:bg-gray-50 transition ${
                    sort === "price_desc" ? "bg-gray-50" : ""
                  }`}
                  title="Price: High to Low"
                >
                  <ArrowUpWideNarrow className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto p-6">
        {/* Mobile controls */}
        <div className="md:hidden mb-4 flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-xl border bg-white"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>

        {/* States */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && shopNotFound && (
          <div className="rounded-xl border bg-white p-6 text-center text-red-600">
            This shop doesn’t exist. Double-check the URL.
          </div>
        )}

        {!loading && !shopNotFound && error && (
          <div className="rounded-xl border bg-white p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !shopNotFound && !error && filtered.length === 0 && (
          <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
            No products match your search.
          </div>
        )}

        {/* Grid */}
        {!loading && !shopNotFound && !error && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {filtered.map((p) => {
                const price = p.sell_price ?? p.price ?? 0;
                const image =
                  p.image ??
                  p.thumbnail ??
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop";
                return (
                  <div
                    key={p.id ?? p.slug}
                    className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <Link to={`/s/${shopSlug}/product/${p.slug}`} className="block">
                      <div className="relative">
                        <img
                          src={image}
                          alt={p.name}
                          className="aspect-[4/3] w-full object-cover group-hover:scale-[1.02] transition"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold">
                          {currency(price)}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="text-sm text-gray-500 line-clamp-1">{p.sku || "\u00A0"}</div>
                        <h3 className="font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                      </div>
                    </Link>

                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        onClick={() => alert("Add to cart coming soon")}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border bg-gray-50 hover:bg-gray-100 px-3 py-2 text-sm transition"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {nextPageUrl && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 transition"
                >
                  {loadingMore ? "Loading…" : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

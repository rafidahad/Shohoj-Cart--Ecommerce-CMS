// src/pages/dashboard/ProductNew.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";
import { Loader2, WandSparkles, Info, ImagePlus } from "lucide-react";

const AI_ENDPOINT = import.meta.env.VITE_AI_DESC_ENDPOINT || "/ai/product-description";
const slugify = (s) =>
  (s || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ProductNew() {
  const navigate = useNavigate();
  const { shopSlug } = useParams();
  const { shop } = useShop();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [status, setStatus] = useState("published"); // published|draft|archived
  const [price, setPrice] = useState("");
  const [compareAt, setCompareAt] = useState("");
  const [cost, setCost] = useState("");
  const [chargeTax, setChargeTax] = useState(true);
  const [stockPolicy, setStockPolicy] = useState("derive"); // derive|manual
  const [description, setDescription] = useState("");
  const [aiBrief, setAiBrief] = useState("");
  const [media, setMedia] = useState([]);

  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  // auto-build slug from title (unless user edits slug manually)
  useEffect(() => {
    if (!slug) setSlug(slugify(title));
  }, [title]); // eslint-disable-line

  const numericPrice = useMemo(() => +(+price || 0).toFixed(2), [price]);
  const numericCost  = useMemo(() => +(+cost  || 0).toFixed(2), [cost]);
  const profit       = useMemo(() => +(numericPrice - numericCost).toFixed(2), [numericPrice, numericCost]);
  const margin       = useMemo(() => (numericPrice > 0 ? Math.round((profit / numericPrice) * 100) : 0), [profit, numericPrice]);

  const handleMedia = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setMedia((prev) => [...prev, ...files.map((f) => ({ file: f, url: URL.createObjectURL(f) }))]);
    }
  };
  const removeMedia = (i) => setMedia((prev) => prev.filter((_, idx) => idx !== i));

  const writeWithAI = async () => {
    if (!shop?.id) return;
    if (!title && !aiBrief) {
      setError("Please enter a Title or a short brief for AI to use.");
      return;
    }
    setError("");
    setAiLoading(true);
    try {
      const res = await api.post(AI_ENDPOINT, {
        shop_id: shop.id,
        title: title || undefined,
        brief: aiBrief || undefined,
      });
      const text = res?.text || res?.data?.text || res?.data || "";
      if (text) setDescription((d) => (d ? `${d}\n\n${text}` : text));
      else setError("AI didn’t return any text.");
    } catch (e) {
      setError(e?.message || "AI description failed.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async () => {
    if (!shop?.id) return setError("Shop not loaded yet.");
    if (!title?.trim()) return setError("Title is required.");
    if (!slug?.trim())  return setError("Slug is required.");

    setSaving(true);
    setError("");
    try {
      const payload = {
        shop_id: shop.id,
        name: title.trim(),
        slug: slug.trim(),
        sku: sku?.trim() || null,
        status,
        sell_price: +price || 0,
        sourcing_cost: +cost || 0,
        stock_policy: stockPolicy,
        description: description || null,
      };

      await api.post("/products", payload);

      // (Optional) upload media later when backend supports it

      navigate(`/d/${encodeURIComponent(shopSlug)}/products`, { replace: true });
    } catch (e) {
      setError(e?.message || "Failed to create product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Add product</h1>
        <p className="text-sm text-gray-500">
          {shop?.name ? `You are adding a product to ${shop.name}` : "Loading shop…"}
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Short sleeve t-shirt"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between gap-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="flex items-center gap-2">
                  <input
                    className="hidden sm:block w-64 rounded-xl border px-3 py-2 text-sm"
                    placeholder="Optional brief for AI (tone, highlights...)"
                    value={aiBrief}
                    onChange={(e) => setAiBrief(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={writeWithAI}
                    disabled={aiLoading}
                    className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <WandSparkles className="h-4 w-4" />}
                    Write with AI
                  </button>
                </div>
              </div>
              <textarea
                className="mt-2 w-full min-h-[160px] rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a compelling description…"
              />
              <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <Info className="h-3.5 w-3.5" /> Your backend calls Gemini; no API keys in the browser.
              </p>
            </div>
          </div>

          {/* Media (preview only) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
            <div className="border-2 border-dashed rounded-2xl p-6 grid place-items-center text-center">
              <input id="media" type="file" className="hidden" multiple accept="image/*" onChange={handleMedia} />
              <label htmlFor="media" className="cursor-pointer inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm hover:bg-gray-50">
                <ImagePlus className="h-4 w-4" />
                Upload new
              </label>
              <p className="mt-2 text-xs text-gray-500">Accepts images. (Attach to product when backend supports it)</p>
            </div>

            {media.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {media.map((m, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border">
                    <img src={m.url} alt="" className="aspect-square object-cover" />
                    <button
                      type="button"
                      onClick={() => removeMedia(idx)}
                      className="absolute top-2 right-2 bg-white/80 text-xs rounded px-2 py-1 hover:bg-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-semibold mb-4">Pricing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="mt-1 flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 text-gray-500">৳</span>
                  <input
                    className="w-full rounded-r-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    inputMode="decimal"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Compare-at price</label>
                <div className="mt-1 flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 text-gray-500">৳</span>
                  <input
                    className="w-full rounded-r-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    value={compareAt}
                    onChange={(e) => setCompareAt(e.target.value)}
                    inputMode="decimal"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 mt-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={chargeTax}
                    onChange={(e) => setChargeTax(e.target.checked)}
                  />
                  Charge tax on this product
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cost per item</label>
                <div className="mt-1 flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 text-gray-500">৳</span>
                  <input
                    className="w-full rounded-r-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    inputMode="decimal"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Not visible to customers</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profit</label>
                <div className="mt-1 h-[38px] grid items-center rounded-xl border px-3 text-gray-800 bg-gray-50">
                  ৳ {profit.toFixed(2)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Margin</label>
                <div className="mt-1 h-[38px] grid items-center rounded-xl border px-3 text-gray-800 bg-gray-50">
                  {margin || 0}%
                </div>
              </div>
            </div>
          </div>

          {/* Slug & SKU */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug (URL handle)</label>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="short-sleeve-t-shirt"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Product URL: <code>/s/{shopSlug}/product/{slug || "handle"}</code>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SKU (optional)</label>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="SKU-123"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="published">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock policy</label>
            <select
              className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              value={stockPolicy}
              onChange={(e) => setStockPolicy(e.target.value)}
            >
              <option value="derive">Derive from variants/stock</option>
              <option value="manual">Manual</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              Matches your backend enum: <code>derive</code> or <code>manual</code>.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-end gap-2">
              <Link
                to={`/d/${encodeURIComponent(shopSlug)}/products`}
                className="rounded-xl border bg-white px-4 py-2 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !title || !slug || !shop?.id}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

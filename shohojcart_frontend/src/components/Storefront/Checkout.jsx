// src/components/Storefront/Checkout.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { useShop } from "../../context/ShopContext.jsx";
import StorefrontLayout from "./Layout.jsx";
import { Button } from "./ui";

export default function Checkout() {
  const { shopSlug } = useParams();
  const { shop, setBySlug } = useShop();

  // make sure we have the right shop for this slug (handles hard refresh/deep link)
  const [resolvedShop, setResolvedShop] = useState(
    shop?.slug === shopSlug ? shop : null
  );
  const [resolving, setResolving] = useState(!resolvedShop);
  const [resolveError, setResolveError] = useState("");

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    address_line1: "", address_line2: "", city: "", postal_code: "",
    notes: ""
  });
  const [placing, setPlacing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setResolving(true);
        setResolveError("");
        const s = shop?.slug === shopSlug ? shop : await setBySlug(shopSlug);
        if (!cancel) setResolvedShop(s || null);
        if (!s?.id && !cancel) setResolveError("Store not found");
      } catch (e) {
        if (!cancel) setResolveError(e?.message || "Failed to resolve store");
      } finally {
        if (!cancel) setResolving(false);
      }
    })();
    return () => { cancel = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopSlug, shop?.slug]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function placeOrder() {
    try {
      if (!resolvedShop?.id) throw new Error("Store not found");
      setPlacing(true); setError(""); setResult(null);

      const created = await api.post("carts", { shop_id: resolvedShop.id });
      const cartId = created.data?.id ?? created.id;
      const cart = await api.get(`carts/${cartId}`);

      const items = (cart.data?.items ?? cart.items ?? []).map(it => ({
        product_id: it.product_id ?? it.product?.id,
        quantity: it.qty ?? it.quantity ?? 1,
        unit_price: Number(it.unit_price ?? it.price ?? 0),
      }));

      const payload = {
        shop_id: resolvedShop.id,
        items,
        customer: { ...form },
        notes: form.notes,
      };

      const j = await api.post("checkout", payload);
      setResult(j.data ?? j);
    } catch (e) {
      setError(e.message || "Checkout failed");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <StorefrontLayout>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {resolving ? (
        <div className="text-neutral-600">Loading store…</div>
      ) : resolveError ? (
        <div className="text-red-600">{resolveError}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 gap-3">
              {["name","phone","email","address_line1","address_line2","city","postal_code"].map((k) => (
                <input
                  key={k}
                  name={k}
                  placeholder={k.replace(/_/g," ")}
                  value={form[k]}
                  onChange={onChange}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              ))}
              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={onChange}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
            <Button className="w-full mt-5" onClick={placeOrder} disabled={placing}>
              {placing ? "Placing order..." : "Place Order"}
            </Button>
            {error && <div className="text-red-600 mt-3 text-sm">{error}</div>}
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 h-fit shadow-sm">
            <h2 className="font-semibold mb-4">Order Status</h2>
            {!result ? (
              <div className="text-neutral-500 text-sm">Order will appear here after placing.</div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Order ID</span><span>{result.id}</span></div>
                <div className="flex justify-between"><span>Status</span><span className="font-medium">{result.status}</span></div>
              </div>
            )}
          </div>
        </div>
      )}
    </StorefrontLayout>
  );
}

// src/components/Storefront/Cart.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, ensureCart } from "../../lib/api";   // ⬅️ import ensureCart
import { useShop } from "../../context/ShopContext.jsx";
import StorefrontLayout from "./Layout.jsx";
import { Button, Price, Skeleton } from "./ui";

export default function Cart() {
  const { shopSlug } = useParams();
  const navigate = useNavigate();
  const { shop, setBySlug } = useShop();

  const [resolvedShop, setResolvedShop] = useState(
    shop?.slug === shopSlug ? shop : null
  );
  const [resolving, setResolving] = useState(!resolvedShop);
  const [resolveError, setResolveError] = useState("");

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setResolving(true);
        setResolveError("");

        const s = shop?.slug === shopSlug ? shop : await setBySlug(shopSlug);
        if (!cancel) setResolvedShop(s || null);
        if (!s?.id && !cancel) {
          setResolveError("Store not found");
          setLoading(false);
          return;
        }

        if (cancel) return;
        setLoading(true);

        // ⬇️ Reuse the same cart per shop
        const cartObj = await ensureCart(s.id);
        const cartId = cartObj?.id ?? cartObj?.data?.id;
        const j = await api.get(`carts/${cartId}`);
        if (!cancel) setCart(j.data ?? j);
      } catch (e) {
        if (!cancel) setError(e.message || "Failed to load cart");
      } finally {
        if (!cancel) setLoading(false);
        if (!cancel) setResolving(false);
      }
    })();
    return () => { cancel = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopSlug, shop?.slug]);

  async function setQty(itemId, qty) {
    const j = await api.patch(`carts/${cart.id}/items/${itemId}`, { qty });
    setCart(j.data ?? j);
  }

  async function remove(itemId) {
    const j = await api.del(`carts/${cart.id}/items/${itemId}`);
    setCart(j.data ?? j);
  }
  const items = cart?.items ?? [];
  const totals = {
    subtotal: items.reduce(
      (s, it) => s + Number(it.line_total ?? (it.unit_price ?? 0) * (it.qty ?? 1)),
      0
    ),
    shipping: Number(cart?.shipping_total ?? 0),
    discount: Number(cart?.discount_total ?? 0),
    tax: Number(cart?.tax_total ?? 0),
  };
  const grand = Math.max(0, totals.subtotal - totals.discount + totals.shipping + totals.tax);

  return (
    <StorefrontLayout>
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {resolving ? (
        <div className="text-neutral-600">Loading store…</div>
      ) : resolveError ? (
        <div className="text-red-600">{resolveError}</div>
      ) : loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-neutral-600">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="rounded-2xl border border-neutral-200 bg-white p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="h-20 w-20 rounded-lg bg-neutral-100 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={it.product?.thumbnail_url || "/placeholder.png"}
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{it.product?.name ?? it.name}</div>
                  <div className="text-sm text-neutral-500">
                    Unit: <Price value={it.unit_price ?? 0} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={it.qty}
                    onChange={(e) => setQty(it.id, Math.max(0, Number(e.target.value || 0)))}
                    className="w-20 rounded-lg border border-neutral-300 px-2 py-1 text-sm"
                  />
                  <Button variant="outline" onClick={() => remove(it.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-2xl border border-neutral-200 bg-white p-6 h-fit shadow-sm">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Subtotal</span>
                <Price value={totals.subtotal} />
              </li>
              <li className="flex justify-between">
                <span>Discount</span>
                <Price value={totals.discount} />
              </li>
              <li className="flex justify-between">
                <span>Shipping</span>
                <Price value={totals.shipping} />
              </li>
              <li className="flex justify-between">
                <span>Tax</span>
                <Price value={totals.tax} />
              </li>
            </ul>
            <div className="my-4 h-px bg-neutral-200" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <Price value={grand} />
            </div>
            <Button
        className="w-full mt-6"
        onClick={() => navigate(`/s/${shopSlug}/checkout`)}
      >
        Proceed to Checkout
      </Button>
          </aside>
        </div>
      )}
    </StorefrontLayout>
  );
}

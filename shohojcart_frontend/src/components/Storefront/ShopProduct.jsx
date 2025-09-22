// src/components/Storefront/ShopProduct.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";
import StorefrontLayout from "./Layout.jsx";
import { Button, Price, Badge, Skeleton } from "./ui";
import { useAddToCart } from "./useAddToCart";

export default function ShopProduct() {
  const { shopSlug, productSlug } = useParams();
  const { shop, setBySlug } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const { addToCart, addingId, error: addErr } = useAddToCart();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const s = shop?.slug === shopSlug ? shop : await setBySlug(shopSlug);
        if (!s?.id) throw new Error("Store not found");
        const data = await api.get(`/shops/${s.id}/storefront/products/${productSlug}`);
        setProduct(data?.data ?? data);
      } catch (e) {
        setErr(e.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [shopSlug, productSlug, shop?.slug]);

async function add() {
  if (!product) return;
  const ok = await addToCart(product, 1);
  if (!ok && addErr) alert(addErr);
}

  return (
    <StorefrontLayout>
      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div>
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-6 h-10 w-44" />
          </div>
        </div>
      ) : err ? (
        <div className="text-red-600">{err}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <img
              src={product.thumbnail_url || product.image_url || "/placeholder.png"}
              alt={product.name}
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="md:sticky md:top-24 self-start rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
              {product.stock > 0 ? <Badge>In stock</Badge> : <Badge>Out</Badge>}
            </div>
            <p className="mt-2 text-neutral-600">{product.description}</p>
            <div className="mt-6 text-3xl font-semibold">
              <Price value={product.sell_price ?? product.price} />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button onClick={add} className="min-w-[9rem]" disabled={addingId === product?.id}>
  {addingId === product?.id ? "Adding…" : "Add to Cart"}
</Button>
              <Button variant="outline" className="min-w-[9rem]">Buy Now</Button>
            </div>
          </div>
        </div>
      )}
    </StorefrontLayout>
  );
}

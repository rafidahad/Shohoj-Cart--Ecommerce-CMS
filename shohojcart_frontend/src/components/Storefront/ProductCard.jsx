// src/components/Storefront/ProductCard.jsx
import { Link, useParams } from "react-router-dom";
import { Button, Price, Badge } from "./ui";
import { useAddToCart } from "./useAddToCart";

export default function ProductCard({ product, shopSlug, onAdd }) {
  // Fallback slug from current route if not provided
  const params = useParams();
  const slug = shopSlug ?? params.shopSlug;

  const price = Number(product?.sell_price ?? product?.price ?? 0);
  const img = product?.thumbnail_url || product?.image_url || product?.image || "/placeholder.png";

  const { addToCart, addingId, error } = useAddToCart();

  async function handleAdd() {
    // Prefer parent handler if provided, otherwise use the shared hook
    if (onAdd) return onAdd(product);
    const ok = await addToCart(product, 1);
    if (!ok && error) {
      alert(error);
    }
  }

  const isAdding = addingId === product?.id;

  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
      <Link to={`/s/${slug}/product/${product.slug}`} className="block">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={img}
            alt={product?.name}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <h3 className="line-clamp-1 font-semibold tracking-tight">{product?.name}</h3>
          {product?.stock > 0 ? <Badge>In stock</Badge> : <Badge>Out</Badge>}
        </div>
        <div className="mt-1 text-neutral-600 line-clamp-2 text-sm">
          {product?.short_description || product?.description}
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <Price value={price} className="text-lg font-semibold" />
        <Button onClick={handleAdd} disabled={isAdding}>
          {isAdding ? "Adding…" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}

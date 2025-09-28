// src/components/Storefront/ProductList.jsx
export default function ProductList({ products = [], shopSlug }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id ?? p.slug} className="rounded-xl border p-4">
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-500">
            ৳ {Number(p.sell_price ?? p.price ?? 0).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

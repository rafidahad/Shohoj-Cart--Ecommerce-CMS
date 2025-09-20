import ProductCard from "./ProductCard";

const sampleProducts = [
  { id: 1, name: "Crystal Lamp", price: 39.99, image: "/assets/lamp.jpg" },
  { id: 2, name: "Wooden Base", price: 14.99, image: "/assets/base.jpg" },
  { id: 3, name: "LED Remote", price: 9.99, image: "/assets/remote.jpg" },
];

export default function ProductList() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sampleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

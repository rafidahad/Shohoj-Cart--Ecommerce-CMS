import ProductCard from "./ProductCard";

const sampleProducts = [
  {
    id: 1,
    name: "Wooden Lamp Base",
    price: 850,
    image: "/assets/wooden-base.jpg",
  },
  {
    id: 2,
    name: "USB Power Cable",
    price: 150,
    image: "/assets/usb-cable.jpg",
  },
  {
    id: 3,
    name: "LED with Remote",
    price: 550,
    image: "/assets/led-remote.jpg",
  },
  {
    id: 4,
    name: "Crystal Glass Ball",
    price: 2200,
    image: "/assets/crystal-ball.jpg",
  },
];

export default function ProductList() {
  return (
    <section className="py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Featured Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

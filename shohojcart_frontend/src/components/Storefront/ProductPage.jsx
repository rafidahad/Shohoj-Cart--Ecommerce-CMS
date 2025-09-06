import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();

  // Example mock data (replace with API call later)
  const product = {
    id,
    name: "Crystal Lamp",
    price: 39.99,
    description: "A beautiful crystal lamp to brighten your space.",
    image: "/assets/lamp.jpg",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-4 text-xl font-semibold">${product.price}</p>
      <button className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
        Add to Cart
      </button>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
}

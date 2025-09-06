import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="group border rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 bg-white">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black">
            {product.name}
          </h3>
          <p className="mt-1 text-gray-600">৳ {product.price.toLocaleString()}</p>
          <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
}


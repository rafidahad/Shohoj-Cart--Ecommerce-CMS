import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-900">
        Shohoj Cart
      </Link>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        <Link to="/checkout" className="hover:underline">Checkout</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </nav>
    </header>
  );
}

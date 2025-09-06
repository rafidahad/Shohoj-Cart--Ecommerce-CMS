import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-extrabold text-black">
          Shohoj Cart
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-black">
            Cart
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-black">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}


import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-gray-200/20 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-elegant transform group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <span className="text-2xl font-bold text-gradient animate-fade-in-left">
              Shohoj Cart
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search amazing products..."
                className="form-input pl-10 bg-white/70 border-gray-200/50 focus:border-blue-500/30 shadow-sm"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="nav-link animate-fade-in-down"
              style={{ animationDelay: "0.1s" }}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="nav-link animate-fade-in-down"
              style={{ animationDelay: "0.2s" }}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="nav-link animate-fade-in-down"
              style={{ animationDelay: "0.3s" }}
            >
              About
            </Link>
            <Link
              to="/cart"
              className="nav-link relative animate-fade-in-down"
              style={{ animationDelay: "0.4s" }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-gradient-secondary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                3
              </span>
            </Link>
            <Link
              to="/login"
              className="btn btn-secondary animate-fade-in-down"
              style={{ animationDelay: "0.5s" }}
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden btn btn-ghost p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/20 animate-slide-in-bottom">
            <div className="flex flex-col space-y-2">
              <div className="pb-3">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="form-input pl-10 bg-white/70 border-gray-200/50"
                  />
                </div>
              </div>
              <Link to="/" className="nav-link justify-start">
                Home
              </Link>
              <Link to="/products" className="nav-link justify-start">
                Products
              </Link>
              <Link to="/about" className="nav-link justify-start">
                About
              </Link>
              <Link to="/cart" className="nav-link justify-start">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"
                  />
                </svg>
                Cart (3)
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary justify-start mt-2"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

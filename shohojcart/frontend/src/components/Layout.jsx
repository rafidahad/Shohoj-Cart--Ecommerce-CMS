import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Home,
  Users,
  Briefcase,
  GalleryHorizontalEnd,
  MessageSquare,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { FaCog } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) return savedMode === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const noNavPages = ["/login", "/signup", "/dashboard"];
  const showNav = !noNavPages.includes(location.pathname);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false); // Close menu on logout
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {showNav && (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 flex items-center space-x-2"
            >
              <LayoutDashboard className="w-6 h-6" />
              <span>HeyBuddy</span>
            </Link>

            {/* Hamburger Menu Button (Visible on Mobile) */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Navigation Links and User Actions */}
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12 absolute md:static top-16 left-0 right-0 bg-white dark:bg-gray-800 md:bg-transparent p-4 md:p-0 z-50 transition-all duration-300 ease-in-out`}
            >
              {/* Navigation Links */}
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 w-full md:w-auto"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/find_buddy"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 w-full md:w-auto"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-5 h-5" />
                  <span>Find Buddy</span>
                </Link>
                <Link
                  to="/micro_project"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 w-full md:w-auto"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Micro Projects</span>
                </Link>
                <Link
                  to="/show_case"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 w-full md:w-auto"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GalleryHorizontalEnd className="w-5 h-5" />
                  <span>Showcase</span>
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 w-full md:w-auto"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat</span>
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 w-full md:w-auto"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                )}
              </div>

              {/* User Actions */}
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto">
                {isAuthenticated ? (
                  <>
                    <span className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Users className="w-5 h-5" />
                      <span>Welcome, {username}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 w-full md:w-auto"
                    >
                      <FaCog className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 w-full md:w-auto"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 text-sm bg-teal-600 dark:bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-500 dark:hover:bg-teal-400 transition-colors duration-200 w-full md:w-auto"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users className="w-5 h-5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 w-full md:w-auto flex justify-center"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </nav>
        </header>
      )}

      <main className="flex-grow">{children}</main>

      {showNav && (
        <footer className="bg-gray-800 dark:bg-gray-50 border-t border-gray-700 dark:border-gray-200 text-gray-400 dark:text-gray-600">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm font-mono">
              <div>
                <h3 className="text-teal-400 dark:text-teal-600 mb-3 font-semibold">
                  // HeyBuddy
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Coding collaboration platform for developers.
                </p>
              </div>
              <div>
                <h3 className="text-teal-400 dark:text-teal-600 mb-3 font-semibold">
                  // Navigation
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/find_buddy"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > FindBuddy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/micro_project"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > MicroProjects
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/show_case"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > Showcase
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-teal-400 dark:text-teal-600 mb-3 font-semibold">
                  // Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > Docs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > API
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-teal-400 dark:text-teal-600 mb-3 font-semibold">
                  // Connect
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-teal-400 dark:hover:text-teal-600 transition-colors duration-200"
                    >
                      > Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 dark:border-gray-200 text-center text-xs text-gray-500 dark:text-gray-500">
              <p>/* © 2025 HeyBuddy - Built with {"{code}"} */</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;

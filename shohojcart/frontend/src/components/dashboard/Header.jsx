import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Header() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          Hey Buddy
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:underline">Features</a>
          <a href="#community" className="text-sm font-medium hover:underline">Community</a>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Green "Get Started" Button */}
          <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => navigate("/login")}> 
            Get Started 
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

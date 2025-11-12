// File: src/components/Navbar.tsx (✨ FESTIVORA FINAL POLISHED VERSION)
import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Settings,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

type NavLink = {
  name: string;
  href?: string;
  isSpecial: boolean;
};

const navLinks: NavLink[] = [
  { name: "Home", isSpecial: true },
  { name: "Products", isSpecial: true },
  { name: "About Us", isSpecial: true },
  { name: "Contact", href: "#contact", isSpecial: false },
];

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onOpenSettings: () => void;
  onViewAllProducts: () => void;
  onGoHome: () => void;
  onViewAboutUs: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  cartCount,
  onOpenSettings,
  onViewAllProducts,
  onGoHome,
  onViewAboutUs,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) onSearch(searchQuery.trim());
  };

  const handleNavLinkClick = (name: string, href?: string) => {
    setIsMenuOpen(false);

    switch (name) {
      case "Home":
        onGoHome();
        break;
      case "Products":
        onViewAllProducts();
        break;
      case "About Us":
        onViewAboutUs();
        break;
      case "Contact":
        if (href?.startsWith("#")) {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }
        break;
      default:
        break;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/80 shadow-[0_4px_30px_rgba(255,223,0,0.15)]"
          : "bg-gradient-to-r from-yellow-50/70 via-white/70 to-yellow-50/70 dark:from-gray-800/70 dark:via-gray-900/70 dark:to-gray-800/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 🔆 Logo */}
          <button
            onClick={onGoHome}
            className="flex items-center cursor-pointer select-none focus:outline-none"
            aria-label="Go to home"
          >
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2 animate-pulse" />
            <span className="text-2xl font-extrabold text-yellow-700 dark:text-yellow-400 tracking-wider drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] transition-all">
              Festivora
            </span>
          </button>

          {/* 💡 Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavLinkClick(link.name, link.href)}
                className={`relative font-medium text-gray-700 dark:text-gray-300 hover:text-yellow-600 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* 🔍 Search + Icons */}
          <div className="flex items-center space-x-3">
            {/* Search (Desktop Only) */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:block">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lights..."
                  className="w-52 py-1.5 pl-9 pr-3 rounded-full border border-gray-300 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm shadow-sm placeholder-gray-400 transition-all"
                />
              </div>
            </form>

            {/* Cart */}
            <button
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-all"
              aria-label="View cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              aria-label="Open settings"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-all"
            >
              <Settings className="w-6 h-6" />
            </button>

            {/* Menu Toggle (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-yellow-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-yellow-100 dark:border-gray-800 animate-fadeIn">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavLinkClick(link.name, link.href)}
                className="block w-full text-left px-4 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 transition-all duration-200"
              >
                {link.name}
              </button>
            ))}

            {/* Search (Mobile) */}
            <form onSubmit={handleSearchSubmit} className="pt-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lights..."
                  className="w-full py-2 pl-3 pr-10 rounded-full border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-yellow-400 text-base bg-white/70 dark:bg-gray-800/70 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-600 dark:text-yellow-400"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

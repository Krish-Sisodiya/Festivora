// File: src/components/Navbar.tsx (✨ Mobile Optimized FESTIVORA)
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
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsMenuOpen(false); // Close menu after search on mobile
    }
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
        <div className="flex justify-between items-center h-14 sm:h-16"> {/* Reduced height slightly on mobile */}
          {/* 🔆 Logo */}
          <button
            onClick={onGoHome}
            className="flex items-center cursor-pointer select-none focus:outline-none"
            aria-label="Go to home"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2 animate-pulse" /> {/* Slightly smaller icon on mobile */}
            <span className="text-xl sm:text-2xl font-extrabold text-yellow-700 dark:text-yellow-400 tracking-wider drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] transition-all">
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
          <div className="flex items-center space-x-2 sm:space-x-3"> {/* Reduced spacing on mobile */}
            {/* Search (Desktop Only) */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:block">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lights..."
                  className="w-40 sm:w-52 py-1.5 pl-9 pr-3 rounded-full border border-gray-300 bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm shadow-sm placeholder-gray-400 transition-all"
                />
              </div>
            </form>
            
            {/* Search Button for Mobile/Tablet */}
            <button
              onClick={() => {
                // For Mobile/Tablet, clicking search opens the menu (which contains search field)
                if (window.innerWidth < 1024) { // Based on lg:breakpoint
                    setIsMenuOpen(!isMenuOpen);
                } else {
                    // For Large screens, we could implement a search overlay/modal if needed,
                    // but since the inline search is visible, we'll keep it simple for now.
                }
              }}
              aria-label="Search"
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-all"
            >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>


            {/* Cart */}
            <button
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-all"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" /> {/* Slightly smaller icon on mobile */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              aria-label="Open settings"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-all hidden sm:block" // Hide settings icon on very small screens for space
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Menu Toggle (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-yellow-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu (Slide Down) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-yellow-100 dark:border-gray-800 animate-[fadeIn_0.3s_ease-out]">
          <div className="px-4 py-4 space-y-2">
            
            {/* Search (Mobile) - Moved to the top of the menu for prominence */}
            <form onSubmit={handleSearchSubmit} className="pb-3 border-b border-gray-200 dark:border-gray-700 mb-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2 pl-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base bg-white dark:bg-gray-800 placeholder-gray-500"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-600 dark:text-yellow-400 hover:scale-110 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
            
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavLinkClick(link.name, link.href)}
                className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
            
            {/* Mobile Settings Link - Since the icon is hidden on small screens */}
             <button
              onClick={() => { onOpenSettings(); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 transition-all duration-200 sm:hidden"
            >
              <Settings className="w-5 h-5 inline-block mr-3" /> Settings
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
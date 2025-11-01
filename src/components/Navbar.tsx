// File: src/components/Navbar.tsx (FINAL VERSION with About Us Routing)

import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Settings, Menu, X } from 'lucide-react';

// Assuming NavLink type is defined elsewhere (e.g., in src/types.ts)
type NavLink = { 
    name: string; 
    href?: string; 
    isSpecial: boolean; 
};

// Navigation Links
const navLinks: NavLink[] = [
    { name: "Home", isSpecial: true },
    { name: "Products", isSpecial: true },
    { name: "About Us", isSpecial: true }, // Triggers the page switch
    { name: "Contact", href: "#contact", isSpecial: false }, // Remains a hash link for scrolling
];

// Props Interface
interface NavbarProps {
    onSearch: (query: string) => void;
    cartCount: number;
    onOpenSettings: () => void;
    onViewAllProducts: () => void;
    onGoHome: () => void;
    onViewAboutUs: () => void; // 🛑 NEW PROP: Handler to switch to AboutUsPage
}

const Navbar: React.FC<NavbarProps> = ({ 
    onSearch, 
    cartCount, 
    onOpenSettings, 
    onViewAllProducts, 
    onGoHome,
    onViewAboutUs // ✅ Destructured the new prop
}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    // Effect to handle scroll-based styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleNavLinkClick = (name: string, href: string | undefined) => {
        setIsMenuOpen(false); 

        // Centralized Routing Logic
        if (name === "Home") {
            onGoHome();
        } else if (name === "Products") {
            onViewAllProducts();
        } else if (name === "About Us") { 
            // 🛑 CALL THE NEW HANDLER to open the AboutUsPage
            onViewAboutUs(); 
        }
        
        // Handle Hash Link for Contact (for smooth scrolling on the Home page)
        if (name === "Contact" && href && href.startsWith('#')) {
            // If we are currently on a full page view (like About Us or All Products), 
            // first go home, then scroll. (A simpler approach is to just scroll if on home).
            
            // For simplicity in this state-based router, we'll assume hash links only work 
            // correctly when already on the home page view.
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo/Home Button */}
                    <div className="flex-shrink-0 cursor-pointer" onClick={onGoHome}>
                        <span className="text-2xl font-extrabold text-yellow-600 tracking-wider">
                            Festivora
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavLinkClick(link.name, link.href)}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-200"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search and Icons */}
                    <div className="flex items-center space-x-3">
                        {/* Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="hidden lg:block">
                            <div className="relative">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search Lights..."
                                    className="w-48 py-1.5 pl-9 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition duration-150 text-sm"
                                />
                            </div>
                        </form>

                        {/* Cart Icon */}
                        <button className="p-2 relative text-gray-600 hover:text-yellow-600 transition duration-150">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Settings Icon */}
                        <button 
                            onClick={onOpenSettings}
                            className="p-2 text-gray-600 hover:text-yellow-600 transition duration-150"
                        >
                            <Settings className="w-6 h-6" />
                        </button>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-yellow-600 hover:bg-gray-100 focus:outline-none transition duration-150"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Conditionally rendered) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavLinkClick(link.name, link.href)}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-200"
                            >
                                {link.name}
                            </button>
                        ))}
                        {/* Mobile Search */}
                        <form onSubmit={handleSearchSubmit} className="pt-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search Lights..."
                                    className="w-full py-2 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-base"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
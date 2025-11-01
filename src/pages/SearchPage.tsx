// File: src/pages/SearchPage.tsx (Performance & Filtering Setup)

import React, { useState, useEffect, useMemo } from 'react'; // 💡 Added useMemo
import type { Product } from '../types';
import ProductCard from '../components/ProductCard'; 
import { Sliders, ArrowDownUp, ChevronRight, X } from 'lucide-react';

interface SearchPageProps {
    searchQuery: string;
    searchResults: Product[];
    relatedProducts: Product[];
    onViewProduct: (product: Product) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ searchQuery, searchResults, relatedProducts, onViewProduct }) => {
    const [sortBy, setSortBy] = useState<'relevance' | 'priceAsc' | 'priceDesc' | 'rating'>('relevance');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // 💡 NEW STATE: Filtering ke liye dummy state
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(3000); // Max price set as per mock data

    // --- Sorting & Filtering Logic (Optimized with useMemo) ---
    const sortedResults = useMemo(() => {
        let currentResults = [...searchResults];

        // 1. Filtering Logic (Basic Price Filter)
        currentResults = currentResults.filter(product => {
            // Price must be between minPrice and maxPrice (inclusive)
            return product.price >= minPrice && product.price <= maxPrice;
        });

        // 2. Sorting Logic
        currentResults.sort((a, b) => {
            if (sortBy === 'priceAsc') {
                return a.price - b.price; 
            } else if (sortBy === 'priceDesc') {
                return b.price - a.price; 
            } else if (sortBy === 'rating') {
                return b.rating - a.rating; 
            }
            return 0; // Relevance (default)
        });

        return currentResults;
    }, [searchResults, sortBy, minPrice, maxPrice]); // 💡 Dependency Array: Recalculate only when these change

    // --- Filter Modal ESC Key Handler ---
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFilterOpen(false);
            }
        };
        if (isFilterOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isFilterOpen]);


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* ... (Breadcrumbs and Search Summary remain the same) ... */}
            <nav className="flex items-center text-sm mb-6 text-gray-500">
                <a href="#home" className="hover:text-yellow-600 transition">Home</a>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-semibold text-gray-700">Search Results</span>
                {searchQuery && (
                    <>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <span className="text-yellow-600 truncate max-w-xs sm:max-w-md">"{searchQuery}"</span>
                    </>
                )}
            </nav>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 animate-fadeIn">
                Results for <span className="text-yellow-600">"{searchQuery}"</span>
            </h1>
            
            {/* 💡 FILTER & SORT OPTIONS */}
            <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-700 font-medium">
                    Found **{sortedResults.length} items** {/* Display if filter is active */}
                    {minPrice !== 0 || maxPrice !== 3000 ? <span className="text-yellow-700 ml-2">(Filtered)</span> : ''}
                </p>
                
                <div className="flex space-x-4 items-center">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 transition cursor-pointer text-sm"
                        >
                            <option value="relevance">Sort by: Relevance</option>
                            <option value="rating">Sort by: Highest Rating</option>
                            <option value="priceAsc">Sort by: Price (Low to High)</option>
                            <option value="priceDesc">Sort by: Price (High to Low)</option>
                        </select>
                        <ArrowDownUp className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
                    </div>
                    
                    {/* Filter Button */}
                    <button 
                        className="flex items-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 transition text-sm"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <Sliders className="w-4 h-4 mr-2" /> Filters
                    </button>
                </div>
            </div>


            {/* Primary Search Results */}
            <section className="mb-16">
                
                {sortedResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sortedResults.map(product => (
                            // ✅ Cards are now visible as scroll-reveal-item is removed from SearchPage
                            <div key={product.id}>
                                <ProductCard 
                                    product={product} 
                                    onView={onViewProduct} 
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg py-10 text-center">
                        Sorry, no exact matches found with the current filters. Check out these related products!
                    </p>
                )}
            </section>

            {/* --- Related Products Section --- */}
            {/* ... (Related Products section remains the same) ... */}
            <section>
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-8 animate-slideUp">
                    You Might Also Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {relatedProducts.slice(0, 4).map(product => (
                        <div key={product.id}>
                            <ProductCard 
                                product={product} 
                                onView={onViewProduct} 
                            />
                        </div>
                    ))}
                </div>
            </section>
            
            {/* --- Filter Modal (Updated to include price inputs) --- */}
            {isFilterOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center transition-opacity duration-300"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div 
                        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform scale-100 transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-xl font-bold text-gray-900">Product Filters <Sliders className="w-5 h-5 inline-block ml-2 text-yellow-600"/></h3>
                            <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* 💡 NEW: Price Range Filter UI */}
                        <h4 className="font-semibold text-lg mb-3 mt-4 text-gray-800">Price Range (₹)</h4>
                        <div className="flex justify-between space-x-3 mb-6">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                min="0"
                                className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                min="0"
                                className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>

                        <button 
                            onClick={() => setIsFilterOpen(false)} 
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
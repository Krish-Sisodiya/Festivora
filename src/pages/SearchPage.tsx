// File: src/pages/SearchPage.tsx (✨ Mobile Optimized Filtering)

import React, { useState, useEffect, useMemo } from 'react'; 
import type { Product } from '../types/index';
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
    
    // Filtering state
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(3000); 

    // --- Sorting & Filtering Logic (Optimized with useMemo) ---
    const sortedResults = useMemo(() => {
        let currentResults = [...searchResults];

        // 1. Filtering Logic
        currentResults = currentResults.filter(product => {
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
    }, [searchResults, sortBy, minPrice, maxPrice]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"> {/* Reduced top/bottom padding on mobile */}
            
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm mb-4 sm:mb-6 text-gray-500">
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

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 animate-fadeIn"> {/* Responsive Heading */}
                Results for <span className="text-yellow-600">"{searchQuery}"</span>
            </h1>
            
            {/* 💡 FILTER & SORT OPTIONS - Mobile optimized stacking */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
                
                <p className="text-gray-700 font-medium mb-3 sm:mb-0"> {/* Moved to top on mobile */}
                    Found **{sortedResults.length} items**
                    {minPrice !== 0 || maxPrice !== 3000 ? <span className="text-yellow-700 ml-2">(Filtered)</span> : ''}
                </p>
                
                <div className="flex w-full sm:w-auto space-x-3 sm:space-x-4 items-center"> {/* Utilized full width on mobile */}
                    {/* Sort Dropdown */}
                    <div className="relative flex-grow sm:flex-grow-0">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="appearance-none bg-white border border-gray-300 text-gray-700 w-full py-2 pl-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 transition cursor-pointer text-sm"
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
                        className="flex items-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 transition text-sm flex-shrink-0"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <Sliders className="w-4 h-4 mr-1 sm:mr-2" /> Filters
                    </button>
                </div>
            </div>


            {/* Primary Search Results */}
            <section className="mb-12 sm:mb-16"> {/* Responsive margin */}
                
                {sortedResults.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"> {/* Changed mobile to grid-cols-2 */}
                        {sortedResults.map(product => (
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
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 mb-6 sm:mb-8 animate-slideUp"> {/* Responsive heading */}
                    You Might Also Like
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"> {/* Changed mobile to grid-cols-2 */}
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
            
            {/* --- Filter Modal (Mobile Slide-Over Drawer) --- */}
            {isFilterOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div 
                        className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-2xl transform translate-x-0 transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <h3 className="text-xl font-bold text-gray-900">Filters <Sliders className="w-5 h-5 inline-block ml-2 text-yellow-600"/></h3>
                            <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Price Range Filter UI */}
                        <h4 className="font-semibold text-lg mb-3 mt-4 text-gray-800">Price Range (₹)</h4>
                        <div className="flex justify-between space-x-3 mb-8">
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
                        {/* You can add more filters here (e.g., Category, Color) */}

                        <button 
                            onClick={() => setIsFilterOpen(false)} 
                            className="absolute bottom-6 left-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition"
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
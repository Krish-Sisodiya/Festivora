// File: src/components/AllProductsPage.tsx (PROFESSIONAL LAYOUT)

import React, { useState, useMemo } from 'react';
import { 
    Grid, List, Filter, ArrowUp, ArrowDown, 
    ChevronDown, ShoppingCart, Search, Home,
    X, TrendingUp 
} from 'lucide-react';

// Assuming the Product type is defined in your types file.
type Review = { id: number, user: string, comment: string, rating: number, date: string };
type ProductContact = { whatsapp: string, email: string };
type Product = { 
    id: number, 
    title: string, 
    desc: string, 
    images: string[],
    shortDesc: string,
    details: string,
    rating: number,
    price: number, // Price field is kept in type, but not displayed in card
    reviews: Review[],
    contact: ProductContact
};

// Types for the component props
interface AllProductsPageProps {
    products: Product[];
    onViewProduct: (product: Product) => void;
    onAddToCart: (product: Product) => void;
    onGoHome: () => void; // Added for easy navigation back
}

// Enum for Sorting Options
type SortOption = 'default' | 'title_asc' | 'title_desc' | 'rating_desc' | 'rating_asc';

// --- MOCK DATA EXPANSION HELPER ---
// This function will generate 32 unique product objects based on the core four.
const createMockProducts = (baseProducts: Product[]): Product[] => {
    const expandedProducts: Product[] = [];
    let currentId = 1;

    // Create 8 cycles of the base products (4 * 8 = 32 products)
    for (let i = 0; i < 8; i++) {
        baseProducts.forEach(baseProduct => {
            const newProduct: Product = {
                ...baseProduct,
                id: currentId++,
                // Modify title to show uniqueness
                title: `${baseProduct.title} - Style ${i + 1}`,
                // Slightly vary rating for sorting test
                rating: Math.min(5, baseProduct.rating + (i % 5) * 0.1),
            };
            expandedProducts.push(newProduct);
        });
    }

    return expandedProducts;
};

// Original Mock Data (Used for expansion)
const originalMockProducts: Product[] = [
    { 
        id: 1, title: "Golden Fairy Lights", desc: "Warm glow for festivals and bedroom décor.",
        images: ["/assets/img/light.jpg", "/assets/img/light3.jpg"], shortDesc: "Golden glow, 10m length, USB powered.",
        details: "Battery-operated golden fairy lights. 10 meter length.", rating: 4.5, price: 999, reviews: [],
        contact: { whatsapp: "919876543210", email: "sales@festivora.com" }
    },
    { 
        id: 2, title: "LED Curtain Lights", desc: "Gives your space a sparkling backdrop (3m x 3m).", 
        images: ["/assets/img/light2.jpg", "/assets/img/light1.jpg"], shortDesc: "300 LEDs, 3m x 3m, remote controlled.",
        details: "Transform any wall into a starry night. Remote control included.", rating: 4.8, price: 1999, reviews: [],
        contact: { whatsapp: "919876543211", email: "support@festivora.com" }
    },
    { 
        id: 3, title: "Star String Lights", desc: "Dreamy star-shaped lights, battery operated.", 
        images: ["/assets/img/light3.jpg", "/assets/img/light2.jpg"], shortDesc: "20 stars, soft white, battery box.",
        details: "Delicate star-shaped LED string lights for a whimsical touch.", rating: 4.2, price: 799, reviews: [],
        contact: { whatsapp: "919876543212", email: "info@festivora.com" }
    },
    { 
        id: 4, title: "Waterproof Patio Lights", desc: "Durable for outdoor garden and patio use.", 
        images: ["/assets/img/light2.jpg", "/assets/img/light1.jpg", "/assets/img/light3.jpg"], shortDesc: "15m length, heavy-duty cable, warm white.",
        details: "Professional-grade outdoor patio string lights, fully waterproof.", rating: 4.9, price: 2499, reviews: [],
        contact: { whatsapp: "919876543213", email: "outdoor@festivora.com" }
    },
    
];

const generatedProducts: Product[] = createMockProducts(originalMockProducts);
// NOTE: We will use the 'products' prop passed from App.tsx.


const AllProductsPage: React.FC<AllProductsPageProps> = ({ 
    products, 
    onViewProduct, 
    onAddToCart,
    onGoHome
}) => {
    // State for Filter/Sorting/Layout
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOption, setSortOption] = useState<SortOption>('default');
    const [isGridView, setIsGridView] = useState(true);

    // --- MOCK CATEGORIES ---
    // Defined a clearer mapping for categories
    const categories = ['All', 'Fairy Lights', 'Curtain Lights', 'Outdoor', 'Star']; 

    // --- Memoized Filtering and Sorting Logic (Optimized for performance) ---
    const filteredAndSortedProducts = useMemo(() => {
        let currentProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.desc.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Apply Category Filter (Simple mock logic: checks if the category keyword is in the title)
        if (selectedCategory !== 'All') {
            const keywordMap: { [key: string]: string } = {
                'Fairy Lights': 'Fairy',
                'Curtain Lights': 'Curtain',
                'Outdoor': 'Waterproof|Patio', // Using a simple regex logic for better match
                'Star': 'Star'
            };
            
            const keyword = keywordMap[selectedCategory] || selectedCategory.split(' ')[0];
            const regex = new RegExp(keyword, 'i');

            currentProducts = currentProducts.filter(p => regex.test(p.title) || regex.test(p.shortDesc));
        }

        // Apply Sorting
        switch (sortOption) {
            case 'title_asc':
                currentProducts = [...currentProducts].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title_desc':
                currentProducts = [...currentProducts].sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'rating_desc':
                currentProducts = [...currentProducts].sort((a, b) => b.rating - a.rating);
                break;
            case 'rating_asc':
                currentProducts = [...currentProducts].sort((a, b) => a.rating - b.rating);
                break;
            default:
                break;
        }

        return currentProducts;
    }, [products, searchTerm, selectedCategory, sortOption]);

    // --- Product Card Component (Reusable) ---
    const ProductCard: React.FC<{ product: Product, isList: boolean }> = ({ product, isList }) => (
        <div 
            onClick={() => onViewProduct(product)} 
            // New Professional Styling: Clean shadow, scale hover effect
            className={`bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] overflow-hidden cursor-pointer animate-fade-in ${isList ? 'flex flex-row space-x-4 p-4' : 'flex flex-col'}`}
        >
            <img 
                src={product.images[0]} 
                alt={product.title} 
                className={`object-cover rounded-lg ${isList ? 'w-32 h-32 flex-shrink-0' : 'w-full h-52'} transition-opacity duration-300 hover:opacity-90`}
            />
            
            <div className={`flex-grow flex flex-col justify-between ${isList ? 'py-1' : 'p-4'}`}>
                
                {/* Text Content */}
                <div>
                    <h3 className={`font-extrabold text-yellow-800 ${isList ? 'text-xl' : 'text-2xl'} mb-1`}>{product.title}</h3>
                    <p className={`text-gray-500 mb-3 ${isList ? 'text-sm' : 'text-base'}`}>{isList ? product.shortDesc : product.desc}</p>
                </div>
                
                {/* Action Buttons (More prominent Enquire button) */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-3">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Stop click from propagating to parent div
                            onAddToCart(product);
                        }} 
                        // Prominent Enquire button
                        className="w-full sm:w-auto py-3 px-6 bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:bg-yellow-700 transition-all duration-200 active:scale-[0.98] text-sm flex items-center justify-center"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2"/> Send Enquiry
                    </button>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onViewProduct(product);
                        }}
                        // View Details button
                        className="w-full sm:w-auto py-3 px-4 bg-gray-100 text-yellow-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-200 transition text-sm"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );

    // --- COMPONENT RENDER ---
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-[100vh]">
            
            {/* --- Header Section --- */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-center border-b pb-4 border-yellow-200">
                <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-800 flex items-center mb-4 md:mb-0">
                    <TrendingUp className="w-9 h-9 mr-3 text-yellow-600 fill-yellow-100"/> Explore Our Collection
                </h1>
                <button 
                    onClick={onGoHome}
                    className="flex items-center text-gray-600 hover:text-yellow-700 transition font-medium p-2 rounded-lg bg-white shadow-sm hover:shadow-md"
                >
                    <Home className="w-5 h-5 mr-1" /> Back to Home
                </button>
            </header>

            {/* --- Filters & Controls Section (Sticky for better UX) --- */}
            <div className="sticky top-0 z-30 bg-white p-4 rounded-xl shadow-xl mb-8 transition-all duration-300 border-t-4 border-yellow-500">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search by title or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition-shadow text-base"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800">
                                <X className="w-4 h-4"/>
                            </button>
                        )}
                    </div>
                    
                    {/* Category Filter & Sort By Dropdowns */}
                    <div className="flex space-x-4 w-full md:w-2/3 justify-end">
                        
                        {/* Category Filter */}
                        <div className="relative w-1/2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-yellow-500 focus:border-yellow-500 transition font-medium pr-8"
                            >
                                <option value="All">All Categories</option>
                                {categories.slice(1).map(cat => {
                                    const keyword = cat === 'All' ? '' : cat.split(' ')[0];
                                    const count = products.filter(p => cat === 'All' || p.title.includes(keyword) || p.shortDesc.includes(keyword)).length;
                                    return (
                                        <option key={cat} value={cat}>{cat} ({count})</option>
                                    );
                                })}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"/>
                        </div>

                        {/* Sort By */}
                        <div className="relative w-1/2">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-yellow-500 focus:border-yellow-500 transition font-medium pr-8"
                            >
                                <option value="default">Sort By: Default</option>
                                <option value="title_asc">Name: A-Z</option>
                                <option value="title_desc">Name: Z-A</option>
                                <option value="rating_desc">Rating: High to Low</option>
                                <option value="rating_asc">Rating: Low to High</option>
                            </select>
                            <ArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"/>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* --- Product Count and View Toggles --- */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700 font-semibold text-lg">
                    Showing **{filteredAndSortedProducts.length}** Products
                </p>
                
                {/* View Toggles */}
                <div className="flex space-x-2 p-1 bg-white border border-gray-200 rounded-lg shadow-inner">
                    <button 
                        onClick={() => setIsGridView(true)} 
                        className={`p-2 rounded-md transition ${isGridView ? 'bg-yellow-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Grid View"
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setIsGridView(false)} 
                        className={`p-2 rounded-md transition ${!isGridView ? 'bg-yellow-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="List View"
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* --- Products Grid/List --- */}
            {filteredAndSortedProducts.length > 0 ? (
                <div 
                    className={isGridView ? 
                        // Grid Layout (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop)
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : 
                        // List Layout (Single column)
                        "space-y-6"
                    }
                >
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} isList={!isGridView}/>
                    ))}
                </div>
            ) : (
                <div className="text-center p-16 bg-white rounded-xl shadow-2xl mt-12 border-2 border-yellow-300">
                    <p className="text-3xl font-bold text-gray-800 mb-4">No Matches Found!</p>
                    <p className="text-lg text-gray-600">Please clear your filters or try a different search term.</p>
                    <button 
                        onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSortOption('default'); }}
                        className="mt-6 bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition shadow-lg active:scale-95"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

        </div>
    );
}

export default AllProductsPage;
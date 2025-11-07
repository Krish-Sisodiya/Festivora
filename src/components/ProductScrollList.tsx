// File: src/components/ProductScrollList.tsx (FIXED: Card Visibility)

import React, { useState, useEffect } from 'react'; // Added useEffect import
import type { Product } from "../types/index";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

// 💡 PROPS INTERFACE: Added onViewProduct handler from App.tsx
interface ProductScrollListProps {
    title: string;
    products: Product[];
    // ✅ ADDED: Function to handle viewing, passed down from App.tsx
    onViewProduct: (product: Product) => void;
}

const ProductScrollList: React.FC<ProductScrollListProps> = ({ title, products, onViewProduct }) => { 
    
    const [isLoading, setIsLoading] = useState(true); 
    
    // Simulate data fetching delay (for Skeleton loading demo)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <section id="products" className="mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-yellow-500 pb-2 text-center animate-slideUp">
                    {title}
                </h2>
                
                {/* Horizontal Scrollable List */}
                <div className="flex overflow-x-scroll space-x-6 p-4 -m-4 hide-scrollbar">
                    
                    {isLoading ? (
                        // Show 4 Skeleton Cards while loading
                        [...Array(4)].map((_, index) => (
                            <div key={index} className="flex-shrink-0 w-64 sm:w-72">
                                <SkeletonCard />
                            </div>
                        ))
                    ) : (
                        // 💡 Show Actual Product Cards
                        products.map(product => (
                            // 🛑 FIX APPLIED HERE: Removed className="scroll-reveal-item"
                            <div key={product.id} className="flex-shrink-0 w-64 sm:w-72"> 
                                <ProductCard 
                                    product={product} 
                                    onView={onViewProduct} 
                                />
                            </div>
                        ))
                    )}
                </div>
            </section>
            
            {/* Modal is correctly managed in App.tsx */}
        </>
    );
}

export default ProductScrollList;
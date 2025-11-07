// File: src/components/ProductCard.tsx (PROFESSIONAL LAYOUT with WORKING SHARE)

import React, { useState, useEffect } from 'react';
import { Eye, MessageCircle } from 'lucide-react'; // Changed Heart to MessageCircle for WhatsApp
import type { Product } from '../types/index';

// Props Interface
interface ProductCardProps {
    product: Product;
    onView: (product: Product) => void; // Click handler to open the view page
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
    // State for image cycling
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 💡 Auto Image Cycling Effect
    useEffect(() => {
        if (product.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => 
                    (prevIndex + 1) % product.images.length
                );
            }, 3000); // Change image every 3 seconds
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [product.images.length]);

    // --- 💡 MODIFIED: Share functionality (WhatsApp) ---
    const handleShareWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop card click from opening product view

        const shareText = `Check out this amazing light: ${product.title}! Get details here: [YOUR_PRODUCT_LINK]`;
        
        // WhatsApp Web/Mobile link (using product.title as part of the message)
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        
        window.open(whatsappUrl, '_blank'); // Open the link in a new tab
    };

    return (
        <div 
            // 🛑 PROFESSIONAL STYLING: Clean white background, subtle shadow, yellow border on hover
            className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 transition duration-300 
                        hover:shadow-2xl hover:border-yellow-500 hover:scale-[1.01] cursor-pointer"
            onClick={() => onView(product)} // Open Project View Page on click
        >
            
            {/* Image Container with Dynamic Image */}
            <div className="relative rounded-xl mb-4 h-48 w-full overflow-hidden">
                <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.title} 
                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110" 
                />
                
                {/* Share Button (Top Right) */}
                <div className="absolute top-3 right-3 z-10">
                    <button 
                        className="p-2 rounded-full bg-white text-yellow-700 hover:bg-yellow-50 shadow-xl transition duration-200"
                        onClick={handleShareWhatsApp}
                        title="Share via WhatsApp"
                    >
                        {/* Changed icon to MessageCircle (WhatsApp style) but kept Share2 for consistency if preferred */}
                        <MessageCircle className="w-5 h-5" /> 
                    </button>
                </div>
                
                {/* Image Cycle Indicator */}
                {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 p-1 rounded-full bg-black/30">
                        {product.images.map((_, index) => (
                            <div
                                key={index}
                                // Indicator uses yellow for active state
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-yellow-400 w-4' : 'bg-white/70'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Product Details */}
            <h4 className="text-2xl font-extrabold text-gray-800 truncate mb-1">{product.title}</h4>
            <p className="text-gray-500 mt-1 text-sm h-10 overflow-hidden line-clamp-2">{product.desc}</p>
            
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                {/* 🛑 Main Call to Action: Prominent Button */}
                <button 
                    className="flex items-center bg-yellow-600 text-white py-2 px-5 rounded-lg font-semibold 
                                hover:bg-yellow-700 transition shadow-md active:scale-95"
                    onClick={(e) => {
                        e.stopPropagation(); // Essential to stop the card click
                        onView(product);
                    }}
                >
                    <Eye className="w-5 h-5 mr-2"/> View Details & Enquire
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
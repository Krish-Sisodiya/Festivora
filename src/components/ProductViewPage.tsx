// File: src/components/ProductViewPage.tsx (FINAL PROFESSIONAL LAYOUT - NO PRICE, NO REVIEWS)

import React, { useState, useEffect, useRef } from 'react';
import { 
    X, Star, ShoppingCart, 
    Zap, Clock, 
    Share2, Mail,
    MessageCircle, 
    Phone, List, Package
} from 'lucide-react';
import type { Product } from "../types/index"; 

// Helper function for Similar Products
const getRelatedProducts = (currentProduct: Product, allProducts: Product[]): Product[] => {
    return allProducts
        .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category) 
        .slice(0, 6); 
};

// 🛑 INTERFACE: Props required from App.tsx 
interface ProductViewPageProps {
    product: Product;
    allProducts: Product[]; 
    onClose: () => void;
    onAddToCart: (product: Product) => void;
    onViewProduct: (product: Product) => void; 
}

// 💡 MOCK SPECIFICATIONS DATA 
const mockSpecifications = (product: Product) => [
    { label: "Color", value: product.title.includes("Golden") ? "Warm Yellow" : "Cool White" },
    { label: "Length/Size", value: product.shortDesc.includes("10m") ? "10 Meters" : "3x3 Meters" },
    { label: "Power Source", value: product.details.includes("battery") ? "Battery Powered (3xAA)" : "USB/Plug-in" },
    { label: "Brand", value: "Festivora Premium" },
    { label: "Waterproof Rating", value: product.details.includes("waterproof") ? "IP44/IP65" : "Indoor Use Only" },
    { label: "Features", value: "8 Lighting Modes, Remote Control" },
];


const ProductViewPage: React.FC<ProductViewPageProps> = ({ 
    product, 
    allProducts,
    onClose, 
    onAddToCart,
    onViewProduct, 
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const scrollRef = useRef<HTMLDivElement>(null); 

    // Auto-Change Logic (Image Carousel)
    useEffect(() => {
        if (product.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex => 
                    (prevIndex + 1) % product.images.length
                );
            }, 3000); 
            return () => clearInterval(interval);
        }
    }, [product.images]); 

    const relatedProducts = getRelatedProducts(product, allProducts);
    const specifications = mockSpecifications(product);
    
    // Rating Calculation (Kept only for display consistency, but reviews data isn't used)
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = product.reviews.length > 0 ? (totalRating / product.reviews.length).toFixed(1) : '5.0';

    // Share Handlers (WhatsApp, Email)
    const handleShareWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        const shareText = `Check out this quality product: ${product.title}! Find it here: [YOUR_PRODUCT_LINK]`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShareEmail = (e: React.MouseEvent) => {
        e.stopPropagation();
        const subject = `Inquiry about: ${product.title}`;
        const body = `Hello, I am interested in the product: ${product.title}. Please provide more details. [YOUR_PRODUCT_LINK]`;
        const mailtoUrl = `mailto:${product.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    };
    
    // Related Product Click Handler with Scroll to Top
    const handleRelatedProductView = (p: Product) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        onViewProduct(p);
    };


    return (
        // 1. Outer fixed overlay
        <div 
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6" 
            onClick={onClose}
        >
            {/* 2. Modal Wrapper */}
            <div 
                className="bg-white max-w-xl md:max-w-6xl w-full my-4 sm:my-8 rounded-xl shadow-2xl relative animate-modal-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition z-10 p-2 bg-white rounded-full shadow-md"
                    aria-label="Close product view"
                >
                    <X className="w-6 h-6" />
                </button>
                
                {/* 🛑 Scrollable wrapper for content */}
                <div ref={scrollRef} className="p-6 md:p-8 max-h-[95vh] overflow-y-auto">
                
                    {/* --- Product Details Section --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        
                        {/* --- LEFT: Image Carousel & Thumbnails --- */}
                        <div className='lg:sticky lg:top-0 h-fit'>
                            {/* Main Image */}
                            <img 
                                key={currentImageIndex}
                                src={product.images[currentImageIndex]} 
                                alt={product.title} 
                                className="w-full object-cover rounded-xl shadow-xl mb-4 aspect-[4/3] transition-opacity duration-300" 
                            />
                            
                            {/* Thumbnail Image Selector */}
                            {product.images.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto pb-2 justify-center">
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition border-2 ${
                                                index === currentImageIndex 
                                                    ? 'border-yellow-600 shadow-md' 
                                                    : 'border-gray-200 opacity-80 hover:opacity-100'
                                            }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* --- RIGHT: Info, Specs & Purchase --- */}
                        <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
                            <p className="text-lg md:text-2xl text-yellow-700 font-semibold mb-4">{product.shortDesc}</p>

                            {/* Rating Display (Simplified without review count) */}
                            <div className="flex items-center mb-6 border-b pb-4">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold mr-2 text-yellow-600">{avgRating}</span>
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mr-1 drop-shadow-sm" />
                                </div>
                                <span className="ml-4 text-gray-500 text-sm">Customer Rating</span>
                            </div>
                            
                            {/* Detailed Description */}
                            <p className="text-gray-700 mb-6 leading-relaxed text-base">{product.details}</p>

                            {/* Product Specifications Section */}
                            <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                                <h2 className="text-xl font-bold mb-3 text-yellow-800 flex items-center border-b pb-2">
                                    <List className="w-5 h-5 mr-2"/> Detailed Specifications
                                </h2>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {specifications.map((spec, index) => (
                                        <li key={index} className="flex justify-between items-start py-1 border-b border-gray-100 last:border-b-0">
                                            <span className="font-semibold text-gray-600">{spec.label}</span>
                                            <span className="ml-4 font-medium text-right">{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* --- Action Buttons (Cart + Quick Commerce + Contact) --- */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                
                                {/* PRIMARY ACTION BUTTON: Add to Enquiry Cart */}
                                <button 
                                    onClick={() => onAddToCart(product)} 
                                    className="w-full py-4 px-6 bg-yellow-600 text-white font-bold rounded-lg shadow-xl hover:bg-yellow-700 transition-all duration-200 active:scale-[0.99] flex items-center justify-center text-lg uppercase tracking-wider"
                                >
                                    <ShoppingCart className="w-6 h-6 mr-3"/> Add to Enquiry Cart 
                                </button>
                                
                                {/* Secondary Quick Buy Buttons (Kept for external purchase options) */}
                                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                                     <a 
                                         href={`https://www.blinkit.com/search?q=${encodeURIComponent(product.title)}`}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         className="w-full sm:w-1/2 py-2 px-6 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-300 flex items-center justify-center text-sm shadow-md"
                                     >
                                         <Zap className="w-4 h-4 mr-2 animate-pulse"/> Buy on **Blinkit**
                                     </a>
                                     <a 
                                         href={`https://www.zeptonow.com/search?query=${encodeURIComponent(product.title)}`}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         className="w-full sm:w-1/2 py-2 px-6 bg-amber-800 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-300 flex items-center justify-center text-sm shadow-md"
                                     >
                                         <Clock className="w-4 h-4 mr-2 animate-pulse"/> Buy on **Zepto**
                                     </a>
                                </div>

                                {/* Quick Contact Buttons */}
                                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 pt-2">
                                    <a 
                                         href={`tel:${product.contact.whatsapp}`}
                                         className="w-full sm:w-1/2 py-3 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center text-base shadow-md"
                                    >
                                         <Phone className="w-5 h-5 mr-2"/> Call / WhatsApp
                                    </a>
                                    <button 
                                         onClick={handleShareEmail}
                                         className="w-full sm:w-1/2 py-3 px-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center text-base shadow-md"
                                    >
                                         <Mail className="w-5 h-5 mr-2"/> Email Enquiry
                                    </button>
                                </div>
                                
                                {/* Share Options */}
                                <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg text-sm space-x-4 border border-gray-100">
                                    <Share2 className="w-5 h-5 text-gray-700"/>
                                    <span className="font-medium text-gray-800">Share Product:</span>
                                    <button onClick={handleShareWhatsApp} className="text-green-600 hover:text-green-700 p-1" aria-label="Share on WhatsApp">
                                         <MessageCircle className="w-7 h-7"/>
                                    </button>
                                </div>
                                
                            </div>
                            
                            {/* Dispatch Info */}
                            <div className="text-center text-gray-500 text-sm pt-4 flex items-center justify-center">
                                <Package className="w-4 h-4 mr-2" /> Dispatch in 24-48 Hours
                            </div>

                        </div>
                    </div>

                    {/* --- Related Products Suggestion Section --- */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-10 md:mt-16 pt-8 border-t border-gray-200">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-b-2 border-yellow-500 inline-block px-1 pb-1">Similar Products</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                {relatedProducts.map(p => (
                                    <div 
                                        key={p.id} 
                                        className="group cursor-pointer p-3 border border-gray-100 rounded-lg bg-white hover:shadow-lg transition duration-200 hover:border-yellow-500 active:scale-[0.98]" 
                                        onClick={() => handleRelatedProductView(p)} 
                                    >
                                        <img src={p.images[0]} alt={p.title} className="w-full h-24 object-cover rounded-md mb-2 group-hover:opacity-90 transition shadow-sm" />
                                        <h4 className="text-sm font-bold truncate text-gray-800 group-hover:text-yellow-700">{p.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{p.shortDesc.slice(0, 30)}...</p>
                                        <p className="text-xs font-semibold text-yellow-600 mt-2">View →</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                
                </div> {/* END OF SCROLLABLE WRAPPER */}

            </div>
        </div>
    );
}

export default ProductViewPage;
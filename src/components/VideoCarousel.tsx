// File: src/components/VideoCarousel.tsx (FINAL PROFESSIONAL VERSION)

import React from 'react';
import { Play } from 'lucide-react'; // Added Play icon for visual cue

// Product type definition (Simplified and matched to your App.tsx structure)
type Product = { 
    id: number, 
    title: string, 
    subtitle?: string, 
    videoUrl?: string,
    posterUrl?: string, 
    productLink?: string,
    desc: string, images: string[], shortDesc: string, details: string, rating: number, price: number, reviews: unknown[], contact: unknown, category: string,
};

interface VideoCarouselProps {
    products: Product[];
    onViewVideo: (product: Product) => void; 
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ products, onViewVideo }) => {
    const videoProducts = products.filter(p => p.videoUrl);

    if (videoProducts.length === 0) {
        return null; // Don't show the section if no videos are available
    }

    return (
        // 🛑 Clean background
        <section className="py-12 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 border-b-2 border-yellow-500 inline-block px-4 pb-2">
                    Product Video Showcase
                </h2>
                
                <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
                    {videoProducts.map((product) => (
                        <div 
                            key={product.id} 
                            // 🛑 PROFESSIONAL STYLING: White background, subtle shadow, yellow focus border
                            className="flex-shrink-0 w-80 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 transform hover:scale-[1.01] hover:border-yellow-500 cursor-pointer"
                            onClick={() => onViewVideo(product)} 
                        >
                            <div className="relative h-48 overflow-hidden rounded-lg group"> 
                                
                                {/* ----------------- Video Element (Always Playing) ----------------- */}
                                <video 
                                    src={product.videoUrl} 
                                    poster={product.posterUrl}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90" 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline 
                                    preload="metadata"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                
                                {/* Title Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-3 transition duration-300 group-hover:bg-opacity-20 pointer-events-none">
                                    <span className="text-base font-extrabold text-white leading-tight">
                                        {product.title}
                                    </span>
                                </div>

                                {/* Play Icon Overlay (Visual Cue) */}
                                <div className="absolute inset-0 flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100">
                                    <Play className="w-12 h-12 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                                </div>
                                
                            </div>
                            
                            <div className="p-2 pt-3">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{product.title}</h3>
                                <p className="text-sm text-gray-500 font-medium mb-3 truncate">
                                    {product.subtitle || product.shortDesc}
                                </p> 
                                
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        onViewVideo(product);
                                    }}
                                    className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-yellow-700 transition shadow-md"
                                >
                                    Watch Full Video
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 🛑 REMOVED: Inspiring video count text */}
            </div>
        </section>
    );
};

export default VideoCarousel;
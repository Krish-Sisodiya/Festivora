// File: src/components/ProductCard.tsx (⚡ Lighting Theme Premium Version)

import React, { useState, useEffect } from "react";
import { Eye, MessageCircle } from "lucide-react";
import type { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🔁 Auto Image Cycling
  useEffect(() => {
    if (product.images.length > 1) {
      const interval = setInterval(
        () =>
          setCurrentImageIndex(
            (prev) => (prev + 1) % product.images.length
          ),
        3000
      );
      return () => clearInterval(interval);
    }
  }, [product.images.length]);

  // 💬 WhatsApp Share Functionality
  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Check out this amazing light: ${product.title}! 💡\n\nGet details here: [YOUR_PRODUCT_LINK]`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 
                 transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:border-yellow-500 
                 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
      onClick={() => onView(product)}
    >
      {/* 🔆 Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/10 via-transparent to-yellow-100/10 opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl"></div>

      {/* 🖼️ Image Section */}
      <div className="relative rounded-xl overflow-hidden h-48 w-full mb-4">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* 💬 Share Button */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={handleShareWhatsApp}
            title="Share via WhatsApp"
            className="p-2 rounded-full bg-white text-yellow-700 hover:bg-yellow-50 
                       shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* 🔘 Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 px-2 py-1 bg-black/30 rounded-full">
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentImageIndex
                    ? "bg-yellow-400 w-4"
                    : "bg-white/60 w-2"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 📄 Product Info */}
      <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate mb-1 group-hover:text-yellow-600 transition-colors duration-300">
        {product.title}
      </h4>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 h-10 overflow-hidden line-clamp-2">
        {product.desc}
      </p>

      {/* 💰 Price Section */}
      <div className="flex justify-between items-center mb-4">
    
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ⭐ {product.rating.toFixed(1)}
        </span>
      </div>

      {/* 🔘 CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(product);
          }}
          className="flex items-center justify-center gap-2 bg-yellow-600 text-white font-semibold 
                     py-2 px-5 rounded-full shadow-md hover:bg-yellow-700 hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]
                     transition-all duration-300 active:scale-95"
        >
          <Eye className="w-5 h-5" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

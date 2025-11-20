// File: src/components/ProductCard.tsx (✨ Enhanced Mobile Responsiveness)

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
        () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length),
        2500
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
      onClick={() => onView(product)}
      className="
        group bg-white dark:bg-gray-800 
        p-4                                         /* Unified padding for mobile */
        rounded-2xl shadow-xl                       /* Slightly stronger initial shadow */
        border border-gray-100 dark:border-gray-700
        transition-all duration-500
        hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] /* Stronger hover glow */
        hover:border-yellow-500 
        hover:-translate-y-1 
        active:scale-[0.98]                         /* Added click-down effect for mobile */
        cursor-pointer 
        relative overflow-hidden
      "
    >
      {/* 🔆 Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/10 to-yellow-100/10 opacity-0 group-hover:opacity-100 transition duration-700 blur-xl"></div>

      {/* 🖼️ Image Area */}
      <div className="relative rounded-xl overflow-hidden 
                       h-40 sm:h-48 w-full mb-3 sm:mb-4"> {/* Standardized image height at h-40 for better mobile display */}
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="h-full w-full object-cover 
                       transition-transform duration-700 group-hover:scale-110"
        />

        {/* 💬 WhatsApp Button */}
        <button
          onClick={handleShareWhatsApp}
          className="
            absolute top-3 right-3                         /* Standardized placement */
            p-2 
            rounded-full bg-white dark:bg-gray-900 
            text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700
            shadow-md hover:shadow-lg 
            transition-all duration-300 active:scale-90    /* Stronger button feedback */
          "
        >
          <MessageCircle className="w-5 h-5" />          {/* Standardized icon size */}
        </button>

        {/* 🔘 Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 
                          flex space-x-1 px-2 py-1 bg-black/40 rounded-full"> {/* Darker background for visibility */}
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`
                  rounded-full transition-all duration-300
                  ${i === currentImageIndex 
                    ? "bg-yellow-400 w-3 h-2" /* Standardized active indicator size */
                    : "bg-white/60 w-2 h-2"} /* Standardized inactive indicator size */
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* 📘 Product Name */}
      <h4
        className="
          text-lg sm:text-xl font-bold 
          text-gray-800 dark:text-gray-100 
          truncate mb-1 
          group-hover:text-yellow-600 transition
        "
      >
        {product.title}
      </h4>

      {/* 📄 Product Description */}
      <p className="
        text-gray-500 dark:text-gray-400 
        text-sm mb-3 
        h-10 overflow-hidden line-clamp-2 /* Standardized text size and height */
      ">
        {product.desc}
      </p>

      {/* ⭐ Rating */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400"> {/* Standardized text size */}
          ⭐ {product.rating.toFixed(1)}
        </span>
      </div>

      {/* CTA — View Details */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(product);
        }}
        className="
          w-full flex items-center justify-center gap-2
          bg-yellow-600 text-white font-semibold 
          py-2.5 
          rounded-full 
          shadow-md hover:bg-yellow-700 
          hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] 
          transition-all duration-300 active:scale-[0.98] /* Match card's active state */
        "
      >
        <Eye className="w-5 h-5" />
        <span className="text-base">View Details</span>
      </button>
    </div>
  );
};

export default ProductCard;
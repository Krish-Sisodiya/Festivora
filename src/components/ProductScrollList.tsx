// File: src/components/ProductScrollList.tsx (⚡ Festivora Aurora Flow Edition)

import React, { useState, useEffect } from "react";
import type { Product } from "../types/index";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

interface ProductScrollListProps {
  title: string;
  products: Product[];
  onViewProduct: (product: Product) => void;
}

const ProductScrollList: React.FC<ProductScrollListProps> = ({
  title,
  products,
  onViewProduct,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-yellow-50 via-white to-yellow-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* 🌟 Floating Ambient Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-yellow-400/20 blur-[160px] rounded-full animate-float-slow"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-amber-300/20 blur-[150px] rounded-full animate-glow-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✨ Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-yellow-700 dark:text-yellow-400 tracking-tight mb-3 drop-shadow-[0_2px_15px_rgba(255,215,0,0.35)]">
            {title}
          </h2>
          <div className="mx-auto w-36 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse rounded-full"></div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 italic">
            Hand-picked by Festivora to brighten every celebration 💫
          </p>
        </div>

        {/* 💡 Scrollable Product Row */}
        <div
          className="flex overflow-x-auto space-x-6 px-2 pb-8 snap-x snap-mandatory hide-scrollbar 
                     scroll-smooth relative group"
        >
          {/* Gradient Fades (Left/Right edges) */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-yellow-50/80 to-transparent dark:from-gray-900/70 pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-yellow-50/80 to-transparent dark:from-gray-900/70 pointer-events-none"></div>

          {/* 🕐 Loading Skeletons */}
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-64 sm:w-72 snap-center">
                  <SkeletonCard />
                </div>
              ))
            : // 💡 Render Product Cards
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 sm:w-72 snap-center transition-all duration-500 
                             hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)] 
                             rounded-2xl transform-gpu"
                  style={{ scrollSnapAlign: "center" }}
                >
                  <ProductCard product={product} onView={onViewProduct} />
                </div>
              ))}
        </div>

        {/* ✨ Animated Bottom Glow Bar */}
        <div className="mt-12 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent 
                        animate-[pulse_4s_infinite] rounded-full opacity-80"></div>
      </div>
    </section>
  );
};

export default ProductScrollList;

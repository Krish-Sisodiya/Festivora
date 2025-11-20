// File: src/components/ProductScrollList.tsx (✨ Fully Mobile-First + Edge-to-Edge Scroll)

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
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative py-12 sm:py-20 /* Reduced top/bottom padding slightly on mobile */
                bg-gradient-to-b from-yellow-50 via-white to-yellow-100 
                dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* 💛 Soft Ambient Glows (Kept sizes small for mobile performance) */}
      <div className="absolute -top-20 -left-20 w-52 h-52 sm:w-80 sm:h-80 bg-yellow-400/20 blur-[100px] rounded-full"></div> {/* w-52 on mobile */}
      <div className="absolute -bottom-28 -right-16 w-52 h-52 sm:w-80 sm:h-80 bg-amber-300/20 blur-[110px] rounded-full"></div> {/* w-52 on mobile */}

      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8"> {/* Changed to px-0 here */}
        
        {/* 📍 Section Heading (Now uses padding from its own container) */}
        <div className="text-center mb-10 sm:mb-12 px-4 sm:px-0"> {/* Added px-4 for alignment */}
          <h2 className="
            text-3xl sm:text-5xl 
            font-extrabold 
            text-yellow-700 dark:text-yellow-400 
            tracking-tight 
            mb-2 drop-shadow-[0_2px_8px_rgba(255,215,0,0.3)]
          ">
            {title}
          </h2>

          <div className="mx-auto w-28 sm:w-36 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse rounded-full"></div>

          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-3">
            Selected to brighten your moments ✨
          </p>
        </div>

        {/* 🛒 Scrollable Product Row (EDGE-TO-EDGE SCROLL) */}
        <div
          className="
            flex overflow-x-auto 
            space-x-3 sm:space-x-6                 /* Reduced spacing for mobile */
            px-4 sm:px-0                          /* Padding on left/right for mobile view */
            pb-6 
            snap-x snap-mandatory 
            scroll-smooth 
            relative
            /* Custom utility to hide scrollbar on Webkit (Chrome, Safari) */
            [-ms-overflow-style:none] [scrollbar-width:none] 
            [&::-webkit-scrollbar]:hidden 
            sm:px-6 lg:px-8
          "
        >
          {/* 🟡 Fade Shadows (Positioning adjusted relative to the scroll container) */}
          {/* Note: In this edge-to-edge design, the shadows are best placed outside the scroll div, but for simplicity, we keep them here and adjust the gradient opacity. */}
          <div className="absolute left-0 top-0 h-full w-4 sm:w-16 bg-gradient-to-r from-yellow-50/100 dark:from-gray-900/100 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-4 sm:w-16 bg-gradient-to-l from-yellow-50/100 dark:from-gray-900/100 to-transparent pointer-events-none"></div>

          {/* 🕐 Skeleton Loading */}
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48 sm:w-64 snap-center"> {/* Slightly wider w-48 on mobile */}
                  <SkeletonCard />
                </div>
              ))
            : // 💡 Actual Products
              products.map((product) => (
                <div
                  key={product.id}
                  className="
                    flex-shrink-0 
                    w-48 sm:w-64                          /* Slightly wider w-48 on mobile */
                    snap-center 
                    transition-all duration-500 
                    hover:scale-[1.03] 
                    hover:shadow-[0_0_22px_rgba(255,215,0,0.3)] 
                    rounded-2xl 
                  "
                >
                  <ProductCard product={product} onView={onViewProduct} />
                </div>
              ))}
        </div>

        {/* ✨ Bottom Glow (Padding added back for alignment) */}
        <div className="px-4 sm:px-0">
            <div className="mt-10 sm:mt-12 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent animate-[pulse_4s_infinite] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductScrollList;
// File: src/components/SkeletonCard.tsx (⚡ Festivora Glow Version)
import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="relative flex-shrink-0 w-64 sm:w-72 h-96 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.15)] overflow-hidden border border-yellow-100/60 
                    dark:border-gray-700 animate-pulse">
      
      {/* --- Golden Shimmer Glow Layer --- */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent animate-shimmer z-10"></div>

      {/* Floating Aura Light */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400/20 blur-2xl rounded-full animate-float"></div>

      {/* --- Image Skeleton --- */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-xl m-3 mb-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>

        {/* Floating placeholder icons */}
        <div className="absolute top-3 right-3 flex space-x-2 z-20">
          <div className="h-8 w-8 rounded-full bg-yellow-200/60 dark:bg-yellow-700/50"></div>
          <div className="h-8 w-8 rounded-full bg-yellow-200/60 dark:bg-yellow-700/50"></div>
        </div>
      </div>

      {/* --- Text Section --- */}
      <div className="px-5 space-y-4">
        {/* Title */}
        <div className="h-6 w-3/4 bg-yellow-200/40 dark:bg-gray-700 rounded-lg"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-yellow-100/50 dark:bg-gray-700 rounded-md"></div>
          <div className="h-4 w-5/6 bg-yellow-100/50 dark:bg-gray-700 rounded-md"></div>
        </div>

        {/* --- Buttons --- */}
        <div className="flex space-x-3 mt-6">
          <div className="h-9 w-1/2 bg-yellow-300/40 dark:bg-gray-700 rounded-lg shadow-inner"></div>
          <div className="h-9 w-1/2 bg-yellow-300/40 dark:bg-gray-700 rounded-lg shadow-inner"></div>
        </div>
      </div>

      {/* Glow bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-glow"></div>
    </div>
  );
};

export default SkeletonCard;

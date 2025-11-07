// File: src/components/SkeletonCard.tsx
import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="relative flex-shrink-0 w-64 sm:w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100 dark:border-gray-800 h-96">
      
      {/* Shimmer Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>

      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden">
        {/* Floating Icons Placeholder */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>

      <div className="px-4">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-lg w-3/4 mb-3"></div>

        {/* Description Placeholder */}
        <div className="space-y-2 mb-5">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>

        {/* Buttons Placeholder */}
        <div className="flex space-x-3">
          <div className="h-9 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-9 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

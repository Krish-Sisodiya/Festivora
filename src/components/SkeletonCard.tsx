// File: src/components/SkeletonCard.tsx

import React from 'react';

const SkeletonCard: React.FC = () => {
    return (
        // flex-shrink-0 w-64 sm:w-72 class ProductScrollList se aayegi
        <div className="bg-white p-4 rounded-xl shadow-lg animate-pulse h-96 w-64 sm:w-72">
            {/* Image Skeleton */}
            <div className="rounded-xl mb-4 h-48 w-full bg-gray-200">
                {/* Heart/Share Button Skeletons */}
                <div className="flex justify-end p-2 space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                </div>
            </div>

            {/* Title Skeleton */}
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            
            {/* Description Skeleton */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>

            {/* View Details Skeleton */}
            <div className="mt-6">
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
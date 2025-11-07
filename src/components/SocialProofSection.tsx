// File: src/components/SocialProofSection.tsx
import React from 'react';
import type { Review } from "../types/index"; // Make sure Review type is available

interface SocialProofSectionProps {
    reviews: Review[];
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ reviews }) => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Customer Love & Inspiration</h2>
        <div className="flex justify-center space-x-4">
            {reviews[0] && (
                <div className="border border-yellow-200 p-6 rounded-xl shadow-md max-w-sm bg-white">
                    <p className="text-4xl text-yellow-500 mb-2">★★★★★</p>
                    <p className="italic text-gray-700">"{reviews[0].comment}"</p>
                    <p className="mt-3 font-semibold text-sm text-gray-500">- {reviews[0].user}</p>
                </div>
            )}
        </div>
    </div>
);

export default SocialProofSection;
// File: src/components/VideoCarousel.tsx (UPDATED for 10 Cards ✅)
import React from "react";
import { Play } from "lucide-react";
import type { Product } from "../types/index";

interface VideoCarouselProps {
  products: Product[];
  onViewVideo: (product: Product) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ products, onViewVideo }) => {
  // ✅ Filter only video products
  const videoProducts = products.filter((p) => p.videoUrl).slice(0, 10); // 👈 Limit to 10

  if (videoProducts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-center text-yellow-700 mb-10 border-b-4 border-yellow-500 inline-block px-4 pb-2">
          Product Video Showcase
        </h2>

        {/* Scrollable Cards */}
        <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
          {videoProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition transform hover:scale-[1.03] cursor-pointer"
              onClick={() => onViewVideo(product)}
            >
              {/* Video Preview */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl group">
                <video
                  src={product.videoUrl}
                  poster={product.posterUrl}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition duration-300 flex flex-col justify-end p-3">
                  <span className="text-base font-bold text-white leading-tight truncate">
                    {product.title}
                  </span>
                </div>

                {/* Play Button Hover Effect */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <Play className="w-14 h-14 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-200 mb-1 truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3 truncate">
                  {product.shortDesc || "Watch the full demo"}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewVideo(product);
                  }}
                  className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-yellow-700 transition-all shadow-md active:scale-95"
                >
                  ▶ Watch Full Video
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint (optional) */}
        <p className="text-center text-gray-500 mt-4 text-sm">
          Swipe → to explore all demo videos
        </p>
      </div>
    </section>
  );
};

export default VideoCarousel;

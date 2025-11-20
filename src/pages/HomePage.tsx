// File: src/pages/HomePage.tsx (📱 Fully Responsive Festivora GlowFlow Edition ✅)
import React from "react";
import HeroSection from "../components/HeroSection";
import CategoryLinks from "../components/CategoryLinks";
import VideoCarousel from "../components/VideoCarousel";
import ProductScrollList from "../components/ProductScrollList";
import SocialProofSection from "../components/SocialProofSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

import type { Product, Review, CategoryName } from "../types";

interface HomePageProps {
  products: Product[];
  reviews: Review[];
  onViewProduct: (product: Product) => void;
  onViewCategory: (category: CategoryName | "All") => void;
}

const HomePage: React.FC<HomePageProps> = ({
  products,
  reviews,
  onViewProduct,
  onViewCategory,
}) => {
  const videoProducts = products.filter((p) => (p as any).videoUrl);

  return (
    <main
      className="bg-gradient-to-b from-yellow-50 via-white to-yellow-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 text-gray-900 dark:text-gray-100 transition-colors duration-700"
    >
      {/* 🌟 Hero Section */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* ✨ Category Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Floating glow for background */}
        <div className="absolute top-[-80px] left-[-80px] w-60 sm:w-80 h-60 sm:h-80 bg-yellow-300/20 blur-[80px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-60px] right-[-80px] w-72 sm:w-[400px] h-72 sm:h-[400px] bg-amber-400/10 blur-[100px] rounded-full animate-glow-pulse"></div>

        {/* Horizontally scrollable categories on mobile */}
        <div className="px-4 sm:px-8">
          <CategoryLinks onCategoryClick={onViewCategory} />
        </div>
      </section>

      {/* 🎬 Video Carousel Section */}
      {videoProducts.length > 0 && (
        <section className="relative py-16 sm:py-20 bg-gradient-to-r from-yellow-50 via-white to-yellow-100 dark:from-gray-800 dark:to-gray-900 border-t border-yellow-100/40 dark:border-gray-700">
          <div className="px-3 sm:px-6">
            <VideoCarousel products={videoProducts} onViewVideo={onViewProduct} />
          </div>
        </section>
      )}

      {/* 💡 Featured Products */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-yellow-100/50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Floating background lights */}
        <div className="absolute top-6 left-6 w-52 sm:w-72 h-52 sm:h-72 bg-yellow-400/10 blur-[80px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-6 right-6 w-72 sm:w-96 h-72 sm:h-96 bg-amber-300/10 blur-[100px] rounded-full animate-float-slow"></div>

        <div className="relative z-10 px-3 sm:px-8">
          <ProductScrollList
            title="✨ Featured Lighting Collection"
            products={products.slice(0, 8)}
            onViewProduct={onViewProduct}
          />
        </div>
      </section>

      {/* 🗣️ Customer Reviews */}
      <section className="relative py-16 sm:py-20 bg-white/90 dark:bg-gray-800/80 border-t border-yellow-100/40 dark:border-gray-700">
        <div className="px-4 sm:px-8">
          <SocialProofSection reviews={reviews} />
        </div>
      </section>

      {/* 🌙 About & Contact */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-t from-yellow-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Soft glow accents */}
        <div className="absolute top-[-60px] sm:top-[-80px] left-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-yellow-300/15 blur-[80px] rounded-full animate-glow-pulse"></div>
        <div className="absolute bottom-[-80px] right-[-60px] sm:right-[-80px] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-amber-400/10 blur-[120px] rounded-full animate-float-slow"></div>

        <div className="relative z-10 space-y-16 sm:space-y-24 px-4 sm:px-10 text-center sm:text-left">
          <AboutSection />
          <ContactSection />
        </div>
      </section>
    </main>
  );
};

export default HomePage;

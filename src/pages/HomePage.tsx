// File: src/pages/HomePage.tsx (⚡ Festivora GlowFlow Edition)
import React from "react";
import HeroSection from "../components/HeroSection";
import CategoryLinks from "../components/CategoryLinks";
import VideoCarousel from "../components/VideoCarousel";
import ProductScrollList from "../components/ProductScrollList";
import SocialProofSection from "../components/SocialProofSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

import type { Product, Review } from "../types";

interface HomePageProps {
  products: Product[];
  reviews: Review[];
  onViewProduct: (product: Product) => void;
  onViewCategory: (category: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  products,
  reviews,
  onViewProduct,
  onViewCategory,
}) => {
  // Filtered video-based products
  const videoProducts = products.filter((p) => p.videoUrl);

  return (
    <main
      className="bg-gradient-to-b from-yellow-50 via-white to-yellow-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 text-gray-900 dark:text-gray-100 transition-colors duration-700"
    >
      {/* 🌟 Hero Section */}
      <div className="relative">
        <HeroSection />
      </div>

      {/* ✨ Category Section */}
      <div className="relative py-20">
        {/* Floating decorative glow */}
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-yellow-300/20 blur-[100px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-80px] right-[-100px] w-[400px] h-[400px] bg-amber-400/10 blur-[120px] rounded-full animate-glow-pulse"></div>

        <CategoryLinks onCategoryClick={onViewCategory} />
      </div>

      {/* 🎬 Product Video Carousel */}
      {videoProducts.length > 0 && (
        <section className="relative py-20 bg-gradient-to-r from-yellow-50 via-white to-yellow-100 dark:from-gray-800 dark:to-gray-900 border-t border-yellow-100/40 dark:border-gray-700">
          <VideoCarousel products={videoProducts} onViewVideo={onViewProduct} />
        </section>
      )}

      {/* 💡 Featured Products */}
      <section className="relative py-24 bg-gradient-to-b from-yellow-100/50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Decorative floating lights */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/10 blur-[120px] rounded-full animate-float-slow"></div>

        <div className="relative z-10">
          <ProductScrollList
            title="✨ Featured Lighting Collection"
            products={products.slice(0, 8)}
            onViewProduct={onViewProduct}
          />
        </div>
      </section>

      {/* 🗣️ Customer Reviews */}
      <section className="relative py-20 bg-white/90 dark:bg-gray-800/80 border-t border-yellow-100/40 dark:border-gray-700">
        <SocialProofSection reviews={reviews} />
      </section>

      {/* 🌙 About & Contact */}
      <section className="relative py-24 bg-gradient-to-t from-yellow-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Soft Glow Decor */}
        <div className="absolute top-[-80px] left-1/3 w-[400px] h-[400px] bg-yellow-300/15 blur-[100px] rounded-full animate-glow-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-80px] w-[450px] h-[450px] bg-amber-400/10 blur-[150px] rounded-full animate-float-slow"></div>

        <div className="relative z-10 space-y-24">
          <AboutSection />
          <ContactSection />
        </div>
      </section>
    </main>
  );
};

export default HomePage;

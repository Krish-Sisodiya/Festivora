// File: src/components/SocialProofSection.tsx (✨ Mobile Optimized Lighting Theme)

import React, { useEffect, useState } from "react";
import type { Review } from "../types/index";
import { motion, AnimatePresence } from "framer-motion";

interface SocialProofSectionProps {
  reviews: Review[];
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔁 Auto change review every 5 seconds
  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <section className="relative py-12 sm:py-20 /* Reduced mobile padding */ bg-gradient-to-b from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Decorative glowing circles (Reduced size for mobile) */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-yellow-300/20 blur-[120px] sm:blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-pink-300/20 blur-[100px] sm:blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* ✨ Section Heading */}
        <h2 className="text-3xl sm:text-4xl /* Responsive heading size */ font-extrabold text-yellow-700 dark:text-yellow-400 mb-6 sm:mb-10 drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]">
          Customer Love & Inspiration
        </h2>
        <div className="mx-auto w-32 sm:w-40 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-8 sm:mb-12 animate-pulse"></div> {/* Responsive divider width */}

        {/* 🗣️ Review Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto max-w-sm sm:max-w-lg /* Reduced max width for better mobile fit */ p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-yellow-200 dark:border-gray-700
                        hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent animate-[pulse_3s_infinite] rounded-t-lg"></div>

            <p className="text-3xl sm:text-4xl text-yellow-500 mb-3 sm:mb-4">★★★★★</p> {/* Responsive star size */}
            <p className="italic text-gray-700 dark:text-gray-300 text-base sm:text-lg /* Responsive text size */ leading-relaxed">
              “{currentReview.comment}”
            </p>
            <p className="mt-4 font-semibold text-gray-800 dark:text-gray-100 text-sm">
              — {currentReview.user}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {new Date(currentReview.date).toLocaleDateString()}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 🔘 Carousel Indicators */}
        {reviews.length > 1 && (
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8"> {/* Responsive margin */}
            {reviews.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-yellow-500 w-5 sm:w-6" /* Responsive indicator width */
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialProofSection;
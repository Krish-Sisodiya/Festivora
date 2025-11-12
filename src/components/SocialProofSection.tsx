// File: src/components/SocialProofSection.tsx (✨ Lighting Theme Premium Version)

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
    <section className="relative py-20 bg-gradient-to-b from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Decorative glowing circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-yellow-300/20 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-pink-300/20 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* ✨ Section Heading */}
        <h2 className="text-4xl font-extrabold text-yellow-700 dark:text-yellow-400 mb-10 drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]">
          Customer Love & Inspiration
        </h2>
        <div className="mx-auto w-40 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-12 animate-pulse"></div>

        {/* 🗣️ Review Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto max-w-lg p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-yellow-200 dark:border-gray-700
                       hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent animate-[pulse_3s_infinite] rounded-t-lg"></div>

            <p className="text-4xl text-yellow-500 mb-4">★★★★★</p>
            <p className="italic text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
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
          <div className="flex justify-center space-x-2 mt-8">
            {reviews.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-yellow-500 w-6"
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

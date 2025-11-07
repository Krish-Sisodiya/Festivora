// File: src/components/CategoryLinks.tsx (Final Polished Animated Version)

import React from "react";
import { motion } from "framer-motion";

// Define the categories (matching CategoryName type)
type Category = {
  name: "Fairy" | "Curtain" | "Moon" | "Outdoor" | "All";
  label: string;
  icon: string;
};

const categories: Category[] = [
  { name: "Fairy", label: "Fairy Lights", icon: "✨" },
  { name: "Curtain", label: "Curtain Lights", icon: "💡" },
  { name: "Moon", label: "Moon Lamps", icon: "🌙" },
  { name: "Outdoor", label: "Outdoor Lights", icon: "🌳" },
  { name: "All", label: "All Products", icon: "🛒" },
];

interface CategoryLinksProps {
  onCategoryClick: (category: Category["name"]) => void;
}

const CategoryLinks: React.FC<CategoryLinksProps> = ({ onCategoryClick }) => {
  return (
    <section className="relative py-16 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Decorative gradient circle */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 opacity-20 blur-3xl rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400 opacity-10 blur-3xl rounded-full translate-x-20 translate-y-20"></div>

      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12 border-b-4 border-yellow-400 inline-block pb-2">
          Shop by Category
        </h2>

        <div className="flex justify-center flex-wrap gap-8">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 w-32 h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-transparent hover:border-yellow-500 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <span className="text-5xl mb-3">{cat.icon}</span>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">
                {cat.label}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryLinks;

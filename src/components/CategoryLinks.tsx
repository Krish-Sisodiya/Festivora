// File: src/components/CategoryLinks.tsx (📱 Mobile Responsive Glow Edition)

import React from "react";
import { motion } from "framer-motion";

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
    <section className="relative py-14 sm:py-20 bg-gradient-to-b
                        from-yellow-50 via-white to-yellow-100 
                        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">

      {/* Responsive Glow Backgrounds */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] 
                      bg-yellow-400/30 blur-[120px] sm:blur-[150px] rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] 
                      bg-pink-300/20 blur-[120px] sm:blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 
                       dark:text-yellow-400 mb-10 sm:mb-14 drop-shadow-[0_2px_8px_rgba(255,215,0,0.4)]">
          Shop by Category
        </h2>

        {/* Responsive Layout */}
        <div className="flex justify-center flex-wrap gap-6 sm:gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onCategoryClick(cat.name)}
              className="relative group 
                         w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40
                         bg-white dark:bg-gray-800 rounded-3xl shadow-lg 
                         hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]
                         border border-gray-100 dark:border-gray-700 
                         hover:border-yellow-400 
                         transition-all duration-300 cursor-pointer 
                         flex flex-col items-center justify-center 
                         overflow-hidden"
            >
              {/* Glow Ring */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              bg-gradient-to-br from-yellow-400/40 via-pink-300/20 to-yellow-200/30 
                              blur-2xl transition-all duration-500"></div>

              {/* Icon */}
              <motion.span
                className="relative text-4xl sm:text-6xl mb-2 sm:mb-3 drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.25,
                }}
              >
                {cat.icon}
              </motion.span>

              {/* Text */}
              <p className="relative text-sm sm:text-base font-bold 
                            text-gray-800 dark:text-gray-100 
                            group-hover:text-yellow-600 transition-colors duration-300 px-1">
                {cat.label}
              </p>

              {/* Bottom Shimmer */}
              <div className="absolute bottom-0 left-0 w-full h-1 
                              bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent 
                              opacity-0 group-hover:opacity-100 animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryLinks;

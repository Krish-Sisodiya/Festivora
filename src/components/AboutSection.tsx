// File: src/components/Sections/AboutSection.tsx (✨ Mobile Balance & Polish)
import React from "react";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 sm:py-24 /* Reduced mobile vertical padding */ px-4 sm:px-6 /* Increased side padding slightly */
                bg-gradient-to-b from-yellow-50 via-white to-yellow-100 
                dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700"
    >
      {/* --- Glowing Background Lights (Slightly reduced size for mobile) --- */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] bg-amber-400/20 rounded-full blur-[120px] sm:blur-[140px] animate-float-slow"></div>
      <div className="absolute top-1/3 left-1/2 w-64 h-64 sm:w-72 sm:h-72 bg-yellow-500/10 rounded-full blur-[100px] animate-glow-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* --- Section Title --- */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-6xl /* Adjusted mobile heading size from 5xl to 4xl */ font-extrabold mb-6 sm:mb-8 /* Reduced mobile margin */ bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,215,0,0.3)]"
        >
          About <span className="text-gray-900 dark:text-white">Festivora</span>
        </motion.h3>

        {/* --- Description --- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          viewport={{ once: true }}
          className="text-base sm:text-xl /* Adjusted mobile text size from lg to base */ leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mx-auto px-2" /* Added slight horizontal padding to description */
        >
          At <span className="font-bold text-yellow-600">Festivora</span>, we believe that 
          <span className="text-yellow-500 font-semibold"> light is emotion</span> — it connects people, 
          transforms moments, and celebrates life. From timeless{" "}
          <span className="font-semibold text-yellow-600">fairy strings</span> to
          elegant{" "}
          <span className="font-semibold text-yellow-600">LED curtain backdrops</span>,
          our mission is to turn every space into a story of joy, warmth, and brilliance. ✨
        </motion.p>

        {/* --- Animated Divider --- */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 sm:mt-10 mb-10 sm:mb-12 h-1 w-28 sm:w-32 /* Reduced mobile width slightly */ bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full origin-left"
        ></motion.div>

        {/* --- Contact Button --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <a
            href="#contact"
            className="relative inline-block font-bold py-3 px-8 sm:px-10 /* Reduced mobile padding */ rounded-full text-base sm:text-lg text-gray-900 
                        bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                        hover:from-yellow-500 hover:to-yellow-700 shadow-[0_0_25px_rgba(255,215,0,0.5)] 
                        transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Contact Us
            {/* Glow underline */}
            <span className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md opacity-60 -z-10"></span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
// File: src/components/Sections/AboutSection.tsx
import React from "react";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6 overflow-hidden"
    >
      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 opacity-30 blur-3xl rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400 opacity-20 blur-3xl rounded-full translate-x-20 translate-y-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <h3 className="text-4xl font-bold text-yellow-600 mb-6 inline-block border-b-4 border-yellow-400 pb-2">
          About <span className="text-gray-900 dark:text-white">Festivora</span>
        </h3>

        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Festivora brings you an exclusive range of elegant and durable
          decorative lighting — from magical{" "}
          <span className="font-semibold text-yellow-600">fairy lights</span> to
          premium{" "}
          <span className="font-semibold text-yellow-600">
            LED curtain backdrops
          </span>
          . Our mission is to spread brightness and joy in every celebration,
          turning every corner into a story of light and warmth.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-block bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

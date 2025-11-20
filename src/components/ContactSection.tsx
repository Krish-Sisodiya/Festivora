// File: src/components/Sections/ContactSection.tsx
// 📱 Festivora GlowConnect — ULTRA MOBILE RESPONSIVE EDITION

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Sparkles } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 px-4 sm:px-6 
                 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 overflow-hidden"
    >
      {/* --- Mobile Optimized Background Glows --- */}
      <div className="absolute top-[-120px] left-[-60px] w-64 sm:w-96 h-64 sm:h-96 
                      bg-yellow-300/25 blur-[100px] sm:blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-140px] right-[-100px] w-72 sm:w-[450px] h-72 sm:h-[450px] 
                      bg-amber-400/20 blur-[130px] sm:blur-[150px] rounded-full animate-float-slow"></div>
      <div className="absolute top-1/2 left-[20%] w-48 sm:w-64 h-48 sm:h-64 
                      bg-yellow-500/10 blur-[80px] sm:blur-[100px] rounded-full animate-glow-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* --- Title --- */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-6 
                     bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-500 
                     bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
        >
          Get in Touch
        </motion.h3>

        {/* --- Subtext --- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          viewport={{ once: true }}
          className="text-base sm:text-xl leading-relaxed 
                     text-gray-700 dark:text-gray-300 
                     max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12 px-2"
        >
          Have a custom request, bulk order, or just want to say hello?  
          Our team would love to hear from you — let's make your next celebration shine brighter ✨
        </motion.p>

        {/* --- Contact Buttons (Mobile Friendly) --- */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          
          {/* Email */}
          <motion.a
            href="mailto:info@festivora.com"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 
                       bg-yellow-500 hover:bg-yellow-600 text-white 
                       px-6 py-3 sm:px-8 sm:py-3 w-full sm:w-auto 
                       rounded-full shadow-lg font-bold text-base sm:text-lg 
                       uppercase tracking-wide transition-all"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </motion.a>

          {/* Call */}
          <motion.a
            href="tel:+919685958831"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 
                       bg-green-500 hover:bg-green-600 text-white 
                       px-6 py-3 sm:px-8 sm:py-3 w-full sm:w-auto 
                       rounded-full shadow-lg font-bold text-base sm:text-lg 
                       uppercase tracking-wide transition-all"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/919685958831"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 
                       bg-green-600 hover:bg-green-700 text-white 
                       px-6 py-3 sm:px-8 sm:py-3 w-full sm:w-auto 
                       rounded-full shadow-lg font-bold text-base sm:text-lg 
                       uppercase tracking-wide transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </motion.a>
        </div>

        {/* --- Divider Line --- */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 sm:mt-16 mb-6 sm:mb-8 
                     h-1 w-24 sm:w-32 bg-gradient-to-r 
                     from-yellow-400 to-yellow-600 rounded-full origin-left"
        ></motion.div>

        {/* --- Footer Tagline --- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          © {new Date().getFullYear()} Festivora — Lighting up your celebrations
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ContactSection;

// File: src/components/HeroSection/HeroSection.tsx (⚡ Lighting Theme Cinematic Version)

import React from "react";
import heroVideoSrc from "/assets/vid/mf.mp4";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[65vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-black">
      {/* 🌌 Video Background */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        loop
        muted
        playsInline
        src={heroVideoSrc}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🟡 Glowing Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-yellow-900/10 to-black/80"></div>

      {/* ✨ Decorative Glow Circles */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-yellow-400/20 blur-[180px] rounded-full z-10"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-amber-400/20 blur-[180px] rounded-full z-10"></div>

      {/* ⚡ Floating Light Particles (optional visual sparkle) */}
      <div className="absolute inset-0 overflow-hidden z-20">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-yellow-300 rounded-full opacity-60"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌟 Content Layer */}
      <div className="relative z-30 text-center text-white px-6 py-10">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-white to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]"
        >
          Welcome to <span className="text-yellow-400">Festivora</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-base sm:text-xl lg:text-2xl font-light text-gray-200 max-w-2xl mx-auto mb-10"
        >
          Brighten every corner of your world with our glowing creations 💡
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:scale-[1.05] transition-transform duration-300 text-lg uppercase tracking-wider"
        >
          Shop Now
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;

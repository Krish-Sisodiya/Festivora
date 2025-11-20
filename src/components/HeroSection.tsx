// File: src/components/HeroSection/HeroSection.tsx (📱 Mobile Optimized Glow Edition)

import React from "react";
import heroVideoSrc from "/assets/vid/mf.mp4";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <section
      className="relative h-[70vh] sm:h-[85vh] md:h-[90vh] 
                 overflow-hidden flex items-center justify-center bg-black"
    >
      {/* 🎬 Video Background */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        loop
        muted
        playsInline
        src={heroVideoSrc}
        initial={{ scale: 1 }}
        animate={{ scale: isMobile ? 1 : 1.12 }} // 💡 Mobile par zoom remove
        transition={{
          duration: isMobile ? 0 : 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* 🔆 Dark + Golden Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-yellow-900/10 to-black/80"></div>

      {/* ✨ Glow Circles (scaled down on mobile) */}
      <div className="absolute top-[-100px] sm:top-[-120px] left-[-100px] sm:left-[-120px] 
                      w-[200px] sm:w-[350px] h-[200px] sm:h-[350px]
                      bg-yellow-400/20 blur-[120px] sm:blur-[180px] 
                      rounded-full z-10"></div>

      <div className="absolute bottom-[-100px] sm:bottom-[-120px] right-[-100px] sm:right-[-120px] 
                      w-[180px] sm:w-[300px] h-[180px] sm:h-[300px]
                      bg-amber-400/20 blur-[120px] sm:blur-[180px] 
                      rounded-full z-10"></div>

      {/* ✨ Light Particles */}
      <div className="absolute inset-0 overflow-hidden z-20">
        {Array.from({ length: isMobile ? 10 : 25 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-yellow-300 rounded-full opacity-60"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🟡 HERO CONTENT */}
      <div className="relative z-30 text-center text-white px-4 sm:px-6 py-10">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-extrabold mb-3 
                     bg-gradient-to-r from-yellow-400 via-white to-yellow-500 
                     bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(255,215,0,0.5)]"
        >
          Welcome to <span className="text-yellow-400">Festivora</span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-sm sm:text-lg lg:text-2xl font-light text-gray-200 
                     max-w-xl mx-auto mb-8"
        >
          Brighten every corner of your world with our glowing creations 💡
        </motion.p>

        {/* CTA BUTTON */}
        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 
                     text-white font-semibold py-3 px-8 sm:px-10 rounded-full shadow-lg 
                     hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] 
                     hover:scale-[1.05] transition-transform duration-300 
                     text-sm sm:text-lg uppercase tracking-wider"
        >
          Shop Now
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;

// File: src/pages/AboutUsPage.tsx (✨ Mobile Perfected Cinematic Version)
import React from "react";
import { Home, Zap, Star, Users, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface AboutUsPageProps {
  onGoHome: () => void;
}

const teamMembers = [
  // ... (No change to data)
  {
    name: "Rajiv Mehta",
    role: "CEO & Visionary",
    desc: "Leads with a passion for traditional and modern lighting solutions.",
    icon: Briefcase,
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    desc: "Curates collections that blend aesthetics with functionality.",
    icon: Star,
  },
  {
    name: "Karan Singh",
    role: "Tech & Innovation Lead",
    desc: "Ensures every Festivora product meets world-class standards.",
    icon: Zap,
  },
];

const missionValues = [
  // ... (No change to data)
  {
    title: "Quality Assurance",
    desc: "Every product undergoes rigorous testing for durability and safety.",
    color: "text-yellow-500",
    icon: Star,
  },
  {
    title: "Customer Focus",
    desc: "Dedicated support and hassle-free service for every client.",
    color: "text-green-500",
    icon: Users,
  },
  {
    title: "Sustainable Sourcing",
    desc: "Commitment to eco-friendly materials and ethical manufacturing.",
    color: "text-blue-500",
    icon: Zap,
  },
];

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onGoHome }) => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16"> {/* Reduced top padding and unified horizontal padding */}
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-center border-b border-yellow-400/60 pb-4"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-3 sm:mb-0"> {/* Adjusted mobile size */}
            Our Story
          </h1>
          <button
            onClick={onGoHome}
            className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-200 rounded-lg shadow-md hover:text-yellow-600 dark:hover:text-yellow-400 transition duration-300" /* Smaller button on mobile */
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Back to Home
          </button>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl sm:rounded-3xl shadow-2xl p-6 md:p-16 bg-gray-900" /* Tighter padding/radius on mobile */
        >
          {/* Light Orbs (Reduced size for mobile) */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute w-40 h-40 sm:w-72 sm:h-72 bg-yellow-400/20 blur-[100px] sm:blur-[160px] top-[-30px] left-[-30px] rounded-full"></div>
            <div className="absolute w-32 h-32 sm:w-60 sm:h-60 bg-amber-500/20 blur-[100px] sm:blur-[160px] bottom-[-40px] right-[-20px] rounded-full"></div>
          </div>

          <div className="relative z-10 lg:flex lg:items-center"> {/* Use lg:flex instead of md:flex for better mobile stacking */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 sm:mb-5"> {/* Responsive heading size */}
                Illuminating Every Celebration ✨
              </h2>
              <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed"> {/* Responsive text size */}
                Festivora was founded on the belief that light isn’t just seen — it’s felt. 
                Our curated lighting experiences bring warmth, magic, and wonder to every moment.
              </p>
              <button
                onClick={onGoHome}
                className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base text-gray-900 font-bold bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/40" /* Responsive padding/text size */
              >
                Explore Products <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </button>
            </div>
            <motion.div
              className="lg:w-1/3 mt-8 lg:mt-0 lg:pl-10 flex justify-center"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="w-28 h-28 sm:w-40 sm:h-40 bg-yellow-400/90 rounded-full shadow-[0_0_60px_rgba(255,215,0,0.6)] animate-pulse-slow"></div> {/* Smaller mobile orb */}
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Values */}
        <section className="my-12 sm:my-20"> {/* Tighter margin on mobile */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent" /* Responsive heading size */
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10"> {/* Mobile: Single column, Tablet: Two columns, Desktop: Three columns */}
            {missionValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-yellow-300/40 hover:shadow-yellow-400/40 p-6 sm:p-8 text-center transform transition duration-500 hover:scale-[1.03]" /* Tighter mobile padding */
              >
                <value.icon className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 ${value.color}`} /> {/* Responsive icon size */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2"> {/* Responsive text size */}
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.desc}</p> {/* Smaller text size */}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12 sm:mb-24 bg-white dark:bg-gray-800 rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-10"> {/* Tighter margin/padding/radius on mobile */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent" /* Responsive heading size */
          >
            Meet the Innovators
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10"> {/* Mobile: Single column, Tablet: Two columns, Desktop: Three columns */}
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-yellow-300/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition duration-300" /* Tighter mobile padding */
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-400/20 border-4 border-yellow-400 rounded-full flex items-center justify-center mb-4"> {/* Smaller orb on mobile */}
                  <member.icon className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" /> {/* Smaller icon on mobile */}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                  {member.name}
                </h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{member.desc}</p> {/* Smaller text size */}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-8 sm:p-10 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.4)]" /* Tighter padding/radius on mobile */
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4"> {/* Responsive heading size */}
            Ready to Light Up Your World?
          </h2>
          <button
            onClick={onGoHome}
            className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-yellow-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105 active:scale-95 text-sm sm:text-base" /* Responsive padding/text size */
          >
            Start Shopping Now
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUsPage;
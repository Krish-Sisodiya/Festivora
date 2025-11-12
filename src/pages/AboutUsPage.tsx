// File: src/pages/AboutUsPage.tsx (⚡ Festivora Premium Cinematic Version)
import React from "react";
import { Home, Zap, Star, Users, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface AboutUsPageProps {
  onGoHome: () => void;
}

const teamMembers = [
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-between items-center border-b border-yellow-400/60 pb-4"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Our Story
          </h1>
          <button
            onClick={onGoHome}
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow-md hover:text-yellow-600 dark:hover:text-yellow-400 transition duration-300"
          >
            <Home className="w-5 h-5 mr-2" /> Back to Home
          </button>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl p-10 md:p-16 bg-gray-900"
        >
          {/* Light Orbs */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute w-72 h-72 bg-yellow-400/20 blur-[160px] top-[-50px] left-[-50px] rounded-full"></div>
            <div className="absolute w-60 h-60 bg-amber-500/20 blur-[160px] bottom-[-60px] right-[-40px] rounded-full"></div>
          </div>

          <div className="relative z-10 md:flex md:items-center">
            <div className="md:w-2/3">
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-5">
                Illuminating Every Celebration ✨
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Festivora was founded on the belief that light isn’t just seen — it’s felt.  
                Our curated lighting experiences bring warmth, magic, and wonder to every moment.
              </p>
              <button
                onClick={onGoHome}
                className="inline-flex items-center px-6 py-3 rounded-full text-gray-900 font-bold bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/40"
              >
                Explore Products <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            <motion.div
              className="md:w-1/3 mt-8 md:mt-0 md:pl-10 flex justify-center"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="w-40 h-40 bg-yellow-400/90 rounded-full shadow-[0_0_60px_rgba(255,215,0,0.6)] animate-pulse-slow"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Values */}
        <section className="my-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {missionValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-yellow-300/40 hover:shadow-yellow-400/40 p-8 text-center transform transition duration-500 hover:scale-[1.03]"
              >
                <value.icon className={`w-12 h-12 mx-auto mb-4 ${value.color}`} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-24 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent"
          >
            Meet the Innovators
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-yellow-300/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition duration-300"
              >
                <div className="w-24 h-24 bg-yellow-400/20 border-4 border-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <member.icon className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {member.name}
                </h3>
                <p className="text-yellow-600 dark:text-yellow-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.desc}</p>
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
          className="text-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-10 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.4)]"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Ready to Light Up Your World?
          </h2>
          <button
            onClick={onGoHome}
            className="px-8 py-3 bg-white text-yellow-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105 active:scale-95"
          >
            Start Shopping Now
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUsPage;

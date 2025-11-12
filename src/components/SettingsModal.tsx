// File: src/components/SettingsModal.tsx (⚡ Lighting-Themed Premium Version)
import React from "react";
import { X, Globe, Sun, Moon, Palette } from "lucide-react";
import { motion } from "framer-motion";

export type Theme = "light" | "dark";
export type Language = "en" | "hi";

interface SettingsModalProps {
  onClose: () => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  currentTheme,
  onThemeChange,
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sliding Panel */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-sm h-full bg-white/90 dark:bg-gray-900/90 shadow-[0_0_30px_rgba(255,215,0,0.2)]
                   border-l border-yellow-200 dark:border-yellow-700 backdrop-blur-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-yellow-300/50 dark:border-yellow-700/30">
          <h3 className="text-2xl font-extrabold flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            <Palette className="w-6 h-6 mr-2 text-yellow-500" />
            App Settings
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-yellow-700/20 transition"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100%-120px)]">
          {/* 🌞 Theme Section */}
          <div className="p-5 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-inner border border-yellow-200/60 dark:border-yellow-700/40">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center mb-4">
              <Sun className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" /> Display Theme
            </h4>

            <div className="flex bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
              {/* Light Button */}
              <motion.button
                onClick={() => onThemeChange("light")}
                animate={{
                  scale: currentTheme === "light" ? 1.05 : 1,
                  boxShadow:
                    currentTheme === "light"
                      ? "0 0 20px rgba(255,215,0,0.4)"
                      : "none",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`w-1/2 py-3 flex items-center justify-center font-semibold rounded-l-lg transition-all duration-300 ${
                  currentTheme === "light"
                    ? "bg-yellow-100 text-gray-900"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-200/40"
                }`}
              >
                <Sun
                  className={`w-5 h-5 mr-2 ${
                    currentTheme === "light"
                      ? "text-yellow-600 animate-pulse"
                      : "text-gray-400"
                  }`}
                />
                Light
              </motion.button>

              {/* Dark Button */}
              <motion.button
                onClick={() => onThemeChange("dark")}
                animate={{
                  scale: currentTheme === "dark" ? 1.05 : 1,
                  boxShadow:
                    currentTheme === "dark"
                      ? "0 0 20px rgba(255,215,0,0.4)"
                      : "none",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`w-1/2 py-3 flex items-center justify-center font-semibold rounded-r-lg transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-gray-800 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-200/40"
                }`}
              >
                <Moon
                  className={`w-5 h-5 mr-2 ${
                    currentTheme === "dark"
                      ? "text-yellow-400 animate-pulse"
                      : "text-gray-400"
                  }`}
                />
                Dark
              </motion.button>
            </div>
          </div>

          {/* 🌐 Language Section */}
          <div className="p-5 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-inner border border-yellow-200/60 dark:border-yellow-700/40">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center mb-4">
              <Globe className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" /> Language
            </h4>

            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 
                         text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-yellow-400 transition-all duration-200 shadow-sm"
            >
              <option value="en">English (US)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 border-t border-yellow-300/50 dark:border-yellow-700/30 py-4">
          ⚡ Powered by <span className="text-yellow-500 font-semibold">Festivora</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;

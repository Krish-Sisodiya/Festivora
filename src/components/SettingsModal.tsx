// File: src/components/SettingsModal.tsx (Functional, Professional, and Controlled)

import React from 'react';
import { X, Globe, Sun, Moon, Palette } from 'lucide-react';

// --- TYPES ---
type Theme = 'light' | 'dark';
type Language = 'en' | 'hi'; // 'en' for English, 'hi' for Hindi

interface SettingsModalProps {
    onClose: () => void;
    // 💡 NEW PROPS for External Control (to be managed in App.tsx)
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
    onLanguageChange
}) => {
    
    // Helper function to handle select change
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onLanguageChange(e.target.value as Language);
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-end backdrop-blur-sm" // Added backdrop-blur for professional touch
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 h-full w-full max-w-sm p-6 shadow-2xl transition-all duration-500 ease-in-out transform translate-x-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-3">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center">
                        <Palette className="w-6 h-6 mr-2 text-yellow-600 dark:text-yellow-400" /> App Settings
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Close settings"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {/* 1. THEME SETTINGS (Light/Dark Mode) */}
                <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                    <h4 className="font-bold text-xl mb-3 flex items-center text-gray-800 dark:text-gray-200">
                        <Sun className="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400"/> Display Theme
                    </h4>
                    <div className="flex space-x-3 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl shadow-inner">
                        <button 
                            onClick={() => onThemeChange('light')}
                            className={`flex items-center justify-center w-1/2 py-3 rounded-xl transition-all duration-300 text-sm md:text-base ${
                                currentTheme === 'light' 
                                    ? 'bg-white text-gray-900 font-extrabold shadow-md ring-2 ring-yellow-500' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700'
                            }`}
                            aria-pressed={currentTheme === 'light'}
                        >
                            <Sun className="w-5 h-5 inline mr-2"/> Light
                        </button>
                        <button 
                            onClick={() => onThemeChange('dark')}
                            className={`flex items-center justify-center w-1/2 py-3 rounded-xl transition-all duration-300 text-sm md:text-base ${
                                currentTheme === 'dark' 
                                    ? 'bg-gray-900 text-white font-extrabold shadow-md ring-2 ring-yellow-500' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700'
                            }`}
                            aria-pressed={currentTheme === 'dark'}
                        >
                            <Moon className="w-5 h-5 inline mr-2"/> Dark
                        </button>
                    </div>
                </div>

                {/* 2. LANGUAGE SETTINGS */}
                <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                    <h4 className="font-bold text-xl mb-3 flex items-center text-gray-800 dark:text-gray-200">
                        <Globe className="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400"/> Language
                    </h4>
                    <select
                        value={currentLanguage}
                        onChange={handleLanguageChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white transition shadow-sm"
                    >
                        {/* 💡 Note: Display names are for users, values are for internal state management */}
                        <option value="en">English (US)</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                    </select>
                </div>
                
                <div className='p-2 mt-12 text-center text-gray-400 dark:text-gray-500 text-xs border-t dark:border-gray-700 pt-4'>
                    Settings managed by Festivora App.
                </div>

            </div>
        </div>
    );
}

export default SettingsModal;
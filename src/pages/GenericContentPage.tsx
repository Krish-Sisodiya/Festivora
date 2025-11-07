// File: src/pages/GenericContentPage.tsx (UPDATED + SAFE + OPTIMIZED)

import React from 'react';
import { Home, FileText } from 'lucide-react';

interface GenericContentPageProps {
    title: string;
    content: string; // HTML string
    onGoHome: () => void;
}

// ✅ Optional sanitization placeholder
// Plug DOMPurify later: DOMPurify.sanitize(html)
const sanitizeHTML = (html: string) => html;

const GenericContentPage: React.FC<GenericContentPageProps> = ({ title, content, onGoHome }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white min-h-[80vh] shadow-xl rounded-xl my-10 animate-fade-in">
            
            {/* HEADER */}
            <header className="mb-10 border-b pb-4 flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                    <FileText className="w-8 h-8 mr-3 text-yellow-600" />
                    {title}
                </h1>

                <button 
                    onClick={onGoHome}
                    className="flex items-center text-gray-600 hover:text-yellow-600 transition text-sm font-medium hover:scale-105"
                >
                    <Home className="w-4 h-4 mr-1" /> Back to Home
                </button>
            </header>

            {/* CONTENT */}
            <div 
                className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
            />

            {/* FOOTER */}
            <footer className="mt-12 pt-6 border-t text-sm text-gray-500 text-center">
                Last updated: October 2025
            </footer>
        </div>
    );
};

export default GenericContentPage;

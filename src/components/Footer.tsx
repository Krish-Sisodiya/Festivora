// File: src/components/Footer/Footer.tsx (FINAL UPDATED)

import React from 'react';
import { 
    Mail, Phone, MapPin, Twitter, Facebook, Instagram, Youtube, Home 
} from 'lucide-react';

// 🛑 UPDATE: Define Prop Interface to include the new policy handler
interface FooterProps {
    onViewAllProducts: () => void;
    onViewAboutUs: () => void;
    onGoHome: () => void;
    onViewPolicy: (key: 'privacy' | 'terms' | 'shipping' | 'faqs') => void; // 🛑 NEW
}

// 🛑 Use the defined interface
const Footer: React.FC<FooterProps> = ({ 
    onViewAllProducts, 
    onViewAboutUs,
    onGoHome,
    onViewPolicy // 🛑 DESTRUCTURE NEW PROP
}) => {
    
    // --- Data for Footer Links (Updated to use actions/keys) ---
    const companyLinks = [
        { name: 'Home', action: onGoHome },
        { name: 'About Us', action: onViewAboutUs },
        { name: 'View All Products', action: onViewAllProducts },
        { name: 'Careers', action: () => alert('Careers page coming soon!') },
        { name: 'Blog', action: () => alert('Blog page coming soon!') },
    ];

    const supportLinks = [
        // 🛑 SCROLL TO CONTACT SECTION
        { name: 'Contact Us', action: () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }},
        // 🛑 CONNECT TO GENERIC PAGE
        { name: 'FAQs', action: () => onViewPolicy('faqs') },
        { name: 'Shipping & Returns', action: () => onViewPolicy('shipping') },
        { name: 'Track Order', action: () => alert('Track order feature coming soon.') },
    ];

    const legalLinks = [
        // 🛑 CONNECT TO GENERIC PAGE
        { name: 'Privacy Policy', action: () => onViewPolicy('privacy') },
        { name: 'Terms of Service', action: () => onViewPolicy('terms') },
        { name: 'Warranty Details', action: () => alert('Warranty Details coming soon.') },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    
                    {/* 1. Company Info / Logo Section */}
                    <div className="col-span-2 md:col-span-2 space-y-4">
                        <button 
                            onClick={onGoHome} 
                            className="flex items-center text-xl font-bold text-yellow-500 hover:text-yellow-400 transition"
                        >
                            <Home className="w-6 h-6 mr-2"/> FESTIVORA
                        </button>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Bringing the finest festive and decorative lighting solutions to your home, guaranteed for quality and brilliance.
                        </p>
                        <p className="text-sm text-yellow-600 font-semibold mt-2">
                            ✨ Trusted by 50,000+ Happy Customers.
                        </p>
                    </div>

                    {/* 2. Navigation Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <button 
                                        onClick={link.action} // 🛑 ACTION now points to a real handler
                                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Support Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Customer Support</h4>
                        <ul className="space-y-2 text-sm">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <button 
                                        onClick={link.action} // 🛑 ACTION now points to a real handler/scroll
                                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Legal / Policy Links */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-bold text-white mb-4">Policies</h4>
                        <ul className="space-y-2 text-sm">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <button 
                                        onClick={link.action} // 🛑 ACTION now points to a real handler
                                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
            
            {/* --- Bottom Bar: Contact & Socials --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
                
                {/* Contact Info (No change needed here - already using <a> tags for external links) */}
                <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-gray-400 mb-4 md:mb-0">
                    <a href="mailto:support@festivora.com" className="flex items-center hover:text-yellow-500 transition">
                        <Mail className="w-4 h-4 mr-1 text-yellow-500"/> 
                        support@festivora.com
                    </a>
                    <a href="tel:+91 96859 58831" className="flex items-center hover:text-yellow-500 transition">
                        <Phone className="w-4 h-4 mr-1 text-yellow-500"/> 
                        +91 96859 58831
                    </a>
                    <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-yellow-500"/> 
                        New Delhi, India
                    </span>
                </div>

                {/* Social Media Links (Already use <a> tags for external links, ensuring redirection) */}
                <div className="flex space-x-4">
                    <a href="https://facebook.com/FestivoraLights" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors"/>
                    </a>
                    <a href="https://instagram.com/FestivoraLights" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors"/>
                    </a>
                    <a href="https://twitter.com/FestivoraLights" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Twitter className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors"/>
                    </a>
                    <a href="https://youtube.com/@FestivoraLights" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                        <Youtube className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors"/>
                    </a>
                </div>
            </div>

            {/* --- Copyright Bar --- */}
            <div className="bg-gray-800 py-3">
                <p className="text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Festivora Lights. All rights reserved. | Developed by Sylekt Us.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
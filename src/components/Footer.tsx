// File: src/components/Footer/Footer.tsx (⚡ Festivora Premium Glow Footer)
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Home,
} from "lucide-react";

interface FooterProps {
  onViewAllProducts: () => void;
  onViewAboutUs: () => void;
  onGoHome: () => void;
  onViewPolicy: (key: "privacy" | "terms" | "shipping" | "faqs") => void;
}

const Footer: React.FC<FooterProps> = ({
  onViewAllProducts,
  onViewAboutUs,
  onGoHome,
  onViewPolicy,
}) => {
  const companyLinks = [
    { name: "Home", action: onGoHome },
    { name: "About Us", action: onViewAboutUs },
    { name: "All Products", action: onViewAllProducts },
    { name: "Careers", action: () => alert("Careers page coming soon!") },
    { name: "Blog", action: () => alert("Blog page coming soon!") },
  ];

  const supportLinks = [
    {
      name: "Contact Us",
      action: () =>
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    },
    { name: "FAQs", action: () => onViewPolicy("faqs") },
    { name: "Shipping & Returns", action: () => onViewPolicy("shipping") },
    { name: "Track Order", action: () => alert("Track order feature coming soon.") },
  ];

  const legalLinks = [
    { name: "Privacy Policy", action: () => onViewPolicy("privacy") },
    { name: "Terms of Service", action: () => onViewPolicy("terms") },
    { name: "Warranty", action: () => alert("Warranty details coming soon!") },
  ];

  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden">
      {/* Decorative Glow Lights */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-yellow-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-400/10 blur-[100px] rounded-full"></div>

      {/* --- Main Footer Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-b border-yellow-500/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* --- Brand Section --- */}
          <div className="col-span-2 space-y-5">
            <button
              onClick={onGoHome}
              className="flex items-center text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
            >
              <Home className="w-6 h-6 mr-2 text-yellow-500" /> FESTIVORA
            </button>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Bringing the finest festive and decorative lighting solutions to
              your home — powered by quality, design, and celebration.
            </p>
            <p className="text-yellow-500 font-semibold text-sm">
              ✨ Trusted by 50,000+ Happy Customers.
            </p>
          </div>

          {/* --- Quick Links --- */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Support --- */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Legal --- */}
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.action}
                    className="hover:text-yellow-400 transition-all duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar: Contact + Socials --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm border-t border-gray-800">
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-3 md:mb-0">
          <a
            href="mailto:support@festivora.com"
            className="flex items-center hover:text-yellow-400 transition"
          >
            <Mail className="w-4 h-4 mr-2 text-yellow-500" /> support@festivora.com
          </a>
          <a
            href="tel:+91 96859 58831"
            className="flex items-center hover:text-yellow-400 transition"
          >
            <Phone className="w-4 h-4 mr-2 text-yellow-500" /> +91 96859 58831
          </a>
          <span className="flex items-center text-gray-400">
            <MapPin className="w-4 h-4 mr-2 text-yellow-500" /> New Delhi, India
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5">
          {[
            {
              icon: Facebook,
              url: "https://facebook.com/FestivoraLights",
              label: "Facebook",
            },
            {
              icon: Instagram,
              url: "https://instagram.com/FestivoraLights",
              label: "Instagram",
            },
            {
              icon: Twitter,
              url: "https://twitter.com/FestivoraLights",
              label: "Twitter",
            },
            {
              icon: Youtube,
              url: "https://youtube.com/@FestivoraLights",
              label: "YouTube",
            },
          ].map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-400 hover:text-yellow-400 transition transform hover:scale-110"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      {/* --- Copyright --- */}
      <div className="relative z-10 bg-gray-950/90 py-3 border-t border-gray-800">
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Festivora Lights. All rights reserved. |
          Crafted with ❤️ by <span className="text-yellow-500">Sylekt Us</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

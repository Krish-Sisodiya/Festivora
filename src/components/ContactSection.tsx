// File: src/components/Sections/ContactSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-300 opacity-20 blur-3xl rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 opacity-10 blur-3xl rounded-full translate-x-24 translate-y-24"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h3 className="text-4xl font-bold text-yellow-600 mb-6 inline-block border-b-4 border-yellow-400 pb-2">
          Get in Touch
        </h3>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-10 leading-relaxed">
          Have a custom request, bulk order, or just want to say hello?  
          Our team would love to hear from you — let's make your next celebration shine brighter ✨
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Email */}
          <motion.a
            href="mailto:info@festivora.com"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full shadow-lg font-semibold text-lg transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+919685958831"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg font-semibold text-lg transition-all duration-300"
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
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-lg font-semibold text-lg transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </motion.a>
        </div>

        {/* Footer tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 text-gray-500 dark:text-gray-400 text-sm"
        >
          © {new Date().getFullYear()} Festivora — Lighting up your celebrations
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ContactSection;

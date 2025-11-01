// File: src/components/Sections/ContactSection.tsx

import React from 'react';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-20 text-center px-6">
            <h3 className="text-3xl font-semibold text-yellow-600 mb-6 border-b-2 border-yellow-300 inline-block pb-1">Get in Touch</h3>
            <p className="text-gray-700 mb-6 text-lg">Have a custom request or just want to say hello? Contact us directly!</p>
            <a href="mailto:info@festivora.com" className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-3 rounded-full shadow-lg font-semibold text-lg transition duration-300 transform hover:scale-105">Email Us Today</a>
        </section>
    );
};

export default ContactSection;
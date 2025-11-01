// File: src/components/Sections/AboutSection.tsx

import React from 'react';

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="bg-gray-100 py-20 text-center px-6">
            <h3 className="text-3xl font-semibold text-yellow-600 mb-6 border-b-2 border-yellow-300 inline-block pb-1">About Festivora</h3>
            <p className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
                We curate the most stunning and reliable collection of decorative lights, specializing in unique fairy lights, elegant LED curtains, and festive string lights. Our mission is to bring light and joy to your celebrations.
            </p>
        </section>
    );
};

export default AboutSection;
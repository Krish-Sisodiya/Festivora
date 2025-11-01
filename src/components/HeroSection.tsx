// File: src/components/HeroSection/HeroSection.tsx

import React from 'react';
import heroVideoSrc from "../assets/vid/mf.mp4"

// Path for the video file in the public directory (Must be located at YOUR_PROJECT_ROOT/public/mf.mp4)
const HeroVideoPath: string = heroVideoSrc; 

const HeroSection: React.FC = () => {
    return (
        <section className="relative h-[60vh] md:h-[90vh] overflow-hidden">
            
            {/* Video Background (All necessary attributes for autoplay on mobile/desktop are included) */}
            <video
                className="absolute z-10 w-auto min-w-full min-h-full max-w-none object-cover"
                autoPlay
                loop
                muted         // Must be muted for autoplay to work in most browsers, especially mobile.
                playsInline   // Necessary for inline playback on iOS.
                // Removed redundant 'src={HeroVideoPath}' attribute from here
            >
                {/* Video URL ko sirf is <source> tag mein specify karein */}
                <source src={HeroVideoPath} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-60 z-20"></div>
            
            {/* Content */}
            <div className="relative z-30 h-full flex flex-col justify-center items-center text-center text-white p-4">
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-3 md:mb-5 tracking-tight animate-fadeIn text-shadow-lg">
                    Welcome to Festivora
                </h1>
                
                <p className="text-md sm:text-xl lg:text-2xl mb-6 md:mb-10 font-light max-w-3xl text-shadow-md">
                    Discover the best products with amazing discounts
                </p>
                
                <a 
                    href="#products" 
                    className="font-bold py-3 px-8 md:py-4 md:px-10 rounded-full transition duration-300 shadow-xl text-lg uppercase tracking-wider bg-yellow-500 hover:bg-yellow-600 hover:scale-[1.05] animate-fadeIn"
                    style={{ animationDelay: '0.5s' }}
                >
                    Shop Now
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
// File: src/pages/AboutUsPage.tsx (About Us Page with Animations)

import React from 'react';
import { Home, Zap, Star, Users, Briefcase, ChevronRight } from 'lucide-react';

// AboutUsPage Props Interface
interface AboutUsPageProps {
    onGoHome: () => void; // Function to go back to the home page
}

// --- MOCK DATA for Sections ---
const teamMembers = [
    { name: "Rajiv Mehta", role: "CEO & Visionary", desc: "Leads with a passion for traditional and modern lighting solutions.", icon: Briefcase },
    { name: "Priya Sharma", role: "Head of Design", desc: "Curates the collections, focusing on aesthetic and functional excellence.", icon: Star },
    { name: "Karan Singh", role: "Tech & Innovation Lead", desc: "Ensures all products meet high quality and safety standards.", icon: Zap },
];

const missionValues = [
    { title: "Quality Assurance", desc: "Every product undergoes rigorous testing for durability and safety.", color: "text-yellow-500", icon: Star },
    { title: "Customer Focus", desc: "Dedicated support and hassle-free service for every client.", color: "text-green-500", icon: Users },
    { title: "Sustainable Sourcing", desc: "Commitment to eco-friendly materials and ethical manufacturing.", color: "text-blue-500", icon: Zap },
];

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onGoHome }) => {

    return (
        <div className="bg-gray-50 min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header and Home Button */}
                <header className="mb-10 flex justify-between items-center border-b pb-4">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                        Our Story
                    </h1>
                    <button 
                        onClick={onGoHome}
                        className="flex items-center text-gray-600 hover:text-yellow-600 transition-all duration-300 transform hover:scale-105 active:scale-95 text-base font-medium p-2 rounded-lg border border-gray-300 hover:border-yellow-600"
                    >
                        <Home className="w-5 h-5 mr-2" /> Back to Home
                    </button>
                </header>

                {/* --- Hero Section: The Festivora Vision --- */}
                <section className="relative overflow-hidden bg-gray-900 rounded-3xl shadow-2xl p-10 md:p-16 mb-20 transform transition duration-500 hover:shadow-yellow-500/50">
                    <div className="md:flex md:items-center">
                        <div className="md:w-2/3">
                            <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 animate-fade-in-down">
                                Illuminating Every Celebration
                            </h2>
                            <p className="text-xl text-gray-200 mb-6 leading-relaxed animate-fade-in-up">
                                Festivora was founded on the belief that lighting is more than just visibility—it’s the soul of a space. We curate a collection of lights that bring warmth, wonder, and lasting memories to your festivals, homes, and events across India.
                            </p>
                            <button 
                                onClick={onGoHome}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-gray-900 bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 transform hover:translate-y-[-2px] active:translate-y-[1px]"
                            >
                                Explore Our Products <ChevronRight className="w-5 h-5 ml-2"/>
                            </button>
                        </div>
                        <div className="md:w-1/3 mt-8 md:mt-0 md:pl-10">
                            {/* Decorative element - simple animated light */}
                            <div className="w-32 h-32 mx-auto bg-yellow-500 rounded-full shadow-2xl shadow-yellow-500/70 animate-pulse-slow">
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Mission and Values Section --- */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {missionValues.map((value, index) => (
                            <div 
                                key={value.title} 
                                // 💡 Animation: Slide-up on load with staggered delay
                                className={`p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 transform transition duration-500 hover:scale-[1.03] active:scale-[0.98] animate-slide-up`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <value.icon className={`w-10 h-10 mb-4 ${value.color}`} />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Team Section --- */}
                <section className="mb-20 bg-gray-100 p-10 rounded-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
                        Meet the Innovators
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={member.name} 
                                // 💡 Animation: Rotate slightly on hover
                                className={`flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md transition duration-300 transform hover:rotate-1 hover:shadow-xl`}
                            >
                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center border-4 border-yellow-500">
                                    <member.icon className="w-12 h-12 text-gray-700"/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-yellow-600 font-medium mb-2">{member.role}</p>
                                <p className="text-sm text-gray-600">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- CTA Footer --- */}
                <section className="text-center bg-yellow-500 p-10 rounded-xl shadow-lg animate-bounce-slow">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Light Up Your World?
                    </h2>
                    <button 
                        onClick={onGoHome}
                        className="inline-flex items-center px-8 py-3 border-2 border-gray-900 text-base font-bold rounded-full text-gray-900 bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105 active:scale-98"
                    >
                        Start Shopping Now
                    </button>
                </section>

            </div>
        </div>
    );
}

export default AboutUsPage;
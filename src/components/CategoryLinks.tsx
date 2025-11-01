// File: src/components/CategoryLinks.tsx (Updated)

import React from 'react';

// Define the categories (matching the type in App.tsx)
type Category = {
    name: 'Fairy' | 'Curtain' | 'Moon' | 'Outdoor' | 'All';
    label: string;
    icon: string; // Placeholder for icon URL or class
};

const categories: Category[] = [
    { name: 'Fairy', label: 'Fairy Lights', icon: '⭐' },
    { name: 'Curtain', label: 'Curtain Lights', icon: '✨' },
    { name: 'Moon', label: 'Moon Lamps', icon: '🌙' },
    { name: 'Outdoor', label: 'Outdoor Lights', icon: '🌳' },
    // Removed 'All' from here, as the Navbar handles viewing all
];

// Define Props with the new handler
interface CategoryLinksProps {
    onCategoryClick: (category: Category['name']) => void; // 👈 NEW PROP
}

const CategoryLinks: React.FC<CategoryLinksProps> = ({ onCategoryClick }) => {
    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Shop by Category</h2>
            <div className="flex justify-center gap-6 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        // 👈 ON CLICK: Call the handler and pass the category name
                        onClick={() => onCategoryClick(cat.name)}
                        className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-32 cursor-pointer border border-transparent hover:border-indigo-500"
                    >
                        <span className="text-4xl mb-2">{cat.icon}</span>
                        <p className="text-sm font-semibold text-gray-700 text-center">{cat.label}</p>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategoryLinks;
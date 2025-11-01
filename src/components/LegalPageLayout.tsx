// File: src/components/LegalPageLayout.tsx

import React from 'react';

interface LegalPageLayoutProps {
    title: string;
    children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-yellow-500 pb-2">
                {title}
            </h1>
            <div className="text-gray-700 leading-relaxed space-y-6">
                {children}
            </div>
        </div>
    );
}

export default LegalPageLayout;
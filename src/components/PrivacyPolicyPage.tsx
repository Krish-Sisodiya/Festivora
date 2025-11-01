// File: src/pages/PrivacyPolicyPage.tsx

import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <LegalPageLayout title="Privacy Policy">
            <p>
                **Last Updated: 19th October 2025**
            </p>
            
            <p>
                Your privacy is important to Festivora. This policy explains how we collect, use, and protect your personal information when you use our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 pt-4">1. Information We Collect</h2>
            <p>
                We collect information you directly provide, such as your name, email address, shipping address, and phone number, primarily when you place an order or sign up for our newsletter.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 pt-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To process and fulfill your orders and manage returns.</li>
                <li>To communicate with you about your order status and promotional offers.</li>
                <li>To improve our website and services.</li>
            </ul>
        </LegalPageLayout>
    );
}

export default PrivacyPolicyPage;
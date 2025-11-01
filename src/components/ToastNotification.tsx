// File: src/components/ToastNotification.tsx
import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastNotificationProps {
    productName: string;
    onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ productName, onClose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); 
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div 
            className="fixed bottom-4 right-4 bg-green-600 text-white p-4 pr-6 rounded-lg shadow-xl z-50 flex items-center space-x-3 transition-transform duration-300 ease-out transform translate-y-0"
            role="alert"
        >
            <CheckCircle className="w-6 h-6"/>
            <span>
                Added **{productName}** to cart! 
                <button 
                    className="ml-2 text-sm font-semibold underline hover:text-white/80"
                >
                    View Cart
                </button>
            </span>
            <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}

export default ToastNotification;
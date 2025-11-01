// File: src/hooks/useScrollReveal.ts

import { useEffect } from 'react';

const useScrollReveal = (selector: string = '.scroll-reveal-item', threshold: number = 0.1) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, { threshold });

        // Observe all elements with the selector
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));

        return () => {
            // Cleanup on component unmount
            elements.forEach(el => observer.unobserve(el));
        };
    }, [selector, threshold]);
};

export default useScrollReveal;